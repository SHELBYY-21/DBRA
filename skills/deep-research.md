# Deep Research

## Description

Trigger this skill when the user needs a thorough, multi-source investigation of a topic: market landscapes, technology comparisons, competitive analysis, literature reviews, due diligence, or any question where a quick answer would be shallow or risky. Use it when accuracy and completeness matter more than speed.

## Goal

Produce a well-sourced, clearly structured research report that separates established facts from claims and opinions, states confidence levels, and answers the user's actual question rather than an adjacent one.

## Trigger Examples

- "Research the current state of vector databases and compare the top options."
- "What are the regulations for selling supplements online in the EU?"
- "Do a competitive analysis of scheduling tools for dental clinics."
- "Is there evidence that four-day workweeks improve productivity?"
- "Deep dive: how do companies price usage-based billing?"
- "Find everything relevant about WebGPU adoption in production apps."

## Workflow

1. **Restate the research question.** Write it as one answerable question plus 3–6 sub-questions. Confirm scope if ambiguous.
2. **Define what would change the answer.** Identify the decisive facts the research must establish.
3. **Plan the source strategy.** Mix primary sources (docs, filings, data, papers) with secondary sources (analyses, articles). Prioritize primary.
4. **Collect broadly, then filter.** Gather candidate sources first; discard low-quality ones by checking author, date, incentive, and methodology.
5. **Extract claims with citations.** Every extracted claim keeps its source, date, and a quality note.
6. **Triangulate.** Require at least two independent sources for load-bearing claims. Flag single-source claims.
7. **Resolve contradictions.** When sources disagree, present both, evaluate methodology, and state which is more credible and why.
8. **Synthesize.** Answer each sub-question, then the main question, with explicit confidence levels (high / medium / low).
9. **Surface gaps.** List what could not be established and what further research would close each gap.

## Rules

- Never present a single-source claim as established fact.
- Always record the publication date; stale data must be labeled with its age.
- Distinguish clearly between: verified fact, credible claim, vendor claim, and opinion.
- Vendor documentation is authoritative for capabilities, not for comparisons.
- Absence of evidence must be reported as such — never fill gaps with plausible-sounding inference presented as fact.
- Quantitative claims require the underlying number, unit, and source, not just the adjective.
- Note conflicts of interest (a benchmark published by a competitor is a claim, not a fact).
- Report contradictions instead of silently picking a side.

## Best Practices

- Start from the decision the research supports; depth follows decision-impact, not curiosity.
- Search in multiple phrasings and languages when relevant; first-page results are often SEO artifacts.
- Prefer data over narrative: pricing pages, changelogs, filings, and repositories beat blog commentary.
- Keep a running source log from the start; retrofitting citations loses information.
- Timebox collection phases; research expands to fill any time given.
- Re-verify the 3–5 most load-bearing claims at the end — these deserve double effort.
- Write the summary last, after synthesis, so it reflects findings rather than expectations.

## Output Format

```
## Research Question
<the question and scope>

## Executive Summary
<3-6 sentences: the answer with confidence level>

## Findings
### <Sub-question 1>
- Finding (confidence: high/medium/low) [source, date]

## Contradictions & Open Questions
| Claim | Source A | Source B | Assessment |
|-------|----------|----------|------------|

## Source Log
| Source | Type | Date | Quality Note |
|--------|------|------|--------------|

## Gaps & Next Steps
- <what remains unknown and how to find out>
```

## Examples

**Input:** "Compare Postgres full-text search vs. dedicated search engines for a 1M-document app."

**Output (abridged):** Sub-questions on relevance quality, latency at scale, operational cost, and feature needs (typo tolerance, faceting). Findings cite official docs and independent benchmarks; vendor benchmarks flagged as claims. Conclusion: Postgres FTS sufficient below stated thresholds (high confidence), dedicated engine warranted if typo tolerance is a hard requirement (medium confidence, single strong source).

**Input:** "Is the four-day workweek evidence supported?"

**Output (abridged):** Separates RCT-style trials from company self-reports; notes selection bias in pilot participants; reports effect ranges with sample sizes; conclusion stated at medium confidence with explicit caveats about generalizability.

## Edge Cases

- **Paywalled or inaccessible key sources:** Report the gap explicitly; use abstracts and secondary coverage with a quality downgrade, never fabricate contents.
- **Fast-moving topic:** Add a "data freshness" section; date-stamp every claim; recommend a re-check interval.
- **User's question presupposes a false premise:** Correct the premise first, with sources, then answer the corrected question.
- **Only vendor sources exist:** Say so; present capabilities as vendor claims and identify what independent verification would look like.
- **Overly broad request:** Negotiate scope down to the decision at hand before collecting.

## Failure Recovery

- **A cited claim turns out wrong:** Correct it prominently, trace which conclusions depended on it, and re-issue affected conclusions with updated confidence.
- **Two credible sources irreconcilably conflict:** Present both with methodologies; downgrade the conclusion to low confidence; identify the experiment or data that would resolve it.
- **Research answered the wrong question:** Return to step 1, restate the question with the user, and salvage reusable findings rather than starting cold.
- **Time ran out before triangulation:** Ship with single-source claims explicitly flagged and a prioritized verification list — never ship them disguised as facts.

## Checklist

- [ ] Research question and sub-questions written and confirmed
- [ ] Primary sources prioritized over secondary
- [ ] Every claim carries source and date
- [ ] Load-bearing claims triangulated across independent sources
- [ ] Facts, claims, vendor claims, and opinions labeled
- [ ] Contradictions surfaced, not hidden
- [ ] Confidence levels stated per finding
- [ ] Conflicts of interest noted
- [ ] Gaps and next steps listed
- [ ] Executive summary written last
