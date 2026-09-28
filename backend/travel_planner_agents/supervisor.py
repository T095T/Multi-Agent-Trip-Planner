try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import TravelPlanState
except ModuleNotFoundError:
    from llm import llm
    from state import TravelPlanState
from pydantic import BaseModel
from typing import Literal

class SupervisorDecision(BaseModel):
    next_agent: Literal[
        "research",
        "itinerary",
        "accommodation",
        "transport",
        "aggregator",
        "end",
    ]
    revision_requested: bool = False


structured_llm = llm.with_structured_output(SupervisorDecision, method="json_mode")

#Supervisor
def supervisor_node(state: TravelPlanState):

    completion_status = {
        "research": state.research is not None,
        "itinerary": len(state.itinerary) > 0,
        "accommodation": len(state.accommodation_options) > 0,
        "transport": len(state.transport_options) > 0,
        "draft_plan": state.draft_plan is not None,
    }

    prompt = f"""
You are the Supervisor of a multi-agent travel planning system.

Your job is to decide which specialist should work next.
Respond in valid JSON format matching the schema.

Available agents:


- research: researches the destination
- itinerary: creates the day-by-day itinerary
- accommodation: suggests accommodation options
- transport: suggests transport options
- aggregator: combines all completed work into the final draft plan
- end: finishes the workflow after the plan has been approved

User destination:
{state.destination}

Travel dates:
{state.start_date} to {state.end_date}

Budget:
{state.budget}

User preferences:
{state.preferences}

Current completion status:
{completion_status}

Current research:
{state.research}

Current itinerary:
{state.itinerary}

Current accommodation options:
{state.accommodation_options}

Current transport options:
{state.transport_options}

Current draft plan:
{state.draft_plan}

User feedback:
{state.user_feedback}


If user feedback is present, analyze it and determine which specialist
agent needs to rerun.

Examples:

- Feedback about destination information, attractions, weather,
  visa, or safety → research
- Feedback about daily activities, schedule, pacing, or itinerary → itinerary
- Feedback about hotels, accommodation, rooms, or stay → accommodation
- Feedback about flights, trains, buses, taxis, or transportation → transport

If feedback affects multiple areas, choose the first specialist
that needs to be updated. The workflow can handle additional
revisions later.

Follow these rules:

1. If the final plan has been approved, choose "end".

2. If user feedback is present and the final plan has NOT been
   approved, choose the specialist agent whose output needs
   to be revised based on the feedback.

   In this case, set revision_requested to true.

3. If there is no user feedback, set revision_requested to false.

4. Do not choose an agent whose work is already complete
   unless user feedback specifically requires that agent
   to revise its work.

5. Return only the next agent.
"""

    decision = structured_llm.invoke(prompt)


    return {
        "next_agent": decision.next_agent,
        "revision_requested":decision.revision_requested
    }