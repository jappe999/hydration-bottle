import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { User } from '../users/user.entity'
import { Measurement } from '../measurements/measurement.entity'

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

  @OneToMany(() => Measurement, measurement => measurement.bottle)
  measurements!: Measurement[]
}
