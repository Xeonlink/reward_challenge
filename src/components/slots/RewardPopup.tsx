"use client";

import { useModal } from "@/components/modal";
import { Text } from "@/components/ui/Text";
import { css, cva } from "@/styled/css";
import { Button } from "../ui/Button";
import { Popup } from "../ui/Popup";
import { StarFragmentIcon } from "./SlotIcons";

const content = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "1.125rem",
  paddingTop: "0.5rem",
});

const rewardIcon = cva({
  base: {
    width: "5.75rem",
    height: "5.75rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
  },
  variants: {
    variant: {
      success: {
        background:
          "radial-gradient(circle, rgba(255,209,102,0.2) 0%, rgba(255,209,102,0.05) 100%)",
        borderColor:
          "color-mix(in srgb, var(--colors-accent) 30%, transparent)",
        animation: "starBirth 0.6s",
        animationTimingFunction: "spring",
      },
      failure: {
        background:
          "radial-gradient(circle, rgba(255,92,122,0.15) 0%, rgba(255,92,122,0.03) 100%)",
        borderColor:
          "color-mix(in srgb, var(--colors-danger) 25%, transparent)",
        animation: "scaleIn 0.3s ease",
      },
    },
  },
});

const rewardTitle = cva({
  base: {
    fontFamily: "display",
    fontSize: "xl",
    fontWeight: "700",
    marginBottom: "0.375rem",
  },
  variants: {
    variant: {
      success: { color: "accent" },
      failure: { color: "danger" },
    },
  },
});

const rewardHighlight = css({
  color: "accent",
  fontWeight: "600",
});

const rewardBox = css({
  background: "color-mix(in srgb, var(--colors-accent) 7%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-accent) 22%, transparent)",
  borderRadius: "md",
  padding: "1rem 2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.375rem",
});

const rewardAmountRow = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const rewardAmount = css({
  fontSize: "2xl",
  fontFamily: "display",
  fontWeight: "900",
  color: "accent",
});

const rewardCaption = css({
  fontSize: "sm",
  color: "color-mix(in srgb, var(--colors-accent) 50%, transparent)",
  fontFamily: "mono",
});

interface RewardPopupProps {
  slotLabel: string;
  rewardAmount: number;
  success: boolean;
  onClaim: () => void;
}

export function RewardPopup(props: RewardPopupProps) {
  const { slotLabel, rewardAmount: amount, success, onClaim } = props;
  const variant = success ? "success" : "failure";
  const modal = useModal();

  const handleClaim = () => {
    onClaim();
    modal.closeSelf();
  };

  return (
    <Popup>
      <div className={content}>
        <div className={rewardIcon({ variant })}>
          {success ? (
            <StarFragmentIcon color="var(--colors-accent)" size={40} />
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="var(--colors-danger)"
                strokeWidth="1.5"
                fill="color-mix(in srgb, var(--colors-danger) 10%, transparent)"
              />
              <line
                x1="13"
                y1="13"
                x2="27"
                y2="27"
                stroke="var(--colors-danger)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="27"
                y1="13"
                x2="13"
                y2="27"
                stroke="var(--colors-danger)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        <div>
          <div className={rewardTitle({ variant })}>
            {success ? "별 조각 획득!" : "조건 미충족"}
          </div>
          <Text className={css({ lineHeight: 1.6 })} variant="muted">
            {success ? (
              <>
                <span className={rewardHighlight}>{slotLabel} 운세</span>를 통해
                별 조각을 모았어요.
              </>
            ) : (
              <>
                체류 시간이 부족합니다.
                <br />
                다음에 다시 도전해보세요.
              </>
            )}
          </Text>
        </div>

        {success ? (
          <div className={rewardBox}>
            <Text variant="label">별 조각 획득</Text>
            <div className={rewardAmountRow}>
              <StarFragmentIcon color="var(--colors-accent)" size={28} />
              <span className={rewardAmount}>+{amount}</span>
            </div>
            <span className={rewardCaption}>우주 성장에 기여했어요</span>
          </div>
        ) : null}

        <Button
          variant={success ? "gold" : "secondary"}
          size="md"
          fullWidth
          onClick={handleClaim}
        >
          {success ? "확인" : "닫기"}
        </Button>
      </div>
    </Popup>
  );
}
