from travel_planner_agents.state import TravelPlanState
from travel_planner_agents.supervisor import supervisor_node
from travel_planner_agents.research_agent import research_agent
from travel_planner_agents.itinerary_agent import itinerary_agent


print("=" * 60)
print("1. INITIALIZING TRAVEL PLAN STATE")
print("=" * 60)
state = TravelPlanState(
    destination="Paris",
    start_date="2026-10-10",
    end_date="2026-10-15",
    budget=100000,
    preferences=["food", "history"],
)

print(f"Destination : {state.destination}")
print(f"Research    : {state.research}")
print(f"Itinerary   : {state.itinerary}")
print(f"Next Agent  : {state.next_agent}\n")


print("=" * 60)
print("2. STEP 1: SUPERVISOR DECISION")
print("=" * 60)
sup_result = supervisor_node(state)
state.next_agent = sup_result["next_agent"]
print(f"--> Supervisor chose next_agent: {state.next_agent}\n")


print("=" * 60)
print("3. STEP 2: EXECUTING RESEARCH AGENT")
print("=" * 60)
research_res = research_agent(state)

# Update state with research output
state.research = research_res["research"]

print("State updated! Current research object:")
print(f"Overview        : {state.research.overview}")
print(f"Visa Req        : {state.research.visa_requirements}")
print(f"Safety Notes    : {state.research.safety_notes}\n")


print("=" * 60)
print("4. STEP 3: SUPERVISOR DECISION AFTER RESEARCH")
print("=" * 60)
sup_result_2 = supervisor_node(state)
state.next_agent = sup_result_2["next_agent"]
print(f"--> Supervisor now chose next_agent: {state.next_agent}\n")


print("=" * 60)
print("5. STEP 4: EXECUTING ITINERARY AGENT")
print("=" * 60)
iti_res = itinerary_agent(state)

# Update state with itinerary output
state.itinerary = iti_res["itinerary"]

print(f"State updated! Total Days Planned: {len(state.itinerary)}")
print(f"First Day Plan: {state.itinerary[0]}\n")


print("=" * 60)
print("6. FINAL STATE SUMMARY")
print("=" * 60)
print(state)
