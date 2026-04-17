import Link from "next/link";
import { DeploymentCycleSection } from "@/components/deployment-cycle-section";
import { RevealSection } from "@/components/reveal-section";
import { SolutionsCarouselSection } from "@/components/solutions-carousel-section";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

type HomePageProps = {
  locale: Locale;
  content: SiteContent;
};

export function HomePage({ locale, content }: HomePageProps) {
  const homeSolutionCards: SiteContent["solutions"]["cards"] =
    locale === "zh"
      ? [
          {
            tag: "巡检AI：工厂",
            title: "面向工厂巡检、异常识别与运行可视化的巡检 AI。",
            description:
              "适用于需要机器人执行例行巡检、设备状态采集与异常上报的制造场景，把现场信息持续转化为可执行的数据反馈。",
            highlights: ["例行巡检自动化", "设备状态监测", "工厂部署叙事"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
            backgroundVideoSrc:
              "/media/home/Quadruped_secondary_development_solution_1_web.mp4",
            backgroundPosterSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "清洁AI：商场 / 工厂",
            title: "面向商场与工厂空间的清洁 AI。",
            description:
              "适合大面积商业与工业设施的清洁路线自动化、重复作业覆盖与服务质量标准化表达。",
            highlights: ["大面积覆盖", "自动清洁路线", "设施运营价值"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "物流AI：仓库",
            title: "面向仓库搬运、转运与内部物料流的物流 AI。",
            description:
              "用于仓储场景中的点到点运输、内部周转与流程衔接，强化效率提升和规模化仓储叙事。",
            highlights: ["仓内转运", "流程效率提升", "可扩展履约场景"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "建筑AI：建筑工地",
            title: "面向复杂、多变施工现场的建筑 AI。",
            description:
              "适合建筑工地的数据采集、现场监测与高动态环境部署，强调更安全、更连续的现场执行能力。",
            highlights: ["现场数据采集", "动态地形沟通", "工地部署可信度"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "服务AI：酒店 / 餐厅",
            title: "面向酒店与餐厅场景的服务 AI。",
            description:
              "适合迎宾、送物、指引与餐饮服务流程，强化高频触点中的自动化体验与品牌科技感。",
            highlights: ["宾客交互场景", "酒店餐饮叙事", "前台服务自动化"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "陪伴AI：家庭",
            title: "面向家庭场景的陪伴与辅助 AI。",
            description:
              "强调家庭互动、辅助支持与陪伴体验，适合展示机器人在居家环境中的长期价值与情感联结能力。",
            highlights: ["家庭交互叙事", "辅助陪伴定位", "情感化产品表达"],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
        ]
      : [
          {
            tag: "Inspection AI: Factories",
            title:
              "Inspection AI for factory patrol, anomaly detection, and operations visibility.",
            description:
              "Built for industrial sites that need robots to capture equipment status, identify irregular conditions, and feed actionable data back into the operation loop.",
            highlights: [
              "Routine patrol automation",
              "Condition monitoring workflows",
              "Factory-ready deployment storytelling",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
            backgroundVideoSrc:
              "/media/home/Quadruped_secondary_development_solution_1_web.mp4",
            backgroundPosterSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "Cleaning AI: Malls / Factories",
            title: "Cleaning AI for commercial spaces and industrial facilities.",
            description:
              "Designed for teams that need autonomous cleaning, repeatable route coverage, and service quality across shopping centers, public facilities, and production floors.",
            highlights: [
              "Large-area coverage",
              "Autonomous cleaning routes",
              "Facility operations positioning",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "Logistics AI: Warehouses",
            title:
              "Logistics AI for warehouse movement, transfer, and internal material flow.",
            description:
              "A strong fit for warehouse environments where robotic mobility can reduce manual transport friction and improve workflow continuity from storage to dispatch.",
            highlights: [
              "Intra-warehouse transport",
              "Operational efficiency framing",
              "Scalable fulfillment storytelling",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "Construction AI: Job Sites",
            title:
              "Construction AI for complex, changing, and high-noise building sites.",
            description:
              "Positioned for construction teams that need robotics to support site monitoring, data capture, and safer field execution in dynamic outdoor environments.",
            highlights: [
              "Site intelligence capture",
              "Dynamic terrain communication",
              "Field deployment credibility",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "Service AI: Hotels / Restaurants",
            title:
              "Service AI for guest-facing delivery, guidance, and hospitality workflows.",
            description:
              "Best suited for hotels and restaurants where a robotic presence can streamline service touchpoints while reinforcing a modern, technology-forward guest experience.",
            highlights: [
              "Guest interaction framing",
              "Hospitality scenario storytelling",
              "Front-of-house automation value",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
          {
            tag: "Companion AI: Homes",
            title:
              "Companion AI for household assistance, interaction, and daily support.",
            description:
              "A future-facing category for family environments where companionship, assistance, and intuitive interaction matter as much as the robotic platform itself.",
            highlights: [
              "Home interaction narratives",
              "Assistance and care positioning",
              "Emotion-aware product storytelling",
            ],
            imageSrc: "/media/home/Pudu_CC1-8.webp",
          },
        ];

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
            <source
              src={content.home.hero.backgroundVideoSrc}
              type="video/mp4"
            />
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

      <SolutionsCarouselSection
        kicker={content.home.solutions.kicker}
        title={content.home.solutions.title}
        description={content.home.solutions.description}
        cards={homeSolutionCards}
      />

      <RevealSection className="section-spacing">
        <section className="section-container content-grid">
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.positioning.kicker}
            </span>
            <h2 className="section-title">{content.home.positioning.title}</h2>
            <p className="section-copy">
              {content.home.positioning.description}
            </p>
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
