try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import TravelPlanState
except ModuleNotFoundError:
    from llm import llm
    from state import TravelPlanState


def aggregator_node(state: TravelPlanState):
    prompt = f"""
You are the Aggregator Agent in a multi-agent travel planning system.

Your job is to combine the outputs from all specialist agents
into one clear and practical travel plan.

Destination:
{state.destination}

Travel dates:
{state.start_date} to {state.end_date}

Budget:
{state.budget}

User preferences:
{state.preferences}

Destination research:
{state.research}

Day-by-day itinerary:
{state.itinerary}

Accommodation options:
{state.accommodation_options}

Transport options:
{state.transport_options}

Create a structured draft travel plan with the following sections:

1. Trip overview
2. Destination highlights
3. Day-by-day itinerary
4. Accommodation recommendations
5. Transport recommendations
6. Budget considerations
7. Important practical notes

Do not invent exact bookings or guarantees.
Clearly indicate when information is approximate.

Return only the final travel plan in readable text.
"""

    response = llm.invoke(prompt)

    return {
        "draft_plan": response.content
    }