import Link from "next/link";
import { DeploymentCycleSection } from "@/components/deployment-cycle-section";
import { HomeHero } from "@/components/pages/sections/home-hero";
import { RevealSection } from "@/components/reveal-section";
import { SolutionsCarouselSection } from "@/components/solutions-carousel-section";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

type HomePageProps = {
  locale: Locale;
  content: SiteContent;
};

export function HomePage({ locale, content }: HomePageProps) {
  return (
    <>
      <HomeHero locale={locale} content={content.home.hero} />

      <RevealSection className="section-spacing">
        <section className="section-container company-introduction-panel">
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.companyIntroduction.kicker}
            </span>
            <h2 className="section-title">
              {content.home.companyIntroduction.title}
            </h2>
            <p className="section-copy section-copy-wide">
              {content.home.companyIntroduction.description}
            </p>
          </div>
        </section>
        <DeploymentCycleSection
          kicker={content.home.deploymentCycle.kicker}
          title={content.home.deploymentCycle.title}
          description={content.home.deploymentCycle.description}
          items={content.home.deploymentCycle.items}
        />
      </RevealSection>

      <RevealSection className="section-spacing">
        <section className="section-container deployment-places-panel">
          <div className="deployment-places-copy">
            <span className="section-kicker">
              {content.home.deploymentPlaces.kicker}
            </span>
            <h2 className="section-title">
              {content.home.deploymentPlaces.title}
            </h2>
            <p className="section-copy">
              {content.home.deploymentPlaces.description}
            </p>
          </div>
          <div className="deployment-places-map" />
        </section>
      </RevealSection>

      <SolutionsCarouselSection
        kicker={content.home.solutions.kicker}
        title={content.home.solutions.title}
        description={content.home.solutions.description}
        cards={content.home.featuredSolutions}
      />

      <RevealSection className="section-spacing">
        <section className="section-container positioning-section">
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.positioning.kicker}
            </span>
            <h2 className="section-title">{content.home.positioning.title}</h2>
            <p className="section-copy">
              {content.home.positioning.description}
            </p>
          </div>
          <div className="positioning-pillars">
            {content.home.pillars.map((pillar) => (
              <article key={pillar.title} className="positioning-pillar-card">
                <h3 className="positioning-pillar-title">{pillar.title}</h3>
                <ul className="positioning-pillar-list">
                  {pillar.items.map((item) => (
                    <li key={item} className="positioning-pillar-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* <RevealSection className="section-spacing">
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
      </RevealSection> */}

      <RevealSection className="section-spacing">
        <section
          className="section-container callout-panel"
          id="contact-callout"
        >
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.callout.kicker}
            </span>
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
