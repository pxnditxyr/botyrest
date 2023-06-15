import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateAnimalDto {
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  age: number

  @IsString()
  @IsOptional()
  breed: string

  @IsString()
  @IsOptional()
  type: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  weight: number

  @IsString()
  @IsOptional()
  color: string

  @IsNumber()
  @IsOptional()
  numberOfLegs: number

  @IsBoolean()
  @IsOptional()
  status: boolean
}
