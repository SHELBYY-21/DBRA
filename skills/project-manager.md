# Project Manager

## Description

Trigger this skill when the user needs to plan, scope, schedule, or track a project: breaking work into tasks, estimating effort, assigning owners, managing scope creep, running standups or retros, or reporting status. Applies to software projects, launches, migrations, and cross-functional initiatives.

## Goal

Convert ambiguous goals into a structured, trackable plan with clear milestones, owners, dependencies, and risks — and keep that plan honest as reality changes.

## Trigger Examples

- "Break this feature into tasks for my team."
- "We need to launch in 6 weeks — build a plan."
- "The project is slipping. Help me figure out what to cut."
- "Write a status update for stakeholders."
- "How should we run our sprint planning?"
- "Create a migration plan from our old CMS."

## Workflow

1. **Define done.** Write a one-sentence definition of project success with a measurable acceptance criterion.
2. **Inventory scope.** List every deliverable. Mark each as Must / Should / Could (MoSCoW).
3. **Decompose.** Break Must-haves into tasks of 1–3 days each. Larger tasks must be split further.
4. **Map dependencies.** Identify blocking chains and the critical path.
5. **Estimate.** Use range estimates (best / likely / worst). Sum the likely path, then add buffer only at the project level, never per task.
6. **Assign owners.** Every task gets exactly one accountable owner.
7. **Set milestones.** Define 3–5 checkpoints with demo-able outcomes, not internal states.
8. **Establish cadence.** Choose the reporting rhythm (daily async, weekly review) and the escalation path.
9. **Track and re-plan.** Update the plan when reality diverges; never let the plan and reality drift silently.

## Rules

- Every task has one owner. Shared ownership is no ownership.
- No task longer than 3 days without decomposition.
- Buffer lives at the project level, not hidden inside task estimates.
- Scope additions require an explicit trade: what gets cut or delayed.
- Milestones must be demonstrable, not "80% done".
- Status is reported in three states only: on track, at risk, off track.
- Risks are logged with probability, impact, and a named mitigation owner.
- A slipping deadline triggers a scope conversation, not silent overtime.

## Best Practices

- Front-load the riskiest and most uncertain work; save polish for the end.
- Prefer vertical slices (thin end-to-end functionality) over horizontal layers.
- Keep the plan in one canonical location; duplicated plans always diverge.
- Timebox investigations: "spend 4 hours, then report options" beats open-ended research.
- Run retros on milestones, not just at the end — apply lessons mid-project.
- Communicate slips early; a surprise on deadline day costs 10x the trust.
- Track cycle time per task to calibrate future estimates.

## Output Format

```
## Project: <name>
**Definition of Done:** <one sentence, measurable>

## Milestones
| # | Milestone | Demo-able Outcome | Target Date |
|---|-----------|-------------------|-------------|

## Task Breakdown
| Task | Owner | Estimate (L) | Depends On | Priority |
|------|-------|--------------|------------|----------|

## Risks
| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|

## Cadence
- Standup: <format, time>
- Status report: <audience, frequency>
- Escalation: <trigger, path>
```

## Examples

**Input:** "Plan a 4-week launch for our new pricing page."

**Output (abridged):**
- Done: New pricing page live, A/B tested against old page, no conversion regression.
- Milestones: (1) Copy + design approved, (2) Page built behind flag, (3) A/B test at 10% traffic, (4) Full rollout.
- Critical path: design approval → build → experiment setup.
- Risk: legal review of pricing claims — start it in week 1, not week 3.

**Input:** "We're 2 weeks behind on a 6-week project."

**Output (abridged):** Re-baseline immediately. Options: (a) cut Could/Should scope to protect the date, (b) move the date and keep scope, (c) add people only to parallelizable work. Recommend (a) with a specific cut list, and communicate the change to stakeholders today.

## Edge Cases

- **No deadline given:** Derive one from the business event driving the work; if none exists, propose a timebox and confirm it.
- **Team of one:** Skip assignment overhead; focus on sequencing and WIP limit of 1–2.
- **Constantly changing requirements:** Shorten planning horizon to 1 week and lock scope within each week.
- **External dependency with no SLA:** Treat its delivery date as a risk, build a fallback, and escalate early.
- **Stakeholder demands all features by the original date:** Present the iron triangle explicitly — scope, time, resources — and require them to pick which one flexes.

## Failure Recovery

- **Missed milestone:** Run a 15-minute causal review (estimate wrong? scope grew? blocker?), re-baseline the remaining plan, and communicate the new dates the same day.
- **Owner leaves or is reassigned:** Reassign within 24 hours; unowned tasks are removed from the active plan until owned.
- **Plan and reality have diverged silently:** Declare a re-planning session, archive the stale plan, and rebuild from current truth rather than patching.
- **Repeated estimate misses:** Multiply future estimates by the observed miss ratio until calibration improves.

## Checklist

- [ ] Definition of done is written and measurable
- [ ] Scope classified with MoSCoW
- [ ] All Must tasks are 1–3 days with single owners
- [ ] Dependencies and critical path mapped
- [ ] Project-level buffer applied
- [ ] Milestones are demo-able with dates
- [ ] Risk register created with mitigation owners
- [ ] Reporting cadence and escalation path defined
- [ ] Scope-change trade policy communicated
- [ ] Plan stored in one canonical location
