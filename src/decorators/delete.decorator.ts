import { FastifyReply, FastifyRequest } from 'fastify'
import { validate as isUUID } from 'uuid'
import { Logger } from '../logger'

const logger = new Logger( 'Delete' )

export const Delete = ( param : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`
    console.log( 'path', path)

    const originalMethod = descriptor.value

    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
        const { id } = request.params as { [ key : string ] : string }

        if ( isUUID( id ) ) {
          try {
            const result = await originalMethod.apply( this, [ id ] )
            logger.warn( result )
            if ( !result ) {
              reply.code( 404 ).send({
                message: `The ${ modulePath } with id ${ id } was not found`
              })
              return
            }
            reply.code( 204 ).send( result )
          } catch ( error : any ) {
            logger.error( error )
            reply.code( 500 ).send({
              statusCode: 500,
              message: error.message,
              error: 'Internal Server Error, please check the logs'
            })
          }
        } else {
          reply.code( 400 ).send({
            statusCode: 400,
            message: `The id ${ id } is not valid`,
            error: 'Bad Request'
          })
        }
      }

      const routeStruct = {
        method: 'DELETE',
        url: path,
        handler: handler
      }
      return routeStruct
    }
    
    return descriptor
  }
}
