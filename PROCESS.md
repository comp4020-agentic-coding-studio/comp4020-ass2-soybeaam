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

## How I got here (`784772d`, `3b4cafa`)

The idea started from "my dog ate my homework": I wanted a satirical course
built around that reflex, and asked Claude for options fitting the brief's
constraint, niche enough no real curriculum committee would approve it, but
with real disciplinary depth. From five options it offered, I picked "The
Art of the Excuse" for having the most obvious backbone (rhetoric and social
psychology) to sustain twelve distinct weeks without repeating itself.

Before writing content, Claude explored the template's actual schema,
`src/content.config.ts`'s four collections, `course-config.ts`'s validated
fields, and existing placeholder files, rather than guessing the shape, and
proposed a plan I approved before any file changed: course meta first, then
people, then a layout pass modelled loosely on a real LMS like Canvas (a
persistent left sidebar, card-style week grids, rather than the starter
theme's plain page list), then all twelve weeks in three passes, then custom
spec checks, then this file.

## Building the course content (`c43cfb8`, `5039403`, `fa3d3c7`, `65e5810`)

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

## The sidebar logo and hover shadow that only reverting fixed (`636a86f`, `b4625e3`, `756bccb`, `de3f6e7`, `cb4d90f`, `2eac250`, `49182b1`, `45fd600`, `9b3ca81`)

The collapsed sidebar's crest icon and its hover shadow were misaligned from
early in the layout work, and asking Claude to fix it head-on kept moving the
problem rather than closing it: `636a86f` first merged the logo, site name,
and collapse toggle into a single sidebar header; `b4625e3` came back to
centre the collapsed-mode icons and flush the sidebar against the
breadcrumbs; `756bccb` and `de3f6e7` each touched sidebar/toggle styling
again for other reasons without landing the centring; and `cb4d90f`'s later
restructuring (merging logo, name, and toggle into one row again, plus a
docked search bar) made it worse. `2eac250` was the next direct attempt, and
it genuinely fixed the bug it named, a missing `min-width:0` that let an
invisible site-name span push the logo past the collapsed rail's clipped
edge, but the result still wasn't the centred, shadow-aligned crest I'd
actually asked for, so I reverted the whole commit (`49182b1`).

That blanket revert was too blunt: it also deleted unrelated fixes it had no
business touching (`.row-eyebrow` week/date styling, footer padding, the
phone double-gutter fix), which `45fd600` had to restore by hand, while
keeping the sidebar itself reverted to its simpler pre-`cb4d90f` markup
rather than trying to patch the newer structure forward again. Only once the
sidebar was back on that simpler, known-good structure did a real, narrower
bug show up under actual verification: a headless-Chrome screenshot showed
the collapsed rail's current-page highlight rendering as a 32x24 rectangle
instead of a 32x32 square next to it, fixed in one line in `9b3ca81`. Four
rounds of forward patching on the restructured header never converged;
reverting to the last simple version and re-checking against a real render
did, in the end.

## Phone-width regressions that kept coming back (`756bccb`, `4388abf`, `cb4d90f`, `9b3ca81`)

Layout changes made and verified on desktop repeatedly broke, or silently
dropped, phone-width fixes made earlier in the same file. `756bccb` was the
first dedicated pass to fix a squashed drawer, dropdown panels clipped off
screen, and sideways page scroll caused by a subgrid child overhanging its
parent's column span at narrow widths, none of which showed up testing
desktop alone. `4388abf` and `cb4d90f` each had to re-touch phone behaviour
again (sidebar collapse state, phone font size, mobile layout fixes bundled
into the search feature commit), because a later desktop-focused change kept
overwriting or bypassing the earlier narrow-viewport rule rather than
composing with it. Asking Claude to fix desktop layout was not, on its own,
enough to keep it from regressing phone width, so I had Claude add two
standing rules to `CLAUDE.md` rather than leaving it as one-off advice: check
every layout change at desktop, 768px, and ~390px every time, and treat the
phone padding/font tokens as already-tuned so a component-scoped fix doesn't
reopen and re-break the shared values other pages depend on.

## State that reset itself across navigations (`4388abf`, `de3f6e7`)

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

## Other fixes along the way (`cec93d4`, `f521680`)

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
