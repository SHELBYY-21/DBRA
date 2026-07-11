# Execution Mode

## Description

Trigger this skill when the user wants heads-down implementation of an already-decided plan: "just build it", "stop discussing and implement", "execute the plan we agreed on", or when a project transitions from planning to delivery. This skill suppresses re-litigation of decisions and optimizes for shipping.

## Goal

Deliver the agreed scope efficiently and verifiably — minimal discussion, maximal completed work, with progress reported against the plan and deviations flagged only when they genuinely block execution.

## Trigger Examples

- "The plan is approved. Build it."
- "Stop asking questions and implement steps 1 through 4."
- "Execute the migration checklist."
- "We already decided on Supabase — just wire it up."
- "Finish the remaining tasks from yesterday."
- "Go into execution mode for this sprint."

## Workflow

1. **Load the plan.** Restate the agreed scope in one short list. If no plan exists, create a minimal one in under five lines and proceed.
2. **Order by dependency.** Sequence tasks so each step unblocks the next; front-load anything with external wait time.
3. **Execute in small, verifiable increments.** Complete one unit, verify it works, then move on. No half-finished parallel fronts.
4. **Verify as you go.** Run the code, test the flow, check the output after each increment — not only at the end.
5. **Log deviations, don't debate them.** If reality forces a change (missing API, broken assumption), note it in one line and take the smallest reasonable adaptation.
6. **Escalate only true blockers.** Interrupt the user only for: missing credentials, destructive operations, or decisions that materially change scope.
7. **Report at checkpoints.** After each milestone, report: done / in progress / blocked, in three lines or fewer.
8. **Close the loop.** At the end, verify the full acceptance criteria and summarize what shipped versus the plan.

## Rules

- Decisions already made are not reopened unless execution proves them impossible.
- No gold-plating: implement what the plan says, not what would be "nicer".
- Every increment must be verified working before the next begins.
- Blockers are escalated with a proposed default ("I'll do X unless you object"), never as open-ended questions.
- Destructive or irreversible operations always require explicit confirmation, even in execution mode.
- Scope changes discovered mid-execution are logged and deferred unless they block completion.
- Progress reports are terse: status, not narrative.
- Unfinished work is never reported as done.

## Best Practices

- Keep a visible running checklist; mark items complete only after verification.
- Prefer the boring, known-working approach over a novel one mid-execution.
- Batch trivial related changes; isolate risky changes into their own increments.
- When two implementation paths are equivalent, pick one in under a minute and move.
- Leave the codebase runnable at every stopping point.
- Timebox debugging: after a set limit, record findings and either switch approach or escalate with context.
- Write down discovered follow-ups in a deferred list instead of chasing them now.

## Output Format

Checkpoint reports use exactly this structure:

```
## Checkpoint <N>
- Done: <items completed and verified>
- In progress: <current item>
- Blocked: <item + proposed default action, or "none">
- Deferred: <discovered follow-ups, or "none">
```

Final report:

```
## Execution Complete
- Shipped: <list vs. original plan>
- Deviations: <what changed and why, one line each>
- Verified: <how each acceptance criterion was checked>
- Deferred list: <follow-ups for later>
```

## Examples

**Input:** "Plan approved: add auth, protect the dashboard, add a profile page. Execute."

**Output (abridged):** Sequences auth → route protection → profile (dependency order). Implements auth, verifies signup/login in the browser, reports checkpoint 1. Discovers the session helper needs a small refactor — does the minimal version, logs the fuller refactor as deferred. Completes all three, verifies each flow, ships final report.

**Input:** "Execute the data cleanup script we designed."

**Output (abridged):** Runs on a sample first, verifies counts, then asks for explicit confirmation before the destructive production run (rule override), executes, reports rows affected against expectations.

## Edge Cases

- **The plan is impossible as written:** Stop that item only; state the smallest viable alternative and proceed with it unless the change affects scope materially.
- **Mid-execution user adds new requests:** Acknowledge, add to the deferred list, and confirm whether to interrupt the current sequence — default is finish first.
- **A "quick" task balloons:** Timebox it; report the size discovery at the next checkpoint with a re-estimate instead of silently grinding.
- **Verification impossible in the environment:** Say so explicitly, verify the closest proxy, and mark the item "implemented, unverified" — never "done".
- **Two plan items conflict:** Resolve with the plan's stated priority; if none exists, pick the safer option and log the conflict.

## Failure Recovery

- **An increment broke something previously working:** Revert to the last verified state first, then re-attempt with a smaller change.
- **Wrong assumption discovered late:** Assess blast radius, fix forward if contained, roll back if spreading; report the correction at the next checkpoint.
- **Execution stalled on the same blocker twice:** Stop retrying; escalate with everything tried, current hypothesis, and a recommended path.
- **Final verification fails acceptance criteria:** Do not ship the summary as complete; report the specific failing criterion and the fix plan.

## Checklist

- [ ] Plan restated and sequenced by dependency
- [ ] Work executed in small, verified increments
- [ ] Codebase runnable at every stopping point
- [ ] Decisions not reopened without hard evidence
- [ ] Blockers escalated with proposed defaults
- [ ] Destructive operations confirmed explicitly
- [ ] Deviations logged in one line each
- [ ] Discovered follow-ups deferred, not chased
- [ ] Checkpoint reports terse and accurate
- [ ] Final report maps shipped work to acceptance criteria
