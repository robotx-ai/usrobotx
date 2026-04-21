"use client";

import { useEffect, useRef } from "react";

// ─── Timing controls ──────────────────────────────────────────────────────────
// 100vh of scroll ≈ 1 second at normal scroll speed.
// Increase HOLD_VH to hold the full-size video longer; decrease for shorter.
const REVEAL_VH = 150; // scroll distance used for the clip-path expand animation
const HOLD_VH = 200;   // ← edit this to change the hold duration (200 ≈ 2 s)
// ─────────────────────────────────────────────────────────────────────────────

type VideoRevealSectionProps = {
  src: string;
  lines?: [string, string];
};

export function VideoRevealSection({ src, lines }: VideoRevealSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const clip = clipRef.current;
    if (!outer || !clip) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clip.style.clipPath = "none";
      if (line1Ref.current) line1Ref.current.style.opacity = "1";
      if (line2Ref.current) line2Ref.current.style.opacity = "1";
      return;
    }

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const viewH = window.innerHeight;
      const revealRange = (REVEAL_VH / 100) * viewH;
      const p = Math.max(0, Math.min(1, -rect.top / revealRange));
      const eased = Math.sqrt(p);

      const h = (1 - eased) * 12;
      const v = (1 - eased) * 8;
      const r = (1 - eased) * 24;
      clip.style.clipPath = `inset(${v}% ${h}% ${v}% ${h}% round ${r}px)`;

      // Line 1 fades in when video is ~55% revealed, line 2 at ~78%
      const l1 = Math.max(0, Math.min(1, (eased - 0.55) / 0.25));
      const l2 = Math.max(0, Math.min(1, (eased - 0.78) / 0.22));

      if (line1Ref.current) {
        line1Ref.current.style.opacity = String(l1);
        line1Ref.current.style.transform = `translateY(${(1 - l1) * 22}px)`;
      }
      if (line2Ref.current) {
        line2Ref.current.style.opacity = String(l2);
        line2Ref.current.style.transform = `translateY(${(1 - l2) * 22}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // outer height = sticky video (100vh) + reveal scroll + hold scroll
  const outerHeight = `${100 + REVEAL_VH + HOLD_VH}vh`;

  return (
    <div ref={outerRef} className="video-reveal-outer" style={{ height: outerHeight }}>
      <div className="video-reveal-sticky">
        <div ref={clipRef} className="video-reveal-clip">
          <video
            className="video-reveal-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={src} type="video/mp4" />
          </video>
          {lines && (
            <div className="video-reveal-overlay">
              <p ref={line1Ref} className="video-reveal-line">{lines[0]}</p>
              <p ref={line2Ref} className="video-reveal-line">{lines[1]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
