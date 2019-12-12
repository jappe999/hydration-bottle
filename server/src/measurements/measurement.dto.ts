import { IsNotEmpty, IsUUID } from 'class-validator'
import { Bottle } from '../bottles/bottle.entity'

export class MeasurementCreateDto {
  @IsNotEmpty()
  weight!: number

  bottle?: Bottle
}

export class MeasurementViewDto {
  @IsUUID()
  id!: string

  @IsNotEmpty()
  weight!: number
}

export class MeasurementUpdateDto extends MeasurementViewDto {}
