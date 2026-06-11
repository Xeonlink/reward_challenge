"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { css, cva } from "@/styled/css";
import { StarFragmentIcon } from "../SlotIcons";

const callout = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem 1.125rem",
  borderRadius: "md",
  border: "1px solid",
  marginBottom: "1.25rem",
});

const calloutTitle = css({
  fontSize: "sm",
  fontWeight: "700",
  marginBottom: "0.25rem",
});

const stepsWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginBottom: "1.375rem",
});

const stepRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  fontSize: "sm",
});

const stepNumber = cva({
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

const buttonWrap = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

type FortuneVisitContentProps = {
  color: string;
  colorLight: string;
  calloutBg: string;
  starRewardLabel: string;
  isExtra?: boolean;
  onVisit: () => void;
};

export function FortuneVisitContent(props: FortuneVisitContentProps) {
  const { color, colorLight, calloutBg, starRewardLabel, isExtra, onVisit } =
    props;

  const stepStyle = {
    background: `color-mix(in srgb, ${color} 8%, transparent)`,
    borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
    color: colorLight,
  };

  return (
    <>
      <div
        className={callout}
        style={{
          background: calloutBg,
          borderColor: `color-mix(in srgb, ${color} 19%, transparent)`,
        }}
      >
        <StarFragmentIcon color={color} size={28} />
        <div>
          <div className={calloutTitle} style={{ color: colorLight }}>
            {starRewardLabel}
          </div>
          <Text variant="muted">
            {isExtra
              ? "추가 기회는 하루 1회만 사용할 수 있어요."
              : "강남철학관 방문 후 별 조각을 수집하세요."}
          </Text>
        </div>
      </div>

      <div className={stepsWrap}>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle}>
            1
          </div>
          <Text variant="muted">강남철학관 운세 페이지로 이동</Text>
        </div>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle}>
            2
          </div>
          <Text variant="muted">3초 이상 체류하기</Text>
        </div>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle}>
            3
          </div>
          <Text variant="muted">돌아와서 별 조각 수령</Text>
        </div>
      </div>

      <div className={buttonWrap}>
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={onVisit}
          leftIcon={<StarFragmentIcon color="#07091A" size={18} />}
        >
          강남철학관 운세 보러 가기
        </Button>
      </div>
    </>
  );
}
