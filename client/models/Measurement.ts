import Model from './Model'

export interface IMeasurement {
  id?: string
  weight: number
}

export class MeasurementCreate extends Model implements IMeasurement {
  weight!: number
}

export class MeasurementView extends Model implements IMeasurement {
  id!: string
  weight!: number
}
