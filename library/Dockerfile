FROM golang:1.25-alpine AS build
WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /out/library ./cmd

FROM alpine:3.20
WORKDIR /app

COPY --from=build /out/library ./library
COPY --from=build /src/migrations ./migrations

EXPOSE 8060
ENTRYPOINT ["./library"]
