import Model from './Model'

export interface IUser {
  id?: string
  username: string
  password?: string
}

export class UserSignIn extends Model implements IUser {
  username!: string
  password!: string
}

export class UserView extends Model implements IUser {
  id!: string
  username!: string
}
