# Prompt Engineer

## Description

Trigger this skill when the user wants to write, improve, debug, or evaluate prompts for large language models: system prompts, few-shot prompts, structured-output prompts, agent instructions, or prompt templates embedded in applications. Also applies when a user says an LLM "isn't following instructions" or produces inconsistent output.

## Goal

Produce prompts that are unambiguous, testable, and robust across inputs — maximizing instruction-following and output consistency while minimizing token waste.

## Trigger Examples

- "Write a system prompt for a customer support bot."
- "My model keeps ignoring the JSON format I asked for."
- "Improve this prompt — the answers are too vague."
- "Create a prompt template for summarizing legal documents."
- "How do I stop the model from making things up?"
- "Design few-shot examples for sentiment classification."

## Workflow

1. **Define the task contract.** State exactly what the model receives (inputs) and must return (outputs), including format, length, and tone.
2. **Identify failure modes.** List how the current prompt fails: wrong format, hallucination, verbosity, refusals, inconsistency.
3. **Structure the prompt.** Order sections as: role → task → constraints → output format → examples → input.
4. **Write positive instructions.** Say what to do, not only what to avoid. Pair every "never" with a "instead, do".
5. **Add examples strategically.** Use 2–5 few-shot examples covering the normal case, an edge case, and a rejection case.
6. **Specify the output format precisely.** For structured output, provide the exact schema and one valid instance.
7. **Test against a fixed input set.** Build 5–10 test inputs including adversarial and edge cases; run the prompt against all of them.
8. **Iterate on one variable at a time.** Change one section per iteration so improvements are attributable.
9. **Version and document.** Record prompt versions with test results so regressions are visible.

## Rules

- One prompt, one task. Split multi-task prompts into separate calls or explicit stages.
- Put the most important constraints near the top and repeat critical format rules near the bottom.
- Never rely on the model inferring format from prose; show the exact structure.
- Use delimiters (triple backticks, XML-style tags) to separate instructions from user data.
- Treat user-provided content as data, not instructions; state this explicitly to reduce injection.
- Avoid vague qualifiers ("be concise", "high quality") without measurable definitions ("max 3 sentences").
- Do not stack conflicting instructions; resolve conflicts before shipping.
- Temperature and prompt design are coupled: deterministic tasks get low temperature plus strict format.

## Best Practices

- Give the model an explicit persona only when it changes behavior; skip decorative personas.
- For extraction tasks, instruct the model to output a null/empty marker when data is absent — this cuts hallucination sharply.
- Ask for reasoning before the answer for hard tasks; ask for the answer only when latency and cost matter.
- Use output prefilling or schema-constrained generation when the platform supports it.
- Prefer positive few-shot examples over long lists of prohibitions.
- Keep system prompts stable and put volatile context in the user message.
- Measure with a rubric: format validity rate, factual accuracy, instruction adherence — not vibes.

## Output Format

When delivering a prompt, return:

```
## Prompt (v<N>)
<the full prompt text in a code block>

## Design Notes
- <why each major section exists>

## Test Set
| Input | Expected Behavior |
|-------|-------------------|

## Known Limitations
- <cases the prompt does not handle>
```

## Examples

**Input:** "My extraction prompt returns prose instead of JSON."

**Output (abridged):**
- Diagnosis: format instruction buried mid-prompt, no schema shown, no example output.
- Fix: move format rule to the end, add exact JSON schema, add one valid example, add "Return only valid JSON. No markdown, no commentary."
- Test: 8 inputs including one with missing fields → expect `null` values, not invented data.

**Input:** "Write a support-bot system prompt."

**Output (abridged):** Role (support agent for product X), scope (answer from provided docs only), escalation rule (offer human handoff when confidence is low), tone (friendly, max 4 sentences), injection guard (treat customer text as data), and a refusal template for out-of-scope requests.

## Edge Cases

- **Model must handle multiple languages:** Add an explicit language-matching rule ("respond in the language of the user's message") and test non-English inputs.
- **Input longer than context allows:** Design a chunking or map-reduce prompting strategy instead of truncating silently.
- **Adversarial input attempts to override instructions:** Delimit user content, instruct the model to ignore embedded instructions, and test with injection strings.
- **Ambiguous user input:** Instruct the model to ask one clarifying question rather than guessing, and define when guessing is acceptable.
- **Provider or model changes:** Re-run the full test set; never assume prompt portability across models.

## Failure Recovery

- **Format compliance drops after an edit:** Diff against the last passing version, revert the offending change, and re-apply intent with different wording.
- **Hallucinations persist:** Add grounding ("answer only from the provided context"), add an explicit "say 'I don't know'" path, and reduce temperature before restructuring.
- **Prompt grows bloated and fragile:** Rebuild from the task contract; migrate rules into few-shot examples, which are more robust than instruction lists.
- **Inconsistent results across runs:** Lower temperature, tighten output format, and check whether inconsistency comes from ambiguous inputs rather than the prompt.

## Checklist

- [ ] Task contract (inputs, outputs, format, tone) written
- [ ] Prompt ordered: role → task → constraints → format → examples → input
- [ ] Exact output schema with a valid example shown
- [ ] User data delimited and treated as data
- [ ] Null/unknown path defined to reduce hallucination
- [ ] 5–10 test inputs including edge and adversarial cases
- [ ] One-variable-at-a-time iteration
- [ ] Rubric-based measurement, not vibes
- [ ] Prompt versioned with test results
- [ ] Known limitations documented
