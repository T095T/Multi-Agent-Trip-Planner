from fastapi import FastAPI, HTTPException
from typing import Optional
from pydantic import BaseModel,Field
from travel_planner_agents.graph import graph
from langgraph.types import Command
from uuid import uuid4
from travel_planner_agents.state import (
    DestinationResearch,
    ItineraryDay,
    AccommodationOption,
    TransportOption,
)
from fastapi.middleware.cors import CORSMiddleware

#Body for API request
class TripRequest(BaseModel):
    destination: str
    start_date: str
    end_date: str
    budget: Optional[float] = None
    preferences: list[str] = Field(default_factory=list)

class TripReviewRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

#Response Model
class TripResponse(BaseModel):
    thread_id: str
    status: str

    destination: str
    start_date: str
    end_date: str
    budget: Optional[float] = None
    preferences: list[str] = Field(default_factory=list)

    research: Optional[DestinationResearch] = None

    itinerary: list[ItineraryDay] = Field(
        default_factory=list
    )

    accommodation_options: list[AccommodationOption] = Field(
        default_factory=list
    )

    transport_options: list[TransportOption] = Field(
        default_factory=list
    )

    draft_plan: Optional[str] = None



app = FastAPI(
    title="Travel Planning Multi-Agent API",
    description="Multi-agent travel planning system powered by LangGraph",
    version="1.0.0",
)
#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Travel Planning Multi-Agent API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/trips")
def create_trip(request:TripRequest):
    initial_state = {
        "destination": request.destination,
        "start_date": request.start_date,
        "end_date": request.end_date,
        "budget": request.budget,
        "preferences": request.preferences,
    }

    config = {
        "configurable": {
            "thread_id": f"trip-{uuid4()}"
        }
    }

    result = graph.invoke(
        initial_state,
        config=config,
    )

    return {
        "thread_id": config["configurable"]["thread_id"],
        "status": "review_required",
        "result": result,
    }

@app.post("/trips/{thread_id}/review")
def review_trip(
    thread_id: str,
    request: TripReviewRequest,
):
    config = {
        "configurable": {
            "thread_id": thread_id
        }
    }

    result = graph.invoke(
        Command(
            resume={
                "approved": request.approved,
                "feedback": request.feedback,
            }
        ),
        config=config,
    )

    if request.approved:
        status = "completed"
    else:
        status = "review_required"

    return {
        "thread_id": thread_id,
        "status": status,
        "result": result,
    }


@app.get(
    "/trips/{thread_id}",
    response_model=TripResponse,
)
def get_trip(thread_id: str):
    config = {
        "configurable": {
            "thread_id": thread_id
        }
    }

    state = graph.get_state(config)

    if not state.values:
        raise HTTPException(
            status_code=404,
            detail="Trip not found",
        )

    values = state.values

    return TripResponse(
        thread_id=thread_id,
        status="review_required" if not values.get("is_approved") else "completed",
        destination=values["destination"],
        start_date=values["start_date"],
        end_date=values["end_date"],
        budget=values.get("budget"),
        preferences=values.get("preferences", []),
        research=values.get("research"),
        itinerary=values.get("itinerary", []),
        accommodation_options=values.get(
            "accommodation_options", []
        ),
        transport_options=values.get(
            "transport_options", []
        ),
        draft_plan=values.get("draft_plan"),
    )