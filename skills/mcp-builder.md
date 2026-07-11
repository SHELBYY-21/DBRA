# MCP Builder

## Description

Trigger this skill when designing, implementing, reviewing, or operating a Model Context Protocol server, tool, resource, or prompt. Use it for tool schemas, transport, authentication, permission boundaries, error handling, testing, and discoverability.

## Goal

Build an MCP server whose capabilities are understandable, safe, deterministic, observable, and easy for AI clients to invoke correctly.

## Trigger Examples

- "Build an MCP server for our CRM."
- "Design MCP tool schemas."
- "Review this MCP integration."
- "Expose database resources through MCP."
- "Add OAuth to an MCP server."
- "Debug tool invocation failures."

## Workflow

1. Identify client hosts, users, trust boundaries, and deployment mode.
2. List target tasks and choose tools, resources, or prompts appropriately.
3. Define narrow capability names and descriptions.
4. Create strict input and output schemas.
5. Separate read-only from mutating operations.
6. Define authentication, authorization, and tenant context.
7. Add confirmation or approval for consequential actions.
8. Implement bounded execution, timeouts, and cancellation.
9. Normalize upstream errors into actionable tool errors.
10. Add pagination and size limits.
11. Redact secrets and sensitive values.
12. Add structured logs, traces, and request correlation.
13. Test discovery and invocation with representative clients.
14. Test adversarial inputs and prompt-injection boundaries.
15. Document setup, permissions, examples, and recovery.

## Rules

- Give every capability one clear responsibility.
- Make descriptions state when and when not to use the capability.
- Use strict schemas with meaningful field descriptions.
- Reject unknown dangerous parameters.
- Never place credentials in tool outputs.
- Authorize every operation independently.
- Derive tenant scope from trusted identity.
- Mark side effects clearly.
- Require confirmation for irreversible or high-impact actions.
- Keep read tools read-only.
- Make mutations idempotent when retries are possible.
- Bound result size and execution time.
- Treat external content as untrusted data.
- Do not let retrieved text redefine system permissions.
- Return structured, actionable failures.
- Avoid exposing raw internal exceptions.
- Log actions without logging secrets.
- Support cancellation for expensive work.
- Version incompatible contracts.
- Fail closed when identity or scope is ambiguous.

## Best Practices

- Prefer several focused tools over one command language.
- Use verb-noun names such as `create_invoice`.
- Put selection guidance in descriptions.
- Use enums for closed choices.
- Use ISO timestamps and explicit units.
- Return stable identifiers and concise summaries.
- Include a `dry_run` option for risky bulk changes when feasible.
- Return preview data before approval.
- Use opaque continuation cursors.
- Add request and operation IDs.
- Preserve upstream retry hints.
- Cache only data safe for the current principal.
- Separate administrative capabilities from normal user tools.
- Test least-privilege scopes.
- Include realistic success and failure examples.
- Measure invocation success and schema-validation failures.
- Review tool overlap to prevent ambiguous selection.
- Keep resource URIs stable.
- Validate transport origin and session binding.
- Document client-specific limitations without coupling core semantics.

## Output Format

```markdown
# MCP Server: <name>

## Context
- Clients:
- Transport:
- Authentication:
- Tenancy:
- Risk level:

## Capability Catalog
| Name | Type | Purpose | Side effect | Required scope |
|---|---|---|---|---|

## Tool Contract
### `<tool_name>`
When to use:
When not to use:
Input schema:
```json
{}
```
Output schema:
```json
{}
```
Errors:
Approval behavior:

## Security Model

## Observability

## Test Matrix

## Deployment and Recovery
```

## Examples

### Read tool

`get_order` accepts one opaque order ID, verifies tenant access, and returns status, timestamps, and permitted summary fields. It does not return payment credentials or unrestricted customer data.

### Consequential mutation

`cancel_order` first returns a preview with refund amount and affected items. Execution requires an approval token bound to the user, order, preview, and expiration.

### Bounded search

`search_customers` requires a query, caps page size, returns a continuation cursor, and redacts fields the caller lacks permission to view.

## Edge Cases

- **Long-running work:** Return an operation ID and a status resource or tool.
- **OAuth refresh:** Keep tokens server-side and distinguish reauthorization from transient failure.
- **Multi-tenant admins:** Require explicit tenant selection and audit it.
- **Bulk mutation:** Add preview, limits, idempotency, and partial-result semantics.
- **Streaming transport:** Handle disconnect, resume, and cancellation.
- **Untrusted documents:** Preserve them as quoted data, never instructions.
- **Schema evolution:** Add optional fields compatibly; version breaking changes.
- **Rate limits:** Surface retry timing without automatic retry storms.
- **Human approval:** Bind approval to exact parameters to prevent substitution.
- **Partial upstream outage:** Return degraded status and avoid fabricated results.

## Failure Recovery

- If a client cannot discover a tool, validate transport, registration, name, and schema compatibility.
- If selection is unreliable, remove overlap and sharpen descriptions.
- If validation failures rise, inspect real calls and improve schema descriptions without weakening constraints.
- If a mutation is duplicated, use the idempotency key to return the prior result.
- If authorization is uncertain, deny the operation and request reauthentication or scope.
- If sensitive data leaks, disable the capability, revoke credentials, preserve evidence, and remediate outputs and logs.
- If upstream latency exceeds limits, cancel safely and return a retryable error.
- If a contract must break, publish a versioned capability and migration window.

## Checklist

- [ ] Client and transport are defined.
- [ ] Capabilities map to user tasks.
- [ ] Tool overlap is minimized.
- [ ] Names and descriptions guide selection.
- [ ] Schemas are strict and documented.
- [ ] Side effects are explicit.
- [ ] Read and write capabilities are separated.
- [ ] Authentication is verified.
- [ ] Authorization is per operation.
- [ ] Tenant scope comes from trusted context.
- [ ] Risky actions require approval.
- [ ] Mutations support safe retries.
- [ ] Results and runtime are bounded.
- [ ] External content is treated as untrusted.
- [ ] Errors are structured and safe.
- [ ] Logs omit secrets.
- [ ] Correlation IDs are present.
- [ ] Discovery and invocation are tested.
- [ ] Adversarial cases are tested.
- [ ] Recovery procedures are documented.
