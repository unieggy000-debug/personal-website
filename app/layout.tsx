import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Noto_Sans_SC,
  Noto_Serif_SC,
  Oswald,
} from "next/font/google";
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

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-serif-sc",
  weight: ["400", "600", "700"],
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sans-sc",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Carol · 周原",
  description: "周原的个人作品集 — AI 产品经理 / 跨学科创作者",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${oswald.variable} ${jetbrains.variable} ${notoSerif.variable} ${notoSans.variable}`}
      lang="zh-CN"
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
