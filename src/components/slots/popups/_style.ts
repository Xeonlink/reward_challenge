import { css, cva } from "@/styled/css";

export const popupPanel = cva({
  base: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    padding: "1.375rem 1.5rem 1.5rem",
    background: "linear-gradient(135deg, #12121A 0%, #1C1C2E 100%)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "var(--radii-xl)",
    overflow: "hidden",
    animation: "scaleIn 250ms cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
  },
  variants: {
    size: {
      default: { maxWidth: "24rem" },
      wide: { maxWidth: "27.125rem" },
    },
    layout: {
      default: {},
      centered: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.125rem",
        paddingTop: "1.875rem",
      },
    },
  },
  defaultVariants: {
    size: "default",
    layout: "default",
  },
});

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
