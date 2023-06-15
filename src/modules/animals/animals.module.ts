import { Module } from '../../decorators';
import { BotyRestServer } from '../../server';
import { AnimalsController } from './animals.controller';

@Module({
  controllers: [ AnimalsController ],
})
export class AnimalsModule {
  constructor ( private server : BotyRestServer) {}
}
