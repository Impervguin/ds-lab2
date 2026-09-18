from psycopg import AsyncConnection
from psycopg.rows import NamedTupleCursor

from ..protocols import RatingRepository
from .base import PsycopgRepository


class PsycopgRatingRepository(PsycopgRepository, RatingRepository):
    pass
