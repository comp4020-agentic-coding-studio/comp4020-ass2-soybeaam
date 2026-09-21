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
on the rhetoric, psychology, and design of excuses, from a toddler's alibi to justification, taught through a taxonomy of denial, justification, and diffusion of responsibility that the course builds upon for 12 weeks.

The AI has used the template as a requirement of pages. The homepage displays with a week-by-week overview, a sessions index (workshops) and a lectures index, each with its own detail page and hero image; a people page split into convenor/tutors/students with individual profile pages; an assessments index with four graded tasks; a policies page; and a persistent collapsible left sidebar plus a right-hand rail (clock/calendar) that stay in sync across client-side navigations. Content and layout were built together: the twelve weeks of material are what the nav, grids, and detail pages exist to present.

## How I got here 

Commits: ([`784772d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/784772d), [`3b4cafa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/3b4cafa))
The idea started from "my dog ate my homework": I wanted a satirical course built around that reflex, and asked Claude for options fitting the brief's constraint, niche enough no real curriculum committee would approve it, but with real disciplinary depth. From five options it offered, I picked "The Art of the Excuse" for having the most obvious backbone (social psychology) to sustain twelve distinct weeks. The AI was tasked to fill in meta-data, from people to coursework and content, then the site was looked at and adjusted with small prompts. 
### The sidebar logo and hover shadow
Commits: [`636a86f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/636a86f), [`b4625e3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/b4625e3), [`756bccb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/756bccb), [`de3f6e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/de3f6e7), [`cb4d90f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/cb4d90f), [`2eac250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/2eac250), [`49182b1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/49182b1), [`45fd600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/45fd600), [`9b3ca81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/9b3ca81)

Inspired by Canvas and in opposition to the top nav bar, I prompted for a collapsed sidebar. Everything was structured abnormally and required fixing, however, the SlopUI logo and its hover shadow was misaligned from early in the layout work right till the end. Claude was tasked to fix it several times, however it kept moving the problem rather than resolving it. Commit [`636a86f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/636a86f) first merged the logo, site name, and collapse toggle into a single sidebar header; [`b4625e3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/b4625e3) came back to centre the collapsed-mode icons and flush the sidebar against the breadcrumbs; [`756bccb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/756bccb) and [`de3f6e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/de3f6e7) each touched sidebar/toggle styling again for other reasons without landing the centring; and [`cb4d90f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/cb4d90f)'s later restructuring (merging logo, name, and toggle into one row again, plus a docked search bar) made it worse. [`2eac250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/2eac250) was the next direct attempt, and it Claude decided for the 6th time that it genuinely fixed the bug, determining that a missing `min-width:0` that let an invisible site-name span push the logo past the collapsed rail's clipped edge, but the result still wasn't the centred, shadow-aligned crest I'd actually asked for, so I reverted the whole commit ([`49182b1`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/49182b1)), which also reverted other changes.

That revert did more damage than good, it also deleted unrelated fixes it had no business touching (`.row-eyebrow` week/date styling, footer padding, the phone double-gutter fix), which [`45fd600`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/45fd600) had to restore by hand, while keeping the sidebar itself reverted to its simpler pre-`cb4d90f` markup rather than trying to patch the newer structure forward again. Only once the sidebar was back on that simpler, known-good structure did a real, narrower bug show up under actual verification: a headless-Chrome screenshot showed the collapsed rail's current-page highlight rendering as a 32x24 rectangle instead of a 32x32 square next to it, fixed in one line in [`9b3ca81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/9b3ca81). Four rounds of forward patching on the restructured header never converged; reverting to the last simple version and re-checking against a real render did, in the end.
## Phone-width regressions 
Commits: ([`756bccb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/756bccb), [`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf), [`cb4d90f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/cb4d90f), [`9b3ca81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/9b3ca81), [`f3513b8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/f3513b8))

Layout changes made and verified on desktop repeatedly broke, or silently dropped, phone-width fixes made earlier in the same file. [`756bccb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/756bccb) was the first dedicated pass to fix a squashed drawer, dropdown panels clipped off screen, and sideways page scroll caused by the padding. However, the final fix revealed AppSidebar.astro:557 was setting --at-sidebar-inset: 3rem when the sidebar was collapsed causing the issue. Commits [`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf) and [`cb4d90f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/cb4d90f) each attempted to re-touch phone behaviour again (sidebar collapse state, phone font size, mobile layout fixes bundled into the search feature commit) and later desktop-focused change kept overwriting or bypassing the earlier narrow-viewport rule rather than composing with it. I had Claude add two rules to `CLAUDE.md` to treat the phone padding/font tokens as already-tuned so a component fix did not break it, however, I am inclined to believe the `CLAUDE.md` changes did more harm than good as it pre-set width was based off the wrong component. 
## State that reset itself across navigations ([`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf), [`de3f6e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/de3f6e7))

A third recurring failure mode was state that looked correct on first load
but reset the moment Astro's `ClientRouter` ran a client-side view
transition. `AppSidebar`'s collapse toggle only restored its `localStorage`
value on initial page load, so every in-app navigation silently re-expanded it, fixed in [`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf) by re-running the restore on `astro:page-load` to match a pattern `RightSidebar` already used. Separately, the checkbox-based sidebar toggles were absolutely positioned at the sidebar's top, and toggling a label focuses its checkbox, so the browser scrolled the whole page back up on every click, fixed in [`de3f6e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/de3f6e7) by pinning the checkboxes to the viewport instead. Both bugs had the same shape: a fix that worked for a single page load but not for the persistent, client-routed session the rest of the site relies on, only visible by actually clicking through the site rather than reloading a single page.

Finally, I tasked Claude, using Opus, to create UX journeys for the "current state" of the design. This enabled me to find bugs and pain points. ([`2ad2fdc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/2ad2fdc))

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
