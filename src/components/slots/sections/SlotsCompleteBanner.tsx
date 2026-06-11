"use client";

import { Text } from "@/components/ui/Text";
import type { CompletionRecord } from "@/lib/slots";
import { css } from "@/styled/css";

const completeBannerStyle = css({
  padding: "1rem 2rem",
  borderRadius: "lg",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-accent) 25%, transparent)",
  background: "color-mix(in srgb, var(--colors-accent) 5%, transparent)",
  textAlign: "center",
  animation: "slideUp 0.5s ease",
});

type SlotsCompleteBannerProps = {
  todayRecord: CompletionRecord;
};

export function SlotsCompleteBanner(props: SlotsCompleteBannerProps) {
  const { todayRecord } = props;

  return (
    <div className={completeBannerStyle}>
      <div className={css({ fontSize: "xl", marginBottom: "0.375rem" })}>
        ✨
      </div>
      <Text
        className={css({
          fontFamily: "display",
          color: "accent",
          fontWeight: "700",
        })}
        variant="body"
      >
        오늘의 운세를 모두 확인했어요!
      </Text>
      {!todayRecord.bonus ? (
        <Text className={css({ marginTop: "0.25rem" })} variant="muted">
          별 보너스 슬롯이 해제되었어요
        </Text>
      ) : null}
    </div>
  );
}
