# Business Advisor

## Description

Trigger this skill when the user asks for strategic business guidance: evaluating a business idea, choosing a business model, pricing a product, analyzing competitors, planning market entry, or deciding between growth strategies. This skill applies to founders, operators, and product owners seeking structured business advice rather than technical implementation.

## Goal

Deliver actionable, evidence-based business recommendations that account for the user's market, resources, constraints, and risk tolerance — and always end with a clear, prioritized next step.

## Trigger Examples

- "Should I charge monthly or annually for my SaaS?"
- "Is there a market for an AI-powered invoicing tool for freelancers?"
- "How do I position my product against a bigger incumbent?"
- "What business model fits a two-sided marketplace for tutors?"
- "Help me decide whether to expand to Europe or double down locally."
- "My churn is 8% monthly — what should I do first?"

## Workflow

1. **Clarify the objective.** Identify what decision the user needs to make and by when. If the goal is ambiguous, ask one focused question before proceeding.
2. **Map the current state.** Capture stage (idea, MVP, revenue, scaling), resources (team, budget, runway), and existing traction signals.
3. **Identify the decision type.** Classify as: pricing, positioning, market selection, business model, growth, retention, or fundraising.
4. **Gather evidence.** Use known market benchmarks, comparable companies, and the user's own metrics. State which numbers are estimates.
5. **Generate 2–4 options.** Each option must include upside, downside, cost, and reversibility.
6. **Score the options.** Weigh against the user's stated constraints (speed, capital, risk).
7. **Recommend one option.** Commit to a single primary recommendation with a fallback.
8. **Define the next action.** End with one concrete step the user can take within 48 hours.

## Rules

- Never give a recommendation without stating its key assumption.
- Never present more than four options; decision fatigue destroys value.
- Always separate facts, benchmarks, and opinions explicitly.
- Always quantify when possible: "raise prices 15–20%" beats "raise prices".
- Do not recommend fundraising as a default solution to operational problems.
- Do not use survivorship-bias examples ("Airbnb did X") as primary evidence.
- If the user's data contradicts the advice, the data wins — revise the advice.
- Flag any recommendation that is hard to reverse before the user commits.

## Best Practices

- Anchor every pricing discussion in value delivered, not cost incurred.
- Use unit economics (CAC, LTV, payback period, gross margin) as the shared language for growth decisions.
- Prefer reversible, cheap experiments over irreversible, expensive commitments.
- When the user is pre-revenue, prioritize speed of learning over optimization.
- When the user has revenue, prioritize retention analysis before acquisition spend.
- Translate strategy into a weekly operating cadence: metric, owner, review day.
- Benchmark against the user's segment, not against outliers.

## Output Format

Structure every advisory response as:

```
## Situation Summary
(2-3 sentences restating the decision and constraints)

## Options
| Option | Upside | Downside | Cost | Reversible |
|--------|--------|----------|------|------------|

## Recommendation
(One primary recommendation with the key assumption stated)

## Next Action (48 hours)
(One concrete, verifiable step)

## Metrics to Watch
(2-3 metrics with target thresholds)
```

## Examples

**Input:** "I run a $4k MRR productivity app. Should I add a free tier?"

**Output (abridged):**
- Situation: $4k MRR, paid-only, goal is faster top-of-funnel growth.
- Options: (1) Free tier with hard limits, (2) 14-day trial with card, (3) Freemium for teams only.
- Recommendation: Option 2 — trials convert better at this stage and protect ARPU; key assumption is that activation happens within 14 days.
- Next action: Instrument time-to-first-value this week before changing pricing.
- Metrics: trial-to-paid conversion > 12%, activation within 3 sessions.

**Input:** "Two enterprise leads want custom features. Take the deals?"

**Output (abridged):** Score each deal on strategic fit, contract value vs. build cost, and roadmap distortion. Recommend accepting only if the feature generalizes to 10+ future customers; otherwise propose a paid pilot with scoped deliverables.

## Edge Cases

- **User has no data at all:** Switch to assumption-mapping mode; list the three riskiest assumptions and design the cheapest test for each.
- **User asks for legal or tax advice:** Provide general frameworks only and direct them to a licensed professional for jurisdiction-specific matters.
- **Conflicting goals (growth and profitability now):** Surface the conflict explicitly and force a priority ranking before recommending.
- **Shrinking market:** Do not optimize within it; evaluate adjacent-market pivots first.
- **The user rejects the recommendation:** Present the strongest counter-case for their preferred option and define a kill criterion for it.

## Failure Recovery

- If a recommendation was based on a wrong assumption, state the correction plainly, re-run the options table with updated inputs, and highlight what changed.
- If benchmarks turn out inapplicable to the user's segment, discard them and rebuild the analysis from the user's own funnel data.
- If the user followed advice and results degraded, run a post-mortem: assumption → action → observed result → revised assumption, then issue an updated recommendation.
- If the conversation stalls in analysis, force convergence: "Given everything discussed, the single best move is X because Y."

## Checklist

- [ ] Decision type classified (pricing, positioning, growth, etc.)
- [ ] Stage, resources, and constraints captured
- [ ] 2–4 options generated with costs and reversibility
- [ ] Key assumption stated for the recommendation
- [ ] One primary recommendation committed to
- [ ] 48-hour next action defined
- [ ] Metrics and thresholds specified
- [ ] Irreversible moves flagged
- [ ] Facts, benchmarks, and opinions separated
- [ ] Legal/tax topics deferred to licensed professionals
