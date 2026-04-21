import Link from "next/link";
import { SolutionDetailRow } from "@/components/pages/sections/solution-detail-row";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

type SolutionsPageProps = {
  content: SiteContent;
  locale: Locale;
};

export function SolutionsPage({ content, locale }: SolutionsPageProps) {
  return (
    <div className="page-shell">
      <section className="hero-section media-background-section">
        <div className="hero-video-layer">
          <video
            className="solution-hero-video hero-background-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/media/solutions/robot-dog-farm-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-media-overlay" />
        <div className="hero-grid-layer" />
        <div className="section-container hero-layout">
          <div className="hero-copy-panel">
            <span className="section-kicker">{content.solutions.pageHero.kicker}</span>
            <h1 className="hero-title">{content.solutions.pageHero.title}</h1>
            <p className="hero-copy">{content.solutions.pageHero.description}</p>
          </div>
        </div>
      </section>

      <section className="section-container solutions-detail-stack section-spacing">
        {content.solutions.cards.map((solution) => (
          <SolutionDetailRow
            key={solution.title}
            tag={solution.tag}
            title={solution.title}
            description={solution.description}
            highlights={solution.highlights}
            imageSrc={solution.imageSrc}
            backgroundVideoSrc={solution.backgroundVideoSrc}
            backgroundPosterSrc={solution.backgroundPosterSrc}
          />
        ))}
      </section>

      <section className="section-container callout-panel section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.solutions.callout.kicker}</span>
          <h2 className="section-title">{content.solutions.callout.title}</h2>
          <p className="section-copy">{content.solutions.callout.description}</p>
        </div>
        <div className="button-row">
          <Link className="primary-button" href={`/${locale}${content.solutions.callout.primaryHref}`}>
            {content.solutions.callout.primaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
