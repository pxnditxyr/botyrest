import { FastifyReply, FastifyRequest } from 'fastify'

export const Delete = ( param : string ) => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }${ param ? `/:${ param }` : '' }`
    console.log( 'path', path)

    const originalMethod = descriptor.value

    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
        const { id } = request.params as { [ key : string ] : string }

        // TODO: validate the id is uuid
        const isValid = typeof id === 'string'

        if ( isValid ) {
          const result = originalMethod.apply( this, [ id ] )
          reply.code( 204 ).send( result )
        } else {
          reply.code( 400 ).send({
            message: `The id ${ id } is not valid`
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
