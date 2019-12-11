import { IsNotEmpty, IsUUID } from 'class-validator'
import { User } from '../users/user.entity'

export class BottleCreateDto {
    @IsNotEmpty()
    code!: string

    @IsNotEmpty()
    name!: string

    user?: User
}

export class BottleViewDto {
    @IsUUID()
    id!: string

    @IsNotEmpty()
    code!: string

    @IsNotEmpty()
    name!: string
}

export class BottleUpdateDto extends BottleViewDto { }
