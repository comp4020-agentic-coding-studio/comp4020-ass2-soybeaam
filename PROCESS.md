# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

**The Art of the Excuse**, a fictional twelve-week course for Slop University
on the rhetoric, psychology, and design of excuses — from a toddler's alibi to
a chatbot's confabulated justification — taught through a taxonomy of denial,
justification, and diffusion of responsibility that the course builds in
week 1 and spends the rest of the semester stress-testing.

## How I got here

I asked Claude for course ideas fitting the brief's constraint — niche enough
no real curriculum committee would approve it, but with real disciplinary
depth. From five options it offered, I picked "The Art of the Excuse" for
having the most obvious backbone (rhetoric and social psychology) to sustain
twelve distinct weeks without repeating itself.

Before writing content, Claude explored the template's actual schema —
`src/content.config.ts`'s four collections, `course-config.ts`'s validated
fields, and existing placeholder files — rather than guessing the shape, and
proposed a plan I approved before any file changed: course meta first, then
people, then all twelve weeks in three passes, then custom spec checks, then
this file.

[`c43cfb8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/c43cfb8)
set the course record, homepage copy, and policies page. This is where I made
the one deliberate policy joke — extensions are not granted for "my
excuse-writing course made me realise my excuse wasn't good enough" — that I
kept because it's a claim the course's own content backs up, not a throwaway
line.

[`5039403`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/5039403)
gave the two teaching staff real backstories (a convenor who used to write
corporate non-apologies for a living) instead of generic bios, so the
`related:` links between people and their teaching weeks mean something.

[`fa3d3c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/fa3d3c7)
is the largest commit: all twelve session/lecture pairs and the four
assessments. Building this, `pnpm check` caught two real mistakes rather than
me eyeballing them — a `spec/data-integrity.test.ts` failure showed week 12
fell after my first-guess `endDate`, and the build itself rejected a
`marking.description` string that read as YAML because it contained a bare
colon (fixed with a folded `>` scalar). Both fixes are recorded in
`CLAUDE.md` so I don't repeat them.

[`65e5810`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/65e5810)
adds `spec/course-shape.test.ts`: it checks the promises specific to *this*
course rather than the platform's generic ones — exactly twelve weeks,
assessment weights summing to 100, at least one lecture with a resolvable
slide deck, and every session/lecture pair cross-linked. I chose these four
because they're the ones a careless edit could silently break without a human
noticing (a thirteenth week, a rounding error in weights), not because they
were easy to write.

I knew the result was right when `pnpm check` was green after each commit,
not just at the end, and when I walked the built site myself — homepage,
weeks 1, 6 and 12, an assessment, the week-1 deck, and the policies page — the
same tour the assessment page says a marker runs.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
