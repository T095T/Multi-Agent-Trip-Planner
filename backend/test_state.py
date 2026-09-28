from travel_planner_agents.state import TravelPlanState


state = TravelPlanState(
    destination="Paris",
    start_date="2026-10-10",
    end_date="2026-10-15",
    budget=100000,
    preferences=["food", "history"],
)


print("STATE:")
print(state)

print("\nSTATE TYPE:")
print(type(state))