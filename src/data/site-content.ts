import type { Locale } from "@/lib/i18n";

type NavigationItem = {
  label: string;
  href: string;
};

type LanguageOption = {
  locale: Locale;
};

export type NavigationContent = {
  items: NavigationItem[];
  languages: LanguageOption[];
};

export type FooterContent = {
  tagline: string;
  title: string;
  description: string;
  navigationHeading: string;
  contactHeading: string;
  links: NavigationItem[];
  address: string;
  phoneLabel: string;
  phoneRaw: string;
  email: string;
};

type HeroContent = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  backgroundVideoSrc: string;
  backgroundPosterSrc: string;
  videoAriaLabel: string;
};

type Metric = {
  value: string;
  label: string;
};

type IndexedPoint = {
  index: string;
  title: string;
  description: string;
};

type PillarCard = {
  title: string;
  items: string[];
};

type HomeContent = {
  hero: HeroContent;
  companyIntroduction: {
    kicker: string;
    title: string;
    description: string;
  };
  deploymentCycle: {
    kicker: string;
    title: string;
    description: string;
    items: {
      key: string;
      label: string;
    }[];
  };
  metrics: Metric[];
  positioning: {
    kicker: string;
    title: string;
    description: string;
    points: IndexedPoint[];
  };
  deploymentPlaces: {
    kicker: string;
    title: string;
    description: string;
  };
  pillars: PillarCard[];
  solutions: {
    kicker: string;
    title: string;
    description: string;
  };
  featuredSolutions: SolutionCard[];
  story: {
    kicker: string;
    title: string;
    description: string;
    steps: IndexedPoint[];
  };
  callout: {
    kicker: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

type SolutionCard = {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  backgroundVideoSrc?: string;
  backgroundPosterSrc?: string;
};

type SolutionsContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  cards: SolutionCard[];
  callout: {
    kicker: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
  };
};

type AboutContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  mission: {
    kicker: string;
    title: string;
    description: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  advantage: {
    kicker: string;
    title: string;
    description: string;
    points: IndexedPoint[];
  };
};

type ContactContent = {
  pageHero: {
    kicker: string;
    title: string;
    description: string;
  };
  info: {
    kicker: string;
    title: string;
    description: string;
    address: string;
    phoneLabel: string;
    phoneRaw: string;
    email: string;
  };
  form: {
    kicker: string;
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  navigation: NavigationContent;
  footer: FooterContent;
  home: HomeContent;
  solutions: SolutionsContent;
  about: AboutContent;
  contact: ContactContent;
};

const sharedAddress = "17901 Von Karman Ave, Ste 420, Irvine, CA 92614";
const sharedPhoneLabel = "1-800-519-0881";
const sharedPhoneRaw = "18005190881";
const sharedEmail = "info@usrobotx.com";
const homeHeroVideoSrc = "/media/home/Quadruped_secondary_development_solution_1_web.mp4";
const homeHeroPosterSrc = "/media/home/Pudu_CC1-8.webp";
const homepageHeroVideoSrc = "/media/hero/hero.mp4";
const homepageHeroPosterSrc = "/media/hero/hero-poster.webp";
const sharedSolutionImageSrc = "/media/home/Pudu_CC1-8.webp";

const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: "RobotX AI Inc.",
      description:
        "Advanced robotics solutions for industrial automation, education, and mission-critical safety.",
    },
    navigation: {
      items: [
        { label: "Solutions", href: "/solutions" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      languages: [{ locale: "en" }, { locale: "zh" }],
    },
    footer: {
      tagline: "Future-ready robotics",
      title: "Build the next field deployment with RobotX AI.",
      description:
        "We design technical robotics experiences that connect advanced hardware, operator insight, and practical deployment.",
      navigationHeading: "Navigate",
      contactHeading: "Contact",
      links: [
        { label: "Solutions", href: "/solutions" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      address: sharedAddress,
      phoneLabel: sharedPhoneLabel,
      phoneRaw: sharedPhoneRaw,
      email: sharedEmail,
    },
    home: {
      hero: {
        kicker: "",
        title: "From Deployment to Intelligence",
        description:
          "We build advanced robotic platforms and applied solutions.",
        primaryAction: "Explore Solutions",
        secondaryAction: "Talk to Us",
        backgroundVideoSrc: homepageHeroVideoSrc,
        backgroundPosterSrc: homepageHeroPosterSrc,
        videoAriaLabel:
          "Quadruped inspection robot walking through an industrial yard",
      },
      companyIntroduction: {
        kicker: "What we do",
        title: "A data-driven ecosystem for evolving AI robotics.",
        description:
          "We use a global supply network and offer flexible options—including sales, rental, and education—to make robotics accessible and practical for our customers.\n\nBy combining real-world industry experience with advanced technology, we build and customize robots for environments like factories and construction sites. Our solutions are designed to improve over time and adapt to your changing needs.",
      },
      deploymentCycle: {
        kicker: "Closed-Loop Intelligence",
        title: "Deploy. Learn. Evolve.",
        description:
          "Every deployment becomes data. Every data point trains the brain. Every brain makes the entire fleet smarter.",
        items: [
          { key: "deploy", label: "Deploy" },
          { key: "learn", label: "Learn" },
          { key: "evolve", label: "Evolve" },
        ],
      },
      metrics: [
        { value: "4", label: "Core solution tracks" },
        { value: "EN / ZH", label: "Bilingual experience from launch" },
        { value: "Responsive", label: "Mobile to widescreen ready" },
      ],
      positioning: {
        kicker: "Why RobotX",
        title: "Scientific clarity, robotic confidence, production-minded execution.",
        description:
          "The new site is designed to feel technical and future-facing while still staying approachable for customers evaluating serious robotics capabilities.",
        points: [
          {
            index: "01",
            title: "System-level thinking",
            description:
              "We present robotics as an integrated stack of mobility, sensing, control, and mission workflow rather than isolated hardware.",
          },
          {
            index: "02",
            title: "Visual credibility",
            description:
              "Motion, grid systems, metallic surfaces, and technical overlays support the brand without making the experience feel gimmicky.",
          },
          {
            index: "03",
            title: "Extensible architecture",
            description:
              "The codebase is structured for future Shopify product display, CMS integration, and richer media without redesigning the foundation.",
          },
        ],
      },
      deploymentPlaces: {
        kicker: "Deployments",
        title: "Production Deployments.\nNumerous Sites Around United States",
        description:
          "Trusted by global industry leaders with many more strategic partnerships to be announced soon.",
      },
      pillars: [
        {
          title: "RobotX Spatial-First Architecture",
          items: [
            "3D LiDAR spatial perception: operates without video streams, works on weak or no network",
            "Multimodal fusion: camera semantics + IMU positioning + edge security filtering",
            "Real-time 3D SLAM: autonomous navigation, 3D environment modeling, and path planning",
            "Edge + cloud hybrid: low-latency edge control + cloud reinforcement learning evolution",
            "RobotX OS: vendor-agnostic spatial operating layer with unified access",
          ],
        },
        {
          title: "Supply Chain & Deployment Network",
          items: [
            "Foundation for real-world data collection",
            "Exclusive dealership and distribution rights with top robotics companies",
            "Multi-channel deployment: sales, rental, and education",
            "Every robot learns from operational data while it works",
          ],
        },
        {
          title: "Enterprise End-to-End Solutions",
          items: [
            "Brain Box hardware",
            "Custom vertical skill packs (subscription model)",
            "Enterprise-grade end-to-end solutions",
            "RobotX Lab simulations",
          ],
        },
      ],
      solutions: {
        kicker: "We Solve Your Problems",
        title: "Built for applied robotics across multiple environments.",
        description: "",
      },
      featuredSolutions: [
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
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/robot-dog-farm-1.mp4",
          backgroundPosterSrc: homeHeroPosterSrc,
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
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/cleaning-robot.mp4",
        },
        {
          tag: "Logistics AI: Warehouses",
          title:
            "Logistics AI for warehouse movement, transfer, and internal material flow.",
          description:
            "A strong fit for warehouse environments where robotic mobility can reduce manual transport friction and improve workflow continuity from storage to dispatch.",
          highlights: [
            "Multi-warehouse transport path optimization",
            "Multi-Robot Collaborative Material Handling",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/logistic-robot.mp4",
        },
        {
          tag: "Construction AI: Job Sites",
          title:
            "Construction AI for complex, changing, and high-noise building sites.",
          description:
            "Positioned for construction teams that need robotics to support site monitoring, data capture, and safer field execution in dynamic outdoor environments.",
          highlights: [
            "Site data capture",
            "Dynamic terrain communication",
            "Field deployment credibility",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "Service AI: Hotels / Restaurants",
          title:
            "Service AI for guest-facing delivery, guidance, and hospitality workflows.",
          description:
            "Best suited for hotels and restaurants where a robotic presence can streamline service touchpoints while reinforcing a modern, technology-forward guest experience.",
          highlights: ["Guest interaction", "Hospitality delivery service"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/restaurant-robot.mp4",
        },
        {
          tag: "Companion AI: Homes",
          title:
            "Companion AI for household assistance, interaction, and daily support.",
          description:
            "A future-facing category for family environments where companionship, assistance, and intuitive interaction matter as much as the robotic platform itself.",
          highlights: [
            "Assistance and care positioning",
            "Emotion-aware product storytelling",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/compaion-robot.mp4",
        },
      ],
      story: {
        kicker: "Deployment Flow",
        title: "From concept briefing to field-ready communication.",
        description:
          "Each section of the site is designed to help customers understand what RobotX builds, where those systems fit, and how to start the conversation.",
        steps: [
          {
            index: "01",
            title: "Frame the application",
            description:
              "Identify whether the customer is evaluating robotics for education, industrial workflows, humanoid interfaces, or firefighting and emergency response.",
          },
          {
            index: "02",
            title: "Surface the technical edge",
            description:
              "Use media-rich panels, highlighted specifications, and clear language to communicate sensing, mobility, control, and remote operation capability.",
          },
          {
            index: "03",
            title: "Convert into inquiry",
            description:
              "Route traffic into direct contact rather than checkout, keeping the site focused on partnership, consultation, and future product display expansion.",
          },
        ],
      },
      callout: {
        kicker: "Start the rebuild",
        title: "A local-first codebase ready for Netlify, GitHub, and future media expansion.",
        description:
          "This MVP is built to launch without Shopify dependencies today while leaving clean extension points for display-only product content later.",
        primaryAction: "Contact RobotX",
        secondaryAction: "See Our Approach",
      },
    },
    solutions: {
      pageHero: {
        kicker: "Solutions",
        title: "Robotics platforms aligned to real mission needs.",
        description:
          "The current WordPress site highlights humanoid, industrial, educational, and firefighting directions. The new experience keeps that structure while making it clearer and more premium.",
      },
      cards: [
        {
          tag: "Inspection AI: Factories",
          title: "Inspection AI for factory patrol, anomaly detection, and operations visibility.",
          description:
            "Built for industrial sites that need robots to capture equipment status, identify irregular conditions, and feed actionable data back into the operation loop.",
          highlights: [
            "Routine patrol automation",
            "Condition monitoring workflows",
            "Factory-ready deployment storytelling",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/robot-dog-farm-1.mp4",
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
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/cleaning-robot.mp4",
        },
        {
          tag: "Logistics AI: Warehouses",
          title: "Logistics AI for warehouse movement, transfer, and internal material flow.",
          description:
            "A strong fit for warehouse environments where robotic mobility can reduce manual transport friction and improve workflow continuity from storage to dispatch.",
          highlights: [
            "Intra-warehouse transport",
            "Operational efficiency framing",
            "Scalable fulfillment storytelling",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/logistic-robot.mp4",
        },
        {
          tag: "Construction AI: Job Sites",
          title: "Construction AI for complex, changing, and high-noise building sites.",
          description:
            "Inspired by the current site’s life-safety messaging, this section emphasizes remote operation, situational awareness, and personnel protection.",
          highlights: [
            "Site intelligence capture",
            "Dynamic terrain communication",
            "Field deployment credibility",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "Service AI: Hotels / Restaurants",
          title: "Service AI for guest-facing delivery, guidance, and hospitality workflows.",
          description:
            "Best suited for hotels and restaurants where a robotic presence can streamline service touchpoints while reinforcing a modern, technology-forward guest experience.",
          highlights: [
            "Guest interaction framing",
            "Hospitality scenario storytelling",
            "Front-of-house automation value",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/restaurant-robot.mp4",
        },
        {
          tag: "Companion AI: Homes",
          title: "Companion AI for household assistance, interaction, and daily support.",
          description:
            "A future-facing category for family environments where companionship, assistance, and intuitive interaction matter as much as the robotic platform itself.",
          highlights: [
            "Home interaction narratives",
            "Assistance and care positioning",
            "Emotion-aware product storytelling",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/compaion-robot.mp4",
        },
      ],
      callout: {
        kicker: "Next step",
        title: "Need a tailored robotics page or product showcase next?",
        description:
          "The current code structure is ready for deeper solution subpages and a future Shopify-fed display layer.",
        primaryLabel: "Contact Us",
        primaryHref: "/en/contact",
      },
    },
    about: {
      pageHero: {
        kicker: "About",
        title: "A robotics company building trust through technical clarity.",
        description:
          "RobotX AI combines advanced robotics interest with practical deployment thinking. The redesigned website presents that identity with a more scientific and futuristic tone.",
      },
      mission: {
        kicker: "Mission",
        title: "Show the brand as capable, credible, and ready to collaborate.",
        description:
          "The About page should help visitors quickly understand the company, the problem spaces it cares about, and the way it approaches modern robotics.",
        values: [
          {
            title: "Precision",
            description:
              "Design and messaging should feel measured, intentional, and rooted in technical confidence.",
          },
          {
            title: "Adaptability",
            description:
              "The site is structured to grow from a marketing presence into a richer product and solution platform over time.",
          },
          {
            title: "Accessibility",
            description:
              "English and Chinese content, clear sections, and responsive design make the experience easier to use across audiences.",
          },
        ],
      },
      advantage: {
        kicker: "How we present the company",
        title: "A modern site architecture designed for long-term growth.",
        description:
          "Instead of copying the WordPress theme, the rebuild uses clearer components, reusable sections, and a brand system made for code ownership.",
        points: [
          {
            index: "01",
            title: "Code-managed content",
            description:
              "Pages are easy to version, review, and deploy through GitHub and Netlify.",
          },
          {
            index: "02",
            title: "Structured styling",
            description:
              "Reusable global CSS tokens support consistent spacing, color, typography, and motion.",
          },
          {
            index: "03",
            title: "Future integration points",
            description:
              "The architecture leaves room for forms, CMS workflows, and Shopify product display without a rewrite.",
          },
        ],
      },
    },
    contact: {
      pageHero: {
        kicker: "Contact",
        title: "Start the robotics conversation.",
        description:
          "We are focusing the MVP on inquiry and relationship-building instead of direct e-commerce, so the contact experience needs to feel direct, confident, and clear.",
      },
      info: {
        kicker: "Reach RobotX",
        title: "Talk with our team about solutions, deployment, or collaboration.",
        description:
          "The contact details are based on the current live website and can be adjusted easily as the new site evolves.",
        address: sharedAddress,
        phoneLabel: sharedPhoneLabel,
        phoneRaw: sharedPhoneRaw,
        email: sharedEmail,
      },
      form: {
        kicker: "Inquiry Form",
        title: "Tell us what you are building.",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "Your email",
        messageLabel: "Message",
        messagePlaceholder: "Tell us about your robotics use case, timeline, or question.",
        submitLabel: "Send Inquiry",
      },
    },
  },
  zh: {
    meta: {
      title: "RobotX AI Inc.",
      description: "面向工业、教育与关键任务场景的先进机器人解决方案。",
    },
    navigation: {
      items: [
        { label: "解决方案", href: "/solutions" },
        { label: "关于我们", href: "/about" },
        { label: "联系我们", href: "/contact" },
      ],
      languages: [{ locale: "en" }, { locale: "zh" }],
    },
    footer: {
      tagline: "面向未来的机器人品牌",
      title: "与 RobotX AI 一起打造下一代机器人应用场景。",
      description:
        "我们用更技术化、更清晰的方式呈现机器人能力，把先进硬件、感知控制与真实部署需求连接起来。",
      navigationHeading: "页面导航",
      contactHeading: "联系信息",
      links: [
        { label: "解决方案", href: "/solutions" },
        { label: "关于我们", href: "/about" },
        { label: "联系我们", href: "/contact" },
      ],
      address: sharedAddress,
      phoneLabel: sharedPhoneLabel,
      phoneRaw: sharedPhoneRaw,
      email: sharedEmail,
    },
    home: {
      hero: {
        kicker: "RobotX AI Inc.",
        title: "以部署驱动规模,以数据铸造壁垒。",
        description:
          "我们专注于工业、教育、人形机器人与消防等方向的先进机器人平台与解决方案，强调精确控制、工程能力与落地部署。",
        primaryAction: "查看解决方案",
        secondaryAction: "联系我们",
        backgroundVideoSrc: homepageHeroVideoSrc,
        backgroundPosterSrc: homepageHeroPosterSrc,
        videoAriaLabel: "四足巡检机器人在工业场景中行走",
      },
      companyIntroduction: {
        kicker: "公司简介",
        title: "以数据驱动智能的闭环生态",
        description:
          "我们依托全球供应链体系，并结合销售、租赁及教育等多元化业务模式，为客户提供稳定且可扩展的机器人解决方案。\n\n通过融合不同行业的实际数据，并结合先进的感知与运动控制技术，我们能够针对制造业、建筑业等复杂应用场景进行定制化开发。我们的机器人系统具备持续优化与智能升级的能力，能够随着客户需求不断演进。",
      },
      deploymentCycle: {
        kicker: "闭环智能",
        title: "Deploy · Learn · Evolve",
        description:
          "每一次部署都是数据,每一条数据都在训练大脑,每一个大脑都让整个机队更聪明。",
        items: [
          { key: "deploy", label: "Deploy" },
          { key: "learn", label: "Learn" },
          { key: "evolve", label: "Evolve" },
        ],
      },
      metrics: [
        { value: "4", label: "核心解决方案方向" },
        { value: "中 / EN", label: "上线即支持双语" },
        { value: "响应式", label: "适配移动端到大屏" },
      ],
      positioning: {
        kicker: "为什么选择 RobotX",
        title: "更科学的表达、更机器人的气质、更可扩展的代码结构。",
        description:
          "新网站会比当前 WordPress 版本更具技术感与未来感，同时仍然保持清晰、可信、便于客户理解。",
        points: [
          {
            index: "01",
            title: "系统级表达",
            description:
              "我们把机器人展示为移动、感知、控制与任务流程整合后的系统，而不是孤立的单一硬件。",
          },
          {
            index: "02",
            title: "品牌可信度",
            description:
              "通过金属感表面、技术网格、数据化动效与清晰布局，让品牌更专业而不过度炫技。",
          },
          {
            index: "03",
            title: "面向未来扩展",
            description:
              "代码结构已为后续 Shopify 产品展示、CMS 内容管理与更多媒体内容预留接口。",
          },
        ],
      },
      deploymentPlaces: {
        kicker: "部署范围",
        title: "生产级部署。\n遍布美国多个站点",
        description:
          "受全球行业领导者信赖，更多战略合作伙伴关系即将公布。",
      },
      pillars: [
        {
          title: "RobotX 自研 Spatial-First 架构",
          items: [
            "3D LiDAR 空间感知：不依赖视频流，弱网/断⽹仍可运⾏",
            "多模态融合：摄像头语义 + IMU定位 + 边缘安全过滤",
            "实时 3D SLAM：自主导航、三维环境建模与路径规划",
            "边缘+云端混合：边缘低延迟控制 + 云端强化学习进化",
            "RobotX OS：厂商⽆关的空间操作层，统⼀接⼊",
          ],
        },
        {
          title: "供应链与部署网络",
          items: [
            "数据采集的前提",
            "顶级机器人公司独家代理权、经销权",
            "多渠道部署：销售/租赁/教育",
            "每台机器人会边工作边用数据自我学习",
          ],
        },
        {
          title: "企业级端到端解决方案",
          items: [
            "Brain Box 硬件",
            "定制垂直技能包（订阅制）",
            "企业级端到端解决方案",
            "RobotX 实验室，模拟",
          ],
        },
      ],
      solutions: {
        kicker: "解决方案方向",
        title: "面向多种机器人应用环境而设计。",
        description: "",
      },
      featuredSolutions: [
        {
          tag: "巡检AI：工厂",
          title: "巡检AI——工厂巡检、异常检测与运营可视化。",
          description:
            "为需要机器人进行设备状态采集、异常情况识别并反馈可执行数据的工业现场量身打造。",
          highlights: ["例行巡检自动化", "设备状态监测工作流", "工厂部署就绪"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: homeHeroVideoSrc,
          backgroundPosterSrc: homeHeroPosterSrc,
        },
        {
          tag: "清洁AI：商场 / 工厂",
          title: "清洁AI——商业空间与工业设施的自动清洁。",
          description:
            "为需要自主清洁、全覆盖路线规划和服务质量标准化的购物中心、公共设施和生产车间而设计。",
          highlights: ["大面积覆盖", "自主清洁路线", "智能清洁"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/cleaning-robot.mp4",
        },
        {
          tag: "物流AI：仓库",
          title: "物流AI——仓库搬运、转运与物料流优化。",
          description:
            "完美适配仓储环境，通过机器人移动能力减少人工搬运阻力，提升工作流连贯性，从存储到派遣的全流程优化。",
          highlights: ["多仓库运输路径优化", "多机器人协同重物搬运"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/logistic-robot.mp4",
        },
        {
          tag: "建筑AI：建筑工地",
          title: "建筑AI——复杂、多变、高噪声建筑工地。",
          description:
            "为建筑团队提供现场监测、数据采集和动态户外环境中更安全、更高效的现场执行能力支持。",
          highlights: ["现场数据采集", "动态地形沟通", "现场部署可信度"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "服务AI：酒店 / 餐厅",
          title: "服务AI——面向客人的配送、引导与服务流程。",
          description:
            "最适合酒店和餐厅应用，机器人可优化服务接触点并强化现代科技导向的客户体验。",
          highlights: ["宾客互动", "酒店餐厅运送服务"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/restaurant-robot.mp4",
        },
        {
          tag: "陪伴AI：家庭",
          title: "陪伴AI——居家协助、互动与日常支持。",
          description:
            "面向未来的应用场景，在家庭环境中，陪伴、协助与直观交互与机器人平台本身一样重要。",
          highlights: ["协助与护理定位", "情感感知的产品叙事"],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/compaion-robot.mp4",
        },
      ],
      story: {
        kicker: "转化路径",
        title: "从业务场景到合作咨询的完整信息路径。",
        description:
          "每一个页面板块都在帮助访客理解 RobotX 做什么、适合哪些场景，以及如何开始进一步沟通。",
        steps: [
          {
            index: "01",
            title: "明确应用场景",
            description:
              "帮助访客快速判断需求属于教育、工业、人形机器人，还是消防与应急响应方向。",
          },
          {
            index: "02",
            title: "突出技术优势",
            description:
              "用媒体化模块、重点参数和简洁文案表达感知、控制、运动与远程操作能力。",
          },
          {
            index: "03",
            title: "引导业务咨询",
            description:
              "MVP 以咨询转化为主，不放结账流程，为后续展示型产品页面保留扩展空间。",
          },
        ],
      },
      callout: {
        kicker: "本次重建目标",
        title: "先把本地代码环境和品牌基础搭建好，再逐步扩展媒体与产品展示。",
        description:
          "这个 MVP 当前不依赖 Shopify，也不会阻碍后续加入只展示不售卖的产品模块。",
        primaryAction: "联系 RobotX",
        secondaryAction: "了解我们",
      },
    },
    solutions: {
      pageHero: {
        kicker: "解决方案",
        title: "围绕真实任务需求构建的机器人能力展示。",
        description:
          "当前 WordPress 网站中的人形、工业、教育和消防方向会被保留，但新的表达方式会更清晰、更高级、更符合机器人品牌气质。",
      },
      cards: [
        {
          tag: "巡检 AI：工厂",
          title: "面向工厂巡检、异常检测与运营可视化的巡检 AI。",
          description:
            "面向需要机器人捕捉设备状态、识别异常情况并将可执行数据回传到运营闭环的工业场景。",
          highlights: [
            "日常巡检自动化",
            "设备状态监测流程",
            "工厂部署案例表达",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/robot-dog-farm-1.mp4",
        },
        {
          tag: "清洁 AI：商场 / 工厂",
          title: "面向商业空间与工业场所的清洁 AI。",
          description:
            "为需要自主清洁、可复用巡线与稳定服务质量的团队打造，覆盖购物中心、公共设施与生产车间。",
          highlights: [
            "大面积覆盖能力",
            "自主清洁路径规划",
            "设施运营场景定位",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/cleaning-robot.mp4",
        },
        {
          tag: "物流 AI：仓储",
          title: "面向仓内搬运、调度与物料流转的物流 AI。",
          description:
            "适合机器人移动能力能够减少人工搬运摩擦、在存储到出货全流程中保持作业连续性的仓储环境。",
          highlights: [
            "仓内运输自动化",
            "运营效率表达",
            "可规模化履约叙事",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/logistic-robot.mp4",
        },
        {
          tag: "施工 AI：工地",
          title: "面向复杂、多变与高噪声建筑工地的施工 AI。",
          description:
            "延续当前网站中安全优先的表达，强调远程操控、态势感知与人员保护能力。",
          highlights: [
            "工地态势采集",
            "动态地形通讯",
            "现场部署可信度",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: homeHeroVideoSrc,
        },
        {
          tag: "服务 AI：酒店 / 餐饮",
          title: "面向面客配送、引导与酒店餐饮流程的服务 AI。",
          description:
            "适合酒店与餐饮场景，机器人可以优化服务触点，同时强化现代、科技感的宾客体验。",
          highlights: [
            "宾客互动表达",
            "酒店餐饮场景叙事",
            "前厅自动化价值",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/restaurant-robot.mp4",
        },
        {
          tag: "陪伴 AI：家庭",
          title: "面向家庭陪伴、互动与日常辅助的陪伴 AI。",
          description:
            "面向家庭环境的未来方向，陪伴、辅助与自然互动与机器人平台本身同等重要。",
          highlights: [
            "家庭互动叙事",
            "辅助与关怀定位",
            "情感感知产品表达",
          ],
          imageSrc: sharedSolutionImageSrc,
          backgroundVideoSrc: "/media/solutions/compaion-robot.mp4",
        },
      ],
      callout: {
        kicker: "下一步",
        title: "后续如需更细分的解决方案页面或产品展示层，也可以直接扩展。",
        description:
          "当前代码结构已经为未来的子页面、案例展示和 Shopify 产品数据接入留出空间。",
        primaryLabel: "联系我们",
        primaryHref: "/zh/contact",
      },
    },
    about: {
      pageHero: {
        kicker: "关于我们",
        title: "用更清晰的技术表达建立机器人品牌信任感。",
        description:
          "RobotX AI 将先进机器人兴趣与真实部署思维结合起来，新的官网会以更科学、更未来的方式呈现这一品牌形象。",
      },
      mission: {
        kicker: "品牌目标",
        title: "让访客快速理解公司能力、可信度与合作方式。",
        description:
          "关于我们页面需要帮助访客理解公司是谁、关注哪些问题、以及如何理解 RobotX 对现代机器人应用的判断。",
        values: [
          {
            title: "精确",
            description: "视觉与文案都应体现克制、专业与工程化的品牌气质。",
          },
          {
            title: "适应性",
            description: "网站结构能从公司展示站逐步演进为更丰富的产品与方案平台。",
          },
          {
            title: "可访问性",
            description: "双语与响应式设计帮助不同背景的访客更容易理解与使用网站。",
          },
        ],
      },
      advantage: {
        kicker: "重建方式",
        title: "用现代代码架构替代主题式堆叠，支持长期增长。",
        description:
          "我们不会简单复制 WordPress 的样子，而是通过更清晰的组件体系和品牌系统来重建整个官网基础。",
        points: [
          {
            index: "01",
            title: "代码化管理内容",
            description: "页面内容易于通过 GitHub 管理、审查与部署到 Netlify。",
          },
          {
            index: "02",
            title: "结构化样式系统",
            description: "全局 CSS 变量统一控制色彩、间距、字体与动效。",
          },
          {
            index: "03",
            title: "预留未来集成接口",
            description: "方便后续增加表单、CMS 工作流与 Shopify 展示型产品数据。",
          },
        ],
      },
    },
    contact: {
      pageHero: {
        kicker: "联系我们",
        title: "开启一次关于机器人应用的沟通。",
        description:
          "MVP 阶段我们聚焦业务咨询与合作沟通，而不是直接电商销售，因此联系页面需要足够直接、专业和清晰。",
      },
      info: {
        kicker: "联系 RobotX",
        title: "欢迎与我们讨论解决方案、部署需求或合作想法。",
        description:
          "这里的联系方式基于当前官网公开信息，后续也可以在新站中很方便地调整。",
        address: sharedAddress,
        phoneLabel: sharedPhoneLabel,
        phoneRaw: sharedPhoneRaw,
        email: sharedEmail,
      },
      form: {
        kicker: "咨询表单",
        title: "告诉我们你的需求。",
        nameLabel: "姓名",
        namePlaceholder: "请输入姓名",
        emailLabel: "邮箱",
        emailPlaceholder: "请输入邮箱",
        messageLabel: "留言",
        messagePlaceholder: "请介绍你的机器人应用场景、时间计划或具体问题。",
        submitLabel: "发送咨询",
      },
    },
  },
};

export function getSiteContent(locale: Locale): SiteContent {
  return siteContentByLocale[locale] ?? siteContentByLocale.en;
}
