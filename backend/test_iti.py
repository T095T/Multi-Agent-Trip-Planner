from travel_planner_agents.state import TravelPlanState
from travel_planner_agents.research_agent import research_agent
from travel_planner_agents.itinerary_agent import itinerary_agent


state = TravelPlanState(
    destination="Paris",
    start_date="2026-10-10",
    end_date="2026-10-15",
    budget=100000,
    preferences=["food", "history"],
)


# First run the Research Agent
research_result = research_agent(state)

state.research = research_result["research"]


# Then run the Itinerary Agent
itinerary_result = itinerary_agent(state)


print("\nItinerary result:")
print(itinerary_result["itinerary"])

print("\nType:")
print(type(itinerary_result["itinerary"]))

print("\nFirst day:")
print(itinerary_result["itinerary"][0])