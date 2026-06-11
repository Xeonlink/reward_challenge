import { css } from "@/styled/css";

export default function Loading() {
  return (
    <div
      className={css({
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07091A",
        color: "#FFD166",
        fontFamily: "'Orbitron', sans-serif",
        fontSize: "1.1rem",
        letterSpacing: "0.2em",
      })}
    >
      별모아
    </div>
  );
}
