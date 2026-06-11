"use client";

import { Text } from "@/components/ui/Text";
import { TimeBadge } from "@/components/ui/TimeBadge";
import { useSlots } from "@/hooks/useSlots";
import { starsFromDay } from "@/lib/slotLogic";
import { css } from "@/styled/css";
import React from "react";
import { Button } from "../ui/Button";
import { Popup } from "../ui/Popup";
import { CosmicOrb } from "./CosmicOrb";
import { RewardPopup } from "./RewardPopup";
import { SlotCard } from "./SlotCard";
import { SlotPopup } from "./SlotPopup";

const TIME_LABELS: Record<string, { label: string; color: string }> = {
  morning: { label: "아침", color: "var(--colors-slot-morning)" },
  lunch: { label: "점심", color: "var(--colors-slot-lunch)" },
  dinner: { label: "저녁", color: "var(--colors-slot-dinner)" },
};

const rootStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.5rem",
  width: "100%",
});

const heroZoneStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.375rem",
  width: "100%",
});

const serviceGridStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.75rem",
  width: "100%",
});

const progressWrapStyle = css({
  width: "100%",
  maxWidth: "27.125rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

const progressHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const progressTrackStyle = css({
  width: "100%",
  height: "0.375rem",
  borderRadius: "full",
  background: "color-mix(in srgb, var(--colors-border) 50%, transparent)",
  overflow: "hidden",
});

const completeBannerStyle = css({
  padding: "1rem 2rem",
  borderRadius: "lg",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-accent) 25%, transparent)",
  background: "color-mix(in srgb, var(--colors-accent) 5%, transparent)",
  textAlign: "center",
  animation: "slideUp 0.5s ease",
});

const legendStyle = css({
  display: "flex",
  gap: "1.125rem",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "1rem 1.375rem",
  borderRadius: "1rem",
  background: "color-mix(in srgb, var(--colors-surface) 50%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 70%, transparent)",
});

interface SlotGridProps {
  testParam?: string | null;
}

export const SlotGrid: React.FC<SlotGridProps> = ({ testParam }) => {
  const {
    slots,
    currentTime,
    todayRecord,
    universe,
    allCompleted,
    handleSlotClick,
    handleRewardClaim,
    handleExternalVisit,
    activePopup,
    closePopup,
    rewardPopup,
    cycleCompletePopup,
    closeCycleCompletePopup,
    lastStarBornAt,
  } = useSlots(testParam);

  const starsToday = starsFromDay(todayRecord);
  const activeSlotData = activePopup
    ? slots.find((s) => s.key === activePopup)
    : null;
  const t = TIME_LABELS[currentTime];

  return (
    <div className={rootStyle}>
      <div className={heroZoneStyle}>
        <CosmicOrb
          universe={universe}
          starsToday={starsToday}
          lastStarBornAt={lastStarBornAt}
        />

        {t ? (
          <TimeBadge
            slotColor={t.color}
            label={t.label}
            testMode={Boolean(testParam)}
          />
        ) : null}
      </div>

      <div className={serviceGridStyle}>
        {slots.map((slot) => (
          <SlotCard
            key={slot.key}
            slotKey={slot.key}
            status={slot.status}
            isExtra={slot.isExtra}
            onClick={handleSlotClick}
            isNew={slot.key === "bonus" && !todayRecord.bonus}
          />
        ))}
      </div>

      <div className={progressWrapStyle}>
        <div className={progressHeaderStyle}>
          <Text variant="muted">오늘의 별 조각</Text>
          <Text
            className={css({
              fontWeight: "700",
              fontFamily: "display",
              color: starsToday >= 5 ? "accent" : "nebula.light",
            })}
            variant="muted"
          >
            {starsToday} / 5
          </Text>
        </div>
        <div className={progressTrackStyle}>
          <div
            className={css({
              height: "100%",
              borderRadius: "full",
              transition: "width 700ms",
              transitionTimingFunction: "spring",
            })}
            style={{
              width: `${(starsToday / 5) * 100}%`,
              background:
                starsToday >= 5
                  ? "linear-gradient(90deg, var(--colors-accent), var(--colors-cosmic), var(--colors-accent))"
                  : "linear-gradient(90deg, var(--colors-nebula), var(--colors-cosmic))",
              backgroundSize: starsToday >= 5 ? "200% auto" : "auto",
              animation:
                starsToday >= 5 ? "shimmer 2s linear infinite" : undefined,
              boxShadow:
                starsToday >= 5
                  ? "0 0 10px color-mix(in srgb, var(--colors-accent) 60%, transparent)"
                  : "0 0 6px color-mix(in srgb, var(--colors-nebula) 40%, transparent)",
            }}
          />
        </div>
      </div>

      {allCompleted ? (
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
      ) : null}

      <div className={legendStyle}>
        {[
          { color: "var(--colors-slot-dinner)", label: "참여 가능" },
          { color: "var(--colors-success)", label: "수령 완료" },
          { color: "var(--colors-slot-bonus)", label: "추가 기회" },
          { color: "var(--colors-border)", label: "참여 불가" },
        ].map(({ color, label }) => (
          <div
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            })}
            key={label}
          >
            <div
              className={css({
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
              })}
              style={{
                background: color,
                boxShadow: `0 0 4px ${color}`,
              }}
            />
            <Text variant="dim">{label}</Text>
          </div>
        ))}
      </div>

      {activePopup && activeSlotData ? (
        <SlotPopup
          slotKey={activePopup}
          isExtra={activeSlotData.isExtra}
          open
          onClose={closePopup}
          onExternalVisit={handleExternalVisit}
        />
      ) : null}

      {rewardPopup ? (
        <RewardPopup
          slotKey={rewardPopup.key}
          success={rewardPopup.success}
          open
          onClaim={handleRewardClaim}
        />
      ) : null}

      <Popup
        open={cycleCompletePopup}
        onClose={closeCycleCompletePopup}
        size="sm"
        title={
          <Text
            className={css({
              color: "accent",
              fontSize: "lg",
            })}
            variant="slotTitle"
          >
            우주가 완성되었습니다!
          </Text>
        }
      >
        <div
          className={css({ textAlign: "center", padding: "0.5rem 0 0.25rem" })}
        >
          <div className={css({ fontSize: "4xl", marginBottom: "1rem" })}>
            ✨
          </div>
          <Text
            className={css({
              lineHeight: 1.7,
              marginBottom: "0.5rem",
            })}
            variant="body"
          >
            30일간의 여정을 완주했어요.
            <br />별 조각이 새롭게 초기화됩니다.
          </Text>
          <Text className={css({ marginBottom: "1.375rem" })} variant="muted">
            새로운 여정을 시작하세요
          </Text>
          <Button variant="gold" size="sm" onClick={closeCycleCompletePopup}>
            새 여정 시작
          </Button>
        </div>
      </Popup>
    </div>
  );
};
