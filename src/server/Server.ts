import Fastify, { FastifyInstance, RouteOptions } from 'fastify'
import fastifyMiddie from '@fastify/middie'
import fastifyStatic from '@fastify/static'

import { AppDataSource } from '../database'
import { getEnvironmentVariables } from '../config'

import { IHttpMethodParams } from '../interfaces'
import { Logger } from '../logger'


export class BotyRestServer {
  private server : FastifyInstance
  private port : number
  private logger : Logger

  constructor () {
    const { port } = getEnvironmentVariables()
    this.port = port
    this.logger = new Logger( 'BotyRestServer' )
    this.server = Fastify({ logger: false })
    this.middlewares()
    this.serveStaticPage()
  }

  applyRoutes ( routes : RouteOptions[] ) {
    routes.forEach( route => this.server.route( route ) )
  }

  route ( fastifyRoute : RouteOptions ) {
    this.server.route( fastifyRoute )
  }

  get ( { url, opts, handler } : IHttpMethodParams ) {
    if ( !opts ) {
      this.server.get( url, handler )
      return
    }
    this.server.get( url, opts, handler )
  }

  post ( { url, opts, handler } : IHttpMethodParams ) {
    if ( !opts ) {
      this.server.post( url, handler )
      return
    }
    this.server.post( url, opts, handler )
  }

  patch ( { url, opts, handler } : IHttpMethodParams ) {
    if ( !opts ) {
      this.server.patch( url, handler )
      return
    }
    this.server.patch( url, opts, handler )
  }

  delete ( { url, opts, handler } : IHttpMethodParams ) {
    if ( !opts ) {
      this.server.delete( url, handler )
      return
    }

    this.server.delete( url, opts, handler )
  }
  
  async start () {
    
  }

  async initializeServer () {
    try {
      await this.server.listen({ port: this.port })
      const address = this.server.server.address()
      const port = typeof address === 'string' ? address : address?.port
      this.logger.log( `Server listening at ${ port }` )
      this.logger.log( `Please visit http://localhost:${ port }` )
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
