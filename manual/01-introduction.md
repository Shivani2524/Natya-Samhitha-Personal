# Introduction to ASEF

## What is ASEF?

The Agentic Software Engineering Framework (ASEF) is a structured approach to building software with an AI agent. It gives the agent explicit boundaries, memory, and a paper trail — compensating for what humans do implicitly when coding: maintaining context, knowing when to stop, and understanding scope.

Without structure, an AI agent will drift — making changes beyond what was asked, losing context across sessions, and producing work that is hard to audit or reverse. ASEF solves this with three nested loops, a set of artefacts that anchor each loop, and a discipline that nothing happens outside of them.

## Core Philosophy

**Artefacts before action.** The agent never writes code without a governing document already in place. Every change is preceded by a plan and followed by a summary.

**Human at the boundaries.** You approve before the agent starts a Feature, you confirm before it makes a code change, and you review before anything merges. The agent works autonomously within those boundaries.

**Everything is auditable.** Every decision, deviation, test result, and state change is recorded. You can reconstruct exactly what happened, why, and in what order.

## The Three Loops

ASEF is built around three nested loops:

```
Project Loop (once)
 └── Feature Loop (per user story)
      └── Edit Loop (per code change)
```

- The **Project Loop** runs once at the start. It establishes the foundations: what the project is, how it is structured, and what constraints govern it.
- The **Feature Loop** runs once per user story or capability. It takes the codebase from one state to another in a planned, testable, reviewable way.
- The **Edit Loop** runs once per atomic code change within a Feature. It is the smallest unit of work — one concern, one change, one verification.

Each loop has its own artefacts, lifecycle, and human touchpoints.

## Repo Structure

```
./
├── Agent.md                        ← agent entry point, always at root
├── README.md
├── manual/                         ← you are here
└── asef/
     ├── Project.md                 ← project charter
     ├── Architecture.md            ← structural blueprint
     ├── FlowDiagram.md             ← generated from Architecture.md
     ├── Knowledge.md               ← reusable decisions & gotchas
     ├── Logging.md                 ← logger specification
     ├── Logger.ndjson              ← append-only event log
     ├── Feats.json                 ← feature tracker
     └── features/
          └── {feat-id}/
               ├── Pre-State.md
               ├── Spec.md
               ├── Tests.md
               ├── Plan.md
               ├── Post-State.md
               ├── Rollback.md      ← only if feature is abandoned
               └── edits/
                    └── {edit-id}/
                         ├── EditPlan.md
                         └── EditSummary.md
```

## Getting Started

1. Fill in `asef/Project.md` — goals, tech stack, users, guardrails.
2. Fill in `asef/Architecture.md` — components, connections, folder structure, code style.
3. Tell the agent: **"Initialise the project structure"** — it will scaffold your codebase and generate `asef/FlowDiagram.md`.
4. When you have a piece of work to do, tell the agent: **"Initialise Feature"** and describe what you need.

From there, the agent guides you through the Feature lifecycle.
