# Travel Planning Multi-Agent System — 1 Week Build Plan

## Project Summary

A multi-agent travel planning system orchestrated with **LangGraph**, using a
**Supervisor pattern**: a supervisor agent routes work to four specialist
worker agents (Research, Itinerary, Accommodation, Transport), all reading
and writing to a shared state. Once all agents complete, a Response
Aggregator compiles a full draft travel plan, which is shown to the user for
review. If the user requests changes, the flow routes back through the
Supervisor to re-run only the relevant agent(s), rather than restarting
everything.

**Tech stack:**
- **LLM:** Local Ollama, model `qwen2.5:7b`, running on Mac (M5 chip),
  accessed via `langchain-ollama` at `http://localhost:11434`
  (no external API costs, no API keys needed)
- **Orchestration:** LangGraph (Python)
- **Backend:** FastAPI (REST endpoints + WebSocket for real-time updates)
- **Frontend:** React
- **Persistence:** PostgreSQL or MongoDB (storing plans, versions, feedback)
- **Observability:** LangSmith or basic structured logging
- **External tools (optional/stretch):** Weather API, Google Places API,
  Google Maps/Directions API — wired in as tools the worker agents can call

**Architecture recap:**
- Supervisor Agent — understands the user's request, decides which agent(s)
  to invoke, and re-routes based on user feedback
- 4 worker agents — Research, Itinerary, Accommodation, Transport — each
  writes its output into shared LangGraph state
- Shared State — single Pydantic schema holding user inputs, all agent
  outputs, routing decisions, and review/approval status
- Response Aggregator — compiles all worker outputs into one coherent draft
  plan for the user
- Human review checkpoint — sits *after* the aggregator (not mid-planning);
  user approves or requests changes, which loops back through the Supervisor

---

## Phase 1 — Foundations (Days 1–2)

**Goal:** Environment fully working, LLM connected, basic project skeleton
in place. Nothing agentic yet — just plumbing.

- [ ] Set up Python project (`venv`, install `langgraph`, `langchain-ollama`,
      `pydantic`, `fastapi`, `uvicorn`)
- [ ] Confirm Ollama is running locally (`ollama serve`) and `qwen2.5:7b` is
      pulled and responding via `langchain-ollama`
- [ ] Write a tiny standalone script that calls the local Ollama model via
      LangChain and prints a response — sanity check before any graph logic
- [ ] Define the shared `TravelPlanState` Pydantic schema (user inputs,
      per-agent output fields, `next_agent` routing field, `user_feedback`,
      `is_approved`)
- [ ] Set up FastAPI skeleton with a single placeholder `/plan` POST endpoint
      (not wired to the graph yet)
- [ ] Initialize git repo, README, `.env.example` (even though there's no
      external API key needed yet, keep this ready for Phase 4 tool APIs)

**End of Phase 1 checkpoint:** You can call the local LLM from Python code,
and your state schema + FastAPI skeleton exist, even if empty.

---

## Phase 2 — Core Agent Graph (Days 3–4)

**Goal:** The full LangGraph flow runs end-to-end for a single pass — no
review loop yet, just Supervisor → 4 agents → Aggregator → final draft.

