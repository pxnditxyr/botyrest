import dotenv from 'dotenv'
dotenv.config()

import { BotyRestServer } from './server'
import { initilizeModules } from './startup'
import { AppDataSource } from './database'


const server = new BotyRestServer()

AppDataSource.initialize().then( async () => {
  initilizeModules( server )
  await server.initializeServer()
} ).catch( error => console.log( error ) )
