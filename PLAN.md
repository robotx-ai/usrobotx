# usrobotx — Plan

_Last updated: 2026-04-18_

> **Asset convention:** all raw footage and video masters live in `/raw_assets/` (gitignored). Web-ready exports are produced from those sources and either served via CDN or copied into `/public/media/`. Never commit large video binaries to the repo.

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
- A hero with a cinematic looping video (muted autoplay) — scroll-scrubbed image sequences remain an option for future sections if warranted
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

---

## Phase 1 — Homepage Hero Video Spike

**Scope:** one section (homepage hero), looping background video, bilingual, stand-in media OK. Ship it or kill the self-built path.

> **Approach change (2026-04-18):** the hero is now a straight looping `<video>` playback, not a scroll-scrubbed image sequence. Simpler to produce, faster to ship. Scroll-coupled motion can return in a later section if warranted. Source master `raw_assets/Hero Content.mp4`.

### Pre-work decisions (blockers — resolve before coding)
- [ ] Confirm bilingual `en`/`zh` is firm for the spike
- [ ] Confirm self-built vs. Webflow — spike only makes sense if self-built is still on the table
- [ ] Pick motion stack for non-hero sections: `GSAP + ScrollTrigger` **or** `Motion + Lenis` (recommend GSAP)
- [ ] Decide video delivery: self-host optimized MP4 in `public/media/hero/` **or** upload to Cloudinary/Mux and reference by URL (recommend self-host for Phase 1, revisit when solutions pages add dense media)

### Motion foundation
- [ ] Install chosen motion deps + `lenis` (smooth scroll) — still needed for non-hero sections
- [ ] Add `<LenisProvider>` in `src/app/[locale]/layout.tsx`
- [ ] Honor `prefers-reduced-motion` globally (disable Lenis + animations; show static poster image for hero)
- [ ] Create `src/components/motion/` for future scroll primitives (not blocking the hero video)

### Hero section rebuild
- [ ] Study `fieldai-mirror/www.fieldai.com/index.html` hero — layout, type, copy overlay pattern
- [ ] Export web-ready hero from `raw_assets/Hero Content.mp4`:
  - H.264 MP4, 1920×1080, 30 fps, VBR 2-pass ~6 Mbps, no audio, seamless 6–12s loop, target <5 MB
  - (optional) WebM/VP9 via `ffmpeg` post-export
  - Extract a still poster frame (`hero-poster.webp`) for first paint + reduced-motion fallback
- [ ] Place web-ready exports in `public/media/hero/` (committed); source master stays in `raw_assets/` (gitignored)
- [ ] Build `HomeHero` with `<video autoplay muted loop playsInline poster=...>` + bilingual copy overlay
- [ ] Wire bilingual hero copy in `src/data/site-content.ts` (headline, sub, aria label for video)
- [ ] Replace current homepage hero in `src/components/pages/` composition

### Asset pipeline (minimum viable)
- [ ] Document hero export recipe (Premiere settings + optional `ffmpeg` WebM step) in this file or a `raw_assets/README`
- [ ] Document `webp` variant generation for stills (e.g. `sharp-cli`) in `package.json`
- [ ] Confirm `next/image` config for local multi-resolution serving

### Verification
- [ ] `pnpm lint` + `pnpm build` clean
- [ ] `e2e` agent runs `playwright-cli --headed` on `/en` and `/zh` — hero autoplays muted, loops seamlessly, poster shows under `prefers-reduced-motion: reduce`
- [ ] Check file size and Lighthouse LCP on `/en` — hero video should not regress LCP beyond poster paint
- [ ] Compare side-by-side with fieldai hero — document gap (feel, type, copy cadence)

### Go/no-go checkpoint
- [ ] Write a short spike report: effort spent, achieved fidelity, remaining work to apply the pattern across 6 solution pages + news/team
- [ ] Decide: continue self-built → Phase 2, or pivot to Webflow

## Media requirements

| Animation type                              | Format                            | Notes                                                                                          |
| ------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Hero looping background                     | **MP4 (H.264)** + optional **WebM (VP9)** + **webp poster** | Muted, autoplay, loop, `playsInline`. 1920×1080, 6–12s, target <5 MB. Poster still required for LCP + reduced-motion. |
| Section B-roll / looping background         | **MP4 (H.264)** + optional **WebM (VP9)**  | Muted, autoplay, loop, `playsInline`. 1080p, 3–8s, under 3 MB.                         |
| Scroll-scrubbed sequences (optional, later) | **Image sequence (webp / jpg)**   | 60–120 frames, 1600–2000px wide, painted to `<canvas>`. Not used for the Phase 1 hero.          |
| Still photography (product, team, posters)  | **webp** (jpg fallback)           | Multi-resolution: 500 / 800 / 1080 / 1600 / 2000 widths. Served via `next/image`.              |
| 3D / interactive                            | GLB/GLTF                          | Not Phase 1.                                                                                   |

**Asset storage convention:**
- `/raw_assets/` (gitignored) — raw footage, Premiere projects, source masters. Never committed.
- `/public/media/` (committed) — web-ready, optimized exports only. Every file here ships to the browser, so keep sizes tight.
- If/when we move to a media CDN (Cloudinary / Mux / Bunny), `/public/media/` shrinks to just local fallbacks and the CDN URLs are referenced in `site-content.ts`.

**Phase 1 media ask:**
- Hero: web-ready MP4 + webp poster exported from `raw_assets/Hero Content.mp4`.
- Everything else (later phases): MP4 B-roll + high-res stills.
