import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Animal } from './animals.entity';

export class AnimalsService {
  private readonly animalRepository : Repository<Animal>  = AppDataSource.getRepository( Animal )

  constructor () {}
  
  async findAll () {
    return await this.animalRepository.find()
  }

  async findOne ( id : string ) {
    return await this.animalRepository.findOneBy({ id })
  }

  async create ( animal : Animal ) {
    return await this.animalRepository.save( animal )
  }

  async update ( id : string, animal : Animal ) {
    return await this.animalRepository.update( id, animal )
  }

  async delete ( id : string ) {
    return await this.animalRepository.delete( id )
  }
}
