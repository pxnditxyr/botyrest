import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Animal } from './animals.entity';
import { CreateAnimalDto } from './dtos';

export class AnimalsService {
  private readonly animalRepository : Repository<Animal>  = AppDataSource.getRepository( Animal )

  constructor () {}
  
  async findAll () {
    return await this.animalRepository.find()
  }

  async findOne ( id : string ) {
    return await this.animalRepository.findOneBy({ id })
  }

  async create ( animal : CreateAnimalDto ) {
    return await this.animalRepository.save( animal )
  }

  async update ( id : string, animal : CreateAnimalDto ) {
    return await this.animalRepository.update( id, animal )
  }

  async delete ( id : string ) {
    return await this.animalRepository.delete( id )
  }
}
