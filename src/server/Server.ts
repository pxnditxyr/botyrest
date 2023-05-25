import Fastify, { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from 'fastify'
import fastifyMiddie from '@fastify/middie'
import fastifyStatic from '@fastify/static'

import { AppDataSource } from '../database'
import { getEnvironmentVariables } from '../config'

export class BotyRestServer {
  private server : FastifyInstance
  private port : number

  constructor () {
    const { port } = getEnvironmentVariables()
    this.port = port

    this.server = Fastify({ logger: true })
    this.middlewares()
    this.serveStaticPage()
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
    AppDataSource.initialize().then( async () => {
      await this.initializeServer()
    } ).catch( error => console.log( error ) )
  }

  private async initializeServer () {
    try {
      await this.server.listen({ port: this.port })
      const address = this.server.server.address()
      const port = typeof address === 'string' ? address : address?.port
      console.log( `\tServer listening at ${ port }\n\tPlease visit http://localhost:${ port }` )
    } catch ( error ) {
      this.server.log.error( error )
      process.exit( 1 )
    }
  }


  private middlewares () {
    this.server.register( fastifyMiddie )
    this.server.register( fastifyStatic, {
      root: `${ __dirname }/../public`,
    })
  }

  private serveStaticPage () {
    this.server.get( '/', ( _request, reply ) => {
      reply.sendFile( 'index.html' )
    })
  }
}
