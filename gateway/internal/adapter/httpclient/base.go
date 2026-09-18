package httpclient

import (
	"net/http"
	"time"
)

type baseClient struct {
	httpClient *http.Client
	baseURL    string
}

func newBaseClient(baseURL string) baseClient {
	return baseClient{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}
