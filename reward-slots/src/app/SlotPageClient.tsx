"use client";

import { useSearchParams } from "next/navigation";
import { css } from "../../styled-system/css";
import { SlotGrid } from "@/components/slots/SlotGrid";

export function SlotPageClient() {
  const searchParams = useSearchParams();
  const testParam = searchParams.get("test");

  return (
    <main
      className={css({
        minHeight: "100vh",
        background: "#0A0A0F",
        position: "relative",
        overflow: "hidden",
      })}
    >
      {/* Background effects */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(123,94,167,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,212,170,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid lines bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className={css({
          position: "relative",
          zIndex: 1,
          maxWidth: "720px",
          margin: "0 auto",
          padding: "40px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
        })}
      >
        {/* Header */}
        <header className={css({ textAlign: "center", animation: "slideUp 0.6s ease" })}>
          <div
            className={css({
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 16px",
              borderRadius: "var(--radii-full)",
              background: "rgba(255,215,0,0.08)",
              border: "1px solid rgba(255,215,0,0.2)",
              marginBottom: "20px",
            })}
          >
            <span style={{ fontSize: "0.8rem" }}>🏅</span>
            <span
              className={css({
                fontSize: "0.7rem",
                fontWeight: "700",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#FFD700",
                fontFamily: "var(--fonts-display)",
              })}
            >
              Daily Reward
            </span>
          </div>

          <h1
            className={css({
              fontFamily: "var(--fonts-display)",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: "900",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
              marginBottom: "14px",
            })}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FFD700 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              행운 도장
            </span>
          </h1>

          <p
            className={css({
              fontSize: "0.9rem",
              color: "var(--colors-brand-textMuted)",
              lineHeight: "1.7",
              maxWidth: "380px",
              margin: "0 auto",
            })}
          >
            아침, 점심, 저녁 슬롯을 모두 수령하고
            <br />
            오늘의 보너스 보상까지 획득하세요!
          </p>
        </header>

        {/* Slot Grid */}
        <SlotGrid testParam={testParam} />

        {/* Test mode helper */}
        <div
          className={css({
            width: "100%",
            padding: "16px 20px",
            borderRadius: "var(--radii-lg)",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          })}
        >
          <div className={css({ fontSize: "0.7rem", color: "var(--colors-brand-textMuted)", marginBottom: "8px", fontWeight: "600", letterSpacing: "0.05em" })}>
            🧪 테스트 URL 파라미터
          </div>
          <div className={css({ display: "flex", gap: "8px", flexWrap: "wrap" })}>
            {[
              { param: "morning", label: "아침 모드", color: "#FF6B35" },
              { param: "lunch", label: "점심 모드", color: "#00D4AA" },
              { param: "dinner", label: "저녁 모드", color: "#7B5EA7" },
            ].map(({ param, label, color }) => (
              <a
                key={param}
                href={`?test=${param}`}
                className={css({
                  padding: "4px 12px",
                  borderRadius: "var(--radii-full)",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 200ms",
                  border: "1px solid",
                })}
                style={{
                  background: testParam === param ? `${color}20` : "transparent",
                  borderColor: testParam === param ? `${color}60` : "rgba(255,255,255,0.1)",
                  color: testParam === param ? color : "rgba(255,255,255,0.4)",
                }}
              >
                ?test={param}
              </a>
            ))}
            {testParam && (
              <a
                href="/"
                className={css({
                  padding: "4px 12px",
                  borderRadius: "var(--radii-full)",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.3)",
                })}
              >
                초기화
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className={css({ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", textAlign: "center" })}>
          행운 도장 — 일일 보상 시스템 &copy; 2026
        </footer>
      </div>
    </main>
  );
}
