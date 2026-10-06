from pydantic import BaseModel, Field

try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import (
        TransportOption,
        TravelPlanState,
    )
except ModuleNotFoundError:
    from llm import llm
    from state import TransportOption, TravelPlanState


class TransportResponse(BaseModel):
    transport_options: list[TransportOption] = Field(
        description="List of transport options"
    )


structured_llm = llm.with_structured_output(TransportResponse)


def transport_agent(state: TravelPlanState):
    prompt = f"""
You are the Transport Agent in a travel planning system.

Create transportation options for this trip.

Destination:
{state.destination}

Travel dates:
{state.start_date} to {state.end_date}

Budget:
{state.budget}

User preferences:
{state.preferences}

Destination research:
{state.research}

Valid mode values:
- flight
- train
- bus
- taxi
- car
- car_rental
- ferry
- other

Rules:
- Prices should be approximate strings/ranges.
- Duration should be an approximate string.
- Do not claim real-time availability.
- Do not invent exact booking information.
"""

    response = structured_llm.invoke(prompt)

    return {
        "transport_options": response.transport_options,
        "last_agent": "transport"
    }