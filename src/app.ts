import dotenv from 'dotenv'
dotenv.config()

import { BotyRestServer } from './server'
import { initilizeModules } from './startup'
import { AppDataSource } from './database'
import { Logger } from './logger'


const server = new BotyRestServer()
const logger = new Logger( 'app' )

AppDataSource.initialize().then( async () => {
  initilizeModules( server )
  await server.initializeServer()
} ).catch( error => logger.error( error ) )
