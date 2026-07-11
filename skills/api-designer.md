# API Designer

## Description

Trigger this skill when designing, reviewing, or evolving HTTP, REST, RPC, GraphQL, webhook, event, or internal service interfaces. Use it for endpoint contracts, versioning, errors, pagination, idempotency, authentication, and compatibility planning.

## Goal

Create predictable, secure, evolvable API contracts that model the domain clearly, support reliable clients, and minimize breaking changes and operational ambiguity.

## Trigger Examples

- "Design an API for subscriptions."
- "Review these REST endpoints."
- "Create a webhook contract."
- "How should pagination work?"
- "Version this public API."
- "Standardize our API errors."

## Workflow

1. Identify consumers, trust boundaries, latency needs, and scale.
2. Define domain resources, actions, invariants, and ownership.
3. Select an interface style based on client and operational needs.
4. Model canonical resource schemas and identifiers.
5. Define operations, inputs, outputs, and status semantics.
6. Specify authentication and authorization per operation.
7. Add validation constraints and normalization rules.
8. Define errors with stable machine codes and safe messages.
9. Choose pagination, filtering, sorting, and field-selection conventions.
10. Define idempotency and concurrency behavior.
11. Specify rate limits and retry guidance.
12. Design webhooks or events with signatures, replay protection, and delivery semantics.
13. Document observability fields and correlation identifiers.
14. Check backward compatibility and migration requirements.
15. Produce an executable contract and contract-test plan.

## Rules

- Model domain concepts, not database tables.
- Use stable opaque identifiers.
- Keep naming consistent across all operations.
- Use nouns for resources and explicit verbs only for domain actions.
- Never expose secrets or internal stack traces.
- Authenticate identity and authorize the specific action.
- Validate all untrusted input at the boundary.
- Make retries safe through idempotency where mutation replay is plausible.
- Define null, absent, and empty semantics explicitly.
- Use UTC timestamps in ISO 8601 format.
- State units in field names or schema descriptions.
- Return stable machine-readable error codes.
- Avoid silently ignoring unknown critical fields.
- Bound page sizes and payload sizes.
- Define deterministic ordering for pagination.
- Do not put sensitive values in URLs.
- Sign webhooks and protect against replay.
- Treat compatibility as a contract obligation.
- Deprecate before removal.
- Document consistency guarantees.

## Best Practices

- Start from consumer tasks and examples.
- Prefer boring conventions over clever endpoint shapes.
- Reuse common envelopes only when they add real consistency.
- Provide request and response examples for success and failure.
- Use cursor pagination for changing or large datasets.
- Include total counts only when affordable and required.
- Support conditional writes with versions or ETags for contested resources.
- Accept an idempotency key for externally retried creates and payments.
- Return the created or updated representation when useful.
- Include request IDs in responses and logs.
- Use problem details or an equivalent structured error format.
- Separate authentication failures from authorization failures carefully.
- Publish rate-limit headers and retry-after guidance.
- Keep webhook events immutable and uniquely identified.
- Allow webhook consumers to retrieve canonical current state.
- Generate clients from a reviewed source contract when practical.
- Run schema linting and breaking-change detection in CI.
- Maintain contract tests for producer and consumer assumptions.
- Document examples as tested artifacts where possible.
- Track endpoint ownership and lifecycle status.

## Output Format

```markdown
# API Contract: <service>

## Context
- Consumers:
- Trust boundary:
- Style:
- Base URL or transport:
- Compatibility policy:

## Resources
| Resource | Purpose | Identifier | Owner |
|---|---|---|---|

## Operations
### `<METHOD> <path>`
Purpose:
Authentication:
Authorization:
Idempotency:

Request:
```json
{}
```

Response:
```json
{}
```

Errors:
| Status | Code | Meaning | Retryable |
|---|---|---|---|

## Cross-Cutting Conventions
- Pagination:
- Filtering:
- Rate limits:
- Correlation:
- Timestamps:

## Compatibility and Migration

## Test Plan
```

## Examples

### Idempotent create

`POST /v1/orders` accepts `Idempotency-Key`. Repeating the same key and equivalent body returns the original result. Reusing the key with a different body returns `409 IDEMPOTENCY_CONFLICT`.

### Cursor pagination

`GET /v1/orders?limit=50&after=<cursor>` returns `data` and `next_cursor`. Ordering is fixed by `created_at DESC, id DESC`; the cursor encodes both fields.

### Structured error

```json
{
  "type": "https://api.example.com/problems/invalid-parameter",
  "title": "Invalid request",
  "status": 422,
  "code": "INVALID_PARAMETER",
  "request_id": "req_01J...",
  "errors": [{ "field": "quantity", "reason": "must be positive" }]
}
```

## Edge Cases

- **Bulk operations:** Define atomicity, per-item results, limits, and partial failure.
- **Long-running work:** Return an operation resource and polling or callback contract.
- **File transfer:** Use bounded uploads, content checks, and short-lived signed URLs.
- **Multi-tenant data:** Derive tenant scope from authenticated context when possible.
- **Search:** Clarify ranking stability and pagination limits.
- **Money:** Use integer minor units plus ISO currency.
- **Deletion:** Define soft deletion, retention, restoration, and tombstones.
- **Sensitive fields:** Apply field-level authorization and redaction.
- **Eventually consistent reads:** State expected delay and reconciliation path.
- **GraphQL:** Bound complexity, prevent N+1 access, and authorize resolvers.

## Failure Recovery

- If requirements conflict, prioritize correctness and contract clarity, then document the tradeoff.
- If an endpoint shipped with a mistake, add compatible behavior or a new version; do not reinterpret existing fields silently.
- If clients retry unsafe mutations, add idempotency before encouraging retries.
- If cursor ordering changes, issue a new cursor version and reject incompatible cursors clearly.
- If webhook delivery fails, retry with backoff, preserve event IDs, and expose replay controls.
- If authorization scope is uncertain, deny by default and request an explicit policy.
- If generated documentation diverges, make the executable schema the source of truth.
- If latency targets fail, measure payload, dependencies, and query plans before changing the contract.

## Checklist

- [ ] Consumers and trust boundaries are known.
- [ ] Domain resources are explicit.
- [ ] Naming is consistent.
- [ ] Authentication and authorization are distinct.
- [ ] Input constraints are complete.
- [ ] Errors are structured and safe.
- [ ] Pagination is bounded and deterministic.
- [ ] Idempotency is defined for retried mutations.
- [ ] Concurrency behavior is stated.
- [ ] Rate limits and retries are documented.
- [ ] Sensitive values avoid URLs and logs.
- [ ] Webhooks are signed and replay-resistant.
- [ ] Compatibility policy is explicit.
- [ ] Deprecation has a migration path.
- [ ] Observability includes request IDs.
- [ ] Examples cover failures.
- [ ] Contract tests are planned.
- [ ] Breaking-change checks are automated.
- [ ] Ownership is assigned.
- [ ] The contract is implementable as written.
