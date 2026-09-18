import type { Reservation, ReservationStatus } from './reservation.js';

export const RESERVATION_REPOSITORY = Symbol('RESERVATION_REPOSITORY');

export interface ReservationRepository {
  listByUsername(username: string): Promise<Reservation[]>;
  findByUid(reservationUid: string): Promise<Reservation | null>;
  create(reservation: Reservation): Promise<Reservation>;
  updateStatus(reservationUid: string, status: ReservationStatus): Promise<Reservation | null>;
}
