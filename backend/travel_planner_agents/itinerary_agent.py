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
    Your job is to create a practical day-by-day itinerary
using the information available in the current travel state.
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

Create an itinerary covering every day of the trip.

For each day:
- Provide activities appropriate for that day.
- Consider the user's preferences.
- Use the destination research when useful.
- Avoid unrealistic scheduling.
- Keep the itinerary practical.

Return an itinerary list with one ItineraryDay object for each travel day.
    """
    response = structured_llm.invoke(prompt)

    return {
        "itinerary": response.itinerary   
    }

