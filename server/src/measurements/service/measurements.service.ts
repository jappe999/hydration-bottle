import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Measurement } from '../measurement.entity'
import { FindOneOptions, Repository, FindManyOptions } from 'typeorm'
import { MeasurementCreateDto } from '../measurement.dto'

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  findMany(options?: FindManyOptions): Promise<Measurement[]> {
    return this.measurementRepository.find(options)
  }

  findOne(options?: FindOneOptions): Promise<Measurement> {
    return this.measurementRepository.findOne(options)
  }

  create(measurement: MeasurementCreateDto): Promise<Measurement> {
    return this.measurementRepository.save(measurement)
  }

  update(where: { [key: string]: any }, update: { [key: string]: any }) {
    return this.measurementRepository.update(where, update)
  }

  remove(where: { [key: string]: any }) {
    return this.measurementRepository.delete(where)
  }
}
