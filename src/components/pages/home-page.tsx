import Link from "next/link";
import { RevealSection } from "@/components/reveal-section";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

type HomePageProps = {
  locale: Locale;
  content: SiteContent;
};

export function HomePage({ locale, content }: HomePageProps) {
  return (
    <>
      <section className="hero-section media-background-section" id="hero">
        <div className="hero-video-layer">
          <video
            className="hero-background-video"
            autoPlay
            muted
            loop
            playsInline
            poster={content.home.hero.backgroundPosterSrc}
          >
            <source src={content.home.hero.backgroundVideoSrc} type="video/mp4" />
          </video>
        </div>
        <div className="hero-media-overlay" />
        <div className="hero-grid-layer" />
        <div className="section-container hero-layout">
          <div className="hero-copy-panel">
            <span className="section-kicker">{content.home.hero.kicker}</span>
            <h1 className="hero-title">{content.home.hero.title}</h1>
            <p className="hero-copy">{content.home.hero.description}</p>
            <div className="button-row">
              <Link className="primary-button" href={`/${locale}/solutions`}>
                {content.home.hero.primaryAction}
              </Link>
              <Link className="secondary-button" href={`/${locale}/contact`}>
                {content.home.hero.secondaryAction}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="section-spacing">
        <section className="section-container company-introduction-panel">
          <div className="section-stack">
            <span className="section-kicker">{content.home.companyIntroduction.kicker}</span>
            <h2 className="section-title">{content.home.companyIntroduction.title}</h2>
            <p className="section-copy section-copy-wide">
              {content.home.companyIntroduction.description}
            </p>
          </div>
        </section>
      </RevealSection>

      <RevealSection className="section-spacing">
        <section className="section-container content-grid">
          <div className="section-stack">
            <span className="section-kicker">{content.home.positioning.kicker}</span>
            <h2 className="section-title">{content.home.positioning.title}</h2>
            <p className="section-copy">{content.home.positioning.description}</p>
          </div>
          <div className="panel-grid">
            {content.home.positioning.points.map((point) => (
              <article key={point.title} className="feature-panel">
                <span className="feature-panel-index">{point.index}</span>
                <h3 className="feature-panel-title">{point.title}</h3>
                <p className="feature-panel-copy">{point.description}</p>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection className="section-spacing">
        <section className="section-container section-stack">
          <span className="section-kicker">{content.home.solutions.kicker}</span>
          <h2 className="section-title">{content.home.solutions.title}</h2>
          <p className="section-copy">{content.home.solutions.description}</p>

          <div className="solution-card-grid">
            {content.solutions.cards.map((solution) => (
              <article key={solution.title} className="solution-showcase-card">
                <div
                  className="solution-showcase-visual"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(238, 243, 246, 0.12), rgba(15, 26, 34, 0.1)), url(${solution.imageSrc})`,
                  }}
                >
                  <span className="solution-status-tag">{solution.tag}</span>
                </div>
                <div className="solution-showcase-copy">
                  <h3 className="feature-panel-title">{solution.title}</h3>
                  <p className="feature-panel-copy">{solution.description}</p>
                  <ul className="bullet-list">
                    {solution.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection className="section-spacing">
        <section className="section-container story-layout">
          <div className="section-stack">
            <span className="section-kicker">{content.home.story.kicker}</span>
            <h2 className="section-title">{content.home.story.title}</h2>
            <p className="section-copy">{content.home.story.description}</p>
          </div>
          <div className="story-rail">
            {content.home.story.steps.map((step) => (
              <article key={step.title} className="story-step-card">
                <span className="story-step-index">{step.index}</span>
                <h3 className="feature-panel-title">{step.title}</h3>
                <p className="feature-panel-copy">{step.description}</p>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      <RevealSection className="section-spacing">
        <section className="section-container callout-panel" id="contact-callout">
          <div className="section-stack">
            <span className="section-kicker">{content.home.callout.kicker}</span>
            <h2 className="section-title">{content.home.callout.title}</h2>
            <p className="section-copy">{content.home.callout.description}</p>
          </div>
          <div className="button-row">
            <Link className="primary-button" href={`/${locale}/contact`}>
              {content.home.callout.primaryAction}
            </Link>
            <Link className="secondary-button" href={`/${locale}/about`}>
              {content.home.callout.secondaryAction}
            </Link>
          </div>
        </section>
      </RevealSection>
    </>
  );
}
