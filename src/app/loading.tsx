import { Skeleton } from "@/components/ui/Skeleton";
import { css } from "@/styled/css";

const pageSectionsStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.875rem",
  width: "100%",
  paddingTop: "1.375rem",
});

const heroSkeletonStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.875rem",
  width: "100%",
});

const orbZoneStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.375rem",
  width: "100%",
});

const cardGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.75rem",
  width: "100%",
});

const progressStyle = css({
  width: "100%",
  maxWidth: "27.125rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

export default function Loading() {
  return (
    <main className={pageSectionsStyle} aria-hidden="true">
      <div className={heroSkeletonStyle}>
        <Skeleton variant="badge" />
        <Skeleton variant="title" />
        <Skeleton variant="subtitle" />
        <Skeleton variant="line" />
        <Skeleton variant="lineShort" />
      </div>

      <div className={orbZoneStyle}>
        <Skeleton variant="orb" />
        <Skeleton variant="timeBadge" />
      </div>

      <div className={cardGridStyle}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton variant="card" key={i} />
        ))}
      </div>

      <div className={progressStyle}>
        <Skeleton variant="progressLabel" />
        <Skeleton variant="progressBar" />
      </div>
    </main>
  );
}
