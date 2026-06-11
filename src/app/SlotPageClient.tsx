"use client";

import { pageSectionsStyle } from "@/app/_styles/shellStyles";
import { SlotGrid } from "@/components/slots/SlotGrid";
import { StarFragmentIcon } from "@/components/slots/SlotIcons";
import { css } from "@/styled/css";
import Link from "next/link";

type Props = {
  testParam?: string;
};

export function SlotPageClient(props: Props) {
  const { testParam } = props;
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className={pageSectionsStyle}>
      <header
        className={css({
          textAlign: "center",
          animation: "slideUp 0.7s ease",
          width: "100%",
        })}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "4px 14px",
            borderRadius: "9999px",
            background: "rgba(255,209,102,0.07)",
            border: "1px solid rgba(255,209,102,0.18)",
            marginBottom: "22px",
          }}
        >
          <StarFragmentIcon color="#FFD166" size={14} />
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: "700",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FFD166",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            Daily Fortune
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontWeight: "900",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #FFD166 0%, #C589E8 50%, #7B8DE0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          >
            별모아
          </span>
        </h1>

        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
            color: "#3A4870",
            letterSpacing: "0.25em",
            marginBottom: "18px",
          }}
        >
          BYULMOA
        </div>

        <p
          className={css({
            fontSize: "0.88rem",
            color: "var(--colors-brand-textMuted)",
            lineHeight: "1.8",
            maxWidth: "360px",
            margin: "0 auto",
          })}
        >
          매일 아침·점심·저녁 운세를 확인하고
          <br />별 조각을 모아 우주를 성장시켜요
        </p>
      </header>

      <SlotGrid testParam={testParam} />

      {isDev ? (
        <div
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "16px",
            background: "rgba(12,18,48,0.5)",
            border: "1px solid rgba(21,30,72,0.6)",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              color: "#3A4870",
              marginBottom: "8px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            테스트 URL 파라미터
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { param: "morning", label: "아침 모드", color: "#F4A05A" },
              { param: "lunch", label: "점심 모드", color: "#50C8E8" },
              { param: "dinner", label: "저녁 모드", color: "#9B72CF" },
            ].map(({ param, color }) => (
              <a
                key={param}
                href={`?test=${param}`}
                style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 200ms",
                  border: "1px solid",
                  background:
                    testParam === param ? `${color}18` : "transparent",
                  borderColor:
                    testParam === param ? `${color}55` : "rgba(33,44,92,0.8)",
                  color: testParam === param ? color : "#3A4870",
                }}
              >
                ?test={param}
              </a>
            ))}
            {testParam ? (
              <Link
                href="/"
                style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  border: "1px solid rgba(33,44,92,0.6)",
                  color: "#3A4870",
                }}
              >
                초기화
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
