import type { Metadata } from "next";
import { JetBrains_Mono, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "个人作品集 · Soviet Space Portfolio",
  description:
    "实习与创作成果展示 — 苏联太空时代美学个人网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${oswald.variable} ${jetbrains.variable}`} lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
