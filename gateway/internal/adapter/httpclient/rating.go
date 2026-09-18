package httpclient

import "github.com/Impervguin/ds-lab2/gateway/internal/usecase"

type RatingClient struct {
	baseClient
}

var _ usecase.RatingService = (*RatingClient)(nil)

func NewRatingClient(baseURL string) *RatingClient {
	return &RatingClient{baseClient: newBaseClient(baseURL)}
}