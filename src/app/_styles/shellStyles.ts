import { css } from "@/styled/css";

export const shellRootStyle = css({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const shellContentStyle = css({
  position: "relative",
  width: "100%",
  maxWidth: "520px",
  margin: "0 auto",
  padding: "0 16px 64px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const siteHeaderStyle = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  height: "56px",
  paddingTop: "env(safe-area-inset-top, 0px)",
  flexShrink: 0,
});

export const siteFooterStyle = css({
  fontSize: "0.65rem",
  color: "#1E2848",
  textAlign: "center",
  letterSpacing: "0.06em",
  marginTop: "40px",
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
});

/** SlotPageClient / loading skeleton 공통 섹션 래퍼 */
export const pageSectionsStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
  width: "100%",
  paddingTop: "20px",
});

export const pageHeroStyle = css({
  textAlign: "center",
  width: "100%",
});

export const heroZoneStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  width: "100%",
});

export const serviceGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
  width: "100%",
});

// ── Loading skeleton ──

export const skeletonPulseStyle = css({
  background: "rgba(33,44,92,0.45)",
  borderRadius: "8px",
  animation: "pulse 1.8s ease-in-out infinite",
});

export const heroSkeletonStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "14px",
  width: "100%",
});

export const heroBadgeSkeletonStyle = css({
  width: "140px",
  height: "26px",
  borderRadius: "9999px",
});

export const heroTitleSkeletonStyle = css({
  width: "160px",
  height: "42px",
  borderRadius: "10px",
});

export const heroSubtitleSkeletonStyle = css({
  width: "100px",
  height: "14px",
  borderRadius: "6px",
});

export const heroDescSkeletonStyle = css({
  width: "280px",
  maxWidth: "100%",
  height: "14px",
  borderRadius: "6px",
});

export const heroDescLine2SkeletonStyle = css({
  width: "220px",
  maxWidth: "90%",
  height: "14px",
  borderRadius: "6px",
});

export const orbSkeletonStyle = css({
  width: "280px",
  height: "280px",
  borderRadius: "50%",
  flexShrink: 0,
});

export const timeBadgeSkeletonStyle = css({
  width: "200px",
  height: "36px",
  borderRadius: "9999px",
});

export const cardSkeletonStyle = css({
  minHeight: "140px",
  borderRadius: "20px",
});

export const cardGridSkeletonStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px",
  width: "100%",
});

export const progressSkeletonStyle = css({
  width: "100%",
  maxWidth: "380px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const progressLabelSkeletonStyle = css({
  width: "100%",
  height: "14px",
  borderRadius: "6px",
});

export const progressBarSkeletonStyle = css({
  width: "100%",
  height: "5px",
  borderRadius: "9999px",
});
