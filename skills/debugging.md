# Debugging

## Description

Trigger this skill when the user reports broken behavior: errors, crashes, wrong output, flaky tests, performance regressions, "it worked yesterday", or "it works on my machine". Applies to any stack. The skill governs the diagnostic process itself, independent of language or framework.

## Goal

Find the root cause — not just a symptom patch — through systematic hypothesis testing, then fix it, verify the fix, and leave the system more debuggable than before.

## Trigger Examples

- "I'm getting `TypeError: cannot read properties of undefined`."
- "The form submits but nothing saves to the database."
- "This test passes locally but fails in CI."
- "The page got slow after last week's deploy."
- "Users report intermittent 500s but I can't reproduce."
- "Why does this work in dev but not production?"

## Workflow

1. **Reproduce first.** Establish a minimal, reliable reproduction. A bug you cannot reproduce, you cannot verify fixed.
2. **Read the actual error.** The full message, the full stack trace, the line numbers. Most bugs are solved by reading what the system already said.
3. **Establish the last-known-good state.** What changed between working and broken? Diff code, dependencies, config, environment, and data.
4. **Form one hypothesis.** State it falsifiably: "The session cookie is not sent because the domain mismatches."
5. **Design the cheapest test of that hypothesis.** A log line, a breakpoint, a curl request, an isolated snippet — the test must be able to prove the hypothesis wrong.
6. **Bisect when lost.** Binary-search the change history, the code path, or the data until the fault is cornered.
7. **Fix the root cause.** If shipping a symptom-level mitigation first is necessary, label it as such and keep the root-cause investigation open.
8. **Verify by re-running the original reproduction.** The exact failing case must now pass, plus neighboring cases.
9. **Prevent recurrence.** Add the regression test, the assertion, or the log line that would have caught this in minutes.

## Rules

- No fix without reproduction (or, for unreproducible production issues, without correlated evidence from logs/traces).
- One hypothesis at a time; changing three things and seeing it work teaches nothing.
- Never claim a root cause you cannot demonstrate; "probably a caching thing" is not a diagnosis.
- Revert-first when a recent change broke production; investigate at leisure afterward.
- Debug statements are removed or converted to structured logging after resolution — no leftover noise.
- "Works now" without an explanation is a paused bug, not a fixed one; log it as such.
- Do not blame the compiler, the framework, or cosmic rays until user code is ruled out — it is user code >99% of the time.
- Every resolved non-trivial bug produces one prevention artifact (test, assertion, alert, doc note).

## Best Practices

- Minimize the reproduction aggressively: half the time, shrinking the repro reveals the cause by itself.
- Check the boring things first: is the right server running, the right branch deployed, the cache cleared, the env var set?
- Log at boundaries: inputs at entry, outputs at exit — most bugs live at the seams between components.
- Use differential debugging: find the closest working case and diff it against the failing case.
- For intermittent bugs, hunt the pattern: time of day, payload size, concurrency, specific users, specific data shapes.
- Trust the evidence over the mental model; when they conflict, the mental model is wrong.
- Keep a written debugging log for anything over 30 minutes: hypothesis → test → result. It prevents circular re-testing.

## Output Format

For each debugging session, report:

```
## Bug
Symptom: <observed behavior>
Expected: <correct behavior>
Reproduction: <minimal steps>

## Investigation
| Hypothesis | Test | Result |
|------------|------|--------|

## Root Cause
<the demonstrated cause, with the evidence>

## Fix
<what changed and why it addresses the root cause>

## Verification
<original repro re-run + neighboring cases checked>

## Prevention
<regression test / assertion / alert added>
```

## Examples

**Input:** "Form submits but nothing appears in the database."

**Output (abridged):** Boundary check: does the server action receive the payload? (log at entry — yes). Does the insert run? (log the query — no, an early return on a failed validation that swallows the error). Root cause: validation error silently discarded. Fix: return the validation error to the form and surface it. Prevention: test asserting a validation failure surfaces to the client.

**Input:** "Test passes locally, fails in CI."

**Output (abridged):** Diff the environments: Node version, timezone, locale, parallelism, missing env var, dirty state between tests. Hypothesis chain finds test-order dependency (a shared module-level cache). Fix: reset state in beforeEach. Prevention: run tests in random order in CI.

## Edge Cases

- **Cannot reproduce a production bug:** Shift to evidence-based debugging — correlate error tracking, structured logs, and traces around the incident timestamps; add targeted logging and wait for the next occurrence.
- **Heisenbug (disappears under observation):** Suspect timing and concurrency; replace breakpoints with lock-free logging; look for race conditions and unawaited promises.
- **Bug only in a specific customer's data:** Obtain a sanitized copy of the offending record; data-shape bugs (nulls, unicode, extreme lengths) dominate this category.
- **Third-party dependency at fault:** Prove it with a minimal repro against the library alone; then pin/patch/replace, and file the upstream issue with the repro.
- **Multiple bugs interacting:** Fix and verify them one at a time in isolation; simultaneous fixes hide which one mattered.

## Failure Recovery

- **The fix didn't fix it:** The root cause was wrong. Return to the last confirmed evidence, discard the disproven hypothesis chain, and widen the search — do not stack another patch on top.
- **The fix broke something else:** Revert both, understand the coupling between the two behaviors, and re-fix with the coupling explicitly handled.
- **Hours lost going in circles:** Stop. Write down everything known and every hypothesis disproven, take the list to fresh eyes (or explain it aloud) — articulation frequently exposes the gap.
- **Bug marked resolved recurs:** Reopen with the original log attached; the recurrence pattern (same trigger? new trigger?) is itself the next diagnostic clue; the prior prevention artifact clearly missed — strengthen it.

## Checklist

- [ ] Reproduction established (or evidence correlated for unreproducibles)
- [ ] Full error message and stack trace read
- [ ] Recent changes diffed (code, deps, config, data)
- [ ] Hypotheses tested one at a time, falsifiably
- [ ] Root cause demonstrated, not asserted
- [ ] Root cause fixed (mitigations labeled as such)
- [ ] Original reproduction re-run and passing
- [ ] Neighboring cases checked for collateral damage
- [ ] Debug noise removed or converted to structured logs
- [ ] Prevention artifact added (test/assertion/alert)
