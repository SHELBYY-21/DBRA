# Dashboard Designer

## Description

Trigger this skill when designing or reviewing operational, executive, analytical, financial, sales, product, or monitoring dashboards. Use it for KPI selection, information hierarchy, chart choice, filtering, comparison, alerts, and data trust.

## Goal

Create a decision-oriented dashboard that answers defined questions, communicates trustworthy metrics, and helps each audience act without visual noise or misleading analysis.

## Trigger Examples

- "Design a sales dashboard."
- "Choose charts for these metrics."
- "Improve our executive dashboard."
- "Build a monitoring view."
- "Audit KPI definitions."
- "Make this dashboard actionable."

## Workflow

1. Define audience, decisions, cadence, and device.
2. List the questions users must answer.
3. Define each metric, source, grain, timezone, and owner.
4. Establish targets, baselines, and comparison periods.
5. Rank information by decision priority.
6. Select chart types based on analytical task.
7. Design overview-to-detail navigation.
8. Add filters only when they change decisions.
9. Define loading, stale, empty, error, and partial states.
10. Add annotations for material events.
11. Check accessibility and color semantics.
12. Validate calculations against source data.
13. Test with realistic ranges and long labels.
14. Observe users answering target questions.
15. Track usage, trust issues, and action completion.

## Rules

- Start from decisions, not available data.
- Define every KPI unambiguously.
- Show units and time ranges.
- Compare metrics against meaningful baselines.
- Do not use a chart when a number or table is clearer.
- Avoid pie charts with many slices.
- Avoid dual axes unless the relationship is essential and explicit.
- Never truncate axes to exaggerate bar differences.
- Distinguish missing data from zero.
- Show data freshness.
- Use color consistently and sparingly.
- Never rely on color alone.
- Keep semantic red and green for status when culturally appropriate.
- Preserve exact values in accessible labels or tables.
- Limit default filters.
- Keep global and local filters visually distinct.
- Do not hide unfavorable results.
- Surface metric ownership and definition.
- Protect sensitive segment data.
- Optimize density for the audience.

## Best Practices

- Put the most consequential question first.
- Use KPI cards for status, not decoration.
- Pair a headline number with trend and target.
- Use lines for time, bars for category comparison, and tables for precise lookup.
- Use scatter plots for relationships.
- Use distributions when averages conceal variation.
- Add reference lines for targets and thresholds.
- Use small multiples for comparable series.
- Direct-label series when feasible.
- Sort categories intentionally.
- Use progressive disclosure for detail.
- Preserve filters in shareable URLs when appropriate.
- Add drill-through to underlying records.
- Explain anomalies with annotations.
- Provide downloadable data only with governed definitions.
- Design for worst-case values.
- Use skeletons without implying false precision.
- Warn when data is stale or partial.
- Verify mobile priorities separately.
- Maintain a metric dictionary.

## Output Format

```markdown
# Dashboard Specification: <name>

## Audience and Decisions
| Audience | Decision | Cadence | Required confidence |
|---|---|---|---|

## Metric Dictionary
| Metric | Definition | Formula | Grain | Source | Owner | Freshness |
|---|---|---|---|---|---|---|

## Layout
1. Executive status:
2. Drivers:
3. Segments:
4. Detail:

## Visualization Plan
| Question | Visualization | Encoding | Comparison | Interaction |
|---|---|---|---|---|

## States
- Loading:
- Empty:
- Error:
- Stale:
- Partial:

## Validation and Accessibility

## Success Metrics
```

## Examples

### Sales dashboard

Top row shows attainment, pipeline coverage, win rate, and forecast variance against target. Trends explain direction; segment bars identify region and owner drivers; a governed opportunity table supports action.

### Executive dashboard

Limit the overview to strategic outcomes and exceptions. Each KPI links to a driver view with owner, definition, freshness, and current intervention.

### Reliability dashboard

Show service-level objective, error-budget burn, latency percentiles, and incident annotations. Use alert thresholds aligned to response policy rather than arbitrary colors.

## Edge Cases

- **Sparse data:** Show counts and uncertainty; avoid unstable percentages.
- **Late-arriving data:** Label provisional windows and reconciliation timing.
- **Different timezones:** Declare reporting timezone and cutoff.
- **Currency conversion:** Show source currency, rate date, and conversion policy.
- **Privacy thresholds:** Suppress small cohorts and prevent differencing.
- **Real-time monitoring:** Separate live operational signals from settled reporting.
- **Forecasts:** Distinguish actuals, forecast, and confidence interval.
- **Many categories:** Use ranked bars or searchable tables.
- **Mobile:** Keep status and urgent actions; defer dense exploration.
- **No target:** Use prior period or peer baseline and label it clearly.

## Failure Recovery

- If users dispute a number, show lineage, definition, freshness, and reconciliation owner.
- If two dashboards conflict, identify grain, filters, timezone, and source differences.
- If rendering is slow, reduce query scope, precompute governed aggregates, and load detail progressively.
- If a chart misleads, replace it with the simplest encoding that answers the question.
- If filters create invalid comparisons, constrain combinations and explain why.
- If adoption is low, observe target decisions rather than adding more widgets.
- If data is stale, show a prominent warning and last successful refresh.
- If an executive metric changes definition, version it and annotate the transition.

## Checklist

- [ ] Audience and decisions are explicit.
- [ ] Questions precede visualizations.
- [ ] KPI definitions are governed.
- [ ] Sources and owners are named.
- [ ] Grain and timezone are stated.
- [ ] Targets or baselines are meaningful.
- [ ] Information follows decision priority.
- [ ] Chart types match analytical tasks.
- [ ] Axes and units are honest.
- [ ] Missing differs from zero.
- [ ] Data freshness is visible.
- [ ] Filters are limited and clear.
- [ ] Drill-through supports action.
- [ ] Color semantics are consistent.
- [ ] Accessibility alternatives exist.
- [ ] Sensitive segments are protected.
- [ ] Empty and error states are designed.
- [ ] Calculations are reconciled.
- [ ] Real users can answer target questions.
- [ ] Dashboard success is measured.
