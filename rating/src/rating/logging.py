"""Process-wide logging settings.

Configured once, at start-up (:func:`configure_logging`); every module then asks
for its own named logger with :func:`get_logger` and shares those settings.
"""

from __future__ import annotations

import json
import logging
import sys
from dataclasses import dataclass
from datetime import UTC, datetime
from typing import Any, Final, Literal

LogFormat = Literal["json", "text"]

_RESERVED: Final[frozenset[str]] = frozenset(
    logging.LogRecord("", 0, "", 0, "", (), None).__dict__.keys()
) | {"asctime", "message", "taskName"}


@dataclass(frozen=True, slots=True)
class LoggerSettings:
    """Settings shared by every logger in the process."""

    level: str = "INFO"
    format: LogFormat = "json"
    service: str = "rating"


class JsonFormatter(logging.Formatter):
    """One JSON object per record, matching the other services of the system."""

    def __init__(self, service: str) -> None:
        super().__init__()
        self._service = service

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "time": datetime.fromtimestamp(record.created, tz=UTC).isoformat(),
            "level": record.levelname,
            "service": self._service,
            "logger": record.name,
            "msg": record.getMessage(),
        }
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        payload.update(
            {key: value for key, value in record.__dict__.items() if key not in _RESERVED}
        )
        return json.dumps(payload, default=str, ensure_ascii=False)


_settings: LoggerSettings | None = None


def configure_logging(settings: LoggerSettings | None = None) -> LoggerSettings:
    """Install the shared settings.

    Only the first call has an effect, so a stray import cannot reconfigure the
    process.
    """
    global _settings
    if _settings is not None:
        return _settings

    settings = settings or LoggerSettings()
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        JsonFormatter(settings.service)
        if settings.format == "json"
        else logging.Formatter(
            f"%(asctime)s %(levelname)-8s [{settings.service}] %(name)s: %(message)s"
        )
    )

    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(settings.level.upper())

    # Uvicorn installs its own handlers; make it use ours instead.
    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        uvicorn_logger = logging.getLogger(name)
        uvicorn_logger.handlers.clear()
        uvicorn_logger.propagate = True

    _settings = settings
    return settings


def get_logger(name: str) -> logging.Logger:
    """A logger for one module: own name, shared settings.

    >>> log = get_logger("repositories.rating")
    """
    if _settings is None:
        configure_logging()
    return logging.getLogger(name)


def settings() -> LoggerSettings:
    return _settings or LoggerSettings()
