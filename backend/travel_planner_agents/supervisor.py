from langchain_ollama import ChatOllama
from travel_planner_agents.state import TravelPlanState
from pydantic import BaseModel
from typing import Literal

class SupervisorDecision(BaseModel):
    next_agent: Literal["research","accommodation"]

llm = ChatOllama(
    model = "qwen2.5:7b",
    base_url="http://localhost:11434",

)
structured_llm = llm.with_structured_output(SupervisorDecision)

#Supervisor
def supervisor_node(state:TravelPlanState):
    prompt = f"""
    You are the supervisor of a travel planning system.
    Your job is to decide which specialist should work next.

    Available specialists:
    -research
    -accommodation

    User destination: {state.destination}
    Budget: {state.budget}
    Preferences: {state.preferences}
    Current research: {state.research}
    Current accommodation options: {state.accommodation_options}
    User feedback: {state.user_feedback}

    Choose the specialist that is most relevant to the current task

    Respond with ONLY one of:
    research
    accommodation

    
    
    """

    decision = structured_llm.invoke(prompt)

    return {
        "next_agent":decision.next_agent
    }