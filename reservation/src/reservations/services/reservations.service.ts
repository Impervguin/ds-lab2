import { Inject, Injectable } from '@nestjs/common';

import { getLogger, type Logger } from '../../logger/logger.js';
import {
  RESERVATION_REPOSITORY,
  type ReservationRepository,
} from '../domain/reservation.repository.js';

@Injectable()
export class ReservationsService {
  private readonly logger: Logger = getLogger('reservations.service');

  constructor(
    @Inject(RESERVATION_REPOSITORY) private readonly reservations: ReservationRepository,
  ) {}
}
