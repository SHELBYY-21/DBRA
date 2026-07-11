# Database Designer

## Description

Trigger this skill when designing or reviewing relational or document data models, schemas, constraints, indexes, migrations, tenancy, retention, or query patterns. Use it before implementing persistent features or when diagnosing data-integrity and performance issues.

## Goal

Produce a durable data model that preserves business invariants, supports expected access patterns, evolves safely, and protects tenant and sensitive data.

## Trigger Examples

- "Design the schema for a marketplace."
- "Review these Postgres tables."
- "Add multi-tenant data isolation."
- "Plan a zero-downtime migration."
- "Which indexes do these queries need?"
- "Model audit history."

## Workflow

1. Identify entities, actors, invariants, lifecycle states, and retention rules.
2. List critical reads, writes, volumes, and latency targets.
3. Select the storage model based on access and consistency requirements.
4. Define canonical identifiers and tenant ownership.
5. Normalize the core model, then denormalize only for measured needs.
6. Encode invariants with types, checks, uniqueness, foreign keys, and transactions.
7. Model timestamps, soft deletion, status transitions, and audit fields.
8. Design indexes from actual query predicates and ordering.
9. Define transaction boundaries and concurrency controls.
10. Specify authorization enforcement and tenant scoping.
11. Classify sensitive fields and define encryption or redaction.
12. Plan backup, restoration, retention, and deletion behavior.
13. Create forward and rollback migration plans.
14. Validate representative queries with explain plans.
15. Document ownership, assumptions, and operational alerts.

## Rules

- Design from business invariants and query patterns.
- Use database constraints for invariants the database can enforce.
- Keep primary keys stable and meaningless.
- Include tenant keys on tenant-owned records.
- Scope every tenant query explicitly unless verified row policies enforce it.
- Never rely on application validation alone.
- Avoid storing derivable data without a synchronization strategy.
- Use precise data types.
- Store money as integer minor units or exact decimals, never binary floats.
- Store timestamps with timezone semantics and use UTC.
- Avoid unbounded text or collections without a reason.
- Define deletion semantics for every relationship.
- Do not add indexes speculatively in bulk.
- Keep migrations backward compatible during rolling deployments.
- Never combine destructive schema change and dependent code change in one unsafe step.
- Parameterize all queries.
- Protect sensitive data in logs and exports.
- Test restores, not only backups.
- Document consistency and isolation expectations.
- Make data ownership explicit.

## Best Practices

- Use singular or plural naming consistently.
- Name constraints and indexes predictably.
- Include `created_at` and `updated_at` where lifecycle analysis matters.
- Prefer explicit join tables for many-to-many relationships.
- Use partial indexes for selective active-state queries.
- Match composite-index column order to filtering and sorting.
- Check index write cost and redundancy.
- Use optimistic versions for user-edited contested records.
- Use transactions for multi-record invariants.
- Keep status values constrained and transitions validated.
- Separate immutable events from mutable current state when both are needed.
- Partition only after volume and maintenance justify it.
- Use outbox patterns for reliable database-to-event publication.
- Backfill in bounded batches with resumable checkpoints.
- Measure lock duration before production migration.
- Expand, migrate, contract for breaking changes.
- Verify query plans with production-like cardinality.
- Monitor slow queries, deadlocks, replication lag, and storage growth.
- Maintain a data dictionary for ambiguous fields.
- Assign a steward for sensitive datasets.

## Output Format

```markdown
# Data Model: <system>

## Context
- Store:
- Scale assumptions:
- Consistency needs:
- Tenancy:
- Retention:

## Entities
| Entity | Purpose | Owner | Lifecycle |
|---|---|---|---|

## Schema
```sql
-- executable or implementation-ready DDL
```

## Invariants
| Invariant | Enforcement | Transaction boundary |
|---|---|---|

## Access Patterns and Indexes
| Query | Frequency | Index | Expected result size |
|---|---|---|---|

## Security and Privacy

## Migration Plan
1. Expand:
2. Backfill:
3. Switch reads/writes:
4. Contract:
5. Rollback:

## Operational Checks
```

## Examples

### Tenant uniqueness

For projects whose slugs are unique only within an organization, enforce `UNIQUE (organization_id, slug)`, not global slug uniqueness. Include `organization_id` in foreign-key relationships where it prevents cross-tenant references.

### Soft deletion

Use `deleted_at` only when restoration, retention, or audit needs justify it. Add a partial unique index over active rows and define when tombstones are purged.

### Safe required column

Add the column nullable, deploy dual writes, backfill in batches, verify completion, add the constraint, switch reads, then remove transitional code.

## Edge Cases

- **High-contention counters:** Use atomic updates, append-only events, or sharded counters.
- **Hierarchies:** Choose adjacency lists by default; use closure or path models for proven query needs.
- **Temporal history:** Define valid time versus system time before selecting a model.
- **Polymorphic relations:** Prefer explicit relationships when referential integrity matters.
- **Global users, regional data:** Separate identity from residency-bound records.
- **Audit logs:** Make them append-only, access-controlled, and retention-aware.
- **Large blobs:** Store metadata in the database and content in object storage.
- **Search documents:** Treat search indexes as derived and rebuildable.
- **Offline synchronization:** Add stable client IDs, versions, and conflict rules.
- **Analytics:** Keep operational and analytical workloads separated when contention emerges.

## Failure Recovery

- If a migration blocks writes, stop or roll back, inspect locks, and retry in smaller phases.
- If a backfill is partial, resume from checkpoints rather than restarting blindly.
- If duplicate data prevents a constraint, quarantine conflicts and define a deterministic reconciliation rule.
- If an index regresses writes, confirm usage and remove only after observing representative traffic.
- If tenant leakage is suspected, revoke access, preserve evidence, audit query paths, and remediate all affected boundaries.
- If derived data diverges, identify the canonical source and run an idempotent rebuild.
- If rollback would lose new-format data, use forward recovery instead of destructive reversal.
- If query plans vary unexpectedly, refresh statistics and inspect cardinality assumptions.

## Checklist

- [ ] Entities and ownership are clear.
- [ ] Critical access patterns are listed.
- [ ] Scale assumptions are stated.
- [ ] Keys are stable and appropriate.
- [ ] Tenant scope is encoded.
- [ ] Invariants use database constraints.
- [ ] Relationships define deletion behavior.
- [ ] Data types preserve precision.
- [ ] Sensitive fields are classified.
- [ ] Indexes map to real queries.
- [ ] Composite-index order is justified.
- [ ] Transactions protect multi-row invariants.
- [ ] Concurrency strategy is explicit.
- [ ] Retention and deletion are defined.
- [ ] Backups and restores are planned.
- [ ] Migration uses safe phases.
- [ ] Backfill is resumable.
- [ ] Rollback or forward recovery is viable.
- [ ] Representative query plans are checked.
- [ ] Operational ownership is assigned.
