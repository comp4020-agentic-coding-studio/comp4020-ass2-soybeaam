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

[`c43cfb8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/c43cfb8)
set the course record, homepage copy, and policies page. This is where I made
the one deliberate policy joke, that extensions are not granted for "my
excuse-writing course made me realise my excuse wasn't good enough", that I
kept because it's a claim the course's own content backs up, not a throwaway
line.

[`5039403`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/5039403)
gave the two teaching staff real backstories (a convenor who used to write
corporate non-apologies for a living) instead of generic bios, so the
`related:` links between people and their teaching weeks mean something.

[`fa3d3c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/fa3d3c7)
is the largest commit: all twelve session/lecture pairs and the four
assessments. Building this, `pnpm check` caught two real mistakes rather than
me eyeballing them. A `spec/data-integrity.test.ts` failure showed week 12
fell after my first-guess `endDate`, and the build itself rejected a
`marking.description` string that read as YAML because it contained a bare
colon (fixed with a folded `>` scalar). Both fixes are recorded in
`CLAUDE.md` so I don't repeat them.

[`65e5810`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/65e5810)
adds `spec/course-shape.test.ts`: it checks the promises specific to *this*
course rather than the platform's generic ones: exactly twelve weeks,
assessment weights summing to 100, at least one lecture with a resolvable
slide deck, and every session/lecture pair cross-linked. I chose these four
because they're the ones a careless edit could silently break without a human
noticing (a thirteenth week, a rounding error in weights), not because they
were easy to write.

I knew the result was right when `pnpm check` was green after each commit,
not just at the end, and when I walked the built site myself (homepage,
weeks 1, 6 and 12, an assessment, the week-1 deck, and the policies page), the
same tour the assessment page says a marker runs.

## UI and layout iteration

After the content and spec checks were in place, most of the remaining work
was theme and layout: restyling the site and building real navigation
(sidebar, right rail, header dropdowns) rather than the template defaults.
This iteration surfaced its own pain points, mostly around state that has to
survive Astro's client-side view transitions and layouts that only get tested
at one viewport width:

- **Sidebar collapse state didn't survive navigation.** `AppSidebar`'s
  collapse toggle only restored its `localStorage` value on the initial page
  load; `ClientRouter` view transitions reset it on every client-side nav.
  Fixed by re-running the restore on `astro:page-load` (`4388abf`), matching
  a pattern `RightSidebar` already used.
- **Sidebar toggles were scrolling the page back to the top.** The
  checkbox-based state holders were absolutely positioned at the sidebar's
  top; toggling a label focuses its checkbox, and the browser scrolls
  focused elements into view. Fixed by pinning the checkboxes to the
  viewport instead (`de3f6e7`).
- **Phone-width regressions from desktop-first CSS.** A single pass
  (`756bccb`) had to fix a squashed drawer, dropdown panels clipped off
  screen, and sideways page scroll caused by a subgrid child overhanging its
  parent's column span at narrow widths, none of which showed up testing
  desktop alone. This is why CLAUDE.md now has a standing rule to check
  layout changes at desktop, 768px, and phone widths every time.
- **Collapsed-sidebar icons and flush edges.** Icon-rail collapse mode
  needed its own centering fix, and the sidebar/breadcrumbs had to be
  explicitly flushed against each other rather than relying on default
  spacing (`b4625e3`).
- **Scaffolded pages can ship without their layout.** Some
  index/detail pages were missing their layout wiring entirely
  (`cec93d4`, "fix: wire missing layout on stock listing pages"), a
  reminder that template scaffolding can silently omit a layout import that
  only shows up once you actually click through, not in a diff review.
- **Hover-only affordances don't work on touch.** The slides link and
  person-detail facts redesign (`f521680`) replaced a single hover-styled
  button with a card that has explicit tap targets, after confirming the
  original relied on `:hover` with no focus/tap equivalent.

Each of these was a "looked right on my screen, broke somewhere I didn't
check" failure. The fix in every case was narrower testing surface
(a specific breakpoint, a specific interaction) rather than a rewrite.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
