import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
} from '@nestjs/common';

import { ReservationsService } from '../services/reservations.service.js';

/** Internal API consumed only by the Gateway service (no horizontal calls). */
@Controller('api/v1/reservations')
export class ReservationsController {
  constructor(private readonly reservations: ReservationsService) {}

  @Get()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  list(): never {
    throw new NotImplementedException();
  }

  @Post()
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  take(): never {
    throw new NotImplementedException();
  }

  @Post(':reservationUid/return')
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  return(@Param('reservationUid') _reservationUid: string): never {
    throw new NotImplementedException();
  }
}
