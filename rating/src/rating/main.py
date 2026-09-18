import os
from contextlib import asynccontextmanager

from fastapi import FastAPI

from rating.api.health import health_router
from rating.api.routes import rating_router
from rating.di import Container
from rating.logging import LoggerSettings, configure_logging, get_logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    container: Container = app.state.container
    await container.pool().open()
    yield
    await container.pool().close()


def create_app() -> FastAPI:
    # The shared logging settings are installed first, before anything logs.
    configure_logging(
        LoggerSettings(
            level=os.getenv("LOG_LEVEL", "INFO"),
            format=os.getenv("LOG_FORMAT", "json"),  # type: ignore[arg-type]
            service=os.getenv("SERVICE_NAME", "rating"),
        )
    )
    get_logger("bootstrap").info("creating application")

    container = Container()
    container.wire(modules=["rating.api.routes"])

    app = FastAPI(title="Rating Service", lifespan=lifespan)
    app.state.container = container
    app.include_router(health_router)
    app.include_router(rating_router)
    return app


app = create_app()
