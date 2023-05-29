import { AnimalsModule } from '../modules/animals';
import { BotyRestServer } from '../server';

export const initilizeModules = ( server : BotyRestServer ) => {
  const animalsModule = new AnimalsModule( server )
}
