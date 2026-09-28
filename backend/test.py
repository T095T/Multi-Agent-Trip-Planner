from travel_planner_agents.state import TravelPlanState
from travel_planner_agents.research_agent import research_agent


state = TravelPlanState(
    destination="Paris",
    start_date="2026-10-10",
    end_date="2026-10-15",
    budget=100000,
    preferences=["food", "history"],
)

result = research_agent(state)

print("\nResearch result:")
print(result["research"])

print("\nType:")
print(type(result["research"]))