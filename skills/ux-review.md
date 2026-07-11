# UX Review

## Description

Trigger this skill when a user asks to assess usability, interaction flow, navigation, accessibility, conversion friction, onboarding, forms, or task completion. Use it for screenshots, prototypes, live products, requirements, or analytics-backed reviews. Use `ui-review` for primarily visual styling concerns.

## Goal

Produce an evidence-based usability review that identifies where users may fail, explains why, prioritizes impact, and recommends testable fixes without redesigning the product unnecessarily.

## Trigger Examples

- "Review this checkout flow."
- "Why are users abandoning onboarding?"
- "Audit this form for usability."
- "Is this navigation intuitive?"
- "Check the mobile experience before launch."
- "Evaluate this workflow for accessibility."

## Workflow

1. Define the primary user, context, device, and job to be done.
2. State the review scope and evidence available.
3. Map the shortest successful path from entry to outcome.
4. List decisions, inputs, system responses, and recovery points.
5. Run a heuristic review against visibility, match, control, consistency, prevention, recognition, flexibility, minimalism, recovery, and help.
6. Check information architecture and labels using user language.
7. Audit forms, validation, defaults, and input effort.
8. Audit loading, empty, error, offline, permission, and success states.
9. Review keyboard use, focus order, semantics, touch targets, and announcements.
10. Identify trust gaps around pricing, privacy, destructive actions, and data use.
11. Separate observed issues from hypotheses.
12. Score each issue by severity, frequency, reach, and confidence.
13. Recommend the smallest fix that addresses the root cause.
14. Define a validation method and success metric.
15. Summarize the top three interventions.

## Rules

- Tie every finding to a user goal.
- Distinguish evidence from inference.
- Do not claim analytics findings without data.
- Never use dark patterns.
- Preserve user control and reversibility.
- Make destructive actions explicit and confirm consequential ones.
- Prefer recognition over recall.
- Use plain, domain-appropriate language.
- Do not hide required costs or conditions.
- Treat accessibility barriers as usability defects.
- Do not prescribe extra steps without a risk-based reason.
- Keep primary paths direct.
- Avoid modal chains.
- Never rely on color alone for meaning.
- Require useful errors near the source.
- Preserve entered data after recoverable errors.
- Avoid disabling primary actions without explaining why.
- Prioritize observed blockers over aesthetic preferences.
- Include review limitations.
- Recommend tests for uncertain findings.

## Best Practices

- Start with the user’s desired outcome, not the page hierarchy.
- Walk the flow as a first-time user and a returning expert.
- Test realistic long, empty, malformed, and interrupted inputs.
- Count choices and fields to reveal unnecessary cognitive load.
- Prefer progressive disclosure for advanced options.
- Use sensible defaults that are safe and reversible.
- Keep labels visible after input.
- Provide examples only when formats are genuinely ambiguous.
- Validate at the point where feedback is useful.
- Announce asynchronous results to assistive technology.
- Make loading states communicate progress or next expectations.
- Give empty states a reason and next action.
- Make success states confirm what happened and what follows.
- Test keyboard-only completion.
- Check zoom, reflow, reduced motion, and screen-reader names.
- Compare mobile and desktop task parity.
- Use funnels, recordings, support tickets, and interviews together.
- Phrase recommendations as hypotheses when evidence is limited.
- Pilot high-risk changes before broad rollout.
- Track guardrail metrics alongside conversion.

## Output Format

```markdown
# UX Review: <flow or screen>

## Context
- Primary user:
- Job to be done:
- Entry point:
- Success state:
- Evidence reviewed:
- Limitations:

## Journey Map
| Step | User intent | Action | System response | Friction |
|---|---|---|---|---|

## Findings
| Priority | Step | Finding | Evidence | User impact | Recommendation |
|---|---|---|---|---|---|

## Accessibility
- Blockers:
- Improvements:

## Top Interventions
1. <change, rationale, metric>
2. <change, rationale, metric>
3. <change, rationale, metric>

## Validation Plan
| Hypothesis | Method | Metric | Guardrail |
|---|---|---|---|
```

## Examples

### Checkout review

**Finding:** Shipping cost appears only after account creation.

**Impact:** Users cannot evaluate total cost before investing effort, weakening trust and increasing late abandonment.

**Fix:** Show an estimated shipping range on the cart and request location before account creation only if needed for accuracy.

**Validation:** Compare cart-to-payment progression and support contacts about shipping; monitor refund rate as a guardrail.

### Form review

**Finding:** A disabled submit button gives no explanation.

**Impact:** Users must scan the form and remember all requirements.

**Fix:** Keep the action available, validate on attempt, move focus to an error summary, and link each message to its field.

### Navigation review

**Finding:** Internal labels such as “Workspace Objects” do not match customer vocabulary.

**Impact:** New users cannot predict the destination.

**Fix:** Rename it to the tested user term and preserve the internal term only in documentation.

## Edge Cases

- **Regulated flows:** Keep mandatory disclosures, but optimize timing, hierarchy, and comprehension.
- **Expert tools:** Allow shortcuts and density while preserving discoverability for new users.
- **Irreversible actions:** Add consequence language, confirmation, and a safer alternative when possible.
- **Multi-user workflows:** Review handoffs, ownership, notifications, and conflict resolution.
- **Offline products:** Define queued, failed, synchronized, and conflicted states.
- **AI interfaces:** Show uncertainty, data use, review controls, and correction paths.
- **Children or vulnerable users:** Apply stricter consent, privacy, and comprehension standards.
- **Localization:** Test expansion, right-to-left layout, formats, and culturally dependent labels.
- **Screenshot-only review:** Do not infer hidden interactions; list them as unverified.
- **No analytics:** Use heuristic confidence labels and recommend instrumentation.

## Failure Recovery

- If scope is unclear, review the primary task and label assumptions.
- If evidence conflicts, segment by user type or context before deciding.
- If a fix lowers another metric, examine guardrails and user harm before optimizing conversion.
- If users still fail, observe task attempts and revisit the journey map.
- If implementation constraints block the ideal fix, offer minimum, intermediate, and ideal options.
- If findings are disputed, turn the disagreement into a moderated test.
- If accessibility cannot be verified, avoid a pass claim and request assistive-technology testing.
- If the review becomes a visual critique, separate UI findings into a secondary section.

## Checklist

- [ ] Primary user and job are explicit.
- [ ] Entry and success states are defined.
- [ ] Complete happy path is mapped.
- [ ] Errors and interruptions are reviewed.
- [ ] Findings distinguish evidence from inference.
- [ ] User impact accompanies every issue.
- [ ] Accessibility is included.
- [ ] Trust and privacy are considered.
- [ ] Priorities reflect severity and reach.
- [ ] Recommendations address root causes.
- [ ] Top interventions are limited to three.
- [ ] Each uncertain change has a validation plan.
- [ ] Metrics include guardrails.
- [ ] Review limitations are stated.
- [ ] No dark patterns are recommended.
- [ ] User control and recovery are preserved.
- [ ] Mobile and keyboard paths are considered.
- [ ] Language matches user vocabulary.
- [ ] Required effort is minimized.
- [ ] Output is immediately actionable.
