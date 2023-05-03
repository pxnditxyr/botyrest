import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'


const server : FastifyInstance = Fastify({})

const opts : RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          welcome: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get( '/welcome', opts, async ( request, reply ) => {
  return {
    welcome: 'Initialized Project BotyRest | Fastify Typescript'
  }
})


const start = async () => {
  try {
    await server.listen({ port: 3000 })
    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
  } catch ( error ) {
    server.log.error( error )
    process.exit( 1 )
  }
}

start()
