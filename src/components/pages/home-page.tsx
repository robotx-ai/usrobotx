import Link from "next/link";
import { DeploymentCycleSection } from "@/components/deployment-cycle-section";
import { HomeHero } from "@/components/pages/sections/home-hero";
import { LatestEventsSection } from "@/components/pages/sections/latest-events-section";
import { RxBrainSection } from "@/components/pages/sections/rx-brain-section";
import { RevealSection } from "@/components/reveal-section";
import { SolutionsCarouselSection } from "@/components/solutions-carousel-section";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import type { NewsArticleMeta } from "@/lib/news-types";

type HomePageProps = {
  locale: Locale;
  content: SiteContent;
  latestArticles: NewsArticleMeta[];
};

export function HomePage({ locale, content, latestArticles }: HomePageProps) {
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

      <RxBrainSection locale={locale} content={content.home.rxBrain} />

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

      <LatestEventsSection
        locale={locale}
        articles={latestArticles}
        copy={content.home.latestEvents}
        readArticleLabel={content.news.meta.readArticle}
      />

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
