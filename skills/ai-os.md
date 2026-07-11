# AI OS

## Description

Trigger this skill when designing an organization-wide AI operating system: agent portfolio, human approvals, shared context, tool access, model governance, evaluation, automation, cost controls, and continuous improvement.

## Goal

Create a governed AI operating model that converts repeatable business work into safe, measurable human-plus-AI systems without fragmenting knowledge or accountability.

## Trigger Examples

- "Design an AI operating system for my company."
- "Create a portfolio of AI agents."
- "Set up AI governance."
- "Connect our tools to AI safely."
- "Prioritize AI automations."
- "Build an AI adoption roadmap."

## Workflow

1. Define business outcomes and executive sponsorship.
2. Inventory workflows, decisions, data, systems, and pain points.
3. Score opportunities by value, feasibility, risk, and reuse.
4. Define the shared context and knowledge architecture.
5. Establish identity, tool, data, and tenant boundaries.
6. Classify use cases by autonomy and consequence.
7. Design human approval and escalation controls.
8. Select models by capability, latency, privacy, and cost.
9. Standardize prompts, tools, memory, and output contracts.
10. Build evaluation datasets and acceptance thresholds.
11. Add observability, feedback, and cost attribution.
12. Pilot one bounded high-value workflow.
13. Compare business outcomes and guardrails.
14. Scale reusable components and training.
15. Govern lifecycle, incidents, updates, and retirement.

## Rules

- Start with business outcomes, not model novelty.
- Assign one accountable owner per AI workflow.
- Keep authoritative data in source systems.
- Treat model output as untrusted until validated proportionally to risk.
- Restrict tools independently of prompts.
- Use least-privilege, short-lived credentials.
- Preserve tenant and user boundaries.
- Require human approval for consequential or irreversible actions.
- Make approval bind to exact action parameters.
- Never let retrieved text override system policy.
- Minimize sensitive context.
- Define memory retention and deletion.
- Evaluate before production use.
- Monitor quality drift.
- Provide a non-AI fallback for critical work.
- Log decisions without exposing secrets.
- Track model, prompt, tool, and knowledge versions.
- Cap spend and execution depth.
- Define incident response.
- Retire workflows that do not create value.

## Best Practices

- Build a reusable capability layer before many bespoke agents.
- Separate orchestration, tools, knowledge, policy, and presentation.
- Use deterministic software for deterministic rules.
- Use AI for ambiguity, synthesis, classification, and language.
- Keep agents narrow and composable.
- Prefer explicit workflows for regulated or repeatable processes.
- Use structured outputs at system boundaries.
- Validate outputs before side effects.
- Add idempotency to mutations.
- Maintain golden tasks and adversarial tests.
- Evaluate end-to-end business outcomes.
- Include abstention and escalation behavior.
- Collect user corrections as labeled feedback.
- Review false positives and false negatives separately.
- Route requests to the least costly capable model.
- Cache only safely scoped reusable results.
- Show sources and uncertainty where relevant.
- Train users on capabilities and limits.
- Publish ownership and support channels.
- Reassess vendors and models periodically.

## Output Format

```markdown
# AI Operating System: <organization>

## Outcomes
| Outcome | Baseline | Target | Owner | Guardrail |
|---|---|---|---|---|

## Opportunity Portfolio
| Workflow | Value | Feasibility | Risk | Reuse | Priority |
|---|---|---|---|---|---|

## Capability Architecture
- Identity and policy:
- Tools:
- Knowledge:
- Models:
- Orchestration:
- Evaluation:
- Observability:

## Autonomy Matrix
| Class | Example | Allowed action | Human control |
|---|---|---|---|

## Pilot Specification

## Evaluation Plan

## Governance and Incident Response

## Adoption Roadmap
```

## Examples

### Sales operations

An assistant drafts account research and next actions from governed CRM and knowledge sources. Reps approve all CRM writes. Evaluation measures factual accuracy, preparation time, and accepted recommendations.

### Support agent

The agent retrieves permission-scoped policy and order data, drafts replies, and escalates uncertain or exceptional cases. Refunds above a threshold require approval bound to the exact amount and order.

### Finance workflow

Deterministic code calculates amounts; AI classifies documents and explains exceptions. No payment is released without existing financial controls.

## Edge Cases

- **Regulated decisions:** Keep AI advisory and preserve qualified human accountability.
- **Sensitive data:** Use approved models, minimization, redaction, and retention controls.
- **Multiple models:** Normalize contracts and evaluate routing behavior.
- **Shared memory:** Partition by user, tenant, purpose, and retention.
- **Agent-to-agent delegation:** Propagate identity, scope, budget, and trace context.
- **Tool outage:** Degrade to draft or manual mode.
- **Model drift:** Re-run evaluations before promotion.
- **Prompt injection:** Isolate untrusted content and enforce permissions outside the model.
- **High-volume use:** Add budgets, routing, caching, and rate controls.
- **Low adoption:** Improve workflow fit and trust before adding features.

## Failure Recovery

- If incorrect actions occur, disable mutation tools, preserve traces, and restore human-only execution.
- If sensitive data leaks, revoke access, contain affected stores, and follow incident policy.
- If quality falls, roll back the model, prompt, tool, or knowledge version and rerun evaluations.
- If costs spike, cap execution, inspect loops and routing, and restore prior budgets.
- If an agent exceeds scope, enforce tool-level authorization and reduce autonomy.
- If knowledge is stale, stop authoritative claims and repair source freshness.
- If users over-trust output, add stronger review controls, sources, and training.
- If a pilot lacks value, retire it and preserve reusable lessons rather than scaling sunk cost.

## Checklist

- [ ] Business outcomes are measurable.
- [ ] Executive and workflow owners are assigned.
- [ ] Opportunities are prioritized objectively.
- [ ] Canonical data remains in source systems.
- [ ] Identity and tenant boundaries are enforced.
- [ ] Tool permissions use least privilege.
- [ ] Autonomy matches consequence.
- [ ] Human approvals bind exact actions.
- [ ] Sensitive context is minimized.
- [ ] Memory lifecycle is defined.
- [ ] Structured contracts exist.
- [ ] Side effects are validated and idempotent.
- [ ] Evaluation datasets are representative.
- [ ] Acceptance thresholds are explicit.
- [ ] Drift and cost are monitored.
- [ ] Versions are traceable.
- [ ] Fallback procedures exist.
- [ ] Incident response is documented.
- [ ] User training and support exist.
- [ ] Value determines scale or retirement.
