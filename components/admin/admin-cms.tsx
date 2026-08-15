"use client";

import { useCallback, useEffect, useState } from "react";
import type { EditableContent } from "@/lib/content/cms-types";
import { getDefaultEditableContent } from "@/lib/content/editable-defaults";
import type { LocalizedWorkItem } from "@/lib/content/types";

type TabId = "global" | "hero" | "about" | "works" | "credits";

const TABS: { id: TabId; label: string }[] = [
  { id: "global", label: "全局" },
  { id: "hero", label: "首页" },
  { id: "about", label: "简介" },
  { id: "works", label: "作品" },
  { id: "credits", label: "致谢" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mono-label mb-1 block text-soviet-muted">{children}</label>
  );
}

function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
) {
  const { label, className, ...rest } = props;
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <input
        className={`w-full border border-white/20 bg-black/40 px-3 py-2 font-mono text-sm text-soviet-cream outline-none focus:border-soviet-red ${className ?? ""}`}
        {...rest}
      />
    </div>
  );
}

function TextTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
) {
  const { label, className, ...rest } = props;
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        className={`w-full border border-white/20 bg-black/40 px-3 py-2 font-mono text-sm text-soviet-cream outline-none focus:border-soviet-red ${className ?? ""}`}
        {...rest}
      />
    </div>
  );
}

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) {
    throw new Error("Upload failed");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap items-start gap-3">
        <input
          className="min-w-0 flex-1 border border-white/20 bg-black/40 px-3 py-2 font-mono text-sm text-soviet-cream outline-none focus:border-soviet-red"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
        <label className="cursor-pointer border border-soviet-red px-3 py-2 font-mono text-xs uppercase tracking-widest text-soviet-red hover:bg-soviet-red hover:text-soviet-cream">
          {uploading ? "上传中…" : "上传"}
          <input
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              setUploading(true);
              try {
                const url = await uploadImage(file);
                onChange(url);
              } catch {
                alert("上传失败");
              } finally {
                setUploading(false);
              }
            }}
            type="file"
          />
        </label>
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="mt-2 h-24 w-auto max-w-full border border-white/10 object-cover"
          src={value}
        />
      ) : null}
    </div>
  );
}

function emptyWork(): LocalizedWorkItem {
  return {
    id: `work-${Date.now()}`,
    title: "新作品",
    subtitle: "",
    year: String(new Date().getFullYear()),
    category: "",
    description: "",
    image: "",
    tags: [],
    link: "",
  };
}

