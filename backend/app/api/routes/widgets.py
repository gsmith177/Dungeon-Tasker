# backend/app/api/routes/widgets.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter(tags=["widgets"], prefix="/widgets")


class WidgetConfig(BaseModel):
    id: str
    type: str
    x: int
    y: int
    w: int
    h: int
    props: Dict[str, Any] = {}


class LayoutConfig(BaseModel):
    id: str
    name: str
    widgets: List[WidgetConfig]


# In-memory store for now; swap for DB later
_memory_layouts: Dict[str, LayoutConfig] = {}


@router.get("/", response_model=List[LayoutConfig])
async def list_layouts():
    return list(_memory_layouts.values())


@router.post("/", response_model=LayoutConfig)
async def save_layout(layout: LayoutConfig):
    _memory_layouts[layout.id] = layout
    return layout
