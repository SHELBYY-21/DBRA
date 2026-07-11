# Code Reviewer

## Description

Trigger this skill when reviewing a patch, pull request, commit, module, or proposed refactor for correctness, maintainability, tests, performance, security, accessibility, and architectural fit.

## Goal

Find consequential defects early, explain them precisely, and recommend minimal verified fixes while avoiding noisy style commentary already handled by automation.

## Trigger Examples

- "Review this pull request."
- "Check this patch for bugs."
- "Review the refactor."
- "Are these tests sufficient?"
- "Find security issues in this diff."
- "Give me merge feedback."

## Workflow

1. Read the change goal and acceptance criteria.
2. Inspect the full diff and affected call paths.
3. Read surrounding code, tests, configuration, and data contracts.
4. Identify changed behavior and preserved invariants.
5. Trace happy, failure, boundary, and concurrency paths.
6. Check authentication, authorization, validation, and data exposure.
7. Review lifecycle, cleanup, cancellation, and retry behavior.
8. Check performance against expected scale.
9. Check accessibility for user-facing changes.
10. Evaluate tests for behavioral coverage and false confidence.
11. Run available checks when permitted.
12. Rank findings by severity and confidence.
13. Provide exact file and line references.
14. Suggest the smallest correct fix.
15. Summarize residual risk and merge readiness.

## Rules

- Review behavior, not author preference.
- Read beyond the changed lines.
- Report only actionable findings.
- Separate blocking defects from suggestions.
- Explain the failure scenario.
- Include evidence or reasoning.
- Do not invent runtime behavior.
- Do not report formatter issues when automated.
- Avoid requesting broad refactors unrelated to the change.
- Check backward compatibility.
- Check data migrations and rollout order.
- Treat authorization omissions as blockers.
- Treat exposed secrets as blockers.
- Verify cleanup for resources and subscriptions.
- Check retries for duplicate side effects.
- Check errors for sensitive leakage.
- Do not approve tests that only mirror implementation.
- Recognize strengths worth preserving.
- State uncertainty.
- Re-review changed fixes, not only the original diff.

## Best Practices

- Start with the highest-risk boundary.
- Reconstruct the user-visible behavior.
- Search for all callers of changed interfaces.
- Compare with established repository patterns.
- Inspect generated types and schemas when contracts change.
- Use counterexamples to validate logic.
- Check empty, null, maximum, and malformed values.
- Check timezone and locale assumptions.
- Check races around read-modify-write sequences.
- Check transaction boundaries.
- Check cancellation and timeout propagation.
- Check logs for personal or secret data.
- Ensure error messages help operators without leaking internals.
- Prefer regression tests reproducing each confirmed defect.
- Review test assertions for meaningful outcomes.
- Identify flaky timing assumptions.
- Consider rollback and feature-flag behavior.
- Keep comments concise and respectful.
- Consolidate duplicate findings.
- End with a clear merge recommendation.

## Output Format

```markdown
# Code Review: <change>

## Summary
- Intent:
- Risk level:
- Recommendation: approve | comment | request changes

## Findings
### [Severity] <short title>
- Location: `<file>:<line>`
- Scenario:
- Impact:
- Evidence:
- Minimal fix:
- Suggested test:

## Test Coverage
- Present:
- Missing:

## Strengths
- <patterns to preserve>

## Residual Risk
```

## Examples

### Authorization defect

**Blocker — Cross-tenant update is possible**

The handler filters by record ID but not session tenant ID. A user who learns another ID can update that record. Include trusted tenant scope in the update predicate and add a cross-tenant denial test.

### Retry defect

**High — Payment creation can duplicate on timeout**

The client retries the mutation, but no idempotency key is persisted. Generate one per checkout attempt and reuse it across retries.

### Non-finding

Do not request renaming a local variable solely for taste when it is clear and follows repository convention.

## Edge Cases

- **Large generated diff:** Review generator inputs and sample outputs.
- **Migration:** Verify expand/migrate/contract ordering.
- **Feature flag:** Check both states and removal plan.
- **Async code:** Check cancellation, timeout, ordering, and duplicate completion.
- **Caching:** Check key scope, invalidation, and sensitive data.
- **UI:** Check keyboard, focus, semantics, loading, and errors.
- **Infrastructure:** Check least privilege and rollback.
- **Dependency update:** Read release notes and changed transitive risk.
- **Test-only change:** Ensure it improves signal rather than masking failures.
- **Emergency patch:** Keep scope minimal but require follow-up ownership.

## Failure Recovery

- If context is missing, request the contract or state assumptions.
- If checks cannot run, state exactly what remains unverified.
- If a finding is disproven, retract it clearly.
- If the patch changes during review, refresh the diff and re-check affected paths.
- If many findings share one root cause, report the root cause once with instances.
- If severity is disputed, explain user impact and exploitability.
- If a suggested fix introduces scope creep, replace it with the minimal correction.
- If review misses a production defect, add the scenario to future checklists and tests.

## Checklist

- [ ] Goal and acceptance criteria are understood.
- [ ] Full diff is reviewed.
- [ ] Surrounding code is inspected.
- [ ] Callers and contracts are traced.
- [ ] Happy and failure paths are checked.
- [ ] Boundary values are checked.
- [ ] Auth and tenant scope are checked.
- [ ] Input validation is checked.
- [ ] Sensitive output and logs are checked.
- [ ] Concurrency and retries are checked.
- [ ] Cleanup and cancellation are checked.
- [ ] Performance is proportional to scale.
- [ ] Accessibility is checked where relevant.
- [ ] Migration and rollout are safe.
- [ ] Tests assert behavior.
- [ ] Findings include locations.
- [ ] Findings explain impact.
- [ ] Minimal fixes are suggested.
- [ ] Strengths are noted.
- [ ] Merge recommendation is explicit.
