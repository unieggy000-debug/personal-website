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
  w1: "/works/work-01-zhihuiquan.png",
  w2: "/works/work-02-hackathon.png",
  w3: "/works/work-03-zhishen-x.png",
  w4: "/works/work-04-idol.png",
  w5: "/works/work-05-haiwang.png",
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
          "面向商务与媒体人士的智能会议社交应用：现场 AI 会议记录与结构化纪要、数字名片交换与人脉发现、广场动态与私信沟通，支撑 Create 大会千人规模参会场景。",
        image: workImages.w1,
        tags: ["AI 纪要", "数字名片", "会议社交"],
        link: "https://www.miaoda.cn/apps/app-asjt8zmphq81?s=s",
      },
      {
        id: "work-02",
        title: "秒哒应用美学黑客松大赛官网",
        subtitle: "外滩黑客松 × 秒哒 · 活动官网",
        year: "2026",
        category: "AI 产品",
        description:
          "为外滩黑客松 · AI Coding 大赛 × 秒哒 · 应用美学黑客松打造的活动官网：整合双赛程信息、报名与创作入口，帮助参赛者在最小阻力下进入秒哒平台开始创作。",
        image: workImages.w2,
        tags: ["活动官网", "Vibe Coding", "Supabase"],
        link: "https://app-cdcugxfs7bwh.appmiaoda.com",
      },
      {
        id: "work-03",
        title: "置身X内｜职场生存模拟器游戏",
        subtitle: "七天轮回 · 黑色幽默",
        year: "2026",
        category: "互动叙事",
        description:
          "移动端优先的职场变量生存模拟器：七天轮回推进主线，五项变量互相牵制，拟真手机界面（X信、X办、绩效环）与四种职场小游戏，导向崩溃、离开或成为系统一部分三种结局。",
        image: workImages.w3,
        tags: ["互动叙事", "H5 游戏", "黑色幽默"],
        link: "https://app-dq92f2890ni9.appmiaoda.com",
      },
      {
        id: "work-04",
        title: "星途｜爱豆人生模拟器",
        subtitle: "30 天公开考核 · 艺人手机人生",
        year: "2026",
        category: "养成模拟",
        description:
          "竖屏 H5 偶像人生模拟器：以新人艺人视角在拟真手机里处理通告、粉丝、舆论与健康，完成 NOVA STUDIO 新星计划 30 天考核，走向出道 Showcase 与首月结算。",
        image: workImages.w4,
        tags: ["偶像养成", "拟真手机", "H5"],
        link: "https://app-dq9014fsem81.appmiaoda.com",
      },
      {
        id: "work-05",
        title: "海王套路识别模拟器",
        subtitle: "校园慎用版 · 反套路训练",
        year: "2026",
        category: "教育模拟",
        description:
          "面向大学新生的关系安全训练 App：反套路关卡地图、7 个 AI 对话对象、回复生成器与清醒卡，帮助识别暧昧拉扯、画饼与情绪勒索，练习设边界与自我保护（不提供 PUA 教学）。",
        image: workImages.w5,
        tags: ["反套路", "对话模拟", "边界训练"],
        link: "https://app-dq922ch2vx8h.appmiaoda.com",
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
      tagline: "How we arrive at the future",
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
          "Smart conference social app for business and media attendees — AI meeting notes, digital business cards, networking discovery, and messaging for large-scale events.",
        image: workImages.w1,
        tags: ["AI Notes", "Digital Cards", "Networking"],
        link: "https://www.miaoda.cn/apps/app-asjt8zmphq81?s=s",
      },
      {
        id: "work-02",
        title: "MIAODA AESTHETICS HACKATHON",
        subtitle: "Official Event Website",
        year: "2026",
        category: "AI PRODUCT",
        description:
          "Official site for the Bund Hackathon × MiaoDa Aesthetics Hackathon — dual-track info, registration, and a low-friction path into the MiaoDa creation platform.",
        image: workImages.w2,
        tags: ["Event Site", "Vibe Coding", "Supabase"],
        link: "https://app-cdcugxfs7bwh.appmiaoda.com",
      },
      {
        id: "work-03",
        title: "INSIDE X",
        subtitle: "Workplace Survival Simulator",
        year: "2026",
        category: "INTERACTIVE FICTION",
        description:
          "Mobile-first seven-day workplace survival sim with five interlocking variables, a faux phone UI, mini-games, and three endings — burnout, escape, or becoming the system.",
        image: workImages.w3,
        tags: ["Narrative", "H5 Game", "Dark Humor"],
        link: "https://app-dq92f2890ni9.appmiaoda.com",
      },
      {
        id: "work-04",
        title: "STAR PATH · IDOL LIFE SIM",
        subtitle: "30-Day Public Assessment",
        year: "2026",
        category: "LIFE SIM",
        description:
          "Portrait H5 idol life simulator inside a realistic artist phone — schedules, fans, PR, health, and relationships through a 30-day NOVA STUDIO rookie assessment.",
        image: workImages.w4,
        tags: ["Idol Sim", "Phone UI", "H5"],
        link: "https://app-dq9014fsem81.appmiaoda.com",
      },
      {
        id: "work-05",
        title: "PLAYER DETECTOR",
        subtitle: "Campus Edition · Anti-Manipulation Training",
        year: "2026",
        category: "EDUCATION",
        description:
          "Relationship safety trainer for college freshmen — anti-manipulation levels, AI chat personas, reply generator, and clarity cards to practice boundaries (not PUA tactics).",
        image: workImages.w5,
        tags: ["Anti-Manipulation", "Chat Sim", "Boundaries"],
        link: "https://app-dq922ch2vx8h.appmiaoda.com",
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
    ],
  },
};
