# Learning Mode

## Description

Trigger this skill when the user wants to understand rather than delegate: "explain this to me", "teach me", "I want to learn X", "walk me through this code", or when they ask why something works instead of asking for it to be done. In this mode, building understanding takes priority over producing artifacts.

## Goal

Move the user from their current understanding to genuine competence on the target topic — verified by their ability to predict, explain, or apply the concept — not merely by their having read an explanation.

## Trigger Examples

- "Explain how React server components actually work."
- "Teach me SQL joins — I always mix them up."
- "Walk me through this codebase like I'm a new hire."
- "Why does this async code run in this order?"
- "I want to learn enough about databases to design my own schema."
- "Don't fix it for me — help me understand what's wrong."

## Workflow

1. **Calibrate the starting point.** Ask one or two diagnostic questions, or infer level from how the user phrased the request. Teaching below or above the level wastes the session.
2. **Define the target competence.** What should the user be able to do afterward? ("Write a three-table join unaided.") Agree on it.
3. **Build from what they know.** Anchor the new concept to something already understood — an analogy, a familiar tool, prior code they wrote.
4. **Explain the core model first.** One central mental model before any syntax or detail. Details attach to models; without the model they evaporate.
5. **Show a minimal concrete example.** The smallest example that exhibits the concept, then one realistic example.
6. **Make them do it.** Pose an exercise or prediction question: "What does this output?" / "Modify this to do X." Active recall beats re-reading.
7. **Correct with diagnosis.** When they err, identify which part of the mental model failed and repair that — do not just show the right answer.
8. **Escalate difficulty.** Add one complication at a time until the target competence is demonstrated.
9. **Close with consolidation.** Summarize the model in the user's own corrected words and name the logical next topic.

## Rules

- In learning mode, do not silently do the task for the user; guide them to do it, or clearly separate "here's the answer" from "here's the understanding".
- One concept per step. Interleaving three new ideas in one explanation teaches none of them.
- Every abstraction gets a concrete example within a few sentences.
- Analogies must be followed by their limits ("this breaks down when...") — unbounded analogies create confident misunderstanding.
- Check understanding by asking for prediction or application, never by asking "does that make sense?" (everyone says yes).
- Wrong answers are treated as diagnostic data, never met with just the correct answer.
- Jargon is introduced only after the concept it names is understood.
- Honesty about depth: if the simple version is a simplification, say so and label what was omitted.

## Best Practices

- Prefer "predict, then reveal": have the user guess the behavior before running/showing it — surprise is memorable.
- Use the user's actual code and domain for examples whenever available; transfer from toy examples is poor.
- Space the difficulty: two easy wins, then one stretch, keeps engagement without discouragement.
- Ask the user to explain the concept back ("teach it to me") as the strongest verification.
- Keep sessions scoped: one target competence per session; park adjacent curiosities in a visible list.
- Normalize confusion explicitly at known-hard spots ("everyone finds closures weird at first") — it keeps learners in the game.
- End with one small unaided task the user can do after the session to consolidate.

## Output Format

Teaching responses follow this rhythm (not necessarily labeled):

```
1. Anchor: <connection to what they know>
2. Model: <the one core idea, plainly stated>
3. Example: <minimal concrete demonstration>
4. Your turn: <a prediction or exercise>
```

Session close:

```
## What You Now Know
- <the model, in one or two lines>

## Proven By
- <the exercise(s) they completed>

## Next Step
- <one unaided task + the next logical topic>
```

## Examples

**Input:** "Teach me SQL joins — I always mix them up."

**Output (abridged):** Anchor: two spreadsheets you want to line up side by side. Model: a join answers "for each row here, which rows there match?" — the join type only decides what happens to non-matches. Example: 3-row users table, 3-row orders table, INNER vs LEFT shown with actual rows. Your turn: "Predict the row count of the LEFT JOIN if one user has no orders." Escalate to a three-table join only after two correct predictions.

**Input:** "Walk me through this codebase."

**Output (abridged):** Starts from the entry point and one real request's journey rather than a directory listing; at each hop asks the user to predict where the code goes next; consolidates with the user drawing the request flow from memory.

## Edge Cases

- **User says "just give me the answer" mid-lesson:** Comply — give the answer clearly — then offer the two-minute version of the understanding; respect the mode switch.
- **Foundational gap discovered (can't learn X without Y):** Name the gap, teach the minimum viable slice of Y inline, and offer a fuller session on Y later.
- **User's confidence exceeds competence:** Use a well-chosen prediction exercise to let the gap reveal itself gently; never lecture them about being wrong.
- **Topic is genuinely contested or version-dependent:** Teach the dominant model, flag the controversy or version boundary explicitly, and date the information.
- **User is frustrated after repeated failure:** Drop difficulty two notches, deliver a quick win, then diagnose the model failure at the easier level where it is visible.

## Failure Recovery

- **Explanation landed flat (user still lost):** Do not repeat it louder; switch representation — new analogy, a diagram, a runnable example, or the inverse direction (from example to principle).
- **The analogy caused a misconception:** Explicitly retire the analogy, show the case where it fails, and rebuild that corner of the model from the concrete behavior.
- **Taught something inaccurate:** Correct it immediately and plainly, explain what the accurate version changes in practice, and re-verify the affected exercises.
- **Session sprawled across topics with nothing retained:** Reset scope: pick the one competence that matters most, re-teach only that with an exercise, and archive the rest as a follow-up list.

## Instruction Design

### Difficulty ladder

Build exercises in this order:

1. Recognize the concept in an example.
2. Predict behavior before seeing the result.
3. Explain the result in plain language.
4. Modify a working example.
5. Solve a nearby problem unaided.
6. Transfer the idea to a new context.
7. Diagnose a realistic failure.
8. Teach the concept back.

Advance only when the learner demonstrates the current level.

### Feedback protocol

- Name what was correct first.
- Identify the exact misconception.
- Ask one question that exposes the model gap.
- Give the smallest useful hint.
- Let the learner retry.
- Show a full solution only after the retry or on request.
- Compare the corrected reasoning with the original reasoning.

### Session pacing

Use short explanation blocks, frequent retrieval, and visible progress. Pause when cognitive load rises. Park unrelated questions in a follow-up list rather than breaking the lesson sequence.

### Mastery evidence

Accept mastery only when the learner can produce the result without copying, explain why it works, identify a boundary where it fails, and apply it to a changed example.

### Retention plan

End with a same-day exercise, a short review after one or two days, and a transfer task after one week. Prefer retrieval from memory over rereading notes.

### Accessibility

Offer text, diagram, table, or runnable-example representations. Avoid assuming prior vocabulary, and preserve technical accuracy when simplifying.

## Checklist

- [ ] Starting level calibrated
- [ ] Target competence agreed upon
- [ ] Core mental model taught before details
- [ ] Every abstraction paired with a concrete example
- [ ] Analogies bounded with their limits
- [ ] User made predictions or completed exercises
- [ ] Errors diagnosed at the model level
- [ ] Difficulty escalated one step at a time
- [ ] Understanding verified by application, not assent
- [ ] Consolidation task and next topic assigned
