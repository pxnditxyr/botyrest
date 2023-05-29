import { RouteHandlerMethod, RouteShorthandOptions } from 'fastify';

export interface IHttpMethodParams {
  url : string,
  opts? : RouteShorthandOptions,
  handler : RouteHandlerMethod
}
