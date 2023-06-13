import { FastifyReply, FastifyRequest } from 'fastify'
import { validate as isUUID } from 'uuid'
import { Logger } from '../logger'

const logger = new Logger( 'Get' )

export const Get = ( param? : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`

    const originalMethod = descriptor.value
    descriptor.value = function () {
      if ( param ) {
        const handlerWithParam = async ( request : FastifyRequest, reply : FastifyReply ) => {
          const { id } = request.params as { id : string }
          if ( !isUUID( id ) ) {
            reply.code( 400 ).send({
              message: `The id ${ id } is not a valid UUID`
            })
            return
          }
          try {
            const result = await originalMethod.apply( this, [ id ] )
            if ( !result ) reply.code( 404 ).send({
              message: `The ${ modulePath } with id ${ id } was not found`
            })
            reply.code( 200 ).send( result )
          } catch ( error : any ) {
            logger.error( error )
            reply.code( 500 ).send({
              statusCode: 500,
              message: error.message,
              error: 'Internal Server Error, please check the logs'
            })
          }
        }
        const routeStruct = {
          method: 'GET',
          url: path,
          handler: handlerWithParam
        }
        return routeStruct
      } 


      const handler = async ( _request : FastifyRequest, reply : FastifyReply ) => {
        try {
          const result = await originalMethod.apply( this, arguments )
          reply.code( 200 ).send( result )
        } catch ( error : any ) {
          logger.error( error )
          reply.code( 500 ).send({
            statusCode: 500,
            message: error.message,
            error: 'Internal Server Error, please check the logs'
          })
        }
      }
      
      const routeStruct = {
        method: 'GET',
        url: path,
        handler: handler
      }
      return routeStruct
    }
    
    return descriptor
  }
}
