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

Follow these rules:

1. If research is incomplete, choose "research".

2. Choose "itinerary" only after research is complete
   and the itinerary is incomplete.

3. Choose "accommodation" only after research is complete
   and accommodation options are incomplete.

4. Choose "transport" only after research is complete
   and transport options are incomplete.

5. Choose "aggregator" only when research, itinerary,
   accommodation, and transport are all complete.

6. Choose "end" if the final plan has been approved.

7. Do not choose an agent whose work is already complete.
"""

    decision = structured_llm.invoke(prompt)


    return {
        "next_agent": decision.next_agent
    }