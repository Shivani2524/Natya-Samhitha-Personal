# The Feature Loop

## What It Is

The Feature Loop is the main unit of work in ASEF. It runs once per user story, capability, or meaningful chunk of development. A Feature is bigger than a single code change but smaller than a re-architecture.

Its job is to take the codebase from State A to State B in a way that is planned, tested, reviewed, and fully documented.

## When to Run It

Any time you have a piece of work to do:
- A new capability ("add user authentication")
- A refactor ("extract the payment logic into its own module")
- A bug fix that is non-trivial ("diagnose and fix the race condition in the job queue")
- A rollback of a previous Feature

## Your Role

You are in the loop at three key moments:
1. **Spec approval** — you confirm what the Feature will do before any planning begins.
2. **Plan approval** — you confirm how the agent will build it before any code is written.
3. **Each Edit** — you confirm the EditPlan before each code change, and see the EditSummary after.

## Lifecycle

### Step 1 — Initialise the Feature

Tell the agent: **"Initialise Feature"** and describe what you need. The agent:
- Creates `asef/features/{feat-id}/` directory
- Adds an entry to `asef/Feats.json` with status `in-progress`
- Creates stub files for the Feature artefacts

### Step 2 — Pre-State snapshot

The agent reads the codebase and produces `Pre-State.md` — a snapshot of the areas this Feature will touch. You do not need to write or approve this; it is the agent's baseline.

### Step 3 — Spec

The agent drafts `Spec.md` based on what you described. You review it and confirm:
- Does the feature description match your intent?
- Are the acceptance criteria complete and testable?
- Are the architecture changes (if any) correct?

**Do not proceed until the Spec is right.** The Spec governs everything downstream. Ambiguity here becomes confusion in the code.

### Step 4 — Tests

The agent produces `Tests.md` from the approved Spec. Tests are defined before code is written — this is the Red phase of Red-Green. Review the test plan and check that:
- The unit tests map to the acceptance criteria
- The integration tests cover the component interactions you care about
- Regression tests cover existing behaviour that must not break
- Edge cases are realistic and worth covering

### Step 5 — Plan

The agent produces `Plan.md` — the implementation strategy and ordered list of Edits. Review it and check:
- Does the sequence make sense?
- Are the risk areas flagged ones you are also concerned about?
- Does the scope (files, lines) match your expectation of the Feature's size?

**The agent does not write code until you approve the Plan.**

### Step 6 — Edit Loop

The agent works through the Edit sequence. For each Edit, you will:
- See an `EditPlan.md` and confirm it before the code change is made
- See an `EditSummary.md` and test results after the change is complete

See the Edit Loop guide for full detail.

### Step 7 — Full test run

After all Edits, the agent runs the full test suite including regression tests. You see the results.

### Step 8 — Feature close (all green)

On a clean test run the agent:
- Produces `Post-State.md`
- Updates `Knowledge.md` with any decisions worth preserving
- Updates `Feats.json` (status → `complete`)
- Raises a PR to `main`

### Step 9 — Test failure

If tests fail, the agent re-enters the Edit Loop to fix them. It does not silently retry — it shows you what failed and what it plans to do. After 3 consecutive failures on the same issue, it escalates to you.

## What Gets Produced

| Artefact | Who produces it |
|---|---|
| `Pre-State.md` | Agent |
| `Spec.md` | Agent drafts, human approves |
| `Tests.md` | Agent drafts, human reviews |
| `Plan.md` | Agent drafts, human approves |
| `Post-State.md` | Agent |
| `Rollback.md` | Agent (only if Feature is abandoned) |

## Architecture Changes

If your Feature requires architecture changes — new components, new dependencies, changed contracts — these are proposed in `Spec.md` under "Architecture Changes". On approval, the agent updates `Architecture.md` and regenerates `FlowDiagram.md` before any code is written.

## Abandoning a Feature

If a Feature needs to be abandoned mid-way, do not just delete the branch. Tell the agent: **"Roll back this Feature"**. The rollback is itself treated as a Feature — it gets its own full artefact trail. See `Agent.md` for the Rollback policy.
