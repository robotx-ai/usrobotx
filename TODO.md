# TODO — usrobotx tech debt

Known issues carried forward as tech debt. Prioritize against `PLAN.md` phases. Delete items when shipped, don't just check them off.

## Accessibility / bilingual

### 1. `<html lang="en">` hardcoded on every route

- **Where:** [src/app/layout.tsx](src/app/layout.tsx) — root `<html>` element has `lang="en"` no matter the URL.
- **Impact:** `/zh` serves Chinese copy but screen readers + `hreflang` think the page is English. Breaks a11y and SEO for the ZH locale.
- **Fix direction:** move the `<html>` wrapper out of `src/app/layout.tsx` into `src/app/[locale]/layout.tsx` so `lang={locale}` is set per route. Root layout becomes a pass-through or renders children directly. Verify with `document.documentElement.lang` on both locales.
- **Not touched in Phase 1 hero video spike — this predates it.**

### 2. Hero `videoAriaLabel` may not match the actual footage

- **Where:** [src/data/site-content.ts](src/data/site-content.ts) `home.hero.videoAriaLabel` in both `en` and `zh`.
- **Current value:** "Quadruped inspection robot walking through an industrial yard" / "四足巡检机器人在工业场景中行走".
- **Impact:** if the new `/media/hero/hero.mp4` shows something other than a quadruped inspection scene (e.g., warehouse pallet aisle), screen readers get wrong context.
- **Fix direction:** watch the current hero loop, rewrite the aria label accordingly in both locales.

## Performance

### 3. Hero video is 27 MB (target <5 MB) — Plan C in `PLAN.md`

- **Where:** [public/media/hero/hero.mp4](public/media/hero/hero.mp4)
- **Impact:** heavy LCP on the landing page, especially on slow connections. Phase 2 Plan B + the `<MediaLoadingPulse>` placeholder landed without touching this file, so hero is still the single biggest asset on first paint. Pulse is NOT wired on the hero (intentional — hero uses `hero-poster.webp` as poster, which is fine).
- **Fix options (cheap → thorough):**
  1. Trim to a clean 8–12s loop point (likely 5–7x size reduction)
  2. Re-encode at CRF 30–32 instead of 26 (~40–50% reduction with minor quality loss)
  3. Downscale to 1600×900 or 1280×720 for mobile delivery, ship as `<source media="(max-width: 768px)">`
  4. Add a WebM/VP9 companion as `<source>` (see item 4)
  5. Switch to a CDN with adaptive bitrate (Mux HLS or Cloudinary) — see `PLAN.md` "Media requirements"
- **Start with (1)**, then re-measure before reaching for (5).

### 4. No WebM companion for the hero MP4

- **Where:** [src/components/pages/sections/home-hero.tsx](src/components/pages/sections/home-hero.tsx) — uses only `<video src=…>`.
- **Impact:** Chrome/Firefox can't take advantage of VP9's ~15–20% better compression vs H.264.
- **Fix direction:** produce `hero.webm` via `ffmpeg -i hero.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -an hero.webm`, then switch the component to `<video><source type="video/webm">...<source type="video/mp4">...</video>`.

## Content

### 5. Internal planning copy leaks into the public site

- **Where:** [src/data/site-content.ts](src/data/site-content.ts) lines ~447–454 (`callout` / rebuild section).
- **Current copy (en):** "START THE REBUILD / A local-first codebase ready for Netlify, GitHub, and future media expansion." and "This MVP is built to launch without Shopify dependencies today while leaving clean extension points…"
- **Impact:** visitors see engineering-internal language on the marketing page.
- **Fix direction:** replace with marketing copy for both locales, or move behind a feature flag until real copy is ready.

## Housekeeping

### 6. Dead code from the old hero scroll-scrubber

After the hero switch to `<video>`, these are unreferenced (verified by Grep 2026-04-19):

- [src/data/hero-frames.ts](src/data/hero-frames.ts) — only referenced by the generator script that writes it
- [scripts/build-hero-frames.mjs](scripts/build-hero-frames.mjs) (also the `build:hero` npm script in `package.json`)
- [public/media/hero/frames/](public/media/hero/frames/) — pre-rendered webp frames

`src/components/motion/image-sequence.tsx` and the `.image-sequence-*` CSS are **actively used** by the rx-brain section — do NOT delete them. This TODO was partially invalidated when rx-brain moved to the image-sequence primitive.

**Fix direction:** delete the three items above after verifying nothing else imports them.

### 8. Rx-brain ships both 1080 and 2000 frame sets on mobile

- **Where:** [src/components/motion/image-sequence.tsx](src/components/motion/image-sequence.tsx) — mobile viewport picks 1080px but the network trace from 2026-04-19 showed both resolutions fetching (~358 frame requests total on mobile).
- **Impact:** 14–17 MB of frames downloaded on mobile that will never paint to the canvas.
- **Fix direction:** confirm with a fresh Playwright trace whether the double-fetch still happens after Phase 2 work. Likely culprits: the effect re-running with `width = 2000` (SSR initial) before the effect re-runs with `width = 1080` (client picked), and the `<link rel="preload">` hint Next.js was emitting for the 2000 frame 0 (now gone, since we replaced the priority `<img>` with `<MediaLoadingPulse>` in commit d01f5aa). If the pulse migration already cut the 2000 requests, close this item.

### 9. Hero mobile variant (Phase 2 Plan C deferred)

- **Where:** [src/components/pages/sections/home-hero.tsx](src/components/pages/sections/home-hero.tsx) serves the full-resolution `hero.mp4` to every viewport.
- **Impact:** mobile pays the full 27 MB (item 3). Combined with item 3 (re-encode) this is the path to a <5 MB mobile hero.
- **Fix direction:** produce `hero-mobile.mp4` (720p, ~4 MB) from the master in `raw_assets/`, add `<source media="(max-width: 768px)" src="/media/hero/hero-mobile.mp4">` above the current source tag. Keep `hero-poster.webp` as-is.

### 7. Lint warnings in `deployment-cycle-section.tsx`

```
src/components/deployment-cycle-section.tsx
  35:3  warning  'kicker' is defined but never used
  36:3  warning  'title' is defined but never used
```

Either wire them into the section header or drop them from destructuring. Low priority.

## Verified working (for context)

These were QA'd during the Phase 1 hero spike and are NOT tech debt — listed for traceability:

- Hero video autoplays muted, loops, `playsInline` on both `/en` and `/zh`
- `prefers-reduced-motion: reduce` hides the video and keeps the poster (`display: none` on `.hero-media-video`)
- Mobile viewport (390×844) keeps the copy panel readable over the video
- No JS console errors on either locale at 1440×900 or 390×844
