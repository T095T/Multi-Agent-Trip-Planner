from langchain_ollama import ChatOllama
from travel_planner_agents.state import TravelPlanState,DestinationResearch


llm = ChatOllama(
    model="qwen2.5:7b",
    base_url="http://localhost:11434",
)


structured_llm = llm.with_structured_output(DestinationResearch)

#Research Agent
def research_agent(state:TravelPlanState):
    prompt=f"""
    You are a senior research agent for a travel planning system.
    Research the following destination: {state.destination}
    Use the following parameters:
    start_date: {state.start_date}
    end_date: {state.end_date}
    budget: {state.budget}
    preferences: {state.preferences}
    
    
    
    """
    research = structured_llm.invoke(prompt)

    return {
        "research":research
    }
