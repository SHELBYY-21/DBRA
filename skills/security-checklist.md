# Security Checklist

## Description

Trigger this skill for security reviews, launch checks, threat modeling, authentication, authorization, secrets, data protection, dependencies, infrastructure, incident readiness, or secure design guidance.

## Goal

Identify realistic threats, verify layered controls, prioritize remediation by business risk, and produce evidence-based launch or change recommendations.

## Trigger Examples

- "Security review this app."
- "Create a launch security checklist."
- "Threat-model this feature."
- "Audit authentication."
- "Check our API security."
- "Review secrets handling."

## Workflow

1. Define assets, users, trust boundaries, and data classifications.
2. Map entry points and privileged operations.
3. Identify threats by boundary and abuse case.
4. Review identity, session, and credential lifecycle.
5. Review authorization at every resource operation.
6. Review input handling and output encoding.
7. Review secret storage and rotation.
8. Review encryption and key management.
9. Review dependencies and build provenance.
10. Review network and infrastructure exposure.
11. Review logging, detection, and alerting.
12. Review backup, recovery, and incident response.
13. Validate controls with tests or evidence.
14. Rank findings by likelihood, impact, and exposure.
15. Assign owners and verification criteria.

## Rules

- Never claim a system is secure absolutely.
- Verify authorization server-side.
- Deny by default.
- Use least privilege.
- Scope data access to trusted identity.
- Never trust client-supplied tenant or role claims without verification.
- Validate untrusted input.
- Parameterize database queries.
- Encode output for its context.
- Protect against CSRF where ambient credentials apply.
- Use secure session cookies.
- Rotate credentials after exposure.
- Never log secrets or full sensitive payloads.
- Encrypt sensitive data in transit and at rest.
- Rate-limit abuse-prone operations.
- Add replay protection to signed requests.
- Keep dependencies and runtimes supported.
- Back up critical data and test restoration.
- Preserve evidence during incidents.
- Prioritize exploitable paths over checklist theater.

## Best Practices

- Model abuse cases alongside normal use cases.
- Require reauthentication for highly sensitive actions.
- Use modern password hashing through established auth systems.
- Apply MFA for administrators where supported.
- Expire and revoke sessions predictably.
- Use short-lived scoped service credentials.
- Store secrets in managed secret stores.
- Separate development and production credentials.
- Restrict administrative interfaces by identity and network controls.
- Use content security policy appropriate to the app.
- Set secure headers centrally.
- Validate uploaded type, size, and content.
- Store uploads outside executable paths.
- Use signed URLs with short expirations.
- Pin and scan build dependencies.
- Protect CI from untrusted code and secret exposure.
- Centralize audit events for consequential actions.
- Alert on unusual privilege and authentication events.
- Practice incident response.
- Reassess after material architecture changes.

## Output Format

```markdown
# Security Review: <system>

## Scope and Assets
| Asset | Sensitivity | Owner | Impact if compromised |
|---|---|---|---|

## Trust Boundaries

## Threats and Controls
| Priority | Threat | Attack path | Existing control | Gap | Remediation | Owner |
|---|---|---|---|---|---|---|

## Control Evidence
| Control | Evidence | Status | Verification date |
|---|---|---|---|

## Launch Decision
- Blockers:
- Accepted risks:
- Required follow-ups:

## Incident Readiness
```

## Examples

### Tenant isolation

A record endpoint accepts `organization_id` from the request and queries by it. Replace it with organization scope derived from the verified session and add a cross-tenant access test.

### Webhook security

Verify the signature over the raw body, enforce timestamp tolerance, record unique event IDs, and reject replayed events before processing side effects.

### Secret exposure

If a token appears in source history, revoke it immediately. Removing the text alone does not invalidate the credential.

## Edge Cases

- **Public links:** Use unguessable scoped tokens, expiration, revocation, and minimal data.
- **File uploads:** Defend against malware, polyglots, decompression bombs, and metadata leakage.
- **AI features:** Treat retrieved and user content as untrusted; restrict tools independently.
- **Multi-region data:** Enforce residency and key-management obligations.
- **Administrators:** Audit actions and avoid shared accounts.
- **Password reset:** Prevent account enumeration and expire tokens after use.
- **Bulk exports:** Require authorization, rate limits, logging, and secure delivery.
- **Third-party apps:** Review scopes, revocation, and breach obligations.
- **Offline clients:** Protect local secrets and define revocation limits.
- **Legacy systems:** Isolate, monitor, and time-box compensating controls.

## Failure Recovery

- If active compromise is suspected, contain access, preserve evidence, rotate credentials, and invoke the incident plan.
- If tenant leakage occurs, stop the affected path, assess scope, notify accountable teams, and remediate all equivalent queries.
- If a dependency is compromised, freeze affected builds, identify exposure, update or remove it, and rotate reachable secrets.
- If logs contain sensitive data, restrict access, stop further logging, and apply retention and notification policy.
- If a control cannot be verified, mark it unknown rather than passing it.
- If remediation is deferred, document owner, expiry, compensating control, and accepted impact.
- If backups fail restore testing, treat availability and ransomware recovery as blockers.
- If an alert is noisy, tune it without removing coverage of the threat.

## Checklist

- [ ] Assets and sensitivity are classified.
- [ ] Trust boundaries are mapped.
- [ ] Entry points are inventoried.
- [ ] Authentication lifecycle is reviewed.
- [ ] Authorization is server-side.
- [ ] Tenant isolation is tested.
- [ ] Input validation is present.
- [ ] Output encoding is contextual.
- [ ] Queries are parameterized.
- [ ] CSRF protection is appropriate.
- [ ] Sessions are secure and revocable.
- [ ] Secrets are managed and rotatable.
- [ ] Sensitive logs are prohibited.
- [ ] Abuse controls and rate limits exist.
- [ ] Dependencies are scanned.
- [ ] CI uses least privilege.
- [ ] Audit events cover consequential actions.
- [ ] Backups restore successfully.
- [ ] Incident ownership is current.
- [ ] Findings have owners and verification criteria.
