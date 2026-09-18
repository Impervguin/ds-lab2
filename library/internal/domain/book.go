package domain

import (
	"context"

	"github.com/google/uuid"
)

type BookCondition string

const (
	ConditionExcellent BookCondition = "EXCELLENT"
	ConditionGood      BookCondition = "GOOD"
	ConditionBad       BookCondition = "BAD"
)

type Book struct {
	ID      int64
	BookUID uuid.UUID
	Name    string
	Author  string
	Genre   string
}

type LibraryBook struct {
	Book           Book
	LibraryID      int64
	AvailableCount int
	Condition      BookCondition
}

type BookRepository interface {
	Get(ctx context.Context, bookUID uuid.UUID) (*Book, error)
	Create(ctx context.Context, book *Book) (*Book, error)
	Update(ctx context.Context, bookUID uuid.UUID, updFunc func(ctx context.Context, book *Book) error) (*Book, error)
	Delete(ctx context.Context, bookUID uuid.UUID) error
}

type LibraryBookRepository interface {
	ListByLibrary(ctx context.Context, libraryUID uuid.UUID, page, size int) ([]LibraryBook, error)
	Search(ctx context.Context, libraryUID, bookUID uuid.UUID, condition *BookCondition) ([]LibraryBook, error)
	Create(ctx context.Context, LibraryBook *LibraryBook) (*LibraryBook, error)
	Update(ctx context.Context, LibraryUID uuid.UUID, BookUID uuid.UUID, updFunc func(ctx context.Context, book *LibraryBook) error) (*LibraryBook, error)
}
