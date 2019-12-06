import Model from './Model'

export interface IBottle {
    id?: string
    code: string
    name: string
}

export class BottleSignIn extends Model implements IBottle {
    code!: string
    name!: string
}

export class BottleView extends Model implements IBottle {
    id!: string
    code!: string
    name!: string
}
