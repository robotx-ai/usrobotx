# usrobotx — Plan

_Last updated: 2026-04-19_

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

---

## Phase 2 — Mobile performance + loading hardening (2026-04-19)

**Trigger:** after the first production deploy, `https://usrobotx.com/` broke on mobile — page would load twice then stop loading. Diagnosis: the home page was fetching ~200 MB of media on mount, and Netlify's default `Cache-Control: public, max-age=0, must-revalidate` defeated the browser cache so every reload re-downloaded everything. Mobile browsers hit memory/bandwidth ceilings and aborted in-flight video fetches, which triggered video-element retry loops, which OOM'd the tab.

### What shipped (Plan B)

Scoped fix — targets the two biggest wins without touching the hero or rx-brain sequence. Plan C (hero mobile variant + rx-brain dedupe) is still open.

1. **Solutions carousel — lazy-attach video sources.** `src/components/solutions-carousel-section.tsx`
   - Compute `nearIndex = hoveredCardIndex ?? activeCardIndex` and `isNearActive = Math.abs(index - nearIndex) <= 1`.
   - Only render `<source>` for near-active cards; far cards keep the `<video>` element with its poster but no source → no MP4 fetch.
   - Added `preload="metadata"` to the `<video>`.
   - Added `videoReferences` ref array + a `useEffect` keyed on `[activeCardIndex, hoveredCardIndex, cards]` that calls `video.load()` when a card transitions from far → near. Needed because HTML spec does not re-run resource selection when a `<source>` is appended to an already-mounted `<video>`.
   - Verified: initial-load MP4 requests dropped from 5 → 2 on the solutions carousel (only active + adjacent). Scrolling to make a far card active triggers `.load()` and playback starts as expected.

2. **Netlify cache headers.** `netlify.toml`
   ```toml
   [[headers]]
     for = "/_next/image*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/_next/static/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/media/*"
     [headers.values]
       Cache-Control = "public, max-age=604800, stale-while-revalidate=86400"
   ```
   - `/_next/static/*` and `/_next/image*` are content-hashed → safe to cache 1 year immutable.
   - `/media/*` changes only on deploy → 7-day browser cache with 1-day stale-while-revalidate.
   - HTML left to Next.js adapter + Netlify Durable cache (already handled).

### Verification on record

| Check | Before | After |
|---|---|---|
| Unique MP4 fetches on mobile home load | 6 (hero + 5 carousel) | 3 (hero + 2 near-active carousel) |
| Solutions-video request count in first 6s | 25 (abort-retry flood) | 10 (normal byte-range buffering for 2 videos) |
| Cache-Control on static assets | `public, max-age=0, must-revalidate` | `max-age=31536000, immutable` / `max-age=604800, swr=86400` |
| `/en` + `/zh` home mobile smoke | crashed / reloaded | loads cleanly, 0 console errors |

### Follow-up work that shipped later the same day

After Plan B landed the user reported (1) the pulse placeholder flashed and vanished faster than the media could load and (2) the rx-brain pinned section was invisible on scroll-down until the end. Both were root-cause fixes:

- **Rx-brain pin regression** — `useGSAP` cleanup killed the ScrollTrigger without `revert = true`, so when the `width` state flipped from SSR-fallback `2000` to the client-picked `1080` on mobile the pin's spacer padding accumulated (observed 3376 px = 2 × 1688). Fix: pass `revertOnUpdate: true` to `useGSAP`. The `useGSAP` contract is "revert on unmount only" by default; `revertOnUpdate: true` extends that to dependency changes.
- **`MediaLoadingPulse` placeholder** — replaced the full-resolution priority `<img>` on the rx-brain sequence and overlaid far-card videos in the carousel with a pulsing `/media/logos/robotx-square-transparent.png` mark (CSS keyframe, respects `prefers-reduced-motion`). This also removed the Next.js auto-preload hint for rx-brain frame 0.
- **`Pudu_CC1-8.webp` removed from code.** It was the universal `imageSrc` / `backgroundPosterSrc` fallback for every carousel card. `SolutionCard.imageSrc` is now optional and consumers fall back to `<MediaLoadingPulse>` if missing. The file stays on disk, unreferenced from `src/`.
- **Carousel visited-sticky.** Original Plan B removed `<source>` when a card scrolled out of near range, so each re-entry called `video.load()` and flashed a black reload. Now `visitedCards: Set<number>` is sticky — once a card has been near, its source stays forever. After the user scrolls through the carousel every video is loaded and never reloads.
- **Pulse persists until media is playable.** Carousel pulse is keyed on `loadedCards` (set by `onCanPlay` / `onLoadedData` plus a ref-callback `readyState >= 3` check for cached videos that raced past the React listener). Rx-brain canvas opens at `opacity: 0`; the `MediaLoadingPulse` below shows through until the first `drawFrame(0)` flips `firstFrameDrawn` to true. On slow networks users now see the pulsing X for the full load window.

### Deferred / still open

- **Hero mobile variant.** `hero.mp4` is 27 MB and autoplays eagerly on mount. Produce `hero-mobile.mp4` (720p, ~4 MB) from the master in `raw_assets/`, add `<source media="(max-width: 768px)">`. `MediaLoadingPulse` is intentionally NOT wired on the hero — hero keeps `hero-poster.webp` so LCP stays a real image. See `TODO.md` items 3 and 9.
- **rx-brain double-resolution fetch.** The 2026-04-19 mobile trace showed both the 1080 AND 2000 frame sets fetching. After the priority `<img>` swap (which removed the Next.js preload hint for the 2000 frame 0), this may already be resolved — needs a fresh trace to confirm. See `TODO.md` item 8.
- **Carousel: detach `<video>` element entirely for far cards.** Current fix keeps the `<video>` mounted with no source — small HTMLMediaElement overhead per card. Swap to a `<div>` with `background-image` for non-near cards if profiling shows it matters. Unlikely to matter in practice.

### Deploy notes

- `[context.production] ignore = "exit 0"` in `netlify.toml` means pushing to `main` does **not** trigger a Netlify production deploy. Production ships only via `npm run deploy:prod` (CLI, from an authenticated shell with Windows Developer Mode enabled so `@netlify/plugin-nextjs` can create its symlinks).
- Preview deploys: `npm run deploy:preview` → returns a throwaway preview URL for pre-merge checking.
- Repo is a sparse checkout — `git add <path>` sometimes errors with "outside of your sparse-checkout definition"; pass `--sparse` to override.
