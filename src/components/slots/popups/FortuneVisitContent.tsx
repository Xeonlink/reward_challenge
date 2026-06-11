"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { FORTUNE_VISIT_STEPS, SLOT_META } from "@/lib/slots";
import type { SlotKey } from "@/lib/slots";
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
  slotKey: SlotKey;
  isExtra?: boolean;
  onVisit: () => void;
};

export function FortuneVisitContent(props: FortuneVisitContentProps) {
  const { slotKey, isExtra, onVisit } = props;
  const cfg = SLOT_META[slotKey];

  return (
    <>
      <div
        className={callout}
        style={{
          background: cfg.calloutBg,
          borderColor: `color-mix(in srgb, ${cfg.color} 19%, transparent)`,
        }}
      >
        <StarFragmentIcon color={cfg.color} size={28} />
        <div>
          <div className={calloutTitle} style={{ color: cfg.colorLight }}>
            {slotKey === "bonus" ? "별 조각 +2 획득 가능" : "별 조각 +1 획득 가능"}
          </div>
          <Text variant="muted">
            {isExtra
              ? "추가 기회는 하루 1회만 사용할 수 있어요."
              : "강남철학관 방문 후 별 조각을 수집하세요."}
          </Text>
        </div>
      </div>

      <div className={stepsWrap}>
        {FORTUNE_VISIT_STEPS.map((text, i) => (
          <div className={stepRow} key={text}>
            <div
              className={stepNumber()}
              style={{
                background: `color-mix(in srgb, ${cfg.color} 8%, transparent)`,
                borderColor: `color-mix(in srgb, ${cfg.color} 25%, transparent)`,
                color: cfg.colorLight,
              }}
            >
              {i + 1}
            </div>
            <Text variant="muted">{text}</Text>
          </div>
        ))}
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
