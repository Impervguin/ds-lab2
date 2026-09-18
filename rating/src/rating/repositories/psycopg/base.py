from typing import Any

from psycopg import AsyncConnection, AsyncCursor
from psycopg.rows import dict_row

from ..errors import RepositoryError


class PsycopgRepository:
    def __init__(self, connection: AsyncConnection) -> None:
        self._conn = connection

    def _cursor(self) -> AsyncCursor[dict[str, Any]]:
        return self._conn.cursor(row_factory=dict_row)

    @staticmethod
    def _require(row: dict[str, Any] | None, what: str) -> dict[str, Any]:
        if row is None:
            raise RepositoryError(f"Failed to create {what}")
        return row
