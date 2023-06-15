import { FastifyReply, FastifyRequest } from 'fastify'
import { validateOrReject } from 'class-validator'
import { validate as isUUID } from 'uuid'

import { Logger } from '../logger'
import { response400, response404, response500 } from '../responses'
import { convertClassValidatorErrors } from '../utils'

const logger = new Logger( 'Patch' )

export const Patch = ( param : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {
    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`

    const originalMethod = descriptor.value
    const parameters = Reflect.getMetadata( 'design:paramtypes', target, _propertyKey )

    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
        const { id } = request.params as { [ key : string ] : string }
        if ( !isUUID( id ) ) {
          reply.code( 400 ).send({
            ...response400,
            message: `The id ${ id } is not a valid UUID`
          })
          return
        }

        const body = request.body as typeof updateDtoClass
        const updateDtoClass = parameters[ 1 ]
        const updateDtoInstance = new updateDtoClass()
        const classDtoValidation = Object.assign( updateDtoInstance, body )

        try {
          await validateOrReject( classDtoValidation )
        } catch ( errors : any ) {
          const errorsMessages = convertClassValidatorErrors( errors )
          reply.code( 400 ).send({
            ...response400,
            message: errorsMessages
          })
        }

        try {
          const result = await originalMethod.apply( this, [ id, body ] )
          if ( !result ) {
            reply.code( 404 ).send({
              ...response404,
              message: `The ${ modulePath } with id ${ id } does not exist`,
            })
            return
          }
        } catch ( error : any ) {
          if ( error.code === '23505' ) {
            reply.code( 400 ).send({
              ...response400,
              message: error.detail,
            })
            return
          }
          logger.error( error )
          reply.code( 500 ).send({
            ...response500,
            message: error.message,
          })
          return
        }
      }
      const routeStruct = {
        method: 'PATCH',
        url: path,
        handler: handler
      }
      return routeStruct
    }
    
    return descriptor
  }
}
