import { z } from 'zod';

export const RESERVATION_STATUSES = ['RENTED', 'RETURNED', 'EXPIRED'] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export interface Reservation {
  readonly reservationUid: string;
  readonly username: string;
  readonly bookUid: string;
  readonly libraryUid: string;
  readonly status: ReservationStatus;
  readonly startDate: Date;
  readonly tillDate: Date;
}

export const reservationSchema: z.ZodType<Reservation> = z.object({
  reservationUid: z.uuid(),
  username: z.string().trim().min(1).max(80),
  bookUid: z.uuid(),
  libraryUid: z.uuid(),
  status: z.enum(RESERVATION_STATUSES),
  startDate: z.coerce.date(),
  tillDate: z.coerce.date(),
});

export function validateReservation(value: unknown): Reservation {
  return reservationSchema.parse(value);
}
