import { FastifyReply, FastifyRequest } from 'fastify'

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
        const body = request.body as typeof updateDtoClass

        const dtoAttributes = Object.getOwnPropertyNames( updateDtoInstance )
        //TODO: check obligatory properties
        const bodyProperties = Object.getOwnPropertyNames( body )
        const isValid = bodyProperties.every( bodyProperty => dtoAttributes.includes( bodyProperty ) )

        if ( isValid ) {
          const result = originalMethod.apply( this, [ id, body ] )
          reply.code( 200 ).send( result )
        } else {
          reply.code( 400 ).send({
            // TODO: send the properties that are not defined in the dto class
            message: 'The request body contains invalid properties',
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
