# GitHub Workflow

## Description

Trigger this skill for repository collaboration, branching, commits, pull requests, reviews, releases, issue triage, CI policies, and GitHub Actions governance. Use it to design or repair a team workflow rather than explain isolated Git commands.

## Goal

Create a low-friction, auditable GitHub workflow that keeps the default branch releasable, makes changes reviewable, and automates quality and security controls.

## Trigger Examples

- "Design our GitHub workflow."
- "Create a pull request process."
- "Fix our branching strategy."
- "Set up release automation."
- "Improve issue triage."
- "Define branch protection."

## Workflow

1. Identify team size, release cadence, compliance needs, and repository type.
2. Inspect existing branches, protections, workflows, templates, and ownership.
3. Select trunk-based or short-lived feature branching.
4. Define issue intake and prioritization.
5. Define branch and commit naming.
6. Specify PR size, content, review, and approval expectations.
7. Establish required automated checks.
8. Add ownership and review routing.
9. Define merge strategy and history policy.
10. Define release, tagging, and changelog behavior.
11. Add dependency and secret scanning.
12. Define hotfix and rollback procedures.
13. Set stale-work and abandoned-branch handling.
14. Document permissions and emergency access.
15. Measure cycle time, failure rate, and review health.

## Rules

- Keep the default branch protected and releasable.
- Prefer short-lived branches.
- Never commit secrets.
- Require status checks before merge.
- Require review for production-impacting changes.
- Prevent force pushes to protected branches.
- Use least-privilege repository permissions.
- Pin third-party actions to immutable versions.
- Separate untrusted fork workflows from secret-bearing jobs.
- Do not run privileged code from untrusted pull requests.
- Keep PRs focused on one outcome.
- Link changes to context or an issue.
- Explain why in commit and PR descriptions.
- Define a single merge strategy per repository.
- Automate formatting and mechanical checks.
- Keep generated artifacts out of review unless required.
- Use signed releases where risk warrants it.
- Make rollback instructions available before release.
- Preserve required audit history.
- Review workflow permissions regularly.

## Best Practices

- Use trunk-based development for most product teams.
- Aim for PRs reviewers can understand in one sitting.
- Draft early when feedback can change direction.
- Use CODEOWNERS for critical boundaries.
- Provide PR and issue templates with purposeful prompts.
- Require tests proportional to change risk.
- Run fast checks first.
- Cancel superseded CI runs.
- Cache dependencies safely.
- Use concurrency controls for deployments.
- Protect deployment environments with scoped approvals.
- Generate release notes from structured labels.
- Apply semantic or calendar versioning consistently.
- Automate dependency updates in manageable batches.
- Label breaking changes explicitly.
- Track flaky tests as defects.
- Use merge queues for busy repositories.
- Document contributor setup in the repository.
- Archive stale discussions with a clear reopening path.
- Review metrics for bottlenecks, not individual surveillance.

## Output Format

```markdown
# GitHub Workflow: <repository>

## Operating Context
- Team:
- Release cadence:
- Risk level:
- Merge strategy:

## Change Flow
1. Issue:
2. Branch:
3. Commit:
4. Pull request:
5. Review:
6. Merge:
7. Release:

## Required Checks
| Check | Trigger | Blocking | Owner |
|---|---|---|---|

## Branch Protection
- Default branch:
- Required approvals:
- Required checks:
- Bypass policy:

## Release and Rollback

## Templates and Automation

## Metrics
```

## Examples

### Small product team

Use short-lived `feat/`, `fix/`, and `chore/` branches. Require one approval, passing typecheck/tests, and preview verification. Squash merge into `main`; deploy automatically after protected checks.

### Regulated repository

Require two approvals including CODEOWNER, signed commits or verified provenance where mandated, immutable action pins, environment approval, retained artifacts, and documented emergency bypass review.

### Hotfix

Create a branch from the production tag, add the smallest fix and regression test, run required checks, merge through an expedited reviewed PR, deploy, then verify and reconcile with current development.

## Edge Cases

- **Monorepo:** Route ownership and checks by changed paths.
- **Fork contributions:** Never expose write tokens or secrets to fork code.
- **Large generated changes:** Separate generation logic review from artifact review.
- **Binary assets:** Use appropriate storage and size policies.
- **Release branches:** Use only when multiple supported versions require them.
- **Emergency bypass:** Log actor, reason, scope, and retrospective.
- **Flaky CI:** Quarantine with ownership and a removal deadline.
- **Stacked PRs:** Make dependencies explicit and merge in order.
- **Bot PRs:** Apply the same quality gates as human changes.
- **Repository transfer:** Audit apps, secrets, environments, and ownership.

## Failure Recovery

- If a bad change reaches default, revert first and diagnose second when impact is active.
- If CI is unavailable, do not silently waive checks; use the documented exception path.
- If secrets are committed, revoke them immediately, then clean history if required.
- If a force push rewrites shared history, freeze merges and coordinate recovery from known refs.
- If releases diverge, identify deployed commits and reconcile through explicit PRs.
- If review stalls, reduce PR size, clarify ownership, or escalate by policy.
- If action supply-chain risk appears, disable the workflow and rotate exposed credentials.
- If branch protection blocks recovery, use audited emergency access and restore protections afterward.

## Checklist

- [ ] Default branch is protected.
- [ ] Branches are short-lived.
- [ ] Merge strategy is defined.
- [ ] PR template requests intent and validation.
- [ ] Required checks are fast and meaningful.
- [ ] Critical paths have owners.
- [ ] Secrets never reach untrusted jobs.
- [ ] Actions use least privilege.
- [ ] Third-party actions are pinned.
- [ ] Deployment environments are protected.
- [ ] Release versioning is consistent.
- [ ] Changelog ownership is defined.
- [ ] Rollback path is documented.
- [ ] Hotfix flow is explicit.
- [ ] Dependency updates are automated.
- [ ] Flaky tests have owners.
- [ ] Emergency bypass is audited.
- [ ] Contributor instructions are current.
- [ ] Metrics target process health.
- [ ] Workflow is documented in the repository.
