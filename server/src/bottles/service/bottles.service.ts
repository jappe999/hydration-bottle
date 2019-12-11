import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Bottle } from '../bottle.entity'
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm'
import { BottleCreateDto } from '../bottle.dto'

@Injectable()
export class BottlesService {
  constructor(
    @InjectRepository(Bottle)
    private readonly bottleRepository: Repository<Bottle>,
  ) { }

  findMany(options?: FindManyOptions): Promise<Bottle[]> {
    return this.bottleRepository.find(options)
  }

  findOne(options?: FindOneOptions): Promise<Bottle> {
    return this.bottleRepository.findOne(options)
  }

  create(bottle: BottleCreateDto): Promise<Bottle> {
    return this.bottleRepository.save(bottle)
  }

  update(where: { [key: string]: any }, update: { [key: string]: any }) {
    return this.bottleRepository.update(where, update)
  }

  remove(where: { [key: string]: any }) {
    return this.bottleRepository.delete(where)
  }
}
