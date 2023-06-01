import { Delete, Get, Patch, Post } from '../../decorators'
import { AnimalsService } from './animals.service'
import { CreateAnimalDto, UpdateAnimalDto } from './dtos'

export class AnimalsController {
  [ key : string ]: any
    
  private readonly animalsService : AnimalsService = new AnimalsService()

  constructor (
  ) {}

  @Get()
  findAll () {
    return this.animalsService.findAll()
  }

  @Get( 'id' )
  findOne ( id : string ) {
    return this.animalsService.findOne( id )
  }

  @Post()
  create ( createAnimalDto : CreateAnimalDto  ) {
    return this.animalsService.create( createAnimalDto )
  }

  @Patch( 'id' )
  update ( id : string, updateAnimalDto : UpdateAnimalDto ) {
    return this.animalsService.update( id, updateAnimalDto )
  }

  @Delete( 'id' )
  delete ( id : string ) {
    return this.animalsService.delete( id )
  }
}
