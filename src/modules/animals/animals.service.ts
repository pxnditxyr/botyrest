import { Repository } from 'typeorm';
import { AppDataSource } from '../../database';
import { Animal } from './animals.entity';
import { CreateAnimalDto, UpdateAnimalDto } from './dtos';

export class AnimalsService {
  private readonly animalRepository : Repository<Animal> = AppDataSource.getRepository( Animal )

  constructor () {}
  
  async findAll () {
    const animals = await this.animalRepository.find()
    return animals
  }

  async findOne ( term : string ) {
    const animal = await this.animalRepository.findOneBy({ id: term })
    return animal
  }

  async create ( createAnimalDto : CreateAnimalDto ) {
    const animal = this.animalRepository.create( createAnimalDto )
    return await this.animalRepository.save( animal )
  }

  async update ( id : string, updateAnimalDto : UpdateAnimalDto ) {
    const animalToUpdate = await this.animalRepository.preload({
      id,
      ...updateAnimalDto
    })

    if ( !animalToUpdate ) return

    await this.animalRepository.save( animalToUpdate )
    return animalToUpdate
  }

  async delete ( id : string ) {
    const animalToDelete = await this.findOne( id )
    if ( !animalToDelete ) return
    return await this.animalRepository.delete( id )
  }
}
