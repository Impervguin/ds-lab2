from __future__ import annotations

from typing import Annotated, Final

from pydantic import BaseModel, ConfigDict, Field

MIN_STARS: Final[int] = 0
MAX_STARS: Final[int] = 100
DEFAULT_STARS: Final[int] = 10

def _clamp_stars(v: int) -> int:
    return min(max(v, MIN_STARS), MAX_STARS)

class Rating(BaseModel):
    model_config = ConfigDict(frozen=True)

    username: str = Field(min_length=1, max_length=80)
    stars: int = Field(ge=MIN_STARS, le=MAX_STARS)

    @staticmethod
    def initial(username: str) -> Rating:
        return Rating(username=username, stars=DEFAULT_STARS)
    
    def apply(self, delta: int) -> Rating:
        return Rating(username=self.username, stars=_clamp_stars(self.stars + delta))
