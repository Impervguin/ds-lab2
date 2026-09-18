from collections.abc import Callable
from types import TracebackType
from typing import Protocol, Self, runtime_checkable

from rating.domain import Rating


@runtime_checkable
class RatingRepository(Protocol):
    async def get(self, username: str) -> Rating | None: ...

    async def update(self, username: str, delta: int) -> None: ...


@runtime_checkable
class UnitOfWork(Protocol):
    async def __aenter__(self) -> Self: ...

    async def __aexit__(
        self,
        exc_type: type[BaseException] | None,
        exc: BaseException | None,
        tb: TracebackType | None,
    ) -> bool | None: ...

    async def rollback(self) -> None: ...


UnitOfWorkFactory = Callable[[], UnitOfWork]
