import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Animal } from './animals.entity';
import { CreateAnimalDto } from './dtos';

export class AnimalsService {
  private readonly animalRepository : Repository<Animal>  = AppDataSource.getRepository( Animal )

  constructor () {}
  
  async findAll () {
    try {
      return await this.animalRepository.find()
    } catch ( error : any ) {
      throw new Error( error )
    }
  }

  async findOne ( id : string ) {
    return await this.animalRepository.findOneBy({ id })
  }

  async create ( animal : CreateAnimalDto ) {
    return await this.animalRepository.save( animal )
  }

  async update ( id : string, animal : CreateAnimalDto ) {
    // do preload
    const animalToUpdate = await this.animalRepository.preload({
      id,
      ...animal
    })
    if ( !animalToUpdate ) return

    const animalFromDB = await this.animalRepository.save( animalToUpdate )
    return animalFromDB
  }

  async delete ( id : string ) {
    const animalToDelete = await this.findOne( id )
    if ( !animalToDelete ) return
    return await this.animalRepository.delete( id )
  }
}
