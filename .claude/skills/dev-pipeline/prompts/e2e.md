# E2E — Prompt Template

Dispatch as `e2e` agent AFTER lint + build pass. Run ALONE — never parallel. **Always use `model: "sonnet"`.**

```
Agent(subagent_type="e2e", model="sonnet"):
  description: "E2E test usrobotx site"
  prompt: |
    Run end-to-end browser tests on the usrobotx marketing site against a local
    `pnpm dev` instance.

    ## What Changed

    [SUMMARY of changes from the plan — which routes, which sections]

    ## Routes to Test

    [LIST of routes that were affected — test both locales for each]

    Default full test list (when the change is broad):
    - `/en`, `/zh` — home
    - `/en/solutions`, `/zh/solutions` — solutions index
    - `/en/solutions/<slug>`, `/zh/solutions/<slug>` — per-industry pages
      (discover slugs from `src/data/site-content.ts`; don't guess)
    - `/en/about`, `/zh/about`
    - `/en/contact`, `/zh/contact`

    ## Dev Server

    - URL: http://localhost:3000
    - If not already running, start it: `pnpm dev &` then `sleep 4`.
    - Kill the dev server at the end ONLY if you started it.

    ## Your Job

    1. Open browser (always `--headed`).
    2. For each route × locale:
       a. `playwright-cli goto <url>` → `sleep 2` → `playwright-cli snapshot`.
       b. Verify `document.documentElement.lang` matches the locale.
       c. Spot-check `document.body.innerText.slice(0, 200)` — flag English
          text appearing on a `/zh/...` route (bilingual bug).
       d. Screenshot at top and after scrolling to the bottom.
       e. Check console: `cat .playwright-cli/console-*.log` — flag errors.
    3. For the home route, also test:
       a. Mobile viewport: `playwright-cli resize 390 844` then re-snapshot/screenshot.
       b. Reduced-motion spot-check: `playwright-cli --raw eval "matchMedia('(prefers-reduced-motion: reduce)').matches"` (report limitation if you can't launch with the flag).
    4. Close browser: `playwright-cli close`.

    ## Report Format

    | Route          | Locale | Viewport  | Status    | Issues              | Screenshot                                |
    |----------------|--------|-----------|-----------|---------------------|-------------------------------------------|
    | `/en`          | en     | 1440x900  | pass/fail | description         | `.playwright-cli/en-home-desktop.png`     |
    | `/zh`          | zh     | 1440x900  | pass/fail | description         | `.playwright-cli/zh-home-desktop.png`     |
    | `/en`          | en     | 390x844   | pass/fail | description         | `.playwright-cli/en-home-mobile.png`      |

    Categorize issues:
    - **Broken** — route errors, JS crashes, blank pages
    - **Bilingual** — `/zh` showing English copy, or vice versa
    - **Motion** — reveal/scroll effects not firing, stuck states, reduced-motion regressions
    - **Responsive** — layout breaks below 768px
    - **Nit** — minor visual polish

    Report ALL issues, including nits.
```
