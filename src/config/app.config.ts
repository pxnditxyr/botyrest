export interface IEnvironmentVariables {
  port: number
  dbName: string
  dbPass: string
  dbUser: string
  dbManager: string
  dbHost: string
  dbPort: number
}

export const getEnvironmentVariables = () : IEnvironmentVariables => ({
  port: Number( process.env.PORT ) || 3000,
  dbName: process.env.DB_NAME || 'boty-db',
  dbPass: process.env.DB_PASS || '1234',
  dbUser: process.env.DB_USER || 'boty',
  dbManager: process.env.DB_MANAGER || 'postgres',
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: Number( process.env.DB_PORT ) || 5432,
})
