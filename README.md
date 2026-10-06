# ✈️ TripWise — Travel Planning Multi-Agent System

TripWise is an AI-powered travel planning application built using a **multi-agent architecture**. Instead of relying on a single LLM to generate an entire travel plan, TripWise uses multiple specialized agents, each responsible for a specific part of the planning process.

A **Supervisor Agent** orchestrates the workflow, specialist agents handle individual planning tasks, and an **Aggregator Agent** combines their outputs into a complete travel plan.

The system also supports **Human-in-the-Loop review**, allowing users to approve the generated plan or request changes. User feedback is routed back to the appropriate agent so that only the required part of the plan is revised.

---

## 🎯 Main Purpose

The main purpose of TripWise is to demonstrate how **stateful multi-agent AI workflows** can be designed and orchestrated using **LangGraph**.

The system handles:

- Destination research
- Day-by-day itinerary planning
- Accommodation recommendations
- Transportation recommendations
- Final travel plan generation
- Human review and approval
- Targeted revisions based on user feedback

The project combines a **LangGraph-based AI backend**, **FastAPI REST API**, and **React frontend** into a complete full-stack AI application.

---

# 🤖 Multi-Agent Architecture

```text
                         ┌─────────────┐
                         │    USER     │
                         └──────┬──────┘
                                │
                                ▼
                       ┌────────────────┐
                       │   SUPERVISOR   │
                       │     AGENT      │
                       └───────┬────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌───────────────┐
       │  RESEARCH   │  │  ITINERARY  │  │ ACCOMMODATION │
       │    AGENT    │  │    AGENT    │  │     AGENT     │
       └──────┬──────┘  └──────┬──────┘  └───────┬───────┘
              │                │                 │
              └────────────────┼─────────────────┘
                               │
                               ▼
                       ┌──────────────┐
                       │  TRANSPORT   │
                       │     AGENT    │
                       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │  AGGREGATOR  │
                       │     AGENT    │
                       └──────┬───────┘
                              │
                              ▼
                       ┌──────────────┐
                       │ HUMAN REVIEW │
                       └──────┬───────┘
                              │
                     ┌────────┴────────┐
                     │                 │
                  APPROVE           REJECT
                     │                 │
                     ▼                 ▼
                    END           SUPERVISOR
                                      │
                                      ▼
                               Targeted Agent
                                      │
                                      ▼
                                  Aggregator
                                      │
                                      ▼
                                Human Review

```
---

## 🤖 Agents

### Supervisor Agent
Coordinates the overall workflow and decides which specialist agent should execute next based on the current travel plan state and user feedback.

### Research Agent
Researches the destination and provides information such as attractions, weather, visa requirements, safety notes, and a general destination overview.

### Itinerary Agent
Creates a structured day-by-day itinerary based on the destination, travel dates, budget, preferences, and available research.

### Accommodation Agent
Suggests suitable accommodation options based on the destination, budget, travel dates, and user preferences.

### Transport Agent
Generates transportation options such as flights, trains, buses, taxis, and car rentals, including estimated price and duration where available.

### Aggregator Agent
Combines the outputs from the research, itinerary, accommodation, and transport agents into one complete travel plan for the user to review.

### Human Review
Allows the user to approve the generated plan or provide feedback. Feedback is routed back through the Supervisor to the relevant specialist agent for revision.

---

## 🛠️ Tech Stack

### Backend
- **Python** — Core backend language
- **LangGraph** — Multi-agent workflow orchestration and state management
- **LangChain** — LLM integration and agent components
- **Groq** — LLM inference
- **GPT-OSS-20B** — Language model used by the agents
- **Pydantic** — Structured state and data validation
- **FastAPI** — REST API backend
- **Uvicorn** — ASGI server

### Frontend
- **React** — Frontend application
- **Vite** — Frontend development and build tooling
- **React Router** — Client-side routing
- **Tailwind CSS** — UI styling
- **Lucide React** — Icons

### Architecture
- **Multi-Agent Architecture** — Separate specialized agents for different travel-planning tasks
- **LangGraph StateGraph** — Controls agent execution and conditional routing
- **Human-in-the-Loop** — Allows users to review and revise generated plans
- **InMemorySaver** — LangGraph checkpointing for maintaining workflow state
- **REST API** — Communication between the React frontend and FastAPI backend
