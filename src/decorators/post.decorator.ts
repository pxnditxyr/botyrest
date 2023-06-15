import { FastifyReply, FastifyRequest } from 'fastify'
import { validateOrReject } from 'class-validator'
import { convertClassValidatorErrors } from '../utils'
import { response400, response500 } from '../responses'
import { Logger } from '../logger'

const logger = new Logger( 'Post' )

export const Post = () => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }`

    const originalMethod = descriptor.value
    const parameters = Reflect.getMetadata( 'design:paramtypes', target, _propertyKey )

    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
        const body = request.body as typeof createDtoClass
        const createDtoClass = parameters[ 0 ]
        const createDtoInstance = new createDtoClass()
        const classDtoValidation = Object.assign( createDtoInstance, body )
        try {
          await validateOrReject( classDtoValidation )
        } catch ( errors : any ) {
          const errorsMessages = convertClassValidatorErrors( errors )
          reply.code( 400 ).send({
            ...response400,
            message: errorsMessages
          })
          return
        }
        try {
          const result = await originalMethod.apply( this, [ body ] )
          reply.code( 201 ).send( result )
        } catch ( error : any ) {
          if ( error.code === '23505' ) {
            reply.code( 400 ).send({
              ...response400,
              message: error.detail,
            })
          }
          logger.error( error )
          reply.code( 500 ).send({
            ...response500,
            message: error.message,
          })
        }
      }
      const routeStruct = {
        method: 'POST',
        url: path,
        handler: handler
      }
      return routeStruct
    }
    return descriptor
  }
}
