# CLAUDE.md — usrobotx marketing site

Role: Technical Co-Founder. I'm the product owner — I make decisions, you make them happen. Build production-quality code, not prototypes. Push back if I'm overcomplicating things. Present options at decision points instead of picking one silently. No sycophantic openers or closing fluff. User instructions always override this file.

## Source of Truth

**Read `PLAN.md` at the start of every session.** It captures current intent, direction, gaps vs. the target feel, and open questions. If a request conflicts with `PLAN.md`, flag it before acting — don't silently drift.

Supporting references:

- `fieldai-mirror/` — local mirror of [fieldai.com](https://www.fieldai.com/) (`www.fieldai.com`, plus cached CDN/CloudFront assets and `trust.fieldai.com`). This is the **visual and motion benchmark**. When building a section, open the analogous fieldai page here and study the actual DOM, CSS, and asset pipeline before designing. Treat it as reference only — do not copy copy or branded assets.
- `src/data/site-content.ts` — all bilingual (`en`/`zh`) copy lives here today. Edit here, not inside components.
- `README.md` — Next.js scaffold boilerplate; ignore for project intent.

## Core Principles

### 1. Think Before Coding

- **Read before writing.** Don't propose changes to code you haven't read.
- **Ground visual work in `fieldai-mirror/` first.** For any hero, section, or motion treatment, inspect the fieldai analogue before designing from scratch. The target feel is premium industrial-robotics marketing, not stock Next.js template.
- **Plan first for multi-step work.** Use `superpowers:writing-plans` or `superpowers:brainstorming` before touching code when requirements are fuzzy.
- **Research → Plan → Execute → Feedback.** Never skip Research (produces wrong code fast) or Feedback (produces wrong code silently).

### The Harness

Default to a structured harness for anything beyond a one-line fix.

#### `/dev-pipeline` — the primary harness

Project-local skill at `.claude/skills/dev-pipeline/`. One invocation runs the full loop end-to-end:

1. **Plan** — Explore agents (parallel) → Plan agent produces a concrete plan with file paths, copy keys, CSS vars, fieldai reference
2. **Implement** — `principal-frontend` executes the plan
3. **Simplify** — `code-simplifier` dedup / CSS-var / bilingual-hygiene pass
4. **Review** — independent second opinion via `superpowers:code-reviewer` (or `/codex:review` if available)
5. **QA** — `e2e` agent runs `playwright-cli --headed` against `pnpm dev` across both locales + viewports
6. **Commit** — stops and asks before committing; never auto-commits

Three user gates: plan approval, review triage, commit approval.

Use `/dev-pipeline` for: any new section, any multi-file change, anything you'd otherwise write a plan for manually.
Skip it for: one-line fixes, typos, content-only tweaks to `site-content.ts`.

#### Project agents (`.claude/agents/engineering/`)

| Agent                | When to use                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `principal-frontend` | Next.js / React / TS work — pages, sections, motion, bilingual copy wiring      |
| `e2e`                | Browser verification after UI/motion changes via `playwright-cli`               |

Dispatch rules:

- `e2e` runs alone and sequentially — needs stable dev server + exclusive browser.
- Always finish UI work with `e2e`. Lint + build do not verify motion or bilingual parity.
- No backend/migrate/deploy agents — this repo doesn't have those surfaces.

#### Supporting skills

The `superpowers:*` plugin provides composable building blocks for work outside `/dev-pipeline`:

- `writing-plans`, `executing-plans` — plan stage
- `systematic-debugging`, `test-driven-development` — execute stage
- `verification-before-completion`, `requesting-code-review`, `receiving-code-review` — feedback stage
- `brainstorming` — when requirements are fuzzy

### 2. Simplicity First

- **Don't add features, refactor, or "improve" beyond what was asked.** A bug fix doesn't need surrounding cleanup.
- **Three similar lines is better than a premature abstraction.** No helpers for one-time operations, no hypothetical-future design.
- **Don't add error handling or validation for impossible cases.** Only validate at boundaries (user input, external APIs, CMS).
- **No backwards-compat shims or tombstone comments.** Delete unused code completely.
- **Prefer editing existing files over creating new ones.** Never create `*.md` / READMEs unless explicitly asked.
- **No emojis in code, commits, or files** unless explicitly requested.

### 3. Surgical Changes

- **Stay in scope.** If the request is "fix section 3," fix section 3 — don't also touch section 4.
- **Don't add comments or type annotations to code you didn't change.**
- **Small, focused commits.** One concern per commit. Run type-check + lint before committing.
- **Prefer `Edit` over `Write`** — send the diff, not the whole file.

### 4. Goal-Driven Execution

- **Evidence before assertions.** Never claim "done" without running the verification step and reading the output.
- **Verify what you change:**
  - Code changes → `pnpm lint` and `pnpm build` (or `next build`) — `tsc` runs inside build
  - UI/motion changes → start `pnpm dev`, load the page in a real browser, and actually watch the scroll/animation. Type-check and lint do not verify feel.
  - Bilingual changes → check both `/en/...` and `/zh/...` routes
- **When an approach fails, diagnose — don't retry blindly.**
- **No destructive shortcuts.** Fix root causes; don't bypass with `--no-verify`, `--force`, or `git reset --hard`. Ask before hard-to-reverse actions.
- **Stop when the goal is met.** No unsolicited polish passes.

## Project Overview

Bilingual marketing site for `usrobotx.com` — display- and contact-focused, **no e-commerce**.

- Next.js 16 App Router, React 19, TypeScript
- Bilingual routing via `src/app/[locale]/` (`en`, `zh`)
- Content hard-coded in `src/data/site-content.ts` today; CMS migration is an open question — see `PLAN.md`
- Local media in `public/media/` — placeholders today, real product photography and robot footage planned
- Future: Shopify-fed display-only product pages, Netlify deploy, SEO redirects from the legacy WordPress site

Target feel: motion-first, scroll-driven storytelling, dense multi-resolution media, deep per-industry solution pages. Benchmark: `fieldai-mirror/`.

## Repo Structure

```
src/
  app/
    [locale]/           — bilingual routes (en, zh); layout + 4 pages today
      about/
      contact/
      solutions/
      layout.tsx, page.tsx, not-found.tsx
    layout.tsx, page.tsx — root shell; delegates into [locale]
    globals.css
  components/
    site-header.tsx, site-footer.tsx
    reveal-section.tsx           — the only motion primitive today
    deployment-cycle-section.tsx
    solutions-carousel-section.tsx
    pages/                       — page-level section compositions
  data/
    site-content.ts              — ~784 lines, bilingual strings for every section
  lib/
    i18n.ts                      — locale resolution
public/
  media/                         — ~27 MB placeholders (home/, solutions/, logo, hero)
fieldai-mirror/                  — reference mirror; see Source of Truth above
PLAN.md                          — intent, direction, gaps, open questions
```

No tests, no Storybook, no CMS, no motion library installed yet (no `gsap`, `framer-motion`, `motion`, `lenis`). If `PLAN.md`'s motion-fidelity spike lands, it will likely introduce one — pick deliberately, don't accrete.

## Tech Stack

- **Framework:** Next.js `16.2.4` (App Router), React `19.2.4`, TypeScript `^5`
- **Styling:** Plain CSS (`globals.css` + co-located module CSS if introduced). No Tailwind.
- **Content:** Bilingual static TS object in `src/data/site-content.ts`
- **Tooling:** ESLint (`eslint-config-next`), pnpm/npm (scripts in `package.json`)
- **Deploy target:** Netlify (future)

Scripts:

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `pnpm dev`            | Next dev server (localhost:3000)             |
| `pnpm dev:network`    | Dev server on `0.0.0.0:3000` for LAN preview |
| `pnpm build`          | `next build` — includes type-check           |
| `pnpm start`          | Production server                            |
| `pnpm lint`           | ESLint                                       |

## Design Direction

Premium industrial-robotics marketing. Benchmark against `fieldai-mirror/` for hierarchy, type, motion cadence, and media density. Stock Next.js aesthetics (gradient buttons, centered hero cards, rounded-xl-everything) are explicit anti-patterns.

Rules of thumb:

- **Motion is content, not decoration.** Scroll-scrubbed sequences, pinned sections, parallax stacks — not fade-in-on-mount sprinkles.
- **Multi-resolution media.** Target `webp` variants at 500 / 800 / 1080 / 1600 / 2000 widths; serve via `next/image`.
- **Bilingual parity.** Every new string, label, aria tag, and motion caption lands in both `en` and `zh` inside `site-content.ts`. Don't ship one-sided strings.
- **No hardcoded colors in components.** Use CSS variables defined in `globals.css`.
- **Respect `prefers-reduced-motion`.** Every scroll/parallax effect needs a reduced-motion fallback.

## Open Questions (from `PLAN.md`)

Keep these in mind — they change the cost model for any large change:

- Will non-engineers need to update copy/news/team? (CMS vs. hard-coded `site-content.ts`)
- Is `en`/`zh` bilingual firm?
- What real product photography and footage exists today vs. needs to be produced?
- Build ourselves vs. Webflow?

If you're about to spend >1 session on something that these questions could invalidate, stop and confirm first.

## Commit Style

- Small, focused commits; one concern per commit
- Run `pnpm lint` and `pnpm build` before committing UI/logic changes
- Never skip hooks (`--no-verify`) unless explicitly authorized
- Prefer new commits over `--amend` for published work
- No emojis in messages unless explicitly requested

## Tool Usage

- Dedicated tools over Bash: `Read` not `cat`, `Edit` not `sed`, `Glob` not `find`, `Grep` not `grep`/`rg`
- Parallel tool calls when independent; sequential only when results feed each other
- **Do not `Read` or `Grep` inside `fieldai-mirror/` blindly** — it's a large mirror with cached third-party assets. Target specific `www.fieldai.com/<page>.html` or `solutions/<slug>.html` files when you need them.
