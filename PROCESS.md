# Process overview

## What I built

**The Art of the Excuse**, a fictional twelve-week course for Slop University
on the rhetoric, psychology, and design of excuses, taught through a
taxonomy of denial, justification, and diffusion of responsibility.

The site follows the template's required pages, a homepage with a
week-by-week overview, a sessions index (workshops) and a lectures index each with detail pages and hero images, a people page split into convenor/tutors/students, an assessments index with four graded tasks, a policies page, and a persistent collapsible left sidebar plus a right-hand clock/calendar rail synced across client-side navigations. Content and layout were built together, the twelve weeks of material are what the nav, grids, and detail pages exist to present.

## How I got here

Commits ([`784772d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/784772d), [`3b4cafa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/3b4cafa))
The idea started from "my dog ate my homework" excuse, a satirical course built around that reflex, niche enough no real curriculum committee would approve it, but with real disciplinary depth. From five options Claude offered, I picked "The Art of the Excuse" for having the most obvious backbone (social psychology) to sustain twelve weeks. Claude filled in the metadata, from people to coursework, then the site was reviewed and adjusted with small
prompts.

### The sidebar logo and hover shadow
Commits [`636a86f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/636a86f) through [`9b3ca81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/9b3ca81)

Inspired by Canvas and in opposition to a top nav bar, I prompted for a collapsed sidebar. The SlopUI logo and its hover shadow stayed misaligned across most of the layout work. Claude was tasked to fix it several times but kept moving the problem, restructuring the header repeatedly and each time making the alignment worse. On the sixth attempt Claude decided it had genuinely fixed it (a missing `min-width:0` letting an invisible name span push the logo past the collapsed rail), but the result still wasn't the centred crest asked for, so I reverted the whole commit. That revert deleted
unrelated fixes it had no business touching, restored by hand, keeping the sidebar on its simpler pre-restructure markup. Only then did a real, narrower bug show up under actual verification, a headless-Chrome screenshot showed the current-page highlight as a rectangle instead of a square, fixed in one line. Four rounds of forward patching never converged, reverting to the last simple version and re-checking against a real render did.

## Phone-width regressions
Commits ([`756bccb`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/756bccb), [`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf), [`cb4d90f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/cb4d90f), [`9b3ca81`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/9b3ca81), [`f3513b8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/f3513b8))

Layout changes verified on desktop repeatedly broke phone-width fixes made earlier in the same file, a squashed drawer, clipped dropdown panels, and sideways scroll, traced to `AppSidebar.astro` setting `--at-sidebar-inset: 3rem` even while collapsed. Desktop-focused commits kept overwriting the narrow-viewport rule instead of composing with it. I had Claude add rules to `CLAUDE.md` treating phone padding/font tokens as already-tuned, though the preset was based on the wrong component, unconvincingly.

## State that reset itself across navigations
([`4388abf`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/4388abf), [`de3f6e7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/de3f6e7))

A third failure mode was state that looked correct on first load
but reset once Astro's `ClientRouter` ran a client-side view transition. `AppSidebar`'s collapse toggle only restored its `localStorage` value on initial load, so every navigation silently re-expanded it, fixed by re-running the restore on `astro:page-load`. Separately, the sidebar's checkbox toggles were absolutely positioned at the top, and toggling a label focuses its checkbox, so the browser scrolled the page back up on every click, fixed by pinning the checkboxes to the viewport instead. Both bugs
worked on a single page load but not the persistent, client-routed session the site relies on, only visible by clicking through rather than reloading.

Finally, I tasked Claude, using Opus, to write UX journeys for the current design, surfacing further bugs, pain points and determining correctness.
([`2ad2fdc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-soybeaam/commit/2ad2fdc))
