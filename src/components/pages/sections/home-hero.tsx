"use client";

import Link from "next/link";
import { ImageSequence } from "@/components/motion/image-sequence";
import { heroFrames } from "@/data/hero-frames";
import type { Locale } from "@/lib/i18n";

type HomeHeroContent = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  imageSequenceAriaLabel: string;
};

type HomeHeroProps = {
  locale: Locale;
  content: HomeHeroContent;
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section
      className="hero-section media-background-section hero-section-sequence"
      id="hero"
    >
      <ImageSequence
        manifest={heroFrames}
        pinnedHeight="100vh"
        ariaLabel={content.imageSequenceAriaLabel}
      >
        <div className="hero-media-overlay" />
        <div className="hero-grid-layer" />
        <div className="section-container hero-layout">
          <div className="hero-copy-panel">
            {content.kicker ? (
              <span className="section-kicker">{content.kicker}</span>
            ) : null}
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-copy">{content.description}</p>
            <div className="button-row">
              <Link className="primary-button" href={`/${locale}/solutions`}>
                {content.primaryAction}
              </Link>
              <Link className="secondary-button" href={`/${locale}/contact`}>
                {content.secondaryAction}
              </Link>
            </div>
          </div>
        </div>
      </ImageSequence>
    </section>
  );
}
