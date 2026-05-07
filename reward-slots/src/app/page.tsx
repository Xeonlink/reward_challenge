import { Suspense } from "react";
import { SlotPageClient } from "./SlotPageClient";

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SlotPageClient />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0F",
        color: "#FFD700",
        fontFamily: "Orbitron, sans-serif",
        fontSize: "1.2rem",
        letterSpacing: "0.1em",
      }}
    >
      LOADING...
    </div>
  );
}
