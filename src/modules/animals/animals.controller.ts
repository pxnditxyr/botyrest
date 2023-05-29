import { Get } from '../../decorators'

export class AnimalsController {
  [ key : string ]: any
    
  private animals = [
    {
      id: 1,
      name: 'dog'
    },
    {
      id: 2,
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
    const animal = this.animals.find( animal => animal.id === Number( id ) )
    return animal
  }
}
