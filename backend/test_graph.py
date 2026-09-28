from langgraph.types import Command
from travel_planner_agents.graph import graph


initial_state = {
    "destination": "Goa",
    "start_date": "2026-10-10",
    "end_date": "2026-10-13",
    "budget": 25000,
    "preferences": [
        "beaches",
        "local food",
        "relaxed travel",
    ],
}

config = {
    "configurable": {
        "thread_id": "trip-goa-002"
    }
}


print("\nStarting travel planner...\n")

result = graph.invoke(
    initial_state,
    config=config,
)

print("\n" + "=" * 60)
print("GRAPH PAUSED FOR HUMAN REVIEW")
print("=" * 60)

print("\nInterrupt information:")
print(result)

print("\nCurrent draft plan:")
print(result.get("draft_plan"))

print("\nResuming graph with approval...\n")

final_result = graph.invoke(
    Command(
        resume={
            "approved": True,
            "feedback": None,
        }
    ),
    config=config,
)

print("\n" + "=" * 60)
print("GRAPH COMPLETED")
print("=" * 60)

print(final_result)