import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Bottle {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    code!: string

    @Column()
    name!: string

    @ManyToOne(() => User)
    user!: User
}
