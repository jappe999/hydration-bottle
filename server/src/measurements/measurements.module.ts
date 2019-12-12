import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MeasurementsService } from './service/measurements.service'
import { Measurement } from './measurement.entity'
import { MeasurementsController } from './controller/measurements.controller'
import { BottlesModule } from '../bottles/bottles.module'

@Module({
  imports: [TypeOrmModule.forFeature([Measurement]), BottlesModule],
  providers: [MeasurementsService],
  controllers: [MeasurementsController],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
