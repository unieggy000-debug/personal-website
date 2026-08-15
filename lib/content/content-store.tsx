"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { EditableContent } from "@/lib/content/cms-types";
import {
  applyEditableContent,
  getDefaultEditableContent,
} from "@/lib/content/editable-defaults";
import {
  siteConfig as staticConfig,
  siteContent as staticContent,
  type Locale,
  type LocaleContent,
  type SiteConfig,
} from "@/lib/content/site-content";

type ContentContextValue = {
  locale: Locale;
  content: LocaleContent;
  config: SiteConfig;
  editable: EditableContent;
  ready: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  refreshContent: () => Promise<void>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "zh";
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "zh" || stored === "en") {
    return stored;
  }
  const lang = navigator.language.toLowerCase();
  return lang.startsWith("zh") ? "zh" : "en";
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [mounted, setMounted] = useState(false);
  const [editable, setEditable] = useState<EditableContent>(() =>
    getDefaultEditableContent()
  );
  const [ready, setReady] = useState(false);

  const refreshContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as EditableContent;
      if (data?.config && data?.hero && data?.about && data?.works && data?.credits) {
        setEditable(data);
      }
    } catch {
      // Keep defaults on network failure
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
    void refreshContent();
  }, [refreshContent]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "zh" ? "en" : "zh");
  }, [locale, setLocale]);

  const applied = useMemo(() => applyEditableContent(editable), [editable]);
  const content = applied.content[locale] ?? staticContent[locale];
  const config = applied.config ?? staticConfig;

  useEffect(() => {
    if (!mounted) {
      return;
    }
    document.title = content.meta.title;
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [content.meta.title, locale, mounted]);

  const value = useMemo(
    () => ({
      locale,
      content,
      config,
      editable,
      ready,
      setLocale,
      toggleLocale,
      refreshContent,
    }),
    [
      locale,
      content,
      config,
      editable,
      ready,
      setLocale,
      toggleLocale,
      refreshContent,
    ]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}

/** Alias matching previous LocaleProvider API. */
export function useLocale() {
  return useContent();
}
