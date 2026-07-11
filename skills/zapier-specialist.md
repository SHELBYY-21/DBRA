# Zapier Specialist

## Description

Trigger this skill when designing, building, reviewing, or troubleshooting Zapier automations, Zaps, tables, interfaces, webhooks, paths, filters, formatters, schedules, and app connections. Use it to turn a business process into a reliable no-code automation.

## Goal

Create maintainable Zapier automations that save measurable work, preserve data quality, handle retries safely, and make failures visible to an accountable owner.

## Trigger Examples

- "Automate lead routing in Zapier."
- "Fix duplicate records in this Zap."
- "Design a multi-step approval Zap."
- "Connect our form to the CRM."
- "Add webhook handling to Zapier."
- "Audit our Zapier workspace."

## Workflow

1. Define the business outcome, owner, trigger, and completion state.
2. Map the manual process and exception paths.
3. Confirm source and destination systems and permissions.
4. Choose the most reliable native trigger or webhook.
5. Define a canonical record key for deduplication.
6. Add filters before expensive actions.
7. Normalize and validate fields with Formatter or code only when needed.
8. Use Paths only for genuinely different workflows.
9. Design idempotent creates and updates.
10. Add delays only for documented timing dependencies.
11. Define error handling, replay, and owner alerts.
12. Test with realistic records and edge values.
13. Name every Zap and step for operational clarity.
14. Document data mapping and credentials ownership.
15. Measure task usage, failures, latency, and business value.

## Rules

- Automate a defined process, not an unclear habit.
- Assign one business owner and one technical owner.
- Prefer native app actions over fragile browser workarounds.
- Never store secrets in plain text fields or step notes.
- Use least-privilege connections.
- Filter early to reduce tasks and side effects.
- Use a stable external ID to prevent duplicates.
- Do not rely on names or email alone when a stable ID exists.
- Make updates safe to replay.
- Avoid infinite Zap-to-Zap loops.
- Mark automation-originated records when loop prevention needs it.
- Validate required fields before destination actions.
- Preserve source timestamps and identifiers.
- Keep personally identifiable data to the minimum required.
- Do not use arbitrary delays as a substitute for state checks.
- Alert on exhausted retries.
- Include enough context in alerts to recover safely.
- Test Paths independently.
- Version major workflow changes.
- Disable obsolete Zaps after migration verification.

## Best Practices

- Name Zaps as `Domain - Trigger - Outcome - vN`.
- Name steps by business action, not connector name.
- Put a short purpose and owner in the description.
- Use lookup-before-create for entities that must be unique.
- Store cross-system IDs in dedicated fields.
- Use webhooks with signatures when the source supports them.
- Return webhook responses quickly and defer heavy work.
- Keep transformations simple and documented.
- Prefer one clear Zap to chains of opaque sub-Zaps.
- Use Sub-Zaps only for stable shared logic.
- Centralize alerting conventions.
- Add a dead-letter table or queue for manual replay when volume matters.
- Use test accounts or sandbox destinations where available.
- Test missing, malformed, duplicate, and out-of-order records.
- Review task consumption before polling frequently.
- Monitor expiring connections.
- Export or document critical configurations.
- Schedule quarterly ownership and permission reviews.
- Compare automated results with source totals.
- Retire manual steps explicitly after adoption.

## Output Format

```markdown
# Zapier Automation: <name>

## Business Outcome
- Owner:
- Trigger:
- Success state:
- Volume:
- Value metric:

## Flow
| Step | Zapier component | Input | Logic | Output | Failure action |
|---|---|---|---|---|---|

## Data Mapping
| Source field | Transform | Destination field | Required | Sensitive |
|---|---|---|---|---|

## Deduplication and Replay
- Canonical key:
- Lookup behavior:
- Idempotency behavior:
- Replay procedure:

## Test Cases

## Monitoring and Ownership
```

## Examples

### Lead routing

Trigger on a new qualified form submission, validate consent and company email, find or create the CRM contact by source ID, route by region through mutually exclusive Paths, create the opportunity, and alert the owner only after a final failure.

### Invoice synchronization

Use invoice ID as the canonical key. Find the destination invoice before creating it. On updates, write only mapped fields and preserve destination-only accounting notes.

### Loop prevention

When two systems update each other, write an `automation_source` marker and filter events produced by the opposite synchronization Zap, while still allowing genuine user changes.

## Edge Cases

- **Duplicate triggers:** Use lookup and stable IDs before creating records.
- **Out-of-order events:** Compare source version or update timestamp.
- **Partial Paths:** Ensure every expected case has exactly one route.
- **Expired connection:** Alert the connection owner with reconnection instructions.
- **Attachment limits:** Validate type and size before transfer.
- **Rate limits:** Reduce polling, batch where supported, and honor retry windows.
- **Timezone schedules:** Store timezone explicitly and test daylight-saving transitions.
- **Deleted source record:** Define whether to archive, ignore, or delete downstream.
- **Schema changes:** Detect missing mapped fields before corrupting data.
- **Human approval:** Store pending state and resume from an explicit approval event.

## Failure Recovery

- If duplicates appear, pause creation, identify the canonical ID, merge safely, and add lookup-before-create.
- If a Zap loops, disable both directions, mark automation-originated events, and replay only verified records.
- If records are missing, compare source event IDs with Zap history and destination IDs.
- If a field mapping breaks, stop affected writes, repair the mapping, and replay from the dead-letter source.
- If retries exhausted, alert the owner with record ID, failed step, safe replay link, and data snapshot.
- If credentials are compromised, revoke the connection and audit task history.
- If task usage spikes, inspect trigger noise and move filters earlier.
- If migration fails, re-enable the prior version and replay only unprocessed IDs.

## Checklist

- [ ] Business outcome is measurable.
- [ ] Manual and exception paths are mapped.
- [ ] Owners are assigned.
- [ ] Trigger is reliable.
- [ ] Connections use least privilege.
- [ ] Canonical record key is defined.
- [ ] Filters run before expensive actions.
- [ ] Required fields are validated.
- [ ] Mapping preserves source IDs.
- [ ] Creates are deduplicated.
- [ ] Updates are replay-safe.
- [ ] Loop prevention is present.
- [ ] Paths are mutually understood.
- [ ] Delays have a documented reason.
- [ ] Sensitive data is minimized.
- [ ] Edge cases are tested.
- [ ] Final failures alert an owner.
- [ ] Replay procedure is documented.
- [ ] Task consumption is monitored.
- [ ] Obsolete versions are retired.
