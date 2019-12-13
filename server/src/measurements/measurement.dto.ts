import { IsNotEmpty, IsUUID } from 'class-validator'
import { Bottle } from '../bottles/bottle.entity'

export class MeasurementCreateDto {
  @IsNotEmpty()
  weight!: number

  @IsNotEmpty()
  bottleId!: string

  @IsNotEmpty()
  timestamp!: string
}

export class MeasurementViewDto {
  @IsUUID()
  id!: string

  @IsNotEmpty()
  weight!: number

  @IsNotEmpty()
  bottle!: Bottle
}

export class MeasurementUpdateDto extends MeasurementViewDto {}
