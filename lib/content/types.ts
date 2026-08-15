export type Locale = "zh" | "en";

export type LocalizedNavItem = {
  id: string;
  label: string;
};

export type LocalizedWorkItem = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  image: string;
  collageImages?: string[];
  tags: string[];
  link?: string;
};

export type LocalizedTimelineEvent = {
  year: string;
  title: string;
  description: string;
  location?: string;
};

export type LocalizedStat = {
  label: string;
  value: string;
};

export type LocaleContent = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    portfolio: string;
    scroll: string;
    dragPosters: string;
    posterLabel: string;
    personalFile: string;
    skills: string;
    missionLog: string;
    missionArchive: string;
    selectedWorks: string;
    worksIntro: string;
    clickToOpen: string;
    moreMissions: string;
    addWorksHint: string;
    scrollArchive: string;
    viewProject: string;
    closeModal: string;
    loading: string;
    copied: string;
    copyEmail: string;
    copyFailed: string;
    terminalComplete: string;
    terminalExit: string;
  };
  preloader: string[];
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    period: string;
  };
  about: {
    fileNumber: string;
    name: string;
    role: string;
    bio: string;
    stats: LocalizedStat[];
    timeline: LocalizedTimelineEvent[];
    skills: string[];
  };
  works: LocalizedWorkItem[];
  credits: {
    title: string;
    lines: string[];
    footer: string;
  };
  navigation: LocalizedNavItem[];
};

export type SiteConfig = {
  email: string;
  author: string;
  portrait: string;
  githubUrl: string;
  collageImages: string[];
};

export type SiteContentMap = Record<Locale, LocaleContent>;
