# Working rules for this repo

## Content is coherent worldbuilding, not filler

Every page is written as if a real prospective student will read it before
enrolling. No "replace this" placeholder text ships. If a page can't be
written honestly yet (a reading not chosen, a rubric not decided), leave a
narrower TODO in conversation, not in the file — half-written pages don't ship.

## Dates are load-bearing

`course-config.ts`'s `startDate`/`endDate` and every `sessions`/`lectures`
date and `assessments` `due` are checked by `spec/data-integrity.test.ts`.
When adding or moving a week, run `pnpm check` before committing — a date one
day outside the range fails the build, not just a lint.

## YAML frontmatter gotcha

A multi-line frontmatter string containing a bare colon (e.g. a `description:`
under `marking.description` that itself reads like "X: Y") breaks the YAML
parser as an implicit block mapping. Use a folded block scalar (`>`) for any
multi-line value that contains a colon.

## Assessment weights must sum to 100

Enforced by `spec/course-shape.test.ts`. Change one assessment's `weight` and
check the others, or the build fails.

## Every week gets a session and a lecture, cross-linked

Twelve of each, one per week, and each pair references the other via
`related:` (declare the edge on whichever side is convenient — it renders on
both). `spec/course-shape.test.ts` enforces both the count and the cross-link.

## Design priorities: efficiency, usability, understandability, functionality

Site design and layout decisions (theme, navigation, card/content structure)
should optimise for a visitor getting to the information they need quickly
and without confusion — not for decoration. When restyling or adding UI,
prefer the simpler, more legible option over a more elaborate one, check
that it doesn't add friction (extra clicks, unclear labels, dense pages) for
a student trying to find a date, a reading, or a mark weighting, and confirm
it still works (`pnpm check`, a manual `pnpm dev` look) rather than looking
right only in a screenshot.

## Commit as you go

Commit at each real milestone (a section of content, a config change, a new
spec check) rather than batching everything into one commit at the end —
`PROCESS.md` cites commits as evidence, and an honest narrative needs real
commits to point to.
