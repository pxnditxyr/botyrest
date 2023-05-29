import dotenv from 'dotenv'
dotenv.config()

import { BotyRestServer } from './server'
import { initilizeModules } from './startup'


const server = new BotyRestServer()

initilizeModules( server )

server.start()
