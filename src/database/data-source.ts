import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { getEnvironmentVariables } from '../config'

const {
  dbHost,
  dbManager,
  dbName,
  dbPass,
  dbPort,
  dbUser,
} = getEnvironmentVariables()

export const AppDataSource = new DataSource({
    type: dbManager as any,
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPass,
    database: dbName,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
