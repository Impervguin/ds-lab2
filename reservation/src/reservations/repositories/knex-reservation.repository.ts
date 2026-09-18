import type { Knex } from 'knex';

import type { Reservation, ReservationStatus } from '../domain/reservation.js';
import type { ReservationRepository } from '../domain/reservation.repository.js';

export const RESERVATION_TABLE = 'reservation';

export class KnexReservationRepository implements ReservationRepository {
  constructor(private readonly knex: Knex) {}

  listByUsername(_username: string): Promise<Reservation[]> {
    throw new Error('Not implemented');
  }

  findByUid(_reservationUid: string): Promise<Reservation | null> {
    throw new Error('Not implemented');
  }

  create(_reservation: Reservation): Promise<Reservation> {
    throw new Error('Not implemented');
  }

  updateStatus(_reservationUid: string, _status: ReservationStatus): Promise<Reservation | null> {
    throw new Error('Not implemented');
  }
}
