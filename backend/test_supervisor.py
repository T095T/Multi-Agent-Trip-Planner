from travel_planner_agents.state import TravelPlanState
from travel_planner_agents.supervisor import supervisor_node


state = TravelPlanState(
    destination="Paris",
    start_date="2026-10-10",
    end_date="2026-10-15",
    budget=100000,
    preferences=["food", "history"],
)


result = supervisor_node(state)

print("\nSupervisor decision:")
print(result["next_agent"])