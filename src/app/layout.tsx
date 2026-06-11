import { StarFragmentIcon } from "@/components/slots/SlotIcons";
import { StarCanvas } from "@/components/slots/StarCanvas";
import { Text } from "@/components/ui/Text";
import { css, cx } from "@/styled/css";
import type { Metadata } from "next";
import {
  DM_Sans,
  JetBrains_Mono,
  Noto_Sans_KR,
  Orbitron,
} from "next/font/google";
import "./globals.css";

const display = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const bodyKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body-kr",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteHeaderStyle = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  height: "4rem",
  paddingTop: "env(safe-area-inset-top, 0px)",
  flexShrink: 0,
});

const siteFooterStyle = css({
  fontSize: "0.625rem",
  color: "footer",
  textAlign: "center",
  letterSpacing: "0.06em",
  marginTop: "2.875rem",
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
});

export const metadata: Metadata = {
  title: "별모아 — 매일의 운세로 별 조각 수집",
  description:
    "아침·점심·저녁 운세를 확인하고 별 조각을 모아 우주를 성장시키세요. 30일 사이클.",
};

export default function Layout(props: LayoutProps<"/">) {
  const { children } = props;

  return (
    <html
      className={cx(
        "cosmic",
        display.variable,
        body.variable,
        bodyKr.variable,
        mono.variable,
      )}
      lang="ko"
    >
      <body>
        {/* starlight background. It assume bg is dark. */}
        <StarCanvas />

        <header className={siteHeaderStyle}>
          <StarFragmentIcon color="var(--colors-accent)" size={18} />
          <Text variant="brand">별모아</Text>
        </header>

        {children}

        <footer className={siteFooterStyle}>
          별모아 — 매일의 운세와 우주 성장 · 30일 사이클 &copy; 2026
        </footer>
      </body>
    </html>
  );
}
