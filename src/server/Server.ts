import Fastify, { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'

export class BotyRestServer {
  public server : FastifyInstance
  private port : number = 3000

  constructor () {
    this.server = Fastify({})
  }

  get ( url : string, opts : RouteShorthandOptions, handler : RouteHandlerMethod ) {
    this.server.get( url, opts, handler )
  }

  post ( url : string, opts : RouteShorthandOptions, handler : RouteHandlerMethod ) {
    this.server.post( url, opts, handler )
  }

  patch ( url : string, opts : RouteShorthandOptions, handler : RouteHandlerMethod ) {
    this.server.patch( url, opts, handler )
  }

  delete ( url : string, opts : RouteShorthandOptions, handler : RouteHandlerMethod ) {
    this.server.delete( url, opts, handler )
  }
  
  async start () {
    try {
      await this.server.listen({ port: this.port })
      const address = this.server.server.address()
      const port = typeof address === 'string' ? address : address?.port
      console.log( `\tServer listening at ${ port }\n\tPlease visit http://localhost:${ port }/welcome`)
    } catch ( error ) {
      this.server.log.error( error )
      process.exit( 1 )
    }
  }
}
