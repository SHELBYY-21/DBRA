# UI Review

## Description

Trigger this skill when the user asks for a visual/interface critique: "review this UI", "does this look right?", "why does this design feel off?", screenshots of interfaces for feedback, or pre-launch visual QA. This skill covers visual design quality — layout, typography, color, spacing, hierarchy, consistency, and responsive behavior. For interaction flows and usability, use the ux-review skill.

## Goal

Deliver a specific, prioritized visual critique where every issue names the element, the principle violated, and the concrete fix — so the user can act on it immediately rather than absorb vague aesthetic opinions.

## Trigger Examples

- "Review the visual design of this dashboard."
- "Something feels off about this landing page — what is it?"
- "Check this screen before we ship it."
- "Is my typography hierarchy working?"
- "Critique the spacing and alignment here."
- "Does this hold up on mobile?"

## Workflow

1. **Establish context.** Product type, target audience, brand constraints, and the screen's job. A data-dense admin table and a marketing hero obey different rules.
2. **First-impression pass (5 seconds).** Record what the eye lands on first, second, third. Compare against what *should* command attention.
3. **Hierarchy audit.** Verify size, weight, color, and position rank elements by importance. Find elements fighting for the same attention level.
4. **Spacing and alignment audit.** Check for a consistent spacing scale, aligned edges, balanced padding, and grouping that reflects relatedness (proximity principle).
5. **Typography audit.** Count font families (max 2), check the size scale, line-height (1.4–1.6 body), line length (45–75 chars), and contrast of text styles between levels.
6. **Color audit.** Count distinct colors (3–5 total), verify semantic consistency (one meaning per color), check contrast ratios (WCAG AA: 4.5:1 body text, 3:1 large text).
7. **Consistency audit.** Buttons, inputs, cards, and icons should each look like one family: same radii, same shadows, same states.
8. **Responsive audit.** Check the smallest supported width: overflow, wrapped controls, tap-target size (44px minimum), and readable type.
9. **Prioritize and report.** Group issues into blockers, high, and polish. Lead with the two changes that most improve the screen.

## Rules

- Every issue must name: the element, the principle violated, and the specific fix. "The header feels cramped" becomes "Header: 8px padding below the title crowds the subtitle; use the 24px step from your spacing scale."
- Critique against the design's own system first (its established spacing, colors, components) before external standards.
- Contrast failures on body text and primary actions are always blockers, never polish.
- Do not prescribe taste changes (e.g., "use a serif") without tying them to the audience and product context.
- One visual accent per view: if everything is emphasized, flag it as the core issue.
- Screenshot-only reviews state their limits: hover states, motion, and real-content behavior are unverified.
- Praise what works — the review must identify strengths to preserve, or fixes may destroy them.
- Never review against personal preference when the user's brand guidelines say otherwise.

## Best Practices

- Squint test: blur the view mentally; the hierarchy should survive. If everything merges into equal gray, hierarchy is weak.
- Check real content, not lorem ipsum: long names, empty states, and worst-case data break more layouts than critique does.
- Trace the spacing scale: measure a few gaps; a mix of 13px, 18px, 22px signals no system — recommend snapping to a 4/8px scale.
- Look at corners and edges: misaligned edges and inconsistent radii are the fastest tells of unpolished UI.
- Evaluate states, not just the default: hover, focus, disabled, loading, error, empty. A UI is its states.
- Compare against two strong competitors' equivalent screens for calibration, not for copying.
- Recommend the smallest set of changes with the biggest effect first; a 40-item list gets ignored.

## Output Format

```
## UI Review: <screen name>
Context: <product, audience, screen's job>

## What Works
- <strengths to preserve>

## Blockers
| Element | Issue | Principle | Fix |
|---------|-------|-----------|-----|

## High Priority
| Element | Issue | Principle | Fix |
|---------|-------|-----------|-----|

## Polish
- <smaller refinements>

## Top 2 Changes
1. <the highest-leverage fix>
2. <the second>
```

