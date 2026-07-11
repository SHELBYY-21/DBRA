# Workflow Optimizer

## Description

Trigger this skill when analyzing and improving a recurring business or operational workflow for speed, quality, cost, reliability, ownership, handoffs, automation, or customer experience.

## Goal

Redesign work around the desired outcome, remove waste and ambiguity, automate stable steps, and create measurable controls without shifting burden elsewhere.

## Trigger Examples

- "Optimize our onboarding process."
- "Reduce handoffs in support."
- "Why does approval take so long?"
- "Automate this recurring workflow."
- "Reduce operational errors."
- "Map and improve this process."

## Workflow

1. Define the customer outcome and process boundary.
2. Identify volume, demand pattern, owners, and service expectations.
3. Observe the current process using real cases.
4. Map steps, decisions, waits, queues, rework, and handoffs.
5. Measure touch time, lead time, error rate, and cost.
6. Identify constraints and root causes.
7. Remove unnecessary steps and approvals.
8. Standardize inputs, definitions, and decision rules.
9. Move validation earlier.
10. Parallelize independent work.
11. Automate only stable, rules-based steps.
12. Design exception and escalation paths.
13. Pilot the future process.
14. Compare outcome and guardrail metrics.
15. Assign ownership and continuous review.

## Rules

- Optimize the end-to-end outcome.
- Do not optimize one team by burdening another.
- Measure before and after.
- Distinguish touch time from waiting time.
- Remove work before automating it.
- Do not automate unstable policy.
- Preserve necessary controls.
- Challenge approvals that do not change decisions.
- Minimize handoffs.
- Define one accountable process owner.
- Make entry criteria explicit.
- Use one source of truth.
- Design exceptions intentionally.
- Avoid hidden manual queues.
- Do not use utilization as the only metric.
- Protect quality and customer outcomes.
- Preserve auditability where required.
- Make automation replay-safe.
- Include rollback for process changes.
- Revisit the process when demand changes.

## Best Practices

- Start with a value-stream map.
- Sample normal, urgent, failed, and unusual cases.
- Ask why each step exists.
- Track first-pass yield.
- Limit work in progress.
- Use pull systems for constrained teams.
- Batch only when setup cost justifies it.
- Create standard work for repeatable tasks.
- Put decisions near the best information.
- Use explicit service-level expectations.
- Route by risk rather than treating every case equally.
- Use checklists for rare, consequential work.
- Capture structured data at the source.
- Use automation for transfer and validation before judgment.
- Keep humans in ambiguous or high-impact decisions.
- Make queue age visible.
- Review exceptions for redesign opportunities.
- Pilot with a representative cohort.
- Track unintended consequences.
- Retire legacy steps after verified adoption.

## Output Format

```markdown
# Workflow Optimization: <process>

## Outcome and Scope
- Customer:
- Start:
- End:
- Owner:
- Demand:
- Service target:

## Current State
| Step | Owner | Touch time | Wait time | Input | Output | Error/Rework |
|---|---|---|---|---|---|---|

## Root Causes
| Symptom | Evidence | Root cause | Impact |
|---|---|---|---|

## Future State
| Change | Type | Expected effect | Risk | Owner |
|---|---|---|---|---|

## Automation Candidates

## Pilot Plan

## Metrics and Guardrails
```

## Examples

### Approval reduction

Analysis shows managers approve 99.8% of purchases below a fixed threshold. Auto-approve low-risk requests with budget checks, retain review for exceptions, and audit a sample.

### Support routing

Capture product, severity, and account at intake; route directly to the owning queue; show queue age; and return incomplete requests immediately with specific guidance.

### Onboarding

Run independent provisioning tasks in parallel, use a shared readiness status, and escalate only failed dependencies instead of holding the entire account silently.

## Edge Cases

- **Regulated approval:** Improve evidence capture and routing rather than removing the control.
- **Highly variable work:** Standardize intake and triage, not expert judgment.
- **Seasonal demand:** Design surge capacity and temporary thresholds.
- **Low volume:** Prefer simple checklists over expensive automation.
- **Cross-company handoff:** Define contract, acknowledgment, and escalation.
- **Legacy dependency:** Add a controlled adapter and retirement trigger.
- **Emergency work:** Create an expedited path with retrospective review.
- **Conflicting goals:** Use weighted outcomes and executive ownership.
- **Incomplete data:** Pilot instrumentation before redesign conclusions.
- **Automation outage:** Maintain a bounded manual fallback.

## Failure Recovery

- If cycle time improves but errors rise, restore the quality control and redesign the root cause.
- If automation creates duplicates, stop it and implement canonical IDs and replay safety.
- If teams bypass the new process, inspect friction and incentives before enforcing compliance.
- If queues move elsewhere, re-map end to end and correct local optimization.
- If the pilot is inconclusive, improve sample coverage and measurement.
- If demand exceeds capacity, apply work-in-progress limits and prioritize by outcome.
- If ownership fails, assign one accountable leader and explicit contributors.
- If a policy changes, version standard work and retire obsolete instructions.

## Checklist

- [ ] Customer outcome is explicit.
- [ ] Start and end boundaries are defined.
- [ ] Process owner is assigned.
- [ ] Real cases are observed.
- [ ] Touch and wait time are separated.
- [ ] Handoffs and queues are visible.
- [ ] Error and rework rates are measured.
- [ ] Constraint is identified.
- [ ] Root causes have evidence.
- [ ] Unnecessary work is removed first.
- [ ] Decision rules are standardized.
- [ ] Validation moves earlier.
- [ ] Parallel work is identified.
- [ ] Automation candidates are stable.
- [ ] Exceptions have owners.
- [ ] Pilot scope is representative.
- [ ] Outcome metrics are defined.
- [ ] Guardrails prevent local optimization.
- [ ] Rollback is possible.
- [ ] Continuous review cadence is assigned.
