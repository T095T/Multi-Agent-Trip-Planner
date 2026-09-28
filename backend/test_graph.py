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
        "thread_id": "trip-goa-feedback-01"
    }
}


print("\nStarting travel planner...\n")

result = graph.invoke(
    initial_state,
    config=config,
)

print("\n" + "=" * 60)
print("HUMAN REVIEW")
print("=" * 60)

print(result.get("draft_plan"))

approval = input("\nApprove this plan? (yes/no): ").strip().lower()

if approval == "yes":
    feedback = None
    approved = True
else:
    approved = False
    feedback = input("What should be changed? ").strip()

final_result = graph.invoke(
    Command(
        resume={
            "approved": approved,
            "feedback": feedback,
        }
    ),
    config=config,
)

print("\n" + "=" * 60)
print("GRAPH COMPLETED")
print("=" * 60)

print(final_result)