import { RouteShorthandOptions } from 'fastify'

import { BotyRestServer } from './server/Server'
import 'reflect-metadata'

const server = new BotyRestServer()

server.start()
