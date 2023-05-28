import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { getEnvironmentVariables } from '../config'
import { Animal } from '../modules/animals'

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
    logging: true,
    entities: [ Animal ],
    migrations: [],
    subscribers: [],
})
