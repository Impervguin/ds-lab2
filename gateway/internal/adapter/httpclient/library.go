package httpclient

import "github.com/Impervguin/ds-lab2/gateway/internal/usecase"

type LibraryClient struct {
	baseClient
}

var _ usecase.LibraryService = (*LibraryClient)(nil)

func NewLibraryClient(baseURL string) *LibraryClient {
	return &LibraryClient{baseClient: newBaseClient(baseURL)}
}