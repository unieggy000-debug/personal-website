# Carol · 周原 — Personal Portfolio

苏联太空时代美学个人作品集，视觉风格参考 [Soviet Space longride](https://ussr-space.tilda.ws/en)。

**在线预览：** 部署后见仓库 About 或 Vercel 控制台中的 Production URL。

## 本地开发

```bash
git clone https://github.com/unieggy000-debug/personal-website.git
cd personal-website
pnpm install   # 或 npm install
pnpm dev       # http://localhost:3001
```

## 部署（Vercel，推荐）

1. 将本仓库推送到 GitHub：`unieggy000-debug/personal-website`
2. 打开 [vercel.com/new](https://vercel.com/new)，Import 该仓库
3. Framework Preset 选 **Next.js**，直接 Deploy
4. 如需后台 CMS 写入，在 Vercel 项目 Settings → Environment Variables 添加（可选）：
   - 生产环境需可写文件系统时，建议使用 Vercel Blob 或外部 CMS；当前 `/admin` 本地 JSON 写入在 Serverless 上仅适合只读部署

也可使用 CLI：

```bash
npx vercel login
npx vercel --prod
```

## 修改内容

文案集中在 `lib/content/site-content.ts`（中文 / 英文两套）。

| 配置 | 位置 |
|------|------|
| 邮箱 | `siteConfig.email` |
| 作品 | `works` 数组 |
| 简介 / 时间线 | `about` |
| 导航 | `navigation` |

后台：`/admin`（入口：页脚拼贴连点 5 次），默认密码见 `lib/admin/auth.ts`（部署前请修改）。

## 技术栈

- Next.js 16 · TypeScript · Tailwind CSS v4
- GSAP ScrollTrigger · Lenis 平滑滚动
- 长图视差背景 · 拼贴贴纸 · 自定义飞船光标

## 页面结构

| Section | ID | 说明 |
|---------|-----|------|
| 首页 | `#home` | 海报标题 + 中文副标题 |
| 简介 | `#about` | 档案卡、曲线时间线 |
| 作品 | `#works` | 横向 Pin 档案画廊 |
| 页脚 | `#site-footer` | 底部拼贴 |

## 快捷键

- `1` `2` `3` — 跳转首页 / 简介 / 作品
- `ESC` — 关闭作品详情弹窗

## 仓库

https://github.com/unieggy000-debug/personal-website