- [ ] Implement the Supervisor node — starts with **simple deterministic
      routing** (e.g., "if research is empty, route to research; else if
      itinerary is empty, route to itinerary...") rather than an LLM-based
      routing decision, to get the graph working first
- [ ] Implement the 4 worker agent nodes:
  - Research agent — prompts the LLM for destination overview, weather
    notes, visa/safety info, top attractions
  - Itinerary agent — prompts the LLM for a day-wise schedule using
    research output + user preferences/dates
  - Accommodation agent — prompts the LLM for hotel/stay suggestions
    given budget and destination
  - Transport agent — prompts the LLM for flight/train/bus options
- [ ] Wire all nodes into a `StateGraph`, with conditional edges driven by
      `next_agent`
- [ ] Implement the Response Aggregator node — combines all worker outputs
      into one readable draft plan (stored in `draft_plan`)
- [ ] Test the full graph end-to-end via a script (no FastAPI yet) with a
      hardcoded sample request (e.g., "5 days in Tokyo, budget $1500,
      interested in food and culture")
- [ ] Add basic structured logging so you can see each node's input/output
      as the graph runs (this will matter a lot for debugging prompts)

**End of Phase 2 checkpoint:** Running the graph on a hardcoded input
produces a complete, coherent draft travel plan printed to console.

---

## Phase 3 — Review Loop + API Integration (Days 5–6)

**Goal:** Add the human-in-the-loop review step, connect the graph to
FastAPI, and get a working request/response cycle from an API call.

- [ ] Add the review checkpoint using LangGraph's `interrupt()` after the
      Aggregator node — graph pauses, returns `draft_plan` to the caller
- [ ] Implement the resume path: when the user sends feedback
      (`user_feedback` field), the graph resumes, Supervisor decides which
      agent(s) need to re-run based on that feedback, and the Aggregator
      re-compiles the plan
- [ ] Implement the "approved" path — if `is_approved` is set, the graph
      ends and the final plan is returned/stored
- [ ] Wire the graph into FastAPI:
  - `POST /plan` — starts a new planning session with initial user input
  - `POST /plan/{id}/feedback` — submits feedback or approval, resumes
    the graph
  - `GET /plan/{id}` — fetches current state/draft
- [ ] Add persistence — store each plan (and its state) in PostgreSQL or
      MongoDB so sessions survive server restarts
- [ ] Test the full loop via `curl`/Postman: create a plan, request a
      change, confirm only the relevant agent re-ran (check logs), then
      approve

**End of Phase 3 checkpoint:** You can hit the API, get a draft plan back,
submit a revision request, see it update correctly, and approve it —
entirely through HTTP calls, no frontend yet.

---

## Phase 4 — Polish, Frontend, and Resume-Readiness (Day 7)

**Goal:** Make it demoable and describable — a minimal working UI, and the
project artifacts (README, diagram, write-up) that make this resume-ready.

- [ ] Build a minimal React frontend:
  - Form to submit destination/dates/budget/preferences
  - Display the draft plan
  - Approve / request-changes controls that call the feedback endpoint
- [ ] (Optional stretch) Add WebSocket support so the frontend shows live
      updates as each agent completes, rather than waiting for the whole
      graph to finish silently
- [ ] Add LangSmith tracing (or clean structured logs) so you can visually
      show the agent execution trace — genuinely useful both for debugging
      and for demoing "here's what happened under the hood" in an interview
- [ ] Write the README: architecture diagram, setup instructions (including
      the local Ollama dependency), and a short explanation of the
      Supervisor pattern and review loop design decisions
- [ ] Prepare your "walk me through this project" talking points:
  - Why Supervisor pattern over a fixed pipeline
  - How shared state avoids agents working in isolation
  - Why the review loop sits after the aggregator, not mid-planning
  - What happens on a partial failure (if you have time, add basic retry
    logic to one agent as a talking point)

**End of Phase 4 checkpoint:** A working demo — UI + backend + local LLM —
plus a README and talking points ready for your resume/portfolio and
interviews.

---

## Notes on using local Ollama throughout

- Model: `qwen2.5:7b`, chosen for stronger structured/JSON output reliability
  compared to similarly-sized alternatives, and solid agentic benchmark
  performance
- No API costs or rate limits to worry about — you can iterate freely,
  which matters since Phase 2 involves a lot of prompt trial-and-error
- Expect roughly 20–30 seconds per agent LLM call on the M5 — a full graph
  run (4 agents + aggregator, possibly a re-run after feedback) can take a
  couple of minutes; keep this in mind when designing the frontend loading
  state in Phase 4
- If any single agent's output quality is weak, it's worth testing a larger
  local model (e.g. `qwen2.5:14b`) for just that agent before assuming the
  architecture is the problem — isolate whether it's a model-size or a
  prompt-design issue
