#For Human Loop in the Pipeline

from langgraph.types import interrupt
from travel_planner_agents.state import TravelPlanState


def human_review(state:TravelPlanState):
    review = interrupt(
    {
        "type": "travel_plan_review",
        "draft_plan": state.draft_plan,
        "message": "Please review the travel plan.",
    }
    )
    return {
        "user_feedback": review.get("feedback"),
        "is_approved": review.get("is_approved"),
    }

