from pydantic import BaseModel, Field
import json
try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import ItineraryDay, TravelPlanState, AccommodationOption
except ModuleNotFoundError:
    from llm import llm
    from state import ItineraryDay, TravelPlanState, AccommodationOption


class AccommodationResponse(BaseModel):
    accommodation_options: list[AccommodationOption] = Field(
        description="List of accommodation options"
    )



structured_llm = llm.with_structured_output(AccommodationResponse)

# Accommodation Agent
def accommodation_agent(state: TravelPlanState):
    prompt = f"""
    You are the Accommodation Agent in a travel planning system.

Your job is to suggest practical accommodation options
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

Suggest several accommodation options.

For each option, provide:
- Name
- Approximate price per night
- Location
- Rating, if available

Do not claim real-time availability.
Do not invent exact booking information.
Use approximate values when exact information is unavailable.

Return ONLY valid JSON in exactly this format:

{{
  "accommodation_options": [
    {{
      "name": "string",
      "price_per_night": "string",
      "location": "string",
      "rating": "string"
    }}
  ]
}}

Do not return numeric values for price or rating.
Do not add currency symbols outside the string.

Return the accommodation options.
    """
    response = llm.invoke(prompt)

    data = json.loads(response.content)

    accommodation_response = AccommodationResponse.model_validate(data)

    return {
        "accommodation_options": accommodation_response.accommodation_options,
        "last_agent": "accommodation",
    }

