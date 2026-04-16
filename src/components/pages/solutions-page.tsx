import Link from "next/link";
import type { SiteContent } from "@/data/site-content";

type SolutionsPageProps = {
  content: SiteContent;
};

export function SolutionsPage({ content }: SolutionsPageProps) {
  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{content.solutions.pageHero.kicker}</span>
          <h1 className="section-title">{content.solutions.pageHero.title}</h1>
          <p className="section-copy">{content.solutions.pageHero.description}</p>
        </div>
      </section>

      <section className="section-container section-spacing section-stack">
        {content.solutions.cards.map((solution) => (
          <article key={solution.title} className="solution-detail-panel">
            <div
              className="solution-detail-visual"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(238, 243, 246, 0.12), rgba(15, 26, 34, 0.1)), url(${solution.imageSrc})`,
              }}
            >
              <span className="solution-status-tag">{solution.tag}</span>
              <div className="solution-data-bars">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="section-stack">
              <h2 className="feature-panel-title">{solution.title}</h2>
              <p className="section-copy">{solution.description}</p>
              <ul className="bullet-list">
                {solution.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="section-container callout-panel section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.solutions.callout.kicker}</span>
          <h2 className="section-title">{content.solutions.callout.title}</h2>
          <p className="section-copy">{content.solutions.callout.description}</p>
        </div>
        <div className="button-row">
          <Link className="primary-button" href={content.solutions.callout.primaryHref}>
            {content.solutions.callout.primaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
