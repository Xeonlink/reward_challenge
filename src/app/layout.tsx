import { StarCanvas } from "@/components/StarCanvas";
import { DevTools } from "@/components/dev-tools";
import { ModalContainer } from "@/components/modal";
import { StarFragmentIcon } from "@/components/slots/SlotIcons";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
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
      <body className={css({ minHeight: "screen" })}>
        {/* starlight background. It assume bg is dark. */}
        <StarCanvas />

        <div
          className={css({
            marginX: "auto",
            maxWidth: "lg",
            paddingX: { base: "4", md: "6" },
          })}
        >
          <header
            className={css({
              animation: "slideUp 0.7s ease",
              textAlign: "center",
              marginTop: "8",
            })}
          >
            <Badge label="Daily Fortune" />

            <div
              className={css({
                display: "flex",
                width: "full",
                justifyContent: "center",
                alignItems: "center",
                gap: "2",
              })}
            >
              <StarFragmentIcon color="var(--colors-accent)" size={32} />
              <Heading>별모아</Heading>
              <StarFragmentIcon color="var(--colors-accent)" size={32} />
            </div>

            <Text variant="subtitle">BYULMOA</Text>

            <p
              className={css({
                fontSize: "sm",
                color: "fg.muted",
              })}
            >
              매일 &ldquo;아침&rdquo; · &ldquo;점심&rdquo; · &ldquo;저녁&rdquo;
              운세를 확인하고 <br />별 조각을 모아 우주를 성장시켜요!
            </p>
          </header>

          <main>{children}</main>

          <footer
            className={css({
              textAlign: "center",
              color: "fg.muted",
              marginY: "8",
              fontSize: "sm",
            })}
          >
            별모아 — 매일의 운세와 우주 성장 · 30일 사이클 &copy; 2026
          </footer>
        </div>

        <ModalContainer />
        <DevTools />
      </body>
    </html>
  );
}
