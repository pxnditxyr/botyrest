import dotenv from 'dotenv'
dotenv.config()

import { BotyRestServer } from './server'


const server = new BotyRestServer()


server.start()
