# Personal Site — Soviet Space Portfolio

苏联太空时代美学个人作品集网站，视觉风格参考 [Soviet Space longride](https://ussr-space.tilda.ws/en)。

## 启动

```bash
cd C:\AAA\projects\personal-website
pnpm install   # 或 npm install
pnpm dev       # 运行在 http://localhost:3001
```

## 修改内容

所有文字集中在 `lib/content/site-content.ts`，分为 **中文 (zh)** 和 **英文 (en)** 两套。

### 邮箱

在 `siteConfig.email` 中修改你的邮箱地址。

### 语言切换

导航栏右侧 **中 / EN** 按钮切换语言，选择会保存到 localStorage。

## 技术栈

- Next.js 16 + TypeScript + Tailwind CSS v4
- GSAP ScrollTrigger（滚动动画、横向 Pin、文字揭示）
- Lenis（平滑滚动）
- 占位图片：Wikimedia Commons（公有领域苏联太空素材）

## 页面结构

| Section | ID | 功能 |
|---------|-----|------|
| 首页 | `#home` | 开屏终端、Glitch 标题、可拖拽拼贴 |
| 简介 | `#about` | 档案卡、时间线、技能标签 |
| 作品 | `#works` | 横向 Pin 画廊 + 网格 + Modal 详情 |
| 致谢 | `#credits` | 3D 透视字幕 + 终端 footer |

## 键盘快捷键

- `1` `2` `3` `4` — 跳转到四个 section
- `ESC` — 关闭作品详情 Modal
