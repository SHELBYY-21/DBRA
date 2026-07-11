# System Architect

## Description

Trigger this skill when designing or evaluating system boundaries, services, components, data flow, scaling, reliability, deployment, integration, and architectural tradeoffs.

## Goal

Produce the simplest architecture that meets current business requirements, protects critical qualities, evolves safely, and makes ownership and failure behavior explicit.

## Trigger Examples

- "Design the architecture for this platform."
- "Should we use microservices?"
- "Review this system design."
- "Plan for tenfold scale."
- "Define service boundaries."
- "Create an architecture decision record."

## Workflow

1. Clarify business goals, users, constraints, and non-goals.
2. Quantify load, growth, latency, availability, and recovery targets.
3. Identify core domains and invariants.
4. Map context, actors, and external dependencies.
5. Choose the simplest deployment and data boundaries.
6. Define component responsibilities and interfaces.
7. Map synchronous and asynchronous data flows.
8. Define consistency and transaction boundaries.
9. Model dependency failures and degradation.
10. Design security and tenant boundaries.
11. Plan observability and operational ownership.
12. Evaluate cost and team cognitive load.
13. Compare alternatives against weighted criteria.
14. Define incremental evolution and rollback.
15. Record decisions, assumptions, and triggers for review.

## Rules

- Start with requirements, not technologies.
- Prefer a modular monolith until independent scaling or ownership justifies services.
- Give every component one accountable owner.
- Keep domain boundaries explicit.
- Avoid distributed transactions when a local transaction can solve the problem.
- State consistency guarantees.
- Bound retries and queues.
- Design idempotent message consumers.
- Assume dependencies fail.
- Avoid single points of failure for critical paths.
- Use managed services when they reduce undifferentiated operations.
- Do not add caches without invalidation and scope rules.
- Protect tenant and privilege boundaries.
- Minimize sensitive data movement.
- Make data ownership canonical.
- Design observability with the architecture.
- Include deployment and rollback.
- Quantify cost drivers.
- Record rejected alternatives.
- Revisit assumptions when triggers occur.

## Best Practices

- Use context and container diagrams before detailed component diagrams.
- Keep interfaces small and versioned.
- Use asynchronous messaging for temporal decoupling, not fashion.
- Use an outbox for reliable event publication.
- Keep event schemas immutable or compatibly evolved.
- Partition by domain or tenant only when access patterns justify it.
- Prefer stateless compute when practical.
- Store state in systems designed for it.
- Define timeouts shorter than upstream budgets.
- Use circuit breakers and bulkheads selectively.
- Make backpressure visible.
- Define recovery point and recovery time objectives.
- Test failover and restoration.
- Track service-level indicators tied to user outcomes.
- Standardize logs, traces, and correlation.
- Separate control and data planes where risk requires it.
- Build migration seams before replacing systems.
- Use feature flags for reversible transitions.
- Include operational runbooks.
- Optimize total lifecycle cost, not only build speed.

## Output Format

```markdown
# System Architecture: <system>

## Goals and Constraints
- Business goals:
- Non-goals:
- Scale:
- SLOs:
- RPO/RTO:
- Compliance:

## Context

## Components
| Component | Responsibility | Data owned | Interface | Owner |
|---|---|---|---|---|

## Key Flows
1. <flow>

## Quality Attributes
| Attribute | Requirement | Mechanism | Verification |
|---|---|---|---|

## Failure Model
| Dependency | Failure | User impact | Detection | Recovery |
|---|---|---|---|---|

## Alternatives and Decision

## Evolution Plan

## Architecture Decision Records
```

## Examples

### Early-stage SaaS

Use a modular web application and one relational database with clear domain modules, background jobs for slow work, object storage for files, and managed observability. Split services only after measured contention or ownership needs.

### Event integration

Write business state and an outbox record in one transaction. A worker publishes immutable events; consumers deduplicate by event ID and reconcile from the canonical API.

### Scale transition

Before sharding, optimize queries, indexes, caching, and workload separation. Define the measurable trigger that makes partitioning worthwhile.

## Edge Cases

- **Global low latency:** Balance replication with data residency and consistency.
- **Intermittent clients:** Add durable synchronization and conflict rules.
- **High fan-out:** Apply batching, queues, backpressure, and delivery limits.
- **Regulated data:** Isolate processing and keys according to policy.
- **Vendor dependency:** Define portability and outage behavior.
- **Hot keys:** Redesign partitioning or aggregate asynchronously.
- **Large files:** Keep content out of transactional databases.
- **Real-time collaboration:** Define ordering and conflict model.
- **Machine learning:** Separate training, registry, serving, and monitoring.
- **Legacy migration:** Use strangler seams and reconciliation.

## Failure Recovery

- If load assumptions are wrong, measure the bottleneck before repartitioning.
- If a service split increases failures, restore the prior boundary or add a compatibility facade.
- If events diverge from source state, reconcile from the canonical store.
- If a dependency fails, degrade optional features and protect the critical path.
- If data migration is partial, stop cutover and resume from checkpoints.
- If costs spike, inspect cardinality, egress, idle capacity, and retry amplification.
- If ownership is unclear, consolidate the boundary until one team can operate it.
- If an architectural decision expires, create a superseding record rather than rewriting history.

## Checklist

- [ ] Business goals and non-goals are explicit.
- [ ] Scale assumptions are quantified.
- [ ] SLO and recovery targets are defined.
- [ ] Domain boundaries are clear.
- [ ] Data ownership is canonical.
- [ ] Interfaces are documented.
- [ ] Consistency guarantees are stated.
- [ ] Failure modes are modeled.
- [ ] Retries and queues are bounded.
- [ ] Idempotency is designed.
- [ ] Security boundaries are explicit.
- [ ] Observability is included.
- [ ] Operational owners are assigned.
- [ ] Deployment and rollback are planned.
- [ ] Cost drivers are estimated.
- [ ] Team cognitive load is considered.
- [ ] Alternatives are compared.
- [ ] Rejected options are recorded.
- [ ] Evolution is incremental.
- [ ] Review triggers are defined.
