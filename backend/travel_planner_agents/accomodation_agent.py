import json

from pydantic import BaseModel, Field

try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import (
        TravelPlanState,
        AccommodationOption,
    )
except ModuleNotFoundError:
    from llm import llm
    from state import TravelPlanState, AccommodationOption


# Accommodation Agent
def accommodation_agent(state: TravelPlanState):

    prompt = f"""
You are the Accommodation Agent in a travel planning system.

Your job is to suggest practical accommodation options for the user's trip.

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

Return ONLY valid JSON.

Use exactly this structure:

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

Rules:
- Use exactly the key "accommodation_options".
- Each option must contain exactly: name, price_per_night, location, rating.
- Do not add extra fields.
- Do not repeat JSON keys.
- price_per_night must be a string.
- rating must be a string.
"""

    response = llm.invoke(prompt)

    data = json.loads(response.content)

    accommodation_options = [
        AccommodationOption(**option)
        for option in data["accommodation_options"]
    ]

    return {
        "accommodation_options": accommodation_options,
        "last_agent": "accommodation",
    }