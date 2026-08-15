import type { Locale, LocaleContent, SiteConfig, SiteContentMap } from "./types";

export type { Locale, LocaleContent, SiteConfig };

/** 全局配置（不随语言变化） */
export const siteConfig: SiteConfig = {
  email: "unieggy@outlook.com",
  author: "周原",
  portrait: "/posters/poster-2.svg",
  githubUrl: "https://github.com/unieggy000-debug",
  collageImages: [
    "/posters/poster-1.svg",
    "/posters/poster-2.svg",
    "/posters/poster-3.svg",
    "/posters/poster-4.svg",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
  ],
};

const workImages = {
  w1: "/posters/poster-1.svg",
  w2: "/posters/poster-2.svg",
  w3: "/posters/poster-3.svg",
  w4: "/posters/poster-4.svg",
  w5: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
  unsplash1: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
  unsplash2: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
};

export const siteContent: SiteContentMap = {
  zh: {
    meta: {
      title: "周原 · AI 产品作品集",
      description: "周原的个人作品集 — AI 产品经理 / 跨学科创作者",
    },
    ui: {
      portfolio: "作品集",
      scroll: "向下滚动",
      dragPosters: "海报可拖拽移动",
      posterLabel: "海报",
      personalFile: "个人档案",
      skills: "技能",
      missionLog: "任务日志",
      missionArchive: "任务档案",
      selectedWorks: "精选作品",
      worksIntro: "项任务已记录 — 横向滚动浏览完整档案",
      clickToOpen: "点击查看 →",
      moreMissions: "更多任务",
      addWorksHint: "进入后台档案室添加作品",
      scrollArchive: "← 滚动浏览档案 →",
      viewProject: "查看项目 →",
      closeModal: "[ ESC / 关闭 ]",
      loading: "加载中",
      copied: "已复制",
      copyEmail: "复制邮箱",
      copyFailed: "复制失败",
      terminalComplete: '$ echo "任务完成"',
      terminalExit: "SYSTEM: GRATITUDE_EXPRESSED.exe // EXIT_CODE: 0",
    },
    preloader: [
      "> 系统启动 / SYSTEM INIT...",
      "> 加载宇航员数据...",
      "> 校准星空参数...",
      "> 初始化海报引擎...",
      "> 所有系统正常",
    ],
    hero: {
      tagline: "我们如何抵达未来",
      headline: "THE WAY IS OPEN FOR US",
      subheadline: "",
      period: "",
    },
    about: {
      fileNumber: "个人档案 № 001",
      name: "周原",
      role: "AI 产品经理",
      bio: "在建筑的秩序与算法的流变之间，我试着把每一次产品落地，都做成可被触摸的未来切片。",
      stats: [
        { label: "方向", value: "AI 产品" },
        { label: "履历", value: "百度 / 电魂" },
        { label: "教育", value: "港大 · 东大" },
        { label: "语言", value: "IELTS 6.5" },
      ],
      timeline: [
        {
          year: "2026.09",
          title: "香港大学 · 创新与技术硕士",
          description: "跨学科深造，继续探索技术与产品创新的交汇处。",
          location: "香港",
        },
        {
          year: "2026.03–08",
          title: "百度 · AI 产品经理",
          description:
            "负责 AI 应用平台需求全链路，推进 7 项需求落地；基于 Agent 与 vibe coding 累计交付 180+ AI 应用。",
          location: "百度",
        },
        {
          year: "2025.11–02",
          title: "电魂网络 · 海外产品运营",
          description:
            "搭建 AI 内容工作流，日均产出 50+ 素材；从零搭建海外社群，全平台粉丝 25 万+。",
          location: "电魂",
        },
        {
          year: "2021–2026",
          title: "东北大学 · 建筑学本科",
          description: "以空间与秩序训练审美与结构思维，为后来的产品设计埋下底色。",
          location: "沈阳",
        },
      ],
      skills: [
        "产品方法 / PRD",
        "用户研究",
        "AI Agent",
        "Prompt 设计",
        "Vibe Coding",
        "数据分析 / SQL",
        "Figma / PS",
        "Rhino / Blender",
        "Unity / UE5",
      ],
    },
    works: [
      {
        id: "work-01",
        title: "智会圈",
        subtitle: "Create 大会现场社交应用",
        year: "2026",
        category: "AI 应用",
        description:
          "百度实习期间落地的现场社交应用，支撑千人规模活动；围绕交流互动完成设计与开发，并保障高并发与数据安全。",
        image: workImages.w1,
        collageImages: [workImages.w1, workImages.unsplash1],
        tags: ["AI Agent", "产品", "高并发"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-02",
        title: "秒哒应用美学黑客松",
        subtitle: "大赛官网与创意空间",
        year: "2026",
        category: "AI 产品",
        description:
          "基于 Agent 与低代码/vibe coding 快速交付官网与像素空间等创意应用，累计参与交付 180+ AI 应用矩阵之一。",
        image: workImages.w2,
        collageImages: [workImages.w2, workImages.unsplash2],
        tags: ["Vibe Coding", "官网", "运营"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-03",
        title: "海外游戏增长",
        subtitle: "电魂 · 社群与转化优化",
        year: "2025",
        category: "产品运营",
        description:
          "搭建 AI 内容工作流与海外 Discord/Facebook 社群；漏斗分析驱动官网与游戏内优化，全平台粉丝 25 万+。",
        image: workImages.w3,
        tags: ["数据分析", "社群", "增长"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-04",
        title: "个人品牌商业化",
        subtitle: "IP · 内容 · O2O 闭环",
        year: "2024–25",
        category: "个人项目",
        description:
          "从 0 到 1 孵化多平台账号与电商路径；组织成都/广州/沈阳/北京展览，累计 4 万+ 人流。",
        image: workImages.w4,
        collageImages: [workImages.w4, workImages.unsplash2],
        tags: ["IP 运营", "电商", "展览"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-05",
        title: "AI 应用平台迭代",
        subtitle: "模板市场与创建链路",
        year: "2026",
        category: "AI 产品",
        description:
          "负责百度 AI 应用平台需求全链路，推进模板市场、应用创建、模板复制等 7 项核心需求落地。",
        image: workImages.w5,
        tags: ["PRD", "平台", "体验优化"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
    ],
    credits: {
      title: "致谢",
      lines: [
        "致实习期间的导师 — 感谢信任我参与真实任务",
        "致 Elena Starikova — Soviet Space longride 美学的灵感来源",
        "致公有领域档案 — 感谢影像素材",
        "致 GSAP、Lenis 与 Next.js — 这艘飞船的引擎",
        "致滚动到底的你 — 你才是真正的宇航员",
      ],
      footer:
        "本站为非商业作品集用途创建，所有占位素材版权归其持有者所有。",
    },
    navigation: [
      { id: "home", label: "首页" },
      { id: "about", label: "简介" },
      { id: "works", label: "作品" },
      { id: "credits", label: "致谢" },
    ],
  },

  en: {
    meta: {
      title: "Zhou Yuan · AI Product Portfolio",
      description:
        "Portfolio of Zhou Yuan — AI Product Manager / interdisciplinary creator",
    },
    ui: {
      portfolio: "PORTFOLIO",
      scroll: "SCROLL",
      dragPosters: "THESE POSTERS CAN BE MOVED",
      posterLabel: "POSTER",
      personalFile: "PERSONAL FILE",
      skills: "SKILLS",
      missionLog: "MISSION LOG",
      missionArchive: "MISSION ARCHIVE",
      selectedWorks: "SELECTED WORKS",
      worksIntro: "MISSIONS DOCUMENTED — SCROLL HORIZONTALLY TO EXPLORE",
      clickToOpen: "CLICK TO OPEN →",
      moreMissions: "MORE MISSIONS",
      addWorksHint: "ADD WORKS IN THE ARCHIVE ADMIN",
      scrollArchive: "← SCROLL TO NAVIGATE ARCHIVE →",
      viewProject: "VIEW PROJECT →",
      closeModal: "[ ESC / CLOSE ]",
      loading: "LOADING",
      copied: "COPIED",
      copyEmail: "Copy email",
      copyFailed: "Copy failed",
      terminalComplete: '$ echo "mission complete"',
      terminalExit: "SYSTEM: GRATITUDE_EXPRESSED.exe // EXIT_CODE: 0",
    },
    preloader: [
      "> СИСТЕМА ЗАПУСКА / SYSTEM INIT...",
      "> LOADING COSMONAUT DATA...",
      "> CALIBRATING STAR FIELD...",
      "> INITIALIZING POSTER ENGINE...",
      "> ALL SYSTEMS NOMINAL",
    ],
    hero: {
      tagline: "我们如何抵达未来",
      headline: "THE WAY IS OPEN FOR US",
      subheadline: "",
      period: "",
    },
    about: {
      fileNumber: "ЛИЧНОЕ ДЕЛО № 001",
      name: "ZHOU YUAN",
      role: "AI PRODUCT MANAGER",
      bio: "Between the order of architecture and the flux of algorithms, I try to turn every product launch into a tangible slice of the future.",
      stats: [
        { label: "FOCUS", value: "AI PRODUCT" },
        { label: "TRACK", value: "BAIDU / DIANHUN" },
        { label: "EDU", value: "HKU · NEU" },
        { label: "LANG", value: "IELTS 6.5" },
      ],
      timeline: [
        {
          year: "2026.09",
          title: "HKU · MSc Innovation & Technology",
          description:
            "Interdisciplinary study at the intersection of technology and product innovation.",
          location: "Hong Kong",
        },
        {
          year: "2026.03–08",
          title: "Baidu · AI Product Manager",
          description:
            "Owned AI app platform requirements end-to-end; shipped 7 features and 180+ Agent-powered applications.",
          location: "Baidu",
        },
        {
          year: "2025.11–02",
          title: "Dianhun · Overseas Product Ops",
          description:
            "Built AI content workflows and overseas communities; 250k+ fans across platforms.",
          location: "Dianhun",
        },
        {
          year: "2021–2026",
          title: "Northeastern University · Architecture B.A.",
          description:
            "Trained in space and order — the aesthetic foundation for later product work.",
          location: "Shenyang",
        },
      ],
      skills: [
        "Product / PRD",
        "User Research",
        "AI Agent",
        "Prompt Design",
        "Vibe Coding",
        "Analytics / SQL",
        "Figma / PS",
        "Rhino / Blender",
        "Unity / UE5",
      ],
    },
    works: [
      {
        id: "work-01",
        title: "ZHIHUI CIRCLE",
        subtitle: "Create Summit Social App",
        year: "2026",
        category: "AI APP",
        description:
          "On-site social app for a thousand-person event at Baidu — design, build, and high-concurrency readiness.",
        image: workImages.w1,
        collageImages: [workImages.w1, workImages.unsplash1],
        tags: ["AI Agent", "Product", "Scale"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-02",
        title: "MIAODA HACKATHON",
        subtitle: "Official Site & Pixel Space",
        year: "2026",
        category: "AI PRODUCT",
        description:
          "Rapid delivery via Agent + vibe coding — part of 180+ shipped AI applications.",
        image: workImages.w2,
        collageImages: [workImages.w2, workImages.unsplash2],
        tags: ["Vibe Coding", "Web", "Ops"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-03",
        title: "OVERSEAS GAME GROWTH",
        subtitle: "Dianhun · Community & Funnel",
        year: "2025",
        category: "PRODUCT OPS",
        description:
          "AI content pipeline and Discord/Facebook communities; 250k+ fans; funnel-driven site & in-game optimization.",
        image: workImages.w3,
        tags: ["Analytics", "Community", "Growth"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-04",
        title: "PERSONAL BRAND COMMERCE",
        subtitle: "IP · Content · O2O Loop",
        year: "2024–25",
        category: "PERSONAL",
        description:
          "Multi-platform IP from zero; exhibitions in Chengdu / Guangzhou / Shenyang / Beijing with 40k+ footfall.",
        image: workImages.w4,
        collageImages: [workImages.w4, workImages.unsplash2],
        tags: ["IP", "Commerce", "Exhibition"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
      {
        id: "work-05",
        title: "AI APP PLATFORM",
        subtitle: "Template Market & Creation Flow",
        year: "2026",
        category: "AI PRODUCT",
        description:
          "End-to-end ownership of Baidu AI app platform — template market, creation, and copy flows.",
        image: workImages.w5,
        tags: ["PRD", "Platform", "UX"],
        link: "https://www.miaoda.cn/profile/user-a7o5kfzf2kn4",
      },
    ],
    credits: {
      title: "ACKNOWLEDGMENTS",
      lines: [
        "TO MY MENTORS — FOR TRUSTING ME WITH REAL MISSIONS",
        "TO ELENA STARIKOVA — SOVIET SPACE LONGRIDE INSPIRATION",
        "TO PUBLIC DOMAIN ARCHIVES — FOR THE IMAGERY",
        "TO GSAP, LENIS, AND NEXT.JS — ENGINES OF THIS SPACECRAFT",
        "TO EVERYONE WHO SCROLLED DOWN — YOU ARE THE COSMONAUTS",
      ],
      footer:
        "CREATED FOR NON-COMMERCIAL PORTFOLIO PURPOSES. ALL MATERIALS BELONG TO THEIR COPYRIGHT HOLDERS.",
    },
    navigation: [
      { id: "home", label: "HOME" },
      { id: "about", label: "ABOUT" },
      { id: "works", label: "WORKS" },
      { id: "credits", label: "CREDITS" },
    ],
  },
};
