# Artefacts Reference

Every artefact in ASEF has a specific purpose, a specific author, and a specific moment when it is written. This page is the reference for all of them.

---

## Root

### `Agent.md`

- **Location**: `./`
- **Written by**: Agent (at Project Loop init)
- **Purpose**: The agent's entry point. Every agent session begins here. Contains the artefact registry, loop lifecycles, developer request pathways, and standing policies.
- **You interact with it when**: You want to understand what the agent will do in a given situation, or update policies.

---

## Project-level (`asef/`)

### `Project.md`

- **Written by**: Agent drafts, human approves
- **Purpose**: The project charter. Sets the goals, tech stack, users, and hard constraints that all downstream decisions must respect.
- **Format**: Labelled list under sections: Metadata, Goals, Tech Stack, Users & Personas, Rules & Guardrails.
- **After Project Loop**: Effectively read-only. Changes here imply a fundamental re-architecture.

### `Architecture.md`

- **Written by**: Agent drafts, human approves — then updated incrementally at Feature boundaries
- **Purpose**: The structural blueprint. Describes components, how they connect, the folder structure, and code style rules. This is the agent's mental model of the codebase.
- **Format**: Labelled list under sections: Components, Connections, Folder Structure, Code Style Guidelines.
- **After Project Loop**: Updated when a Feature introduces architecture changes (proposed in `Spec.md`, applied on approval).

### `FlowDiagram.md`

- **Written by**: Agent (generated)
- **Purpose**: A Mermaid diagram of the system's primary data and control flows. Derived from `Architecture.md`. Quick-reference for developers and reviewers.
- **When it is regenerated**: At Project Loop init, and after every `Architecture.md` update.
- **You interact with it when**: You want a visual overview of the system, or to verify that an architecture change looks correct.

### `Knowledge.md`

- **Written by**: Agent (fully LLM-maintained)
- **Purpose**: A living document of reusable decisions, non-obvious patterns, and cross-cutting gotchas. The agent writes to this at Feature close and prunes it periodically.
- **Format**: Each entry has: Topic, Context (why it matters), Decision/Finding, Applies To.
- **What belongs here**: Things the agent will need to re-derive if not recorded. Not routine observations.

### `Feats.json`

- **Written by**: Agent
- **Purpose**: Machine-readable feature tracker. The agent reads this at session start to determine the current state of work.
- **Format**: JSON with a `features` array. Each feature has id, name, status, edits, depends\_on, rollback\_ref, timestamps.
- **You interact with it when**: You want to inspect feature status programmatically. Do not edit it directly.

### `Logging.md`

- **Written by**: Human (static spec)
- **Purpose**: The full specification for `Logger.ndjson` — event schema, vocabulary, instructions, and query examples. The agent reads this whenever it needs to write or query log events.

### `Logger.ndjson`

- **Written by**: Agent (append-only)
- **Purpose**: The audit trail. Every significant event — loop transitions, artefact writes, developer decisions, test results, deviations — is recorded here as a single JSON line.
- **Format**: Newline-delimited JSON. Each line: `ts`, `loop`, `feat`, `edit`, `event`, `detail`.
- **You interact with it when**: Something went wrong and you need to understand what happened. Query with `jq` or `grep`. Never edit it.

---

## Feature-level (`asef/features/{feat-id}/`)

### `Pre-State.md`

- **Written by**: Agent (at Feature start)
- **Purpose**: A snapshot of the codebase before work begins — scoped to the areas the Feature will touch. Gives a baseline to diff against when the Feature completes.
- **Format**: Relevant file list, current behaviour summary, known issues, dependency state.

### `Spec.md`

- **Written by**: Agent drafts, human approves
- **Purpose**: The Feature's contract. The single source of truth for what the Feature does. All downstream artefacts (Tests, Plan) derive from this.
- **Format**: Feature Description & Behaviour, Acceptance Criteria, Architecture Changes, Major Code Changes & Locations.
- **Important**: Do not approve a Spec with ambiguous acceptance criteria. Ambiguity here becomes bugs later.

### `Tests.md`

- **Written by**: Agent (derived from `Spec.md`), human reviews
- **Purpose**: The test plan. Defined before implementation begins (Red-Green discipline). Describes what will be tested, not how tests are implemented.
- **Format**: Unit Tests, Integration Tests, Regression Tests, Edge Cases.

### `Plan.md`

- **Written by**: Agent (derived from `Spec.md` + `Tests.md`), human approves
- **Purpose**: The implementation plan — how the agent will build the Feature. Contains the ordered Edit sequence, rationale, risk areas, and scope estimate.
- **Format**: Implementation Strategy, Edit Sequence, Dependencies & Ordering Rationale, Risk Areas, Estimated Scope.
- **Important**: The agent does not enter the Edit Loop until this is approved. If the Plan reveals the Spec is under-specified, the agent pauses and flags it.

### `Post-State.md`

- **Written by**: Agent (at Feature close)
- **Purpose**: Mirror of `Pre-State.md`, reflecting the codebase after the Feature completes. The diff between Pre and Post tells the story of the Feature.
- **Format**: Same structure as `Pre-State.md` — changes from Pre-State, current behaviour, test results, dependency state.

### `Rollback.md`

- **Written by**: Agent (only when a Feature is abandoned)
- **Purpose**: Documents why the Feature is being abandoned, what was already changed, what must be undone, and any residual risk. The rollback is then treated as its own Feature.
- **When it appears**: Only when you tell the agent to roll back. Absence of this file means the Feature completed or is still in progress.

---

## Edit-level (`asef/features/{feat-id}/edits/{edit-id}/`)

### `EditPlan.md`

- **Written by**: Agent, human confirms
- **Purpose**: A pre-change declaration. States exactly what will change and why before any code is touched. Prevents scope drift mid-edit.
- **Format**: Objective (one sentence), Files Affected, Approach, Verification.
- **Important**: Read this carefully before confirming. Once confirmed, the agent proceeds. If the plan looks wrong, say so now.

### `EditSummary.md`

- **Written by**: Agent (after the change)
- **Purpose**: A post-change record. States what actually happened, any deviations from the plan, and test results.
- **Format**: What Changed, Deviations from Plan, Test Results, Side Effects.
- **Important**: If there are deviations or side effects, understand them. They are not necessarily problems, but they should not be surprises.
