#LANGGRAPH LOGIC    

from langgraph.graph import StateGraph, START, END

try:
    from travel_planner_agents.state import TravelPlanState
    from travel_planner_agents.supervisor import supervisor_node
    from travel_planner_agents.research_agent import research_agent
    from travel_planner_agents.itinerary_agent import itinerary_agent
    from travel_planner_agents.aggregator_agent import aggregator_node
    from travel_planner_agents.transport_agent import transport_agent
    from travel_planner_agents.accomodation_agent import accommodation_agent
except ModuleNotFoundError:
    from state import TravelPlanState
    from supervisor import supervisor_node
    from research_agent import research_agent
    from itinerary_agent import itinerary_agent
    from aggregator_agent import aggregator_node
    from transport_agent import transport_agent
    from accomodation_agent import accommodation_agent


def route_from_supervisor(state: TravelPlanState):

    return state.next_agent


graph_builder = StateGraph(TravelPlanState)


# Nodes
graph_builder.add_node("supervisor", supervisor_node)
graph_builder.add_node("research", research_agent)
graph_builder.add_node("itinerary", itinerary_agent)
graph_builder.add_node("accommodation", accommodation_agent)
graph_builder.add_node("transport", transport_agent)
graph_builder.add_node("aggregator", aggregator_node)


# Start
graph_builder.add_edge(START, "supervisor")


# Supervisor routing
graph_builder.add_conditional_edges(
    "supervisor",
    route_from_supervisor,
    {
        "research": "research",
        "itinerary": "itinerary",
        "accommodation": "accommodation",
        "transport": "transport",
        "aggregator": "aggregator",
        "end": END,
    },
)


# Workers return to supervisor
graph_builder.add_edge("research", "supervisor")
graph_builder.add_edge("itinerary", "supervisor")
graph_builder.add_edge("accommodation", "supervisor")
graph_builder.add_edge("transport", "supervisor")


#aggregator is the final stage of this pipeline
graph_builder.add_edge("aggregator",END)


graph = graph_builder.compile()