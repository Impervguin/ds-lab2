package httpclient

import "github.com/Impervguin/ds-lab2/gateway/internal/usecase"

type ReservationClient struct {
	baseClient
}

var _ usecase.ReservationService = (*ReservationClient)(nil)

func NewReservationClient(baseURL string) *ReservationClient {
	return &ReservationClient{baseClient: newBaseClient(baseURL)}
}