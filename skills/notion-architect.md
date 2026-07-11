# Notion Architect

## Description

Trigger this skill when designing or restructuring a Notion workspace, databases, relations, templates, permissions, knowledge systems, project hubs, operating procedures, or governance.

## Goal

Create a navigable, maintainable Notion system with clear ownership, minimal duplication, reliable databases, and workflows that people will actually use.

## Trigger Examples

- "Design our Notion workspace."
- "Build a company wiki."
- "Create a project database."
- "Clean up duplicate pages."
- "Design Notion permissions."
- "Turn our SOPs into templates."

## Workflow

1. Identify users, jobs, information types, and decision cadence.
2. Audit current pages, databases, duplication, and permissions.
3. Define workspace domains and accountable owners.
4. Choose source-of-truth databases.
5. Define properties, relations, rollups, and statuses.
6. Create audience-specific linked views.
7. Build templates for recurring records.
8. Design navigation from user tasks.
9. Define naming and metadata conventions.
10. Set least-privilege sharing and guest boundaries.
11. Create intake, review, and archive workflows.
12. Define automation boundaries.
13. Migrate content in controlled batches.
14. Train owners and publish governance.
15. Review adoption, freshness, and findability.

## Rules

- Give every information type one canonical home.
- Use databases for repeated structured records.
- Use pages for narrative content.
- Avoid databases with overlapping purposes.
- Keep required properties minimal.
- Name properties in user language.
- Do not encode multiple meanings in one status.
- Use relations only when they support a real workflow.
- Avoid deep page nesting.
- Assign an owner and review date to durable knowledge.
- Separate private, team, and public content.
- Never expose confidential pages through broad parent sharing.
- Minimize guests and audit them.
- Archive instead of deleting uncertain legacy content.
- Do not automate an unstable process.
- Keep templates concise.
- Preserve source links during migration.
- Define completion and archive states.
- Make governance visible.
- Optimize for retrieval, not decoration.

## Best Practices

- Use a small top-level navigation.
- Create role-based home pages from linked views.
- Maintain one People, Projects, Meetings, and Knowledge database only when needed.
- Use stable IDs or unique names for integrations.
- Standardize status groups across related databases.
- Add owner, state, created, updated, and review fields where useful.
- Use filtered views instead of copied databases.
- Create templates with instructions inside callouts.
- Put meeting outcomes and decisions into related records.
- Separate tasks from reference notes.
- Use synced blocks sparingly for canonical notices.
- Create an inbox for uncategorized content with an SLA.
- Schedule stale-content reviews.
- Add archive views hidden from daily work.
- Keep formulas readable and documented.
- Test permissions using a non-admin account.
- Publish an integration data dictionary.
- Monitor broken relations after migration.
- Teach search and database filtering.
- Measure successful retrieval and stale-page rate.

## Output Format

```markdown
# Notion Architecture: <workspace>

## Users and Jobs
| Audience | Primary job | Home page | Access |
|---|---|---|---|

## Information Architecture
- Home
  - Domain
    - Canonical database

## Database Catalog
| Database | Purpose | Owner | Key properties | Relations | Retention |
|---|---|---|---|---|---|

## Templates
| Template | Database | Required inputs | Output |
|---|---|---|---|

## Permissions

## Governance
- Intake:
- Review:
- Archive:
- Ownership:

## Migration Plan

## Adoption Metrics
```

## Examples

### Project hub

Use one Projects database related to Tasks, Meetings, and Decisions. A project template provides scope, owner, milestones, risks, and filtered linked views scoped to that project.

### Company wiki

Organize by durable domains such as Product, Operations, and People. Every policy includes owner, effective date, review date, and status; expired policies appear in an owner review queue.

### Meeting system

Meeting records relate to a project or team. Decisions and actions are promoted to their canonical databases rather than remaining trapped in notes.

## Edge Cases

- **Multiple business units:** Share common schemas but allow scoped views and ownership.
- **External client portals:** Isolate shared pages and test inherited permissions.
- **Regulated records:** Confirm whether Notion meets retention and audit requirements.
- **Large imports:** Preserve source URLs and migrate in verifiable batches.
- **Offline field work:** Provide an alternate capture process.
- **Complex formulas:** Move business-critical computation to a controlled system if needed.
- **Conflicting statuses:** Map legacy values to a canonical lifecycle.
- **Orphaned pages:** Assign owners or archive.
- **Departing employees:** Transfer ownership before account removal.
- **Automation failure:** Preserve a manual intake and reconciliation view.

## Failure Recovery

- If users create duplicates, clarify the canonical database and improve intake access.
- If content cannot be found, test navigation and search terms with real users.
- If permissions leak, remove broad sharing, audit parent inheritance, and review guests.
- If migration loses relations, stop, restore source references, and reconcile by stable IDs.
- If templates are ignored, remove unnecessary fields and align them with actual work.
- If a database becomes overloaded, split by distinct lifecycle rather than arbitrary team lines.
- If automation corrupts properties, disable it and reconcile against the source system.
- If knowledge goes stale, enforce owner and review queues instead of adding more pages.

## Checklist

- [ ] Users and jobs are identified.
- [ ] Canonical homes are defined.
- [ ] Duplicate databases are eliminated.
- [ ] Database purposes do not overlap.
- [ ] Properties are minimal and clear.
- [ ] Statuses represent one lifecycle.
- [ ] Relations serve real workflows.
- [ ] Linked views replace copies.
- [ ] Navigation is task-based.
- [ ] Templates support recurring work.
- [ ] Owners are assigned.
- [ ] Review dates exist where needed.
- [ ] Permissions use least privilege.
- [ ] Guest access is audited.
- [ ] Intake has an owner and SLA.
- [ ] Archive behavior is defined.
- [ ] Migration preserves source links.
- [ ] Integrations use stable identifiers.
- [ ] Governance is published.
- [ ] Adoption and freshness are measured.
