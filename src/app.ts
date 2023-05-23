import dotenv from 'dotenv'
import { BotyRestServer } from './server'

dotenv.config()

const server = new BotyRestServer()
server.start()
