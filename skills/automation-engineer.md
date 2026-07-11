# Automation Engineer

## Description

Trigger this skill when the user wants to automate a repetitive process: connecting apps, building scheduled jobs, designing event-driven pipelines, writing scripts to replace manual work, or deciding whether a task is worth automating at all. Covers webhooks, cron jobs, ETL flows, and no-code/low-code automation platforms.

## Goal

Design reliable, observable, maintainable automations that remove manual toil — with explicit error handling, idempotency, and a clear answer to "how do we know it broke?"

## Trigger Examples

- "Every Monday I export a CSV and email it to my team. Automate this."
- "When a Stripe payment succeeds, add the customer to our CRM."
- "Sync new Typeform responses into a database."
- "Build a cron job that cleans up stale records nightly."
- "Should I automate this, or is it faster to keep doing it manually?"
- "My webhook automation keeps double-processing events."

## Workflow

1. **Document the manual process.** Write out every step, input, output, and decision point as currently performed by a human.
2. **Justify the automation.** Estimate frequency × time per run × error cost. If total is trivial and the process changes often, recommend against automating.
3. **Choose the trigger.** Event (webhook), schedule (cron), or manual trigger with automated steps.
4. **Design the happy path.** Map data flow: source → transform → destination, with exact field mappings.
5. **Design the failure paths.** For every external call: what happens on timeout, 4xx, 5xx, and malformed data?
6. **Make it idempotent.** Ensure re-running the automation with the same input produces the same result, not duplicates.
7. **Add observability.** Logging on every run, alerting on failure, and a run-history view.
8. **Test with real data.** Run against production-shaped data in a sandbox before going live.
9. **Ship with a kill switch.** Provide a documented way to pause the automation instantly.

## Rules

- Every automation must be idempotent or explicitly deduplicated by an event ID.
- Every external API call must have a timeout and a retry policy with backoff.
- Failures must alert a human; silent failure is the worst outcome.
- Secrets live in environment variables or a secret manager, never in the workflow definition.
- Webhook receivers must verify signatures before processing payloads.
- Retries must be bounded; infinite retry loops are forbidden.
- Never delete source data as part of an automation; archive or flag instead.
- Every automation has a named owner and a written runbook.

## Best Practices

- Prefer event-driven triggers over polling when the source supports webhooks.
- Keep transformations pure and testable; isolate side effects at the edges.
- Use dead-letter queues (or a failed-items table) for payloads that repeatedly fail.
- Version your automation logic; log the version with each run.
- Batch high-volume operations to respect rate limits; add jitter to scheduled jobs.
- Start with the smallest slice: automate one step, verify it for a week, then extend.
- Prefer boring, managed infrastructure over custom schedulers when volume is low.

## Output Format

```
## Automation: <name>
**Trigger:** <event | schedule | manual>
**Owner:** <person/team>

## Flow
1. <source> → 2. <transform> → 3. <destination>

## Field Mapping
| Source Field | Transform | Destination Field |
|--------------|-----------|-------------------|

## Failure Handling
| Failure | Detection | Response | Alert |
|---------|-----------|----------|-------|

## Idempotency Strategy
<dedup key or natural idempotency explanation>

## Kill Switch
<how to pause immediately>
```

## Examples

**Input:** "When someone fills our contact form, create a CRM lead and notify Slack."

**Output (abridged):**
- Trigger: form webhook with signature verification.
- Flow: validate payload → upsert CRM lead keyed on email → post Slack message.
- Idempotency: upsert on email prevents duplicate leads; Slack message keyed on submission ID.
- Failure: CRM 5xx → retry 3x with exponential backoff → dead-letter table + alert.

**Input:** "Nightly job to archive orders older than 2 years."

**Output (abridged):** Cron at 02:00 with jitter; select in batches of 500; copy to archive table, verify row counts match, then flag (not delete) source rows; log batch stats; alert if runtime exceeds 2x median.

## Edge Cases

- **Source sends duplicate webhooks:** Deduplicate on the provider's event ID with a short-lived store before processing.
- **Out-of-order events:** Use timestamps or version numbers from the source; last-write-wins only if the source guarantees monotonic versions.
- **Partial batch failure:** Record per-item outcomes; retry only failed items, never the whole batch.
- **Schema change upstream:** Validate payloads against a schema; route mismatches to the dead-letter queue instead of guessing.
- **Rate limits hit mid-run:** Honor `Retry-After` headers; persist progress so the run resumes rather than restarts.
- **Automation platform outage:** Document the manual fallback procedure in the runbook.

## Failure Recovery

- **Duplicate records created:** Stop the automation, identify the dedup gap, backfill a cleanup script keyed on the natural identifier, then add the missing idempotency key before resuming.
- **Silent failure discovered late:** Replay from the dead-letter queue or source event log; add the missing alert; add a heartbeat check that alerts when the automation hasn't run on schedule.
- **Bad transform corrupted destination data:** Restore from the archive/flagged source data; add a validation step comparing pre/post record counts and checksums.
- **Runaway retry loop:** Trip the kill switch, cap retries, add circuit-breaker logic, and post-mortem why the bound was missing.

## Checklist

- [ ] Manual process documented step by step
- [ ] Automation ROI justified (frequency × time × error cost)
- [ ] Trigger type chosen and signature/auth verified
- [ ] Field mapping written explicitly
- [ ] Timeouts, bounded retries, and backoff configured
- [ ] Idempotency strategy implemented
- [ ] Dead-letter handling for repeated failures
- [ ] Logging, alerting, and heartbeat in place
- [ ] Tested against production-shaped data
- [ ] Kill switch and runbook documented
