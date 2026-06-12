import { css, cva } from "@/styled/css";

export const headerStyle = css({
  position: "relative",
  marginBottom: "1.25rem",
  paddingRight: "3rem",
});

export const popupTitle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  minWidth: 0,
});

export const closeButtonStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  flexShrink: "0",
  width: "2.25rem",
  height: "2.25rem",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "fg.muted",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 200ms",
  fontSize: "md",
  lineHeight: "1",
  _hover: {
    background: "rgba(255,255,255,0.12)",
    color: "fg",
    borderColor: "rgba(255,255,255,0.2)",
  },
});

export const callout = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem 1.125rem",
    borderRadius: "md",
    border: "1px solid",
    marginBottom: "1.25rem",
  },
});

export const calloutTitle = css({
  fontSize: "sm",
  fontWeight: "700",
  marginBottom: "0.25rem",
});

export const stepsWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1.375rem",
});

export const stepRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  fontSize: "sm",
});

export const stepNumber = cva({
  base: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "50%",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "sm",
    fontWeight: "700",
    flexShrink: 0,
  },
});

export const buttonWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

export const extraNotice = css({
  display: "block",
  marginBottom: "2rem",
});
