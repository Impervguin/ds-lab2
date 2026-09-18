package main

import (
	"fmt"
	"os"

	"github.com/Impervguin/ds-lab2/library/internal/logger"
)

func main() {
	// The shared logging settings are installed first, before anything logs.
	if err := logger.Init(logger.FromEnv("library")); err != nil {
		fmt.Fprintf(os.Stderr, "configure logging: %v\n", err)
		os.Exit(1)
	}

	log := logger.Named("bootstrap")
	log.Info("library service starting")

	// TODO: open the database pool, run migrations, serve the HTTP handlers.
}