export function AdminCms() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<TabId>("global");
  const [draft, setDraft] = useState<EditableContent>(getDefaultEditableContent);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [expandedWork, setExpandedWork] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await res.json()) as { ok: boolean };
      setAuthed(Boolean(data.ok));
      return data.ok;
    } catch {
      setAuthed(false);
      return false;
    }
  }, []);

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 401) {
        setAuthed(false);
      }
      return;
    }
    const data = (await res.json()) as EditableContent;
    setDraft(data);
    if (data.works[0]) {
      setExpandedWork(data.works[0].id);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      const ok = await checkSession();
      if (ok) {
        await loadContent();
      }
    })();
  }, [checkSession, loadContent]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("密码错误");
      return;
    }
    setPassword("");
    setAuthed(true);
    await loadContent();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setDraft(getDefaultEditableContent());
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        if (res.status === 401) {
          setAuthed(false);
        }
        setStatus("保存失败");
        return;
      }
      setStatus("已保存");
    } catch {
      setStatus("保存失败");
    } finally {
      setSaving(false);
    }
  }

  function updateWork(id: string, patch: Partial<LocalizedWorkItem>) {
    setDraft((prev) => ({
      ...prev,
      works: prev.works.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }));
  }

  function moveWork(index: number, dir: -1 | 1) {
    setDraft((prev) => {
      const next = [...prev.works];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, works: next };
    });
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soviet-black text-soviet-muted">
        <p className="mono-label">CHECKING SESSION…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soviet-black px-4">
        <form
          className="w-full max-w-sm border border-white/15 bg-soviet-gray/80 p-8"
          onSubmit={handleLogin}
        >
          <p className="mono-label mb-2 text-soviet-red">ADMIN ACCESS</p>
          <h1 className="display-text mb-6 text-2xl text-soviet-cream">登录</h1>
          <TextInput
            autoComplete="current-password"
            label="PASSWORD"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          {loginError ? (
            <p className="mb-3 font-mono text-sm text-soviet-red">{loginError}</p>
          ) : null}
          <button
            className="w-full bg-soviet-red px-4 py-3 font-mono text-xs uppercase tracking-widest text-soviet-cream hover:bg-soviet-red-dark"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soviet-black text-soviet-cream">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-soviet-black/95 px-4 py-3 backdrop-blur">
        <div>
          <p className="mono-label text-soviet-red">CMS</p>
          <h1 className="display-text text-xl">内容编辑</h1>
        </div>
        <div className="flex items-center gap-2">
          {status ? (
            <span className="font-mono text-xs text-soviet-gold">{status}</span>
          ) : null}
          <button
            className="border border-soviet-red bg-soviet-red px-4 py-2 font-mono text-xs uppercase tracking-widest text-soviet-cream disabled:opacity-50"
            disabled={saving}
            onClick={() => void handleSave()}
            type="button"
          >
            {saving ? "保存中…" : "保存"}
          </button>
          <button
            className="border border-white/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-soviet-muted hover:text-soviet-cream"
            onClick={() => void handleLogout()}
            type="button"
          >
            退出
          </button>
          <a
            className="border border-white/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-soviet-muted hover:text-soviet-cream"
            href="/"
          >
            站点
          </a>
        </div>
      </header>

      <nav className="flex flex-wrap gap-1 border-b border-white/10 px-4 py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`px-3 py-2 font-mono text-xs uppercase tracking-widest ${
              tab === t.id
                ? "bg-soviet-red text-soviet-cream"
                : "text-soviet-muted hover:text-soviet-cream"
            }`}
            onClick={() => setTab(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {tab === "global" ? (
          <section>
            <TextInput
              label="EMAIL"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  config: { ...p.config, email: e.target.value },
                }))
              }
              value={draft.config.email}
            />
            <TextInput
              label="AUTHOR"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  config: { ...p.config, author: e.target.value },
                }))
              }
              value={draft.config.author}
            />
            <TextInput
              label="GITHUB URL"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  config: { ...p.config, githubUrl: e.target.value },
                }))
              }
              value={draft.config.githubUrl}
            />
            <ImageField
              label="PORTRAIT"
              onChange={(url) =>
                setDraft((p) => ({
                  ...p,
                  config: { ...p.config, portrait: url },
                }))
              }
              value={draft.config.portrait}
            />
          </section>
        ) : null}

        {tab === "hero" ? (
          <section>
            <TextInput
              label="TAGLINE"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  hero: { ...p.hero, tagline: e.target.value },
                }))
              }
              value={draft.hero.tagline}
            />
            <TextInput
              label="HEADLINE"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  hero: { ...p.hero, headline: e.target.value },
                }))
              }
              value={draft.hero.headline}
            />
          </section>
        ) : null}

        {tab === "about" ? (
          <section>
            <TextInput
              label="NAME"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  about: { ...p.about, name: e.target.value },
                }))
              }
              value={draft.about.name}
            />
            <TextInput
              label="ROLE"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  about: { ...p.about, role: e.target.value },
                }))
              }
              value={draft.about.role}
            />
            <TextTextarea
              label="BIO"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  about: { ...p.about, bio: e.target.value },
                }))
              }
              rows={5}
              value={draft.about.bio}
            />
            <TextInput
              label="SKILLS（逗号分隔）"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  about: {
                    ...p.about,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                }))
              }
              value={draft.about.skills.join(", ")}
            />

            <div className="mb-6 border border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="mono-label text-soviet-red">STATS</p>
                <button
                  className="font-mono text-xs text-soviet-gold"
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      about: {
                        ...p.about,
                        stats: [...p.about.stats, { label: "", value: "" }],
                      },
                    }))
                  }
                  type="button"
                >
                  + 添加
                </button>
              </div>
              {draft.about.stats.map((stat, i) => (
                <div className="mb-2 flex gap-2" key={i}>
                  <input
                    className="w-1/3 border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                    onChange={(e) => {
                      const stats = [...draft.about.stats];
                      stats[i] = { ...stats[i], label: e.target.value };
                      setDraft((p) => ({
                        ...p,
                        about: { ...p.about, stats },
                      }));
                    }}
                    placeholder="label"
                    value={stat.label}
                  />
                  <input
                    className="flex-1 border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                    onChange={(e) => {
                      const stats = [...draft.about.stats];
                      stats[i] = { ...stats[i], value: e.target.value };
                      setDraft((p) => ({
                        ...p,
                        about: { ...p.about, stats },
                      }));
                    }}
                    placeholder="value"
                    value={stat.value}
                  />
                  <button
                    className="px-2 font-mono text-xs text-soviet-red"
                    onClick={() =>
                      setDraft((p) => ({
                        ...p,
                        about: {
                          ...p.about,
                          stats: p.about.stats.filter((_, j) => j !== i),
                        },
                      }))
                    }
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="border border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="mono-label text-soviet-red">TIMELINE</p>
                <button
                  className="font-mono text-xs text-soviet-gold"
                  onClick={() =>
                    setDraft((p) => ({
                      ...p,
                      about: {
                        ...p.about,
                        timeline: [
                          ...p.about.timeline,
                          { year: "", title: "", description: "", location: "" },
                        ],
                      },
                    }))
                  }
                  type="button"
                >
                  + 添加
                </button>
              </div>
              {draft.about.timeline.map((ev, i) => (
                <div className="mb-4 border-b border-white/10 pb-4" key={i}>
                  <div className="mb-2 flex gap-2">
                    <input
                      className="w-24 border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                      onChange={(e) => {
                        const timeline = [...draft.about.timeline];
                        timeline[i] = { ...timeline[i], year: e.target.value };
                        setDraft((p) => ({
                          ...p,
                          about: { ...p.about, timeline },
                        }));
                      }}
                      placeholder="year"
                      value={ev.year}
                    />
                    <input
                      className="flex-1 border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                      onChange={(e) => {
                        const timeline = [...draft.about.timeline];
                        timeline[i] = { ...timeline[i], title: e.target.value };
                        setDraft((p) => ({
                          ...p,
                          about: { ...p.about, timeline },
                        }));
                      }}
                      placeholder="title"
                      value={ev.title}
                    />
                    <button
                      className="px-2 font-mono text-xs text-soviet-red"
                      onClick={() =>
                        setDraft((p) => ({
                          ...p,
                          about: {
                            ...p.about,
                            timeline: p.about.timeline.filter((_, j) => j !== i),
                          },
                        }))
                      }
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                  <input
                    className="mb-2 w-full border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                    onChange={(e) => {
                      const timeline = [...draft.about.timeline];
                      timeline[i] = { ...timeline[i], location: e.target.value };
                      setDraft((p) => ({
                        ...p,
                        about: { ...p.about, timeline },
                      }));
                    }}
                    placeholder="location"
                    value={ev.location ?? ""}
                  />
                  <textarea
                    className="w-full border border-white/20 bg-black/40 px-2 py-1 font-mono text-sm"
                    onChange={(e) => {
                      const timeline = [...draft.about.timeline];
                      timeline[i] = {
                        ...timeline[i],
                        description: e.target.value,
                      };
                      setDraft((p) => ({
                        ...p,
                        about: { ...p.about, timeline },
                      }));
                    }}
                    placeholder="description"
                    rows={2}
                    value={ev.description}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "works" ? (
          <section>
            <div className="mb-4 flex justify-end">
              <button
                className="border border-soviet-gold px-3 py-2 font-mono text-xs uppercase tracking-widest text-soviet-gold"
                onClick={() => {
                  const work = emptyWork();
                  setDraft((p) => ({ ...p, works: [...p.works, work] }));
                  setExpandedWork(work.id);
                }}
                type="button"
              >
                + 添加作品
              </button>
            </div>
            {draft.works.map((work, index) => {
              const open = expandedWork === work.id;
              return (
                <div
                  className="mb-3 border border-white/15 bg-soviet-gray/40"
                  key={work.id}
                >
                  <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2">
                    <button
                      className="flex-1 text-left font-mono text-sm"
                      onClick={() =>
                        setExpandedWork(open ? null : work.id)
                      }
                      type="button"
                    >
                      {work.title || work.id}
                      <span className="ml-2 text-soviet-muted">
                        {work.year}
                      </span>
                    </button>
                    <button
                      className="px-2 font-mono text-xs text-soviet-muted"
                      disabled={index === 0}
                      onClick={() => moveWork(index, -1)}
                      type="button"
                    >
                      ↑
                    </button>
                    <button
                      className="px-2 font-mono text-xs text-soviet-muted"
                      disabled={index === draft.works.length - 1}
                      onClick={() => moveWork(index, 1)}
                      type="button"
                    >
                      ↓
                    </button>
                    <button
                      className="px-2 font-mono text-xs text-soviet-red"
                      onClick={() =>
                        setDraft((p) => ({
                          ...p,
                          works: p.works.filter((w) => w.id !== work.id),
                        }))
                      }
                      type="button"
                    >
                      删除
                    </button>
                  </div>
                  {open ? (
                    <div className="p-4">
                      <TextInput
                        label="TITLE"
                        onChange={(e) =>
                          updateWork(work.id, { title: e.target.value })
                        }
                        value={work.title}
                      />
                      <TextInput
                        label="SUBTITLE"
                        onChange={(e) =>
                          updateWork(work.id, { subtitle: e.target.value })
                        }
                        value={work.subtitle}
                      />
                      <div className="grid gap-2 sm:grid-cols-2">
                        <TextInput
                          label="YEAR"
                          onChange={(e) =>
                            updateWork(work.id, { year: e.target.value })
                          }
                          value={work.year}
                        />
                        <TextInput
                          label="CATEGORY"
                          onChange={(e) =>
                            updateWork(work.id, { category: e.target.value })
                          }
                          value={work.category}
                        />
                      </div>
                      <TextTextarea
                        label="DESCRIPTION"
                        onChange={(e) =>
                          updateWork(work.id, { description: e.target.value })
                        }
                        rows={3}
                        value={work.description}
                      />
                      <ImageField
                        label="IMAGE"
                        onChange={(url) => updateWork(work.id, { image: url })}
                        value={work.image}
                      />
                      <TextInput
                        label="TAGS（逗号分隔）"
                        onChange={(e) =>
                          updateWork(work.id, {
                            tags: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        value={work.tags.join(", ")}
                      />
                      <TextInput
                        label="项目网页链接（填写后点击作品直接跳转）"
                        onChange={(e) =>
                          updateWork(work.id, { link: e.target.value })
                        }
                        placeholder="https://..."
                        value={work.link ?? ""}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </section>
        ) : null}

        {tab === "credits" ? (
          <section>
            <TextInput
              label="TITLE"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  credits: { ...p.credits, title: e.target.value },
                }))
              }
              value={draft.credits.title}
            />
            <TextTextarea
              label="LINES（每行一条）"
              onChange={(e) =>
                setDraft((p) => ({
                  ...p,
                  credits: {
                    ...p.credits,
                    lines: e.target.value.split("\n"),
                  },
                }))
              }
              rows={8}
              value={draft.credits.lines.join("\n")}
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}
