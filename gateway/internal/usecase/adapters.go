
package usecase

// LibraryClient is the port to the Library service.
type LibraryService interface {
	// TODO: ListLibraries(ctx context.Context, city string, page, size int) (...)
	// TODO: ListBooks(ctx context.Context, libraryUID string, page, size int, showAll bool) (...)
	// TODO: ReserveBook(ctx context.Context, libraryUID, bookUID string) error
	// TODO: ReleaseBook(ctx context.Context, libraryUID, bookUID string) error
}

// ReservationClient is the port to the Reservation service.
type ReservationService interface {
	// TODO: ListReservations(ctx context.Context, username string) (...)
	// TODO: CreateReservation(ctx context.Context, username, bookUID, libraryUID, tillDate string) (...)
	// TODO: ReturnReservation(ctx context.Context, reservationUID, condition, date string) error
}

// RatingClient is the port to the Rating service.
type RatingService interface {
	// TODO: GetRating(ctx context.Context, username string) (int, error)
	// TODO: UpdateRating(ctx context.Context, username string, delta int) error
}
