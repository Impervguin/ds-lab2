from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, Header, HTTPException, status


rating_router = APIRouter(prefix="/api/v1/rating")
