import { FastifyReply, FastifyRequest } from 'fastify'
import { Logger } from '../logger'

const logger = new Logger( 'Post' )

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
        const body = request.body as typeof createDtoClass
        const dtoAttributes = Object.getOwnPropertyNames( createDtoInstance )
        //TODO: check obligatory properties
        const bodyProperties = Object.getOwnPropertyNames( body )
        const isValid = bodyProperties.every( bodyProperty => dtoAttributes.includes( bodyProperty ) )

        if ( isValid ) {
          try {
            const result = await originalMethod.apply( this, [ body ] )
            reply.code( 201 ).send( result )
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
        method: 'POST',
        url: path,
        handler: handler
      }
      return routeStruct
    }
    
    return descriptor
  }
}
