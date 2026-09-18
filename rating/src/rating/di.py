from dependency_injector import containers, providers

from rating.config import get_settings
from rating.infrastructure.postgres.pool import PostgresPool
from rating.infrastructure.postgres.unit_of_work import PostgresUnitOfWork
from rating.use_cases.get_rating import GetRatingUseCase
from rating.use_cases.update_rating import UpdateRatingUseCase


class Container(containers.DeclarativeContainer):
    config = providers.Singleton(get_settings)

    pool = providers.Singleton(PostgresPool, dsn=config.provided.dsn)

    uow = providers.Factory(PostgresUnitOfWork, pool=pool)

    get_rating_use_case = providers.Factory(GetRatingUseCase, uow_factory=uow.provider)
    update_rating_use_case = providers.Factory(UpdateRatingUseCase, uow_factory=uow.provider)
