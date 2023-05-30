import { FastifyReply, FastifyRequest } from 'fastify'

export const Post = () => {
  return ( target : any, _propertyKey : string, descriptor : PropertyDescriptor ) => {

    const modulePath : string = target.constructor.name.toLowerCase().replace( 'controller', '' )
    const path : string = `/${ modulePath }`

    const originalMethod = descriptor.value
    const parameters = Reflect.getMetadata( 'design:paramtypes', target, _propertyKey )

    const createDtoClass = parameters[ 0 ]
    const createDtoInstance = new createDtoClass()
    descriptor.value = function () {
      const handler = async ( request : FastifyRequest, reply : FastifyReply ) => {
        let body = request.body as typeof createDtoClass
        const dtoAttributes = Object.getOwnPropertyNames( createDtoInstance )
        //TODO: check obligatory properties
        const bodyProperties = Object.getOwnPropertyNames( body )
        const isValid = bodyProperties.every( bodyProperty => dtoAttributes.includes( bodyProperty ) )

        if ( isValid ) {
          const result = originalMethod.apply( this, [ body ] )
          reply.code( 201 ).send( result )
        } else {
          reply.code( 400 ).send({
            // TODO: send the properties that are not defined in the dto class
            message: 'The request body contains invalid properties',
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
