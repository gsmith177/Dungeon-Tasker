# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, widgets

app = FastAPI(title="DND Companion API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(widgets.router, prefix="/api")


# Entry point for running via `python -m app.main`
def create_app() -> FastAPI:
    return app
