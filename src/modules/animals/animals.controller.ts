import { Get, Post } from '../../decorators'
import { Animal } from './animals.entity'
import { CreateAnimalDto } from './dtos'

export class AnimalsController {
  [ key : string ]: any
    
  private animals : Animal[] = [
    {
      id: '1',
      name: 'dog'
    },
    {
      id: '2',
      name: 'cat'
    }
  ]

  constructor (
  ) {}

  @Get()
  findAll () {
    return this.animals
  }

  @Get( 'id' )
  findOne ( id : string ) {
    const animal = this.animals.find( animal => animal.id === id )
    return animal
  }

  @Post()
  create ( createAnimalDto : CreateAnimalDto  ) {
    console.log( 'createAnimalDto', createAnimalDto )
    this.animals.push( createAnimalDto )
    return createAnimalDto
  }

}
