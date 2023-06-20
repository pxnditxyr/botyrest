interface IRateLimitOptions {
  max: number
  timeWindow: string
}

export interface IServerConfig {
  port: number
  origin: string | string[] | RegExp | RegExp[] | boolean
  rateLimitOptions? : IRateLimitOptions
}

