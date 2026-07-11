# n8n Specialist

## Description

Trigger this skill when designing, implementing, reviewing, or debugging n8n workflows, nodes, credentials, webhooks, queues, sub-workflows, expressions, code nodes, and self-hosted operations.

## Goal

Build observable, secure, replay-safe n8n workflows that automate business processes without creating brittle hidden infrastructure.

## Trigger Examples

- "Build this workflow in n8n."
- "Debug an n8n webhook."
- "Scale n8n workers."
- "Prevent duplicate executions."
- "Design reusable sub-workflows."
- "Audit n8n credentials."

## Workflow

1. Define the outcome, owner, trigger, and success state.
2. Map normal, exception, and compensation paths.
3. Inventory systems, credentials, rate limits, and data sensitivity.
4. Choose trigger and execution mode.
5. Define canonical IDs and idempotency behavior.
6. Validate and normalize data near ingress.
7. Keep nodes focused and clearly named.
8. Extract stable shared logic into sub-workflows.
9. Add retries only for transient failures.
10. Add explicit error branches and dead-letter handling.
11. Bound batches, concurrency, payloads, and runtime.
12. Add execution metadata and correlation IDs.
13. Test with representative and adversarial inputs.
14. document deployment, credentials, ownership, and replay.
15. Monitor execution health and business outcomes.

## Rules

- Use least-privilege credentials.
- Never hardcode secrets in expressions or code nodes.
- Treat webhook data as untrusted.
- Verify webhook authenticity when supported.
- Validate required fields before side effects.
- Use stable IDs for deduplication.
- Make mutations replay-safe.
- Do not retry permanent validation failures.
- Cap retries and apply backoff.
- Avoid unbounded item fan-out.
- Avoid large binary data in execution storage.
- Keep Code nodes small and justified.
- Do not silently swallow node failures.
- Separate business errors from infrastructure errors.
- Record enough context for safe replay.
- Redact sensitive values from logs.
- Avoid cyclic workflow calls.
- Version exported workflows.
- Assign an owner to every production workflow.
- Define a rollback path before major changes.

## Best Practices

- Name workflows `Domain - Event - Outcome - vN`.
- Name nodes by business purpose.
- Add Sticky Notes for invariants and non-obvious constraints.
- Use Set/Edit Fields nodes to create explicit contracts.
- Prefer built-in nodes over custom code.
- Use Execute Workflow for stable reusable capabilities.
- Keep parent-child inputs and outputs documented.
- Respond quickly to webhooks before lengthy processing.
- Use queue mode when workload and availability justify it.
- Configure concurrency to protect dependencies.
- Use Split in Batches or Loop Over Items deliberately.
- Persist external operation IDs.
- Route exhausted failures to a dead-letter store.
- Include execution and source IDs in alerts.
- Test expired credentials and rate limits.
- Prune execution data according to privacy requirements.
- Back up workflow definitions and encryption keys securely.
- Separate development and production credentials.
- Review community nodes for supply-chain risk.
- Measure saved effort and exception rate.

## Output Format

```markdown
# n8n Workflow: <name>

## Outcome
- Owner:
- Trigger:
- Success state:
- Expected volume:
- Execution mode:

## Node Plan
| Node | Type | Input | Logic | Output | Error path |
|---|---|---|---|---|---|

## Data Contract
| Field | Type | Source | Required | Sensitive |
|---|---|---|---|---|

## Reliability
- Idempotency key:
- Retry policy:
- Dead-letter destination:
- Replay procedure:

## Security

## Test Matrix

## Operations
```

## Examples

### Webhook ingestion

Verify the signature, parse the source event ID, return an acknowledgment, deduplicate by event ID, validate the payload, then invoke a bounded processing sub-workflow.

### Batch synchronization

Fetch one cursor-bounded page, process records with controlled concurrency, persist the cursor only after successful completion, and route failed item IDs to a replay queue.

### Human approval

Persist pending state and a signed approval token, send the request, and resume from a separate authenticated webhook rather than holding an execution indefinitely without bounds.

## Edge Cases

- **Duplicate webhooks:** Return success for already completed event IDs.
- **Out-of-order updates:** Compare version or source timestamp.
- **Partial batch failure:** Record per-item outcomes and retry only failed IDs.
- **Binary files:** Stream or use object storage references.
- **Rate limits:** Honor reset headers and control concurrency.
- **Credential rotation:** Test the new credential before removing the old one.
- **Worker crash:** Resume from durable checkpoints.
- **Schema drift:** Fail validation and alert before downstream writes.
- **Timezone schedules:** Declare timezone and test DST.
- **Community node removal:** Maintain an export and migration path.

## Failure Recovery

- If executions duplicate side effects, pause the workflow and add a durable idempotency check.
- If a queue grows, inspect dependency latency, worker health, and concurrency before scaling.
- If a credential fails, rotate it and replay only confirmed unprocessed records.
- If a code node crashes, capture the minimal failing input and replace opaque logic with explicit nodes where possible.
- If a deployment breaks, restore the prior exported version and credential references.
- If execution data contains secrets, restrict access, purge according to policy, and rotate exposed credentials.
- If a sub-workflow contract changes, version it and migrate callers deliberately.
- If the error workflow fails, use an independent alert path.

## Checklist

- [ ] Outcome and owner are explicit.
- [ ] Trigger is authenticated where possible.
- [ ] Input is validated.
- [ ] Credentials use least privilege.
- [ ] Secrets are not hardcoded.
- [ ] Canonical IDs are preserved.
- [ ] Side effects are idempotent.
- [ ] Retryable failures are classified.
- [ ] Retries are bounded.
- [ ] Batch size and concurrency are bounded.
- [ ] Error path is explicit.
- [ ] Dead-letter handling exists.
- [ ] Replay is documented.
- [ ] Sensitive logs are redacted.
- [ ] Sub-workflow contracts are documented.
- [ ] Workflow exports are versioned.
- [ ] Development and production are separated.
- [ ] Execution retention is configured.
- [ ] Operational alerts have context.
- [ ] Business outcome is measured.
