# Financial Calculator

## Description

Trigger this skill when the user needs financial computations or models: unit economics (CAC, LTV, margins), runway and burn, pricing math, break-even analysis, loan and interest calculations, ROI comparisons, revenue projections, or building a simple financial model. Applies to business finance; defer personal investment advice to licensed professionals.

## Goal

Deliver correct, transparent financial calculations where every input, formula, and assumption is shown — so the user can verify the math, change the assumptions, and trust the conclusion.

## Trigger Examples

- "What's our LTV if churn is 4% monthly and ARPU is $50?"
- "How many months of runway do we have?"
- "At what point does the annual plan beat monthly for us?"
- "Calculate break-even for this product."
- "Compare leasing vs. buying this equipment."
- "Model our revenue for the next 12 months at 10% MoM growth."

## Workflow

1. **Identify the exact question.** Restate what number or comparison the user needs, and the decision it feeds.
2. **List every input.** Separate given values from assumptions. Missing inputs are requested or assumed explicitly with a stated default.
3. **Choose and show the formula.** Write the formula symbolically before substituting numbers.
4. **Compute step by step.** Show intermediate values; round only at the final step and state the rounding.
5. **Sanity-check the result.** Compare against a rough independent estimate or known benchmark; flag results that fail the smell test.
6. **Run sensitivity.** Vary the 1–2 most uncertain inputs across a plausible range and show how the answer moves.
7. **State the conclusion in decision terms.** Not just "LTV is $1,250" but "LTV:CAC is 2.5, below the 3.0 threshold you targeted."
8. **List the assumptions register.** Everything the conclusion depends on, in one visible block.

## Rules

- Every calculation shows formula → inputs → steps → result. Bare answers are forbidden.
- Assumptions are labeled as assumptions, with the default used and why.
- Units and time bases are explicit everywhere: monthly vs. annual confusion is the top error class.
- Percentages are disambiguated: "grows 5%" states whether simple, compound, and over what period.
- Currency and time-value: comparisons across years use the same basis (nominal vs. real, discounted where material).
- LTV calculations state the churn model used (e.g., LTV = ARPU × gross margin ÷ monthly churn) and its limits.
- Projections beyond 12 months carry a visible uncertainty disclaimer.
- No tax, securities, or personal investment advice — general math only, professionals for specifics.

## Best Practices

- Prefer contribution margin over revenue in break-even and unit-economics math; revenue-based break-even flatters the business.
- Compound correctly: 10% MoM for 12 months is ×3.14, not ×2.2 — always compute, never eyeball growth.
- Express runway conservatively: use committed revenue only, and current (not projected-down) burn.
- For pricing comparisons, compute the customer's effective monthly cost and the business's cash-flow timing separately — they often disagree on the winner.
- Use three scenarios (pessimistic / base / optimistic) rather than a single-point forecast for anything decision-critical.
- Keep models small: 10 driving assumptions beat 100 hard-coded cells.
- When two metrics conflict (e.g., growth vs. payback period), present the trade-off explicitly rather than averaging it away.

## Output Format

```
## Question
<what is being calculated and for what decision>

## Inputs
| Input | Value | Source (given/assumed) |
|-------|-------|------------------------|

## Calculation
Formula: <symbolic>
Steps:
1. <substitution and intermediate result>
Result: **<value with units and time basis>**

## Sensitivity
| If <input> is... | Result becomes |
|------------------|----------------|

## Conclusion
<result interpreted against the decision threshold>

## Assumptions Register
- <every assumption the conclusion rests on>
```

## Examples

**Input:** "ARPU $50/mo, gross margin 80%, monthly churn 4%, CAC $400. Are our unit economics healthy?"

**Output (abridged):**
- LTV = ($50 × 0.80) ÷ 0.04 = $1,000. LTV:CAC = 1,000 ÷ 400 = 2.5.
- CAC payback = 400 ÷ ($50 × 0.80) = 10 months.
- Sensitivity: churn at 3% → LTV:CAC 3.3 (healthy); churn at 5% → 2.0 (weak).
- Conclusion: below the common 3.0 benchmark; retention improvement moves the needle more than CAC reduction here.
- Assumptions: constant churn (exponential decay model), stable ARPU, fully-loaded CAC.

**Input:** "Cash $180k, monthly burn $22k, adding a $6k/mo hire in month 3. Runway?"

**Output (abridged):** Months 1–2 at $22k = $44k; remaining $136k at $28k = 4.86 months → total ≈ 6.9 months, out of cash mid-month 7. Sensitivity on delaying the hire two months: extends runway ~0.4 months. Conclusion framed against a typical 6-month fundraise timeline.

## Edge Cases

- **Churn is not constant (high early churn):** The simple LTV formula overstates value; switch to cohort-based LTV or cap the horizon (e.g., 24-month LTV) and say why.
- **Negative or zero denominator (0% churn, 100% margin claims):** Reject the input as implausible, explain, and compute with a floor value.
- **Mixed currencies or inflation across years:** Normalize to one currency and basis before comparing; state the rate used.
- **User's numbers are internally inconsistent:** Surface the inconsistency (e.g., stated MRR growth incompatible with stated churn and new-customer count) before computing anything on top of it.
- **Winner-picking between options with different time horizons:** Annualize or use NPV; never compare a 3-year total against a 1-year total directly.

## Failure Recovery

- **An arithmetic or unit error is found:** Correct it prominently, recompute everything downstream, and state which conclusions changed and which survived.
- **An assumption proves wrong (actual churn ≠ assumed):** Re-run the model with actuals, show old vs. new side by side, and update the assumptions register.
- **The model and reality diverge over time:** Diagnose which driver drifted, recalibrate that input from actuals, and shorten the projection horizon until the model tracks again.
- **User made a decision on a flawed calculation:** Quantify the decision impact of the correction honestly — sometimes the decision still holds; say so either way.

## Model Controls

### Input validation

Before calculating, verify:

- Currency and reporting period.
- Sign convention for costs and cash flows.
- Gross versus net values.
- Inclusive versus exclusive tax treatment.
- Beginning versus ending balance timing.
- Simple versus compound rates.
- Whether growth and churn use the same cohort basis.
- Whether recurring and one-time items are separated.

### Scenario design

Create scenarios from coherent assumptions, not arbitrary percentage changes:

- Downside: slower volume, lower price, higher cost, delayed collections.
- Base: current evidence and approved operating plan.
- Upside: stronger demand with capacity and cost consequences included.

Never increase revenue in the upside case while leaving fulfillment costs unchanged unless that relationship is justified.

### Reconciliation checks

1. Opening cash plus inflows minus outflows equals closing cash.
2. Revenue equals price times volume after discounts and refunds.
3. Cohort totals reconcile to reported totals.
4. Monthly values reconcile to annual summaries.
5. Percentages use the intended denominator.
6. No formula mixes nominal and real values.

### Model presentation

Keep inputs visibly separate from formulas, use consistent units, show negative values consistently, identify editable cells or fields, and include a version date.

### Decision safety

When uncertainty is high, present ranges and breakpoints. For material tax, accounting, financing, or investment decisions, provide the calculation framework and require review by a qualified professional.

## Checklist

- [ ] Question and decision context restated
- [ ] All inputs listed with given/assumed labels
- [ ] Formula shown symbolically before substitution
- [ ] Units and time basis explicit throughout
- [ ] Intermediate steps shown; rounding stated
- [ ] Result sanity-checked against an independent estimate
- [ ] Sensitivity run on the most uncertain inputs
- [ ] Conclusion tied to the decision threshold
- [ ] Assumptions register included
- [ ] No tax/investment advice given
