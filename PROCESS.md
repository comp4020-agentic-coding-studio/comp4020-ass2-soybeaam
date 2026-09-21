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
on the rhetoric, psychology, and design of excuses, from a toddler's alibi to
a chatbot's confabulated justification, taught through a taxonomy of denial,
justification, and diffusion of responsibility that the course builds in
week 1 and spends the rest of the semester stress-testing.

The submission is the course's public-facing site, not just its content: a
homepage with a week-by-week overview, a sessions index (workshops) and a
lectures index, each with its own detail page and hero image; a people page
split into convenor/tutors/students with individual profile pages; an
assessments index with four graded tasks; a policies page; and a persistent
collapsible left sidebar plus a right-hand rail (clock/calendar) that stay in
sync across client-side navigations. Content and layout were built together:
the twelve weeks of material are what the nav, grids, and detail pages exist
to present.

## How I got here

I asked Claude for course ideas fitting the brief's constraint, niche enough
no real curriculum committee would approve it, but with real disciplinary
depth. From five options it offered, I picked "The Art of the Excuse" for
having the most obvious backbone (rhetoric and social psychology) to sustain
twelve distinct weeks without repeating itself.

Before writing content, Claude explored the template's actual schema,
`src/content.config.ts`'s four collections, `course-config.ts`'s validated
fields, and existing placeholder files, rather than guessing the shape, and
proposed a plan I approved before any file changed: course meta first, then
people, then all twelve weeks in three passes, then custom spec checks, then
this file.

## Building the course content

Setting the course record, homepage copy, and policies page came first. This
is where I made the one deliberate policy joke, that extensions are not
granted for "my excuse-writing course made me realise my excuse wasn't good
enough", that I kept because it's a claim the course's own content backs up,
not a throwaway line. Writing up the teaching team came next, giving the two
staff real backstories (a convenor who used to write corporate non-apologies
for a living) instead of generic bios, so the `related:` links between people
and their teaching weeks mean something.

All twelve session/lecture pairs and the four assessments were the largest
single piece of work. Building it, `pnpm check` caught two real mistakes
rather than me eyeballing them: a `spec/data-integrity.test.ts` failure
showed week 12 fell after my first-guess `endDate`, and the build itself
rejected a `marking.description` string that read as YAML because it
contained a bare colon (fixed with a folded `>` scalar). Both fixes are
recorded in `CLAUDE.md` so I don't repeat them. `spec/course-shape.test.ts`
followed, checking promises specific to *this* course rather than the
platform's generic ones: exactly twelve weeks, assessment weights summing to
100, at least one lecture with a resolvable slide deck, and every
session/lecture pair cross-linked. I chose these four because they're the
ones a careless edit could silently break without a human noticing (a
thirteenth week, a rounding error in weights), not because they were easy to
write.

I knew the result was right when `pnpm check` was green after each commit,
not just at the end, and when I walked the built site myself (homepage,
weeks 1, 6 and 12, an assessment, the week-1 deck, and the policies page), the
same tour the assessment page says a marker runs.

## The sidebar logo that took several tries to actually fix

The collapsed sidebar's logo and its hover shadow were misaligned from early
in the layout work, and getting them centred took repeated passes rather than
one: `636a86f` first merged the logo, site name, and collapse toggle into a
single sidebar header; `b4625e3` came back to specifically centre the
collapsed-mode icons and flush the sidebar against the breadcrumbs; `756bccb`
and `de3f6e7` each touched sidebar/toggle styling again for other reasons;
and `2eac250` is the commit that finally fixes the collapsed logo and
right-aligns the search icon. Each earlier attempt visibly moved the problem
(centred the icon but not the shadow, fixed the shadow but broke flush
alignment against the header) rather than resolving it, which is why this
took five commits spread across most of the UI work instead of one.

## Phone-width regressions that kept coming back

Layout changes made and verified on desktop repeatedly broke, or silently
dropped, phone-width fixes made earlier in the same file. `756bccb` was the
first dedicated pass to fix a squashed drawer, dropdown panels clipped off
screen, and sideways page scroll caused by a subgrid child overhanging its
parent's column span at narrow widths, none of which showed up testing
desktop alone. `4388abf` and `cb4d90f` each had to re-touch phone behaviour
again (sidebar collapse state, phone font size, mobile layout fixes bundled
into the search feature commit), because a later desktop-focused change kept
overwriting or bypassing the earlier narrow-viewport rule rather than
composing with it. This recurrence is why `CLAUDE.md` now has two standing
rules rather than one piece of advice: check every layout change at desktop,
768px, and ~390px every time, and treat the phone padding/font tokens as
already-tuned so a component-scoped fix doesn't reopen and re-break the
shared values other pages depend on.

## State that reset itself across navigations

A third recurring failure mode was state that looked correct on first load
but reset the moment Astro's `ClientRouter` ran a client-side view
transition. `AppSidebar`'s collapse toggle only restored its `localStorage`
value on initial page load, so every in-app navigation silently re-expanded
it, fixed in `4388abf` by re-running the restore on `astro:page-load` to
match a pattern `RightSidebar` already used. Separately, the checkbox-based
sidebar toggles were absolutely positioned at the sidebar's top, and
toggling a label focuses its checkbox, so the browser scrolled the whole
page back up on every click, fixed in `de3f6e7` by pinning the checkboxes to
the viewport instead. Both bugs had the same shape: a fix that worked for a
single page load but not for the persistent, client-routed session the rest
of the site relies on, only visible by actually clicking through the site
rather than reloading a single page.

## Other fixes along the way

Some index/detail pages shipped without their layout wiring entirely
(`cec93d4`, "fix: wire missing layout on stock listing pages"), a reminder
that template scaffolding can silently omit a layout import that only shows
up once you actually click through, not in a diff review. The slides link
and person-detail facts redesign (`f521680`) replaced a single hover-styled
button with a card that has explicit tap targets, after confirming the
original relied on `:hover` with no focus/tap equivalent, since hover-only
affordances don't work on touch.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
