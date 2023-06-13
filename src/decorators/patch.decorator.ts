import { FastifyReply, FastifyRequest } from 'fastify'

import { validate as isUUID } from 'uuid'
import { Logger } from '../logger'

const logger = new Logger( 'Patch' )

export const Patch = ( param : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {
    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`

    const originalMethod = descriptor.value
    const parameters = Reflect.getMetadata( 'design:paramtypes', target, _propertyKey )

    const updateDtoClass = parameters[ 1 ]
    const updateDtoInstance = new updateDtoClass()
    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
          const { id } = request.params as { [ key : string ] : string }
          if ( !isUUID( id ) ) {
            reply.code( 400 ).send({
              message: `The id ${ id } is not a valid UUID`
            })
            return
          }

          const body = request.body as typeof updateDtoClass

          const dtoAttributes = Object.getOwnPropertyNames( updateDtoInstance )
          //TODO: check obligatory properties
          const bodyProperties = Object.getOwnPropertyNames( body )
          const isValid = bodyProperties.every( bodyProperty => dtoAttributes.includes( bodyProperty ) )

          if ( isValid ) {
            try {
              const result = await originalMethod.apply( this, [ id, body ] )
              if ( !result ) {
                reply.code( 404 ).send({
                  statusCode: 404,
                  message: `The ${ modulePath } with id ${ id } does not exist`,
                  error: 'Not Found'
                })
                return
              }
            } catch ( error : any ) {
              if ( error.code === '23505' ) {
                reply.code( 400 ).send({
                  statusCode: 400,
                  message: error.detail,
                  error: 'Bad Request'
                })
              }
              logger.error( error )
              reply.code( 500 ).send({
                statusCode: 500,
                message: error.message,
                error: 'Internal Server Error, please check the logs'
              })
            }
          } else {
            reply.code( 400 ).send({
              // TODO: send the properties that are not defined in the dto class
              statusCode: 400,
              message: 'The request body contains invalid properties',
              error: 'Bad Request'
            })
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
