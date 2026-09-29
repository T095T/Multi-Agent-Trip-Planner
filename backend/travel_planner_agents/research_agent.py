try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import TravelPlanState, DestinationResearch
except ModuleNotFoundError:
    from llm import llm
    from state import TravelPlanState, DestinationResearch



structured_llm = llm.with_structured_output(DestinationResearch)

# Research Agent
def research_agent(state: TravelPlanState):
    prompt = f"""
You are a senior research agent for a travel planning system.

Research the following destination thoroughly:
Destination: {state.destination}

Trip details:
- Travel dates: {state.start_date} to {state.end_date}
- Budget: {state.budget}
- User preferences: {state.preferences}

Provide comprehensive research covering:
1. Overview: Destination summary and vibe
2. Weather: Expected weather during the travel dates
3. Top attractions: Key places to visit matching preferences
4. Visa requirements: General visa and entry notes
5. Safety notes: Practical safety and health advice
"""

    research = structured_llm.invoke(prompt)

    return {
        "research": research,
        "last_agent": "research"
    }

