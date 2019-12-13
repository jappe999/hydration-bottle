import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Bottle } from '../bottles/bottle.entity'

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  weight!: number


  @Column()
  timestamp!: number

  @ManyToOne(() => Bottle)
  bottle!: Bottle
}
