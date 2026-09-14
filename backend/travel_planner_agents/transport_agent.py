from pydantic import BaseModel, Field
try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import ItineraryDay, TravelPlanState, TransportOption
except ModuleNotFoundError:
    from llm import llm
    from state import ItineraryDay, TravelPlanState, TransportOption


class TransportResponse(BaseModel):
    transport_options: list[TransportOption] = Field(
        description="List of transport options"
    )



structured_llm = llm.with_structured_output(TransportResponse, method="json_mode")

# Transport Agent
def transport_agent(state: TravelPlanState):
    prompt = f"""
    You are the Transport Agent in a travel planning system.

Your job is to suggest practical transport options
for the user's trip.

Respond in valid JSON format matching the schema.


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

Suggest several transport options.

For each option, provide:
- Mode (flight, train, bus, taxi, car, other)
- Provider (if applicable)
- Approximate price
- Duration

Do not claim real-time availability.
Do not invent exact booking information.
Use approximate values when exact information is unavailable.

Return the transport options.
    """
    response = structured_llm.invoke(prompt)

    return {
        "transport_options": response.transport_options  
    }

