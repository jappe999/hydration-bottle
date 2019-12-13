import {
  Controller,
  UseGuards,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { MeasurementsService } from '../service/measurements.service'
import { AuthGuard } from '@nestjs/passport'
import { MeasurementCreateDto, MeasurementUpdateDto } from '../measurement.dto'

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  /**
   * Add a new measurement to the measurement collection of the bottle.
   * @param measurement - The measurement to add
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  create(@Body() measurement: MeasurementCreateDto) {
    return this.measurementsService.create(measurement)
  }

  /**
   * Update the given measurement with the new data.
   * @param params - The params for the request
   * @param params.id - The id of the measurement to update
   * @param measurement - The new data for the measurement
   */
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() { id }: { id: string }, measurement: MeasurementUpdateDto) {
    return this.measurementsService.update({ id }, measurement)
  }

  /**
   * Remove a measurement from the bottle.
   * @param params - The params for the request
   * @param params.id - The id of the measurement to remove.
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() { id }: { id: string }) {
    return this.measurementsService.remove({ id })
  }
}
