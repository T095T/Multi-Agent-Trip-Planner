from pydantic import BaseModel, Field
try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import ItineraryDay, TravelPlanState
except ModuleNotFoundError:
    from llm import llm
    from state import ItineraryDay, TravelPlanState


class FullItinerary(BaseModel):
    itinerary: list[ItineraryDay] = Field(description="List of daily itinerary plans")


structured_llm = llm.with_structured_output(FullItinerary, method="json_mode")

# Itinerary Agent
def itinerary_agent(state: TravelPlanState):
    prompt = f"""
You are the Itinerary Agent in a travel planning system.

Your job is to create a practical day-by-day itinerary
using the information available in the current travel state.

You MUST return valid JSON matching this exact structure:

{{
  "itinerary": [
    {{
      "day": 1,
      "activities": ["Activity 1", "Activity 2"],
      "notes": "Optional notes"
    }}
  ]
}}

Important schema rules:
- Each itinerary item MUST contain "day".
- "day" must be an integer starting from 1.
- Do NOT use "date".
- Each item MUST contain "activities".
- "activities" must be a list of strings.
- "notes" is optional.
- Do not add fields outside the schema.

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

Create an itinerary covering every day of the trip.

For each day:
- Provide activities appropriate for that day.
- Consider the user's preferences.
- Use the destination research when useful.
- Avoid unrealistic scheduling.
- Keep the itinerary practical.

Return only the JSON object matching the required structure.
"""
    
    response = structured_llm.invoke(prompt)

    return {
        "itinerary": response.itinerary   
    }

