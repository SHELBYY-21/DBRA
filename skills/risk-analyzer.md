# Risk Analyzer

## Description

Trigger this skill when the user needs to identify, assess, prioritize, or mitigate risks in a plan, project, system, launch, contract, or decision. Applies to technical risks (outages, data loss), business risks (market, financial, legal), and operational risks (key-person, vendor, process). Use before major commitments and during pre-mortems.

## Goal

Produce a prioritized risk register that quantifies probability and impact, assigns mitigation owners, and distinguishes risks worth acting on from risks worth merely accepting — so decisions are made with open eyes rather than optimism.

## Trigger Examples

- "What could go wrong with this launch plan?"
- "Run a pre-mortem on our migration."
- "Assess the risks of depending on this single vendor."
- "What are the failure modes of this architecture?"
- "We're signing a 2-year contract — what should worry us?"
- "Rank the risks in this roadmap."

## Workflow

1. **Frame the scope.** Define exactly what is being risk-assessed (the plan, the system, the decision) and the time horizon.
2. **Enumerate systematically.** Walk categories one by one: technical, financial, legal/compliance, market, operational, security, reputational, key-person. Do not brainstorm randomly.
3. **Run a pre-mortem.** Assume the effort failed one year from now; list the most plausible causes of death.
4. **Score each risk.** Probability (low/medium/high or %) × impact (low/medium/high or cost). Note detection difficulty as a modifier — silent risks score higher.
5. **Prioritize.** Sort by probability × impact; cap the active list at the top 8–10. The rest go to a watch list.
6. **Assign responses.** For each top risk choose: mitigate (reduce probability), contain (reduce impact), transfer (insure/contract), or accept (documented, with owner sign-off).
7. **Define triggers and owners.** Every mitigated risk gets an owner, a leading indicator to watch, and a threshold that activates the response.
8. **Schedule review.** Risk registers rot; set a review cadence tied to project milestones.

## Rules

- Every risk statement follows the form: "Because of [condition], [event] may occur, causing [impact]." Vague worries are rewritten or discarded.
- Probability and impact are always scored separately; a scary-sounding risk with negligible probability must not outrank a mundane likely one.
- Accepted risks are documented and signed off — acceptance by silence is forbidden.
- Mitigations must name an owner and a deadline or they are fiction.
- Correlated risks (one event triggering several) are flagged; independence must not be assumed.
- Detection difficulty is scored: a risk you won't notice for months is worse than its raw score.
- The register never exceeds ~10 active risks; unlimited lists mean nothing is prioritized.
- Past incidents in the same domain are checked before declaring a risk "unlikely".

## Best Practices

- Invite the most pessimistic informed person to the enumeration step; optimists write short risk lists.
- Quantify impact in money or downtime where possible; "high impact" hides disagreement.
- Prefer cheap mitigations that cut probability early (staging environments, contract clauses, backups) over expensive impact reduction later.
- For irreversible decisions, weight impact more heavily than probability.
- Test mitigations before they are needed: an unrestored backup is not a backup.
- Track near-misses; they are free previews of real incidents.
- Revisit the register after any material scope or environment change, not just on schedule.

## Output Format

```
## Risk Register: <scope>
Horizon: <time frame> | Review cadence: <interval>

| # | Risk (condition → event → impact) | Prob. | Impact | Detection | Score | Response | Owner | Trigger |
|---|-----------------------------------|-------|--------|-----------|-------|----------|-------|---------|

## Accepted Risks
| Risk | Rationale for acceptance | Signed off by |
|------|--------------------------|---------------|

## Watch List
- <lower-priority risks with the indicator that would promote them>

## Correlated Clusters
- <risks that share a common trigger>
```

## Examples

**Input:** "Pre-mortem our database migration next month."

**Output (abridged):** Top risks: (1) data loss during cutover — mitigate with verified backups plus dual-write period; (2) hidden query incompatibilities — mitigate with shadow-read comparison for a week; (3) rollback impossible after 24h of new writes — contain with a reconciliation script written in advance; (4) key engineer single point of failure — mitigate with a documented runbook and a shadow operator. Correlated cluster: risks 1 and 3 share the cutover event.

**Input:** "Risks of building on one vendor's API?"

**Output (abridged):** Pricing change (medium/high, transfer via contract terms), deprecation (low/high, mitigate via abstraction layer), outage (medium/medium, contain via degraded mode), data lock-in (high/medium, mitigate via scheduled exports). Recommendation: abstraction layer plus quarterly export beats premature multi-vendor complexity.

## Edge Cases

- **User wants reassurance, not analysis:** Deliver the honest register anyway; soften the framing, never the content.
- **No historical data for probability:** Use reference-class estimates from similar projects and label them as estimates; do not skip scoring.
- **Risk depends on an adversary (security, competition):** Score attacker incentive and capability instead of raw probability.
- **Everything scores "medium":** Force-rank pairwise; ties in a register indicate scoring avoidance.
- **Existential but unmitigable risk (platform bans the category):** Move to accepted with an early-warning indicator and a contingency sketch — do not let it paralyze the register.

## Failure Recovery

- **A risk materialized that wasn't on the register:** Post-mortem the enumeration gap (missing category? optimism? correlation?), add the category to the systematic walk, and rescore the whole register.
- **A mitigation failed under real conditions:** Distinguish design failure from execution failure; test the replacement mitigation under realistic conditions before re-trusting it.
- **Register was ignored ("we knew and did nothing"):** The process failure is ownership; re-issue with named owners, dated triggers, and register review added to an existing recurring meeting.
- **Overreaction to a low-probability event:** Recalibrate using base rates; document the reasoning to resist recency bias next cycle.

## Checklist

- [ ] Scope and time horizon framed
- [ ] Categories walked systematically, not brainstormed
- [ ] Pre-mortem performed
- [ ] Probability, impact, and detection scored separately
- [ ] Active list capped at ~10; rest on watch list
- [ ] Response type chosen per risk (mitigate/contain/transfer/accept)
- [ ] Owners, triggers, and deadlines assigned
- [ ] Accepted risks explicitly signed off
- [ ] Correlated risks clustered
- [ ] Review cadence scheduled
