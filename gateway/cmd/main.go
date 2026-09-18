package main

import (
	"fmt"
	"os"

	"github.com/Impervguin/ds-lab2/gateway/internal/logger"
)

func main() {
	// The shared logging settings are installed first, before anything logs.
	if err := logger.Init(logger.FromEnv("gateway")); err != nil {
		fmt.Fprintf(os.Stderr, "configure logging: %v\n", err)
		os.Exit(1)
	}

	log := logger.Named("bootstrap")
	log.Info("gateway service starting")

	// TODO: build the service clients and serve the HTTP handlers.
}
