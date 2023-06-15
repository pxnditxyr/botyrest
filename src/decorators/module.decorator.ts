import { IModuleOptions } from '../interfaces';
import { BotyRestServer } from '../server';

export const Module = ( moduleOptions : IModuleOptions ) => {

  const { controllers } = moduleOptions

  return ( target : any ) => {
    const controllerInstance = new controllers[ 0 ]()
    const methods : string[] = Object.getOwnPropertyNames( controllers[ 0 ].prototype ) 
    const routes : any = []
    
    methods.forEach( ( method : string ) => {
      if ( method !== 'constructor' ) {
        const route = controllerInstance[ method ]()
        routes.push( route )
      }
    } )

    const originalConstructor = target

    const newConstructor : any = function ( ...args : any[] ) {
      const server : BotyRestServer = args[ 0 ]
      server.applyRoutes( routes )
      const instance = new originalConstructor( ...args )
      return instance
    }

    newConstructor.prototype = originalConstructor.prototype
    return newConstructor
  }
}
