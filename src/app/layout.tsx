import {
  shellContentStyle,
  siteFooterStyle,
  siteHeaderStyle,
} from "@/app/_styles/shellStyles";
import { StarFragmentIcon } from "@/components/slots/SlotIcons";
import { StarCanvas } from "@/components/slots/StarCanvas";
import { css } from "@/styled/css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "별모아 — 매일의 운세로 별 조각 수집",
  description:
    "아침·점심·저녁 운세를 확인하고 별 조각을 모아 우주를 성장시키세요. 30일 사이클.",
};

export default function Layout(props: LayoutProps<"/">) {
  const { children } = props;

  return (
    <html lang="ko">
      <body>
        <StarCanvas />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <header className={siteHeaderStyle}>
            <StarFragmentIcon color="#FFD166" size={18} />
            <span
              className={css({
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.9rem",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#EBF0FF",
              })}
            >
              별모아
            </span>
          </header>

          <div className={shellContentStyle}>
            {children}
            <footer className={siteFooterStyle}>
              별모아 — 매일의 운세와 우주 성장 · 30일 사이클 &copy; 2026
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
