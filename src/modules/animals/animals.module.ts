import { BotyRestServer } from '../../server';
import { AnimalsController } from './animals.controller';

export class AnimalsModule {

  private animalsController : AnimalsController

  constructor (
    private server : BotyRestServer
  ) {
    this.animalsController = new AnimalsController()
    const methods : string[] = Object.getOwnPropertyNames( AnimalsController.prototype )
    const routes : any = []
    methods.forEach( ( method : string ) => {
      if ( method !== 'constructor' ) {
        const route = this.animalsController[ method ]()
        routes.push( route )
      }
    } )
    this.server.applyRoutes( routes )
  }
}
