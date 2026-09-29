import json

try:
    from travel_planner_agents.llm import llm
    from travel_planner_agents.state import (
        TransportOption,
        TravelPlanState,
    )
except ModuleNotFoundError:
    from llm import llm
    from state import TransportOption, TravelPlanState


def transport_agent(state: TravelPlanState):
    prompt = f"""
You are the Transport Agent in a travel planning system.

Create transportation options for this trip.

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

Return ONLY valid JSON.

The JSON must be an object with exactly one field:
"transport_options"

"transport_options" must be a list.

Each item must contain:
- mode
- provider
- price
- duration

Valid mode values:
- flight
- train
- bus
- taxi
- car
- car_rental
- ferry
- other

Example format:

{{
    "transport_options": [
        {{
            "mode": "flight",
            "provider": "IndiGo",
            "price": "₹2000-₹4000",
            "duration": "2h 30m"
        }}
    ]
}}

Rules:
- Prices should be approximate strings/ranges.
- Duration should be an approximate string.
- Do not claim real-time availability.
- Do not invent exact booking information.
- Return ONLY the JSON object.
"""

    response = llm.invoke(prompt)

    data = json.loads(response.content)

    transport_options = [
        TransportOption(**option)
        for option in data["transport_options"]
    ]

    return {
        "transport_options": transport_options,
        "last_agent":"transport"
    }