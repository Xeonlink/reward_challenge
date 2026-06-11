"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import type { CompletionRecord } from "@/lib/slots";
import { css, cva } from "@/styled/css";
import { BonusIcon, CheckIcon, StarFragmentIcon } from "../SlotIcons";
import { FortunePopupShell } from "./FortunePopupShell";

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

type BonusLockedPopupProps = {
  todayRecord: CompletionRecord;
  open: boolean;
  onClose: () => void;
};

export function BonusLockedPopup(props: BonusLockedPopupProps) {
  const { todayRecord, open, onClose } = props;

  const color = "var(--colors-slot-bonus)";
  const colorLight = "var(--colors-slot-bonus-light)";
  const calloutBg =
    "color-mix(in srgb, var(--colors-slot-bonus) 8%, transparent)";

  const stepStyle = (done: boolean) => ({
    background: done
      ? "color-mix(in srgb, var(--colors-success) 12%, transparent)"
      : `color-mix(in srgb, ${color} 8%, transparent)`,
    borderColor: done
      ? "color-mix(in srgb, var(--colors-success) 35%, transparent)"
      : `color-mix(in srgb, ${color} 25%, transparent)`,
    color: done ? "var(--colors-success)" : colorLight,
  });

  return (
    <FortunePopupShell
      title="우주의 운세"
      color={color}
      colorLight={colorLight}
      icon={BonusIcon}
      open={open}
      onClose={onClose}
    >
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
            아침·점심·저녁을 모두 완료해야 합니다
          </div>
          <Text variant="muted">
            3개 운세를 모두 수령하면 별 보너스가 해제됩니다
          </Text>
        </div>
      </div>

      <div className={stepsWrap}>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle(todayRecord.morning)}>
            {todayRecord.morning ? (
              <CheckIcon color="var(--colors-success)" size={14} />
            ) : (
              1
            )}
          </div>
          <Text
            className={css({
              color: todayRecord.morning ? "success" : "fg.muted",
              textDecoration: todayRecord.morning ? "line-through" : undefined,
              opacity: todayRecord.morning ? 0.85 : 1,
            })}
            variant="muted"
          >
            아침 운세 수령
          </Text>
        </div>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle(todayRecord.lunch)}>
            {todayRecord.lunch ? (
              <CheckIcon color="var(--colors-success)" size={14} />
            ) : (
              2
            )}
          </div>
          <Text
            className={css({
              color: todayRecord.lunch ? "success" : "fg.muted",
              textDecoration: todayRecord.lunch ? "line-through" : undefined,
              opacity: todayRecord.lunch ? 0.85 : 1,
            })}
            variant="muted"
          >
            점심 운세 수령
          </Text>
        </div>
        <div className={stepRow}>
          <div className={stepNumber()} style={stepStyle(todayRecord.dinner)}>
            {todayRecord.dinner ? (
              <CheckIcon color="var(--colors-success)" size={14} />
            ) : (
              3
            )}
          </div>
          <Text
            className={css({
              color: todayRecord.dinner ? "success" : "fg.muted",
              textDecoration: todayRecord.dinner ? "line-through" : undefined,
              opacity: todayRecord.dinner ? 0.85 : 1,
            })}
            variant="muted"
          >
            저녁 운세 수령
          </Text>
        </div>
      </div>

      <div className={buttonWrap}>
        <Button variant="gold" size="lg" fullWidth onClick={onClose}>
          확인
        </Button>
      </div>
    </FortunePopupShell>
  );
}
