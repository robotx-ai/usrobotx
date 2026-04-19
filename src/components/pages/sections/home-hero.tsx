"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type HomeHeroContent = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  backgroundVideoSrc: string;
  backgroundPosterSrc: string;
  videoAriaLabel: string;
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
      <div className="hero-media-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-media-poster"
          src={content.backgroundPosterSrc}
          alt={content.videoAriaLabel}
          loading="eager"
          decoding="async"
        />
        <video
          className="hero-media-video"
          src={content.backgroundVideoSrc}
          poster={content.backgroundPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-media-overlay" />
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
      </div>
    </section>
  );
}