## Examples

**Input:** "Review this pricing page screenshot."

**Output (abridged):** Works: clear three-tier layout, strong CTA color reserved for one button. Blocker: gray-on-white feature text at ~3:1 contrast fails AA — darken to the 700-step of the neutral scale. High: the middle tier's "Popular" badge, larger card, and different button style triple-emphasize — keep the scale change, drop the button variant. Polish: unify 6px/8px/10px radii to one token. Top change: fix the feature-text contrast.

**Input:** "Why does my dashboard feel cluttered?"

**Output (abridged):** Diagnosis: four competing font weights in cards, no spacing rhythm between widget groups (proximity violated — unrelated widgets sit closer than related ones), and five accent colors with no semantic mapping. Prescription: two-weight type system, 24px group gaps vs 12px intra-group, one accent plus semantic red/green only.

## Edge Cases

- **Dense data UI (tables, trading, admin):** Density is a feature; critique scanning speed and column alignment, not whitespace quantity.
- **Deliberate brutalist / unconventional style:** Critique internal consistency and usability within the chosen style; do not normalize the style away.
- **Dark mode review:** Re-check every contrast ratio (they don't transfer), watch for pure-black backgrounds with vibrating saturated colors, and verify elevation still reads.
- **User pushes back on a finding:** Distinguish principle violations (defend with the reasoning) from taste calls (yield gracefully).
- **Only a partial screenshot provided:** Review what is visible; explicitly list what could not be assessed rather than extrapolating.

## Failure Recovery

- **A recommended fix made the screen worse:** Re-examine the interaction between fixes — a spacing fix can break a hierarchy fix; re-sequence changes one at a time with a look between each.
- **Review contradicted brand guidelines discovered later:** Retract the conflicting items explicitly, re-review against the guidelines, and note which findings survive both frames.
- **The user implemented all polish and no blockers:** Re-surface the blockers with their user impact stated concretely (e.g., "8% of users cannot read this text") and mark them unmissable in the next report.
- **Findings were too vague to act on:** Rewrite every unactioned finding into element + measurement + exact new value; vagueness is the reviewer's failure, not the reader's.

## Review Measurements

### Viewport set

Review at minimum:

- Small supported mobile width.
- Large mobile or narrow tablet.
- Standard desktop width.
- Wide desktop where line length and empty space change.
- Zoomed view at 200% for accessibility.

Use the product's actual supported breakpoints when known.

### State inventory

For every interactive component inspect default, hover, keyboard focus, active, disabled, loading, success, error, empty, and long-content states. Mark untested states explicitly.

### Visual token audit

Record the tokens actually used for:

- Background and surface colors.
- Text and muted text.
- Primary and destructive actions.
- Border and focus treatment.
- Radius scale.
- Spacing scale.
- Type sizes and weights.
- Elevation or shadow.

Flag one-off values that have no intentional role.

### Accessibility checks

Verify visible focus, logical reading order, non-color status cues, reduced-motion behavior, target size, text resizing, and contrast in every state.

### Fix validation

Apply high-impact recommendations one at a time. Compare before and after at all target viewports, re-check contrast and overflow, and preserve strengths named in the original review.

### Delivery gate

A UI review is complete when issues are evidence-based, prioritized by user impact, mapped to exact elements, expressed as measurable changes, and verified against brand and accessibility constraints.

## Checklist

- [ ] Context (audience, brand, screen job) established
- [ ] 5-second first-impression pass recorded
- [ ] Hierarchy verified against intended importance
- [ ] Spacing scale and alignment audited
- [ ] Typography: families ≤2, scale, line-height, line length checked
- [ ] Colors: count ≤5, semantics consistent, WCAG AA contrast verified
- [ ] Component consistency (radii, shadows, states) checked
- [ ] Responsive/smallest-width behavior assessed
- [ ] Every issue has element + principle + concrete fix
- [ ] Issues prioritized; top 2 changes named
