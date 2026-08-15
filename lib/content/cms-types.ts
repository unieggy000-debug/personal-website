import type {
  LocalizedStat,
  LocalizedTimelineEvent,
  LocalizedWorkItem,
  SiteConfig,
} from "./types";

/** Editable CMS payload — primary locale is zh; en mirrors key fields on save. */
export type EditableHero = {
  tagline: string;
  headline: string;
};

export type EditableAbout = {
  name: string;
  role: string;
  bio: string;
  stats: LocalizedStat[];
  timeline: LocalizedTimelineEvent[];
  skills: string[];
};

export type EditableCredits = {
  title: string;
  lines: string[];
};

export type EditableSiteConfig = Pick<
  SiteConfig,
  "email" | "author" | "portrait" | "githubUrl"
>;

export type EditableContent = {
  config: EditableSiteConfig;
  hero: EditableHero;
  about: EditableAbout;
  works: LocalizedWorkItem[];
  credits: EditableCredits;
};
