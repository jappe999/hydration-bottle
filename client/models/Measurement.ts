import Model from './Model'

export interface IMeasurement {
  id?: string
  bottleId: string
  weight: number
}

export class MeasurementCreate extends Model implements IMeasurement {
  bottleId!: string
  weight!: number
}

export class MeasurementView extends Model implements IMeasurement {
  id!: string
  bottleId!: string
  weight!: number
}
