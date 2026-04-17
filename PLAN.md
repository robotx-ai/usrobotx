# usrobotx — Plan

_Last updated: 2026-04-17_

## Intention

### Original goal
Code-managed rebuild of `usrobotx.com` as a bilingual marketing site:

- `Next.js` App Router, TypeScript
- Bilingual routing via `src/app/[locale]/` for `en` and `zh`
- Display- and contact-focused — **no e-commerce**
- Local media in `public/media/`, to be replaced with real product photography and robot footage
- Content hard-coded in `src/data/site-content.ts` today; CMS/admin-managed workflow later
- Future: Shopify-fed display-only product pages, Netlify deploy, SEO redirects from the legacy WordPress site

### Current direction
Raise the visual bar toward premium industrial-robotics marketing sites (reference: [fieldai.com](https://www.fieldai.com/), mirrored at `../robotx-homepage/fieldai-mirror/`). The site should _feel_ like fieldai, not look like a stock Next.js template.

Target experience:

- Motion-first — scroll-driven animation is the primary storytelling layer, not a decoration
- A hero with scroll-scrubbed image sequence or equivalent cinematic moment
- Per-section sticky reveals, pinned segments, parallax stacks
- Dense, multi-resolution media — every section carries real product photography or footage
- Deep content — per-industry solution pages (inspection, cleaning, logistics, construction, service, companionship), news, team bios
- Fully bilingual (`en` / `zh`) across every page and motion label

## Current state
- App Router scaffolding, bilingual routing, header/footer, 4 routes per locale
- ~3.2k LOC total; one reveal primitive (`src/components/reveal-section.tsx`)
- No motion dependencies installed (no `gsap`, `framer-motion`, `motion`, `lenis`)
- ~27 MB local media, mostly placeholders
- Content hard-coded bilingually in `src/data/site-content.ts` (~784 lines)

## Gaps vs. the target feel

1. **Motion system** — introduce `GSAP` + `ScrollTrigger` (or `Motion` + `Lenis`) and build reusable scroll primitives: `PinnedSection`, `Parallax`, `ImageSequence`, `StickyReveal`
2. **Media density** — source or produce multi-resolution `webp` variants (500 / 800 / 1080 / 1600 / 2000 widths) and short section videos; replace placeholders
3. **Content depth** — expand `site-content.ts` with real copy for every solution, news, and team entry; consider splitting into per-collection files as it grows
4. **Asset pipeline** — decide on responsive image sources (`next/image` with remote CDN vs. local), and a process for generating `webp` variants
5. **Deployment & SEO** — Netlify target; redirect map from the legacy WordPress URLs; `sitemap.xml`, `robots.txt`, `og:` metadata per page

## Open questions before committing more engineering time

- **Will non-engineers need to update copy, news, or team entries?** If yes, a headless CMS (or staying on Webflow) is mandatory — hard-coded `site-content.ts` does not scale to marketing ownership.
- **Is bilingual `en`/`zh` firm?** It roughly doubles motion-label and content work.
- **What real product photography and robot footage exists today vs. needs to be produced?** This is the long-pole cost, not the code.
- **Build ourselves vs. Webflow?** For a pure marketing site with frequent non-technical edits, Webflow ships in days and stays editable. Building here only wins if this site needs to share components/auth with a future product app, or needs motion beyond what GSAP-in-Webflow can do.

## Suggested next move
Pick one fieldai section (likely the homepage hero scrubber or a `/solutions/*` page) and rebuild it here as a **motion-fidelity spike** — one page, real motion, real media. That spike tells us the true gap and whether the self-built path is worth the ongoing cost.
