import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "별모아 — 매일의 운세로 별 조각 수집",
  description: "아침·점심·저녁 운세를 확인하고 별 조각을 모아 우주를 성장시키세요. 30일 사이클.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
