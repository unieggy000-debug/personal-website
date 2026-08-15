import type { EditableContent } from "./cms-types";
import { siteConfig, siteContent } from "./site-content";
import type { LocaleContent, SiteConfig, SiteContentMap } from "./types";

export function getDefaultEditableContent(): EditableContent {
  const zh = siteContent.zh;
  return {
    config: {
      email: siteConfig.email,
      author: siteConfig.author,
      portrait: siteConfig.portrait,
      githubUrl: siteConfig.githubUrl,
    },
    hero: {
      tagline: zh.hero.tagline,
      headline: zh.hero.headline,
    },
    about: {
      name: zh.about.name,
      role: zh.about.role,
      bio: zh.about.bio,
      stats: zh.about.stats.map((s) => ({ ...s })),
      timeline: zh.about.timeline.map((t) => ({ ...t })),
      skills: [...zh.about.skills],
    },
    works: zh.works.map((w) => ({
      ...w,
      tags: [...w.tags],
      collageImages: w.collageImages ? [...w.collageImages] : undefined,
    })),
    credits: {
      title: zh.credits.title,
      lines: [...zh.credits.lines],
    },
  };
}

/** Merge CMS edits into full site config + bilingual content. */
export function applyEditableContent(editable: EditableContent): {
  config: SiteConfig;
  content: SiteContentMap;
} {
  const zhBase = siteContent.zh;
  const enBase = siteContent.en;

  const config: SiteConfig = {
    ...siteConfig,
    email: editable.config.email,
    author: editable.config.author,
    portrait: editable.config.portrait,
    githubUrl: editable.config.githubUrl,
  };

  const zh: LocaleContent = {
    ...zhBase,
    hero: {
      ...zhBase.hero,
      tagline: editable.hero.tagline,
      headline: editable.hero.headline,
    },
    about: {
      ...zhBase.about,
      name: editable.about.name,
      role: editable.about.role,
      bio: editable.about.bio,
      stats: editable.about.stats,
      timeline: editable.about.timeline,
      skills: editable.about.skills,
    },
    works: editable.works,
    credits: {
      ...zhBase.credits,
      title: editable.credits.title,
      lines: editable.credits.lines,
    },
  };

  const enWorks = editable.works.map((work) => {
    const prev = enBase.works.find((w) => w.id === work.id);
    if (prev) {
      return {
        ...prev,
        // Keep EN copy (title/subtitle/description); sync media + link from CMS.
        image: work.image,
        collageImages: work.collageImages,
        year: work.year,
        link: work.link,
      };
    }
    return { ...work };
  });

  const en: LocaleContent = {
    ...enBase,
    hero: {
      ...enBase.hero,
      // Shared poster headline; keep EN tagline from base when different.
      headline: editable.hero.headline,
    },
    about: {
      ...enBase.about,
      // Do NOT overwrite EN name/role/bio/skills with ZH CMS edits.
    },
    works: enWorks,
    credits: {
      ...enBase.credits,
    },
  };

  return { config, content: { zh, en } };
}

export type ResolvedSitePayload = {
  config: SiteConfig;
  content: SiteContentMap;
  editable: EditableContent;
};

export function resolveSitePayload(
  editable: EditableContent | null
): ResolvedSitePayload {
  const source = editable ?? getDefaultEditableContent();
  const applied = applyEditableContent(source);
  return { ...applied, editable: source };
}
