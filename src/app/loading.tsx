import {
  cardGridSkeletonStyle,
  cardSkeletonStyle,
  heroBadgeSkeletonStyle,
  heroDescLine2SkeletonStyle,
  heroDescSkeletonStyle,
  heroSkeletonStyle,
  heroSubtitleSkeletonStyle,
  heroTitleSkeletonStyle,
  orbSkeletonStyle,
  pageSectionsStyle,
  progressBarSkeletonStyle,
  progressLabelSkeletonStyle,
  progressSkeletonStyle,
  skeletonPulseStyle,
  timeBadgeSkeletonStyle,
} from "@/app/_styles/shellStyles";
import { css, cx } from "@/styled/css";

export default function Loading() {
  return (
    <div className={pageSectionsStyle} aria-hidden="true">
      <div className={heroSkeletonStyle}>
        <div className={cx(skeletonPulseStyle, heroBadgeSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, heroTitleSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, heroSubtitleSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, heroDescSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, heroDescLine2SkeletonStyle)} />
      </div>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        })}
      >
        <div className={cx(skeletonPulseStyle, orbSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, timeBadgeSkeletonStyle)} />
      </div>

      <div className={cardGridSkeletonStyle}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className={cx(skeletonPulseStyle, cardSkeletonStyle)} key={i} />
        ))}
      </div>

      <div className={progressSkeletonStyle}>
        <div className={cx(skeletonPulseStyle, progressLabelSkeletonStyle)} />
        <div className={cx(skeletonPulseStyle, progressBarSkeletonStyle)} />
      </div>
    </div>
  );
}
