from typing import Optional, Literal, Union

from pydantic import BaseModel, Field
from langgraph.graph import add_messages
from typing_extensions import Annotated


#Research Node
class DestinationResearch(BaseModel):
    overview: Optional[str]=None
    weather : Optional[str]=None
    top_attractions: list[str]=None
    visa_requirements:Optional[str]=None
    safety_notes:Optional[str]=None


#Itinerary node
class ItineraryNode(BaseModel):
    day:int
    activities:list[str]
    notes: Optional[str]=None


class AccommodationOption(BaseModel):
    name:str
    price_per_night:Optional[float]=None
    location:Optional[str]=None
    rating:Optional[float]=None


class TransportOption(BaseModel):
    mode: Literal["flight","train","bus","taxi","car","other"]
    provider: Optional[str]=None
    price: Optional[str]=None
    duration: Optional[str]=None



class TravelPlanState(BaseModel):
    #User input
    destination:str
    start_date:str
    end_date:str
    budget: Optional[Union[str, int, float]] = None
    preferences:list[str] = Field(default_factory=list)

    next_agent: Optional[
        Literal[
            "research",
            "itinerary",
            "accommodation",
            "transport",
            "aggregator",
            "end"
        ]
    ]= None

    #Worker outputs
    research:Optional[DestinationResearch]=None
    itinerary:Optional[list[ItineraryNode]]=Field(default_factory=list)
    accommodation_options:Optional[list[AccommodationOption]]=Field(default_factory=list)
    transport_options:Optional[list[TransportOption]]=Field(default_factory=list)


    #Aggregator plan
    draft_plan: Optional[str]=None

    #Review Loop
    user_feedback:Optional[str]=None
    is_approved:bool=False

    #Conversation History
    messages:  Annotated[list,add_messages]=Field(default_factory=list)

    
    