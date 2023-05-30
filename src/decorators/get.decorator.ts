import { FastifyReply, FastifyRequest } from 'fastify'

export const Get = ( param? : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`

    const originalMethod = descriptor.value
    descriptor.value = function () {

      if ( param ) {
        const handlerWithParam = async ( request : FastifyRequest, reply : FastifyReply ) => {
          const { id } = request.params as { id : string }
          const result = originalMethod.apply( this, [ id ] )
          if ( !result ) reply.code( 404 ).send({
            message: `The ${ modulePath } with id ${ id } was not found`
          })
          reply.code( 200 ).send( result )
        }
        const routeStruct = {
          method: 'GET',
          url: path,
          handler: handlerWithParam
        }
        return routeStruct
      } 

      const result = originalMethod.apply( this, arguments )

      const handler = async ( _request : FastifyRequest, reply : FastifyReply ) => {
        reply.code( 200 ).send( result )
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
