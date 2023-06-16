import { FastifyReply, FastifyRequest } from 'fastify'
import { Logger } from '../logger'
import { response404, response500 } from '../responses'

const logger = new Logger( 'Get' )

export const Get = ( param? : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    
    const path : string = `/${ modulePath }${ param ? `/${ param }` : '' }`

    const originalMethod = descriptor.value
    descriptor.value = function () {
      if ( param && param.includes( ':' ) ) {
        const handlerWithParam = async ( request : FastifyRequest, reply : FastifyReply ) => {

          const { term } = request.params as { term : string }
          try {
            const result = await originalMethod.apply( this, [ term ] )
            if ( !result ) {
              reply.code( 404 ).send({
                ...response404,
                message: `The ${ modulePath } with term ${ term } was not found`
              })
              return
            }
            reply.code( 200 ).send( result )
          } catch ( error : any ) {
            logger.error( error )
            reply.code( 500 ).send({
              ...response500,
              message: error.message,
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
            ...response500,
            message: error.message,
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
