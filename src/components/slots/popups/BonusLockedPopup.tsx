"use client";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { BONUS_UNLOCK_STEPS, SLOT_META } from "@/lib/slots";
import type { CompletionRecord } from "@/lib/slots";
import { css, cva } from "@/styled/css";
import { CheckIcon, StarFragmentIcon } from "../SlotIcons";
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
  const cfg = SLOT_META.bonus;

  return (
    <FortunePopupShell slotKey="bonus" open={open} onClose={onClose}>
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
            아침·점심·저녁을 모두 완료해야 합니다
          </div>
          <Text variant="muted">
            3개 운세를 모두 수령하면 별 보너스가 해제됩니다
          </Text>
        </div>
      </div>

      <div className={stepsWrap}>
        {BONUS_UNLOCK_STEPS.map(({ key, label }, i) => {
          const done = todayRecord[key];
          return (
            <div className={stepRow} key={key}>
              <div
                className={stepNumber()}
                style={{
                  background: done
                    ? "color-mix(in srgb, var(--colors-success) 12%, transparent)"
                    : `color-mix(in srgb, ${cfg.color} 8%, transparent)`,
                  borderColor: done
                    ? "color-mix(in srgb, var(--colors-success) 35%, transparent)"
                    : `color-mix(in srgb, ${cfg.color} 25%, transparent)`,
                  color: done ? "var(--colors-success)" : cfg.colorLight,
                }}
              >
                {done ? (
                  <CheckIcon color="var(--colors-success)" size={14} />
                ) : (
                  i + 1
                )}
              </div>
              <Text
                className={css({
                  color: done ? "success" : "fg.muted",
                  textDecoration: done ? "line-through" : undefined,
                  opacity: done ? 0.85 : 1,
                })}
                variant="muted"
              >
                {label}
              </Text>
            </div>
          );
        })}
      </div>

      <div className={buttonWrap}>
        <Button variant="gold" size="lg" fullWidth onClick={onClose}>
          확인
        </Button>
      </div>
    </FortunePopupShell>
  );
}
