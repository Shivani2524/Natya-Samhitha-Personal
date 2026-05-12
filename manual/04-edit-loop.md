# The Edit Loop

## What It Is

The Edit Loop is the smallest unit of work in ASEF. It runs once per atomic code change within a Feature. An Edit is one concern, one change, one verification.

Its job is to make a single well-scoped change, verify it works, and document what happened.

## The Golden Rule

**Every code change within a Feature is an Edit — no exceptions.**

Not for "quick fixes". Not for "small tweaks". Not for "just change this one line". If code is changing, an Edit is opening. This is not bureaucracy — it is the mechanism that keeps the codebase auditable and the agent from drifting.

## Your Role

You are involved at two moments in every Edit:

1. **Before the change** — you review and confirm the `EditPlan.md`. If you do not like the approach, say so. The agent revises it.
2. **After the change** — you see the `EditSummary.md` and test results. You know exactly what changed, whether tests passed, and whether anything unexpected happened.

The agent does not proceed to the next Edit until you have seen the summary.

## Lifecycle

### Step 1 — Identify the change

The agent identifies the next required change from:
- The Edit sequence in `Plan.md`
- Failing tests from a previous run
- A direct request from you during the Feature

### Step 2 — Create the Edit directory

The agent creates `asef/features/{feat-id}/edits/{edit-id}/`.

### Step 3 — EditPlan

The agent writes `EditPlan.md`:
- **Objective** — one sentence: what this Edit accomplishes
- **Files Affected** — what will be created, modified, or deleted
- **Approach** — how the change will be made
- **Verification** — which tests will confirm it worked

**The agent presents this to you for confirmation.** Read it. If the approach is wrong, if it touches files it should not, or if the objective is off — tell the agent now, before any code changes.

### Step 4 — Make the change

Once you confirm, the agent makes exactly the change described in `EditPlan.md`. If it discovers mid-change that the scope is larger than planned, it stops and produces a revised `EditPlan.md` for your review — it does not silently expand.

### Step 5 — Run tests

The agent runs the tests named in the `EditPlan.md` (unit + affected integration). Not the full suite — that happens at Feature close. Just the tests relevant to this specific change.

### Step 6 — EditSummary

The agent writes `EditSummary.md`:
- **What Changed** — concrete description of modifications
- **Deviations from Plan** — anything that differed from `EditPlan.md`, and why
- **Test Results** — pass/fail for each verification test
- **Side Effects** — any unintended changes, or "None"

**The agent presents this to you.** Read it. The test results should match your expectation. If there are deviations or side effects, understand them before moving on.

### Step 7 — On failure

If tests fail, the agent:
- Diagnoses the failure and presents its findings
- Opens a new Edit to fix it (fix-forward) — or reverts if the change was fundamentally wrong
- Shows you the new `EditPlan.md` before doing anything

After 3 consecutive failures on the same issue, the agent escalates to you rather than continuing to attempt fixes.

## Making Ad-hoc Changes

If during a Feature you want to change something that is not in the `Plan.md` — a different approach, a bug you noticed, a small improvement — that is still an Edit. Tell the agent what you want. It will:

1. Create a new `edit-{n}` directory
2. Draft an `EditPlan.md` for the change
3. Present it to you for confirmation
4. Then proceed as normal

The only difference from a planned Edit is that this one was triggered by you rather than the Plan.

## What Gets Produced

| Artefact | Who produces it |
|---|---|
| `EditPlan.md` | Agent, human confirms |
| `EditSummary.md` | Agent, human reviews |
