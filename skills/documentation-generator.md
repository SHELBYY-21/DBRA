# Documentation Generator

## Description

Trigger this skill when the user needs documentation written or improved: READMEs, API references, setup guides, architecture overviews, runbooks, changelogs, onboarding docs, or inline code documentation. Also applies when the user says "document this", "write docs for", or "explain this codebase for new developers".

## Goal

Produce documentation that a target reader can act on without asking follow-up questions — accurate to the current code, structured for scanning, and honest about gaps.

## Trigger Examples

- "Write a README for this project."
- "Document this API endpoint."
- "Create a setup guide for new developers."
- "Generate a changelog from these commits."
- "Write a runbook for deploying to production."
- "Our docs are outdated — bring them in line with the code."

## Workflow

1. **Identify the reader and their job.** New contributor, API consumer, on-call operator, or end user — each needs different content and depth.
2. **Verify against the source of truth.** Read the actual code, configs, and scripts before writing a single claim. Never document from memory or assumption.
3. **Choose the document type.** Tutorial (learning-oriented), how-to guide (task-oriented), reference (information-oriented), or explanation (understanding-oriented). Do not mix all four in one page.
4. **Draft the skeleton first.** Headings, then content — structure reveals gaps before writing burns time.
5. **Write task-first.** Lead with what the reader wants to accomplish; background goes after or links out.
6. **Include working examples.** Every code sample must be runnable as shown; every command must be copy-pasteable.
7. **Test the doc.** Follow your own setup guide in a clean environment mentally (or literally); every step that requires prior knowledge gets that knowledge added or linked.
8. **Add maintenance hooks.** Date the document, note which code it describes, and flag sections most likely to rot.

## Rules

- Never document behavior without verifying it in the current code.
- Every code example must be complete enough to run — no `...` in required positions.
- Prerequisites are stated before the first step, not discovered midway.
- Commands include their expected output or success signal so readers know it worked.
- No undefined jargon: first use of a project-specific term gets a one-line definition.
- Screenshots and version numbers are dated; prefer text output over screenshots where possible (it stays greppable and diffs cleanly).
- Environment variables and secrets are shown as placeholders with descriptions, never as real values.
- If a feature is deprecated, its documentation says so at the top, with the replacement linked.

## Best Practices

- Optimize for scanning: descriptive headings, short paragraphs, bulleted steps, tables for option lists.
- Put the most common task on the shortest path — the 80% use case should not scroll past the 20% edge cases.
- Write the quickstart to succeed in under five minutes; defer configuration depth to a separate page.
- Prefer one canonical document per topic over near-duplicates that drift apart.
- Use consistent terminology: pick one name per concept and stick to it throughout.
- Document the "why" for surprising decisions inline — future maintainers will otherwise "fix" them.
- Keep runbooks brutally imperative: numbered steps, exact commands, decision points as if/then.

## Output Format

README skeleton (adapt per document type):

```
# <Project Name>
<one-sentence description of what it does and for whom>

## Quickstart
<minimal steps from zero to first success>

## Requirements
<runtime versions, services, env vars as a table>

## Usage
<the 2-3 most common tasks with runnable examples>

## Configuration
<options table: name, default, description>

## Architecture (optional)
<one paragraph + diagram reference>

## Troubleshooting
<known failure → cause → fix>

## Contributing / License
```

API reference entries always include: method, path, auth, parameters (table), request example, response example, and error codes.

## Examples

**Input:** "Document our POST /api/orders endpoint."

**Output (abridged):** Verifies the route handler code first; documents auth requirement, request schema with required/optional fields in a table, a complete curl example, the 201 response body, and the actual error responses found in the code (400 validation shape, 401, 409 duplicate idempotency key) — not idealized ones.

**Input:** "Write a deploy runbook."

**Output (abridged):** Preconditions checklist (access, versions, green CI), numbered imperative steps with exact commands and expected output, a decision point ("if health check fails within 5 min → step 12: rollback"), rollback procedure, and post-deploy verification list.

## Edge Cases

- **Code and existing docs disagree:** Code wins; update the doc and note the correction visibly rather than silently.
- **Undocumented magic (implicit env vars, hidden setup steps):** Hunt them down via code and CI configs; a setup guide that works only on the author's machine is a failure.
- **Audience is mixed (developers and non-technical users):** Split into separate documents; a single compromise document serves neither.
- **The system is mid-refactor:** Document current behavior, add a clearly-marked "changing soon" note with the tracking reference — do not document the future as present.
- **No one knows why something works this way:** Write "reason unknown, behavior verified as of <date>" — honest uncertainty beats invented rationale.

## Failure Recovery

- **A reader followed the guide and it failed:** Treat it as a doc bug with the same severity as a code bug; reproduce, fix the step, and add the failure to Troubleshooting.
- **Docs have drifted badly from reality:** Triage — fix the quickstart and the top three tasks first; mark unverified sections with a visible "may be outdated" banner until each is re-verified.
- **Documentation is technically accurate but nobody understands it:** The reader model was wrong; re-interview an actual target reader, then rewrite task-first with their vocabulary.
- **Generated changelog misstates a change:** Correct it in place and in the release notes; changelogs are records, so append corrections rather than silently editing history.

## Documentation Quality Gates

### Information architecture

- Give each page one primary reader task.
- Use titles that match phrases readers search for.
- Keep navigation shallow and predictable.
- Link prerequisite concepts before advanced tasks.
- Put reference details near the feature they describe.
- Avoid orphan pages with no inbound navigation.

### Example validation

For each example:

1. Start from a clean environment.
2. Copy commands without hidden edits.
3. Use supported dependency versions.
4. Confirm expected output.
5. Test the documented failure case.
6. Remove credentials and machine-specific paths.
7. Mark platform-specific behavior.
8. Record the last verification date.

### Review roles

Use a technical reviewer for accuracy, a target-reader reviewer for clarity, and an owner for future maintenance. One person may fill multiple roles, but each responsibility must be explicit.

### Freshness controls

- Tie docs to code ownership.
- Require doc review for user-visible changes.
- Add automated link and snippet checks where practical.
- Mark generated sections and their source.
- Archive obsolete pages rather than leaving duplicates searchable.
- Schedule review for high-churn setup and API pages.

### Definition of done

Documentation is done when a representative reader completes the target task without undocumented knowledge, every command and example is verified, error recovery is included, and ownership is recorded.

## Checklist

- [ ] Target reader and their job identified
- [ ] Every claim verified against current code
- [ ] Document type chosen (tutorial/how-to/reference/explanation)
- [ ] Prerequisites listed before step one
- [ ] All examples runnable as shown
- [ ] Commands paired with expected output
- [ ] Project jargon defined on first use
- [ ] Secrets shown only as placeholders
- [ ] Document dated with maintenance notes
- [ ] Guide tested end-to-end (or gaps flagged)
