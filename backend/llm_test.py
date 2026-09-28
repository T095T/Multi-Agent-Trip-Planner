from travel_planner_agents.llm import llm


response = llm.invoke(
    "Give me a short 3-day travel itinerary for Paris."
)

print(response.content)