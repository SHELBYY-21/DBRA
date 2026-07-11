# Knowledge Manager

## Description

Trigger this skill when organizing, capturing, governing, retrieving, refreshing, or migrating organizational knowledge across documents, wikis, drives, repositories, and AI retrieval systems.

## Goal

Build a trusted knowledge lifecycle that makes current answers easy to find, assigns ownership, preserves provenance, and retires stale or duplicate information.

## Trigger Examples

- "Design our knowledge base."
- "Clean up company documentation."
- "Create a knowledge governance model."
- "Prepare documents for RAG."
- "Reduce duplicate SOPs."
- "Improve internal search."

## Workflow

1. Identify audiences, tasks, and high-value knowledge domains.
2. Inventory repositories, formats, owners, and access rules.
3. Sample searches and document real retrieval failures.
4. Define canonical sources by knowledge type.
5. Create taxonomy, metadata, and naming conventions.
6. Assign owner, status, effective date, and review date.
7. Define capture and editorial workflows.
8. Consolidate duplicates with redirects and provenance.
9. Design search, browsing, and role-based entry points.
10. Configure access and sensitivity controls.
11. Define ingestion rules for AI retrieval.
12. Add freshness and quality checks.
13. Migrate in verifiable batches.
14. Train contributors and publish governance.
15. Measure retrieval success, freshness, and reuse.

## Rules

- Give each authoritative fact one canonical source.
- Preserve provenance.
- Assign accountable owners.
- Separate drafts from approved knowledge.
- Include effective and review dates where validity changes.
- Archive stale content instead of leaving it searchable as current.
- Avoid taxonomy deeper than users can navigate.
- Use user vocabulary and known synonyms.
- Do not copy content merely to improve visibility.
- Use links or embedded canonical views.
- Restrict sensitive knowledge by least privilege.
- Do not ingest restricted content into broader AI indexes.
- Keep source permissions in retrieval systems.
- Never treat generated summaries as canonical by default.
- Make uncertainty and conflicts visible.
- Define retention and deletion.
- Preserve stable links during migration.
- Validate search with real tasks.
- Track unanswered queries.
- Govern the lifecycle, not only the launch.

## Best Practices

- Prioritize knowledge that affects revenue, safety, customers, or repeated work.
- Use a lightweight content model.
- Create templates by knowledge type.
- Write titles that match user questions.
- Put the answer before background.
- Use headings, tables, and explicit definitions.
- Keep procedures action-oriented.
- Separate policy, procedure, reference, and decision records.
- Link decisions to rationale and superseding decisions.
- Maintain a glossary for overloaded terms.
- Tag sensitivity and audience.
- Add content-health dashboards.
- Notify owners before review deadlines.
- Collect search zero-result and reformulation data.
- Add feedback at the point of use.
- Use chunk boundaries aligned to semantic sections for retrieval.
- Include source URL and update timestamp in AI answers.
- Evaluate retrieval using a representative question set.
- Remove duplicate chunks and boilerplate.
- Review permissions after organizational changes.

## Output Format

```markdown
# Knowledge System: <organization>

## Audiences and Questions
| Audience | Task | Common question | Current source | Pain point |
|---|---|---|---|---|

## Source-of-Truth Map
| Knowledge type | Canonical repository | Owner | Review cadence | Access |
|---|---|---|---|---|

## Content Model
- Required metadata:
- Status lifecycle:
- Templates:
- Taxonomy:

## Retrieval Design
- Browse paths:
- Search fields:
- Synonyms:
- AI ingestion rules:

## Governance

## Migration

## Quality Metrics
```

## Examples

### Policy knowledge

Each policy has owner, approver, effective date, review date, audience, and superseded-policy link. Search excludes expired policies from default results while preserving audit access.

### Engineering decisions

Architecture decision records remain immutable after acceptance. A later record supersedes an earlier one and links both directions, preserving history.

### AI retrieval

Chunk by semantic heading, inherit source permissions, attach source and update metadata, exclude drafts, and evaluate answers against a maintained question set.

## Edge Cases

- **Conflicting sources:** Show the conflict, identify authority, and resolve through the owner.
- **Owner departure:** Transfer ownership before access removal.
- **Legal hold:** Suspend deletion for scoped records.
- **Localized content:** Track source language, translation status, and synchronized updates.
- **Frequently changing data:** Link to the system of record instead of copying values.
- **Tacit expertise:** Capture decision patterns through interviews and examples.
- **Low-connectivity teams:** Provide synchronized offline or printable procedures.
- **Merged organizations:** Preserve provenance while mapping taxonomies.
- **Restricted AI use:** Exclude content or use permission-aware isolated indexes.
- **Unknown freshness:** Label it unverified rather than current.

## Failure Recovery

- If search returns stale answers, remove expired content from default retrieval and notify owners.
- If duplicates reappear, improve canonical links and contributor intake.
- If AI answers cross permissions, disable retrieval, preserve evidence, and repair authorization filters.
- If migration breaks links, restore redirects from the source mapping.
- If owners ignore reviews, escalate by domain and archive unverified content according to policy.
- If taxonomy is unused, simplify it based on search and browsing behavior.
- If users cannot find answers, test their exact language and add synonyms or better titles.
- If a generated summary conflicts with source, prioritize the source and flag the summary for regeneration.

## Checklist

- [ ] Audiences and retrieval tasks are known.
- [ ] Repositories are inventoried.
- [ ] Canonical sources are assigned.
- [ ] Owners are accountable.
- [ ] Status and freshness are visible.
- [ ] Review cadence matches risk.
- [ ] Taxonomy uses user language.
- [ ] Templates match knowledge types.
- [ ] Duplicates use canonical links.
- [ ] Provenance is preserved.
- [ ] Sensitive access is least privilege.
- [ ] AI retrieval preserves permissions.
- [ ] Drafts are excluded from authoritative answers.
- [ ] Retention and archive rules exist.
- [ ] Stable links survive migration.
- [ ] Search is tested with real questions.
- [ ] Zero-result queries are tracked.
- [ ] Feedback reaches owners.
- [ ] Content health is measured.
- [ ] Governance continues after launch.
