import { Delete, Get, Patch, Post } from '../../decorators'
import { AnimalsService } from './animals.service'
import { CreateAnimalDto, UpdateAnimalDto } from './dtos'

export class AnimalsController {
  [ key : string ]: any
    
  private readonly animalsService : AnimalsService = new AnimalsService()

  constructor (
  ) {}

  @Get()
  async findAll () {
    return await this.animalsService.findAll()
  }

  @Get( ':term' )
  async findOne ( term : string ) {
    return await this.animalsService.findOne( term )
  }

  @Post()
  async create ( createAnimalDto : CreateAnimalDto  ) {
    return await this.animalsService.create( createAnimalDto )
  }

  @Patch( ':id' )
  async update ( id : string, updateAnimalDto : UpdateAnimalDto ) {
    return await this.animalsService.update( id, updateAnimalDto )
  }

  @Delete( ':id' )
  async delete ( id : string ) {
    return await this.animalsService.delete( id )
  }
}
