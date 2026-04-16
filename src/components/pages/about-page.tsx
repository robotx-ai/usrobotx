import type { SiteContent } from "@/data/site-content";

type AboutPageProps = {
  content: SiteContent;
};

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{content.about.pageHero.kicker}</span>
          <h1 className="section-title">{content.about.pageHero.title}</h1>
          <p className="section-copy">{content.about.pageHero.description}</p>
        </div>
      </section>

      <section className="section-container content-grid section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.about.mission.kicker}</span>
          <h2 className="section-title">{content.about.mission.title}</h2>
          <p className="section-copy">{content.about.mission.description}</p>
        </div>
        <div className="panel-grid">
          {content.about.mission.values.map((value) => (
            <article key={value.title} className="feature-panel">
              <h3 className="feature-panel-title">{value.title}</h3>
              <p className="feature-panel-copy">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container story-layout section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.about.advantage.kicker}</span>
          <h2 className="section-title">{content.about.advantage.title}</h2>
          <p className="section-copy">{content.about.advantage.description}</p>
        </div>
        <div className="story-rail">
          {content.about.advantage.points.map((point) => (
            <article key={point.title} className="story-step-card">
              <span className="story-step-index">{point.index}</span>
              <h3 className="feature-panel-title">{point.title}</h3>
              <p className="feature-panel-copy">{point.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
