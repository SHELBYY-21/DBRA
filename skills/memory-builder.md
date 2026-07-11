# Memory Builder

## Description

Trigger this skill when the user wants to capture, organize, or retrieve persistent knowledge across sessions: saving preferences, recording decisions, building a personal or team knowledge base, structuring memory files, or asking "remember this" / "what do you know about X?". Applies to AI-assistant memory systems and human-readable knowledge repositories alike.

## Goal

Maintain a memory system that is concise, current, and retrievable — where every stored item earns its place, stale entries are pruned, and future sessions can act on saved context without re-asking.

## Trigger Examples

- "Remember that we always use pnpm, never npm."
- "Save my brand colors and typography choices."
- "What did we decide about the auth approach last time?"
- "Organize everything you know about my project into memory files."
- "Update my preferences — I switched from Tailwind v3 to v4."
- "Forget the old API conventions; we migrated."

## Workflow

1. **Classify the memory.** Determine type: preference, decision, fact, convention, credentialed-context (never store secrets), or procedure.
2. **Check for existing entries.** Search current memory before writing; update or merge rather than duplicate.
3. **Distill to the durable core.** Strip session-specific details; keep only what remains true next month.
4. **Choose the location.** Index-level summaries go in the main memory file; details go in topic files (e.g., `design.md`, `stack.md`).
5. **Write atomically.** One concept per entry, stated declaratively: "Uses Neon + Drizzle for all persistence."
6. **Date significant decisions.** Add the decision date and a one-line rationale for anything likely to be questioned later.
7. **Prune on write.** When adding to a topic file, remove entries the new information supersedes.
8. **Verify retrievability.** Confirm the index mentions the topic file so future sessions can find it.

## Rules

- Never store secrets, API keys, passwords, tokens, or personal identifiers.
- Never store session-ephemeral details (current bug, today's task list) as long-term memory.
- One fact lives in one place; cross-reference instead of copying.
- Superseded memories are updated or deleted, never left to contradict new ones.
- The index/main file stays short; it is a table of contents, not a dump.
- Memories are written declaratively in present tense, not as chat transcripts.
- Explicit user corrections override inferred preferences immediately.
- When uncertain whether something is worth saving, ask — do not silently hoard.

## Best Practices

- Organize by topic (design, stack, business rules), not by date of conversation.
- Record the "why" with decisions; a decision without rationale gets re-litigated.
- Keep entries scannable: short bullets, consistent structure, no prose paragraphs.
- Review memory when it is loaded: if an entry looks stale, confirm before relying on it.
- Prefer strong, specific entries ("API errors return RFC 7807 problem+json") over weak ones ("cares about error handling").
- Batch small related facts into one coherent entry rather than ten fragments.
- Treat memory as a product with a size budget; growth without pruning degrades every future session.

## Output Format

When saving memory, confirm with:

```
## Memory Updated
**File:** <path>
**Action:** added | updated | merged | removed

**Entry:**
> <the exact text stored>

**Superseded:** <what was removed or changed, or "none">
```

When retrieving, answer the question first, then cite:

```
<answer>

_Source: <memory file>, entry "<entry title>" (recorded <date if available>)_
```

## Examples

**Input:** "Remember: all dashboard charts use the brand green #16a34a as the primary series color."

**Output (abridged):** Updates `design.md` under a "Charts" heading; checks for an existing chart-color entry and replaces it; confirms the exact stored text; notes that the previous default (blue) entry was superseded.

**Input:** "What are my code conventions?"

**Output (abridged):** Reads the conventions topic file; returns the list (package manager, formatting, error-handling pattern, naming); flags one entry recorded eight months ago as possibly stale and asks whether it still holds.

## Edge Cases

- **User asks to remember a secret:** Refuse to store the secret itself; offer to store where it lives ("Stripe key is in Vercel env vars") instead.
- **New memory contradicts old memory:** Surface the conflict to the user, then keep exactly one resolved version.
- **Vague instruction ("remember this whole conversation"):** Extract the 3–5 durable facts, present them for confirmation, and store only those.
- **Memory file exceeds its useful size:** Split into topic files, rebuild the index, and archive rather than delete uncertain entries.
- **Two topics claim the same fact:** Choose the more specific home, and reference it from the other.
- **User requests deletion:** Remove the entry fully and confirm; do not keep shadow copies.

## Failure Recovery

- **Acted on stale memory:** Apologize once, correct the stored entry immediately, and add a date to the corrected entry to aid future freshness checks.
- **Duplicate conflicting entries discovered:** Merge into one authoritative entry, delete the rest, and note the resolution.
- **Saved something the user considers noise:** Delete it, and tighten the saving threshold for that category going forward.
- **Lost or missing memory file referenced by the index:** Repair the index, reconstruct the file from conversation context where possible, and flag what could not be recovered.

## Checklist

- [ ] Memory classified by type before saving
- [ ] Existing entries searched to avoid duplication
- [ ] Entry distilled to durable, declarative form
- [ ] Correct file chosen (index vs. topic file)
- [ ] No secrets or ephemeral session data stored
- [ ] Superseded entries updated or removed
- [ ] Decisions dated with rationale
- [ ] Index updated for retrievability
- [ ] User shown exactly what was stored
- [ ] Size budget respected; pruning performed on write
