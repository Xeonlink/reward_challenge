import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "행운 도장 — 일일 보상",
  description: "아침, 점심, 저녁 슬롯으로 매일 보상을 수령하세요.",
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
