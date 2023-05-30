import { Delete, Get, Patch, Post } from '../../decorators'
import { Animal } from './animals.entity'
import { CreateAnimalDto, UpdateAnimalDto } from './dtos'

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
    console.log( typeof id )
    const animal = this.animals.find( animal => animal.id === id )
    return animal
  }

  @Post()
  create ( createAnimalDto : CreateAnimalDto  ) {
    this.animals.push( createAnimalDto )
    return createAnimalDto
  }

  @Patch( 'id' )
  update ( id : string, updateAnimalDto : UpdateAnimalDto ) {
    console.log({ id: typeof id, updateAnimalDto })
    const animal = this.animals.find( animal => animal.id === id )
    if ( !animal ) return { message: 'Animal not found' }
    const animalIndex = this.animals.indexOf( animal )
    this.animals[ animalIndex ] = {
      ...animal,
      ...updateAnimalDto
    }
    return this.animals[ animalIndex ]
  }

  @Delete( 'id' )
  delete ( id : string ) {
    console.log( `entrando a delete ${ id }` )
    const animal = this.animals.find( animal => animal.id === id )
    if ( !animal ) return { message: 'Animal not found' }
    const animalIndex = this.animals.indexOf( animal )
    this.animals.splice( animalIndex, 1 )
    return { message: 'Animal deleted' }
  }

}
