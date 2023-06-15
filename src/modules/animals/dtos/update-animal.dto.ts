import { PartialType } from '../../../decorators';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType( CreateAnimalDto ) {}
