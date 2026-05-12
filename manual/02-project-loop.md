# The Project Loop

## What It Is

The Project Loop runs **once**, at the very start. It is not a development loop — it is a setup phase. Its job is to establish the foundations that all future Features will build on: what the project is, how it is structured, and what rules govern it.

Re-running the Project Loop implies a fundamental re-architecture — a change to goals, tech stack, or the nature of the users. This should be rare and deliberate.

## When to Run It

- When starting a new project from this boilerplate.
- When the existing foundations are so outdated that Features can no longer proceed without revisiting them.

## Your Role

The Project Loop requires the most human input of the three loops. The agent cannot fill in your goals, your users, or your constraints — those come from you.

## Lifecycle

### Step 1 — Provide the project brief

Tell the agent what you are building. Include:
- What the project does and who it is for
- Your preferred tech stack
- Any hard constraints (security requirements, performance budgets, coding standards)

You can do this conversationally. The agent will use it to draft the artefacts.

### Step 2 — Review `Project.md`

The agent produces a draft of `asef/Project.md`. Review it and correct anything that is wrong or missing. This is your project charter — it governs all downstream decisions.

Key things to check:
- Are the goals ranked correctly?
- Does the tech stack match what you actually want?
- Are the guardrails complete? (The agent will follow them — missing constraints will be missed.)

### Step 3 — Review `Architecture.md`

The agent produces a draft of `asef/Architecture.md`. This is the structural blueprint — components, how they connect, folder layout, and code style rules.

Key things to check:
- Are all the components you expect represented?
- Does the folder structure match where you want code to live?
- Are the code style guidelines specific enough to be actionable?

### Step 4 — Review `FlowDiagram.md`

The agent generates a Mermaid diagram from `Architecture.md`. This is a quick-reference for data and control flow. If the diagram looks wrong, the architecture description is likely ambiguous — go back to `Architecture.md`.

### Step 5 — Agent initialises the remaining artefacts

The agent creates empty versions of `Knowledge.md`, `Feats.json`, `Logger.ndjson`, and `Agent.md`. No action needed from you here.

### Step 6 — Approve

Once you are happy with `Project.md` and `Architecture.md`, tell the agent to proceed. The Project Loop closes and you move into Feature work.

## What Gets Produced

| Artefact | Who produces it |
|---|---|
| `asef/Project.md` | Agent drafts, human approves |
| `asef/Architecture.md` | Agent drafts, human approves |
| `asef/FlowDiagram.md` | Agent generates |
| `asef/Knowledge.md` | Agent initialises (empty) |
| `asef/Feats.json` | Agent initialises (empty) |
| `asef/Logger.ndjson` | Agent initialises |
| `Agent.md` | Agent initialises |

## After the Project Loop

`Project.md` is effectively read-only from this point. `Architecture.md` is not — it evolves as Features introduce new components or change how things connect. See the Feature Loop for how architecture changes are managed.
