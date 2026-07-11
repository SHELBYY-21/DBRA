# Decision Maker

## Description

Trigger this skill when the user faces a concrete choice and needs a structured path to a decision: comparing options, breaking analysis paralysis, weighing trade-offs, choosing under uncertainty, or documenting a decision for the record. Applies to technical choices, business choices, and personal-professional choices alike.

## Goal

Reach a committed, well-reasoned decision in proportion to its stakes — fast for reversible choices, rigorous for irreversible ones — and record the reasoning so it can be revisited without re-arguing.

## Trigger Examples

- "Should we use REST or GraphQL for this API?"
- "I can't decide between these two job offers / vendors / designs."
- "We've been debating this for two weeks. Help us decide."
- "What's the best framework for this project?"
- "Make the call: monolith or microservices?"
- "Write a decision record for choosing Postgres."

## Workflow

1. **Classify the decision.** Type 1 (irreversible, high stakes) or Type 2 (reversible, cheap to undo). Type 2 decisions get minutes, not meetings.
2. **State the decision question in one sentence.** Including the deadline: "By Friday, choose X or Y for Z."
3. **Surface the real criteria.** Elicit 3–6 criteria that actually matter, weighted. Hidden criteria (ego, familiarity, politics) are named explicitly.
4. **Shortlist honestly.** Two to four genuine options, including "do nothing / defer" where meaningful.
5. **Score against criteria.** Use a weighted matrix for Type 1; a quick pro/con with a gut check suffices for Type 2.
6. **Stress-test the leader.** Ask: what would make this the wrong choice? What does the strongest opponent of this option know?
7. **Decide and commit.** State the choice, the deciding factors, and the losing options' best arguments.
8. **Record it.** Capture context, options, decision, and revisit conditions in a short decision record.
9. **Set a review trigger.** Define the observable signal that would justify reopening — otherwise the decision stays closed.

## Rules

- Match rigor to reversibility: never run a Type 1 process for a Type 2 decision, or vice versa.
- Every decision has a deadline; a decision without a deadline is a debate.
- The option set must include the status quo when it is viable — comparing only new options biases toward change.
- Weighted criteria are set before scoring options, never after.
- A decision is not made until the losing options' strongest arguments have been stated fairly.
- Consensus is not required; a named decider is. Input is wide, decision rights are narrow.
- Sunk costs are excluded from every evaluation by rule.
- Reopening a recorded decision requires new information matching the revisit trigger, not merely renewed discomfort.

## Best Practices

- For close calls between good options, decide fast — closeness means the expected difference is small.
- Use 10/10/10: how will this look in 10 minutes, 10 months, 10 years? It separates discomfort from consequence.
- When stuck, invert: which option would be hardest to justify to a smart skeptic in a year?
- Reduce big irreversible decisions into smaller reversible ones where possible (pilot, trial period, opt-out clause).
- Beware option proliferation; more than four options usually signals unclear criteria.
- Timebox information gathering: define what missing fact would change the answer, get that fact only.
- Record decisions in under a page; long records don't get read or revisited.

## Output Format

```
## Decision: <one-sentence question>
Type: 1 (irreversible) | 2 (reversible) — Deadline: <date> — Decider: <who>

## Criteria (weighted)
| Criterion | Weight | Why it matters |
|-----------|--------|----------------|

## Options Scored
| Option | <crit 1> | <crit 2> | ... | Weighted Total |
|--------|----------|----------|-----|----------------|

## Decision
<the choice + the 1-2 deciding factors>

## Strongest Case Against
<best argument for the losing option, stated fairly>

## Revisit Trigger
<observable condition that reopens this>
```

## Examples

**Input:** "Monolith or microservices for our 4-person startup?"

**Output (abridged):** Type 2 leaning 1 (architecture is semi-reversible). Criteria: shipping speed (0.4), operational load (0.3), hiring reality (0.2), future scale (0.1). Monolith wins decisively on the top three. Decision: modular monolith. Strongest case against: a specific component with wildly different scaling needs — extract that one service only if it appears. Revisit trigger: deploy contention blocking more than one release per week.

**Input:** "We've debated the pricing page redesign for two weeks."

**Output (abridged):** Diagnosis: Type 2 decision receiving Type 1 treatment. Prescription: name a decider, set a 48-hour deadline, ship the leading variant behind an A/B test — the market decides, not the meeting. Revisit trigger is the test result itself.

## Edge Cases

- **All options are bad:** Choose the least bad explicitly and say so; also check whether the option set was framed too narrowly before accepting it.
- **Decision depends on an unknowable future:** Pick the option that performs acceptably across the most scenarios (robustness) rather than best in one forecast.
- **Stakeholders deadlocked with different values:** The disagreement is about criteria weights, not facts — surface the weights, escalate the weighting to whoever owns the outcome.
- **User wants the assistant to just pick:** Pick, clearly, with reasoning — but flag if the decision is Type 1 and deserves their own sign-off.
- **New option appears mid-process:** Admit it only if it plausibly beats the current leader; otherwise note it and finish.

## Failure Recovery

- **Decision proved wrong:** Separate bad decision from bad outcome — a well-reasoned choice can lose. Post-mortem only the reasoning: was information available and missed, or genuinely unknowable?
- **Decision keeps getting relitigated:** The record was missing or the decider wasn't legitimate; re-issue the decision record, confirm the decider, and enforce the revisit-trigger rule.
- **Paralysis persists after the process:** Force the tie-break: flip a coin and observe the reaction — disappointment reveals the real preference; then commit to it.
- **Criteria were gamed to justify a pre-made choice:** Re-run scoring with an uninvolved party setting weights first; note the bias for future decisions.

## Checklist

- [ ] Decision classified as Type 1 or Type 2
- [ ] One-sentence decision question with deadline
- [ ] Named decider identified
- [ ] Criteria weighted before scoring
- [ ] Status quo included where viable
- [ ] Options scored; leader stress-tested
- [ ] Sunk costs excluded
- [ ] Strongest opposing case stated fairly
- [ ] Decision recorded in under a page
- [ ] Revisit trigger defined
