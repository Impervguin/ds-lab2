package library

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
)

type LibraryHandler struct {
	validate *validator.Validate
}

func NewLibraryHandler() *LibraryHandler {
	return &LibraryHandler{
		validate: validator.New(),
	}
}

func (h *LibraryHandler) Register(r chi.Router) {
	r.Route("/api/v1/libraries", func(r chi.Router) {})
}
