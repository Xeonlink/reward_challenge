"use client";

import { useModal } from "@/components/modal";
import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { useUrlVisitor } from "@/hooks/useFortuneVisit";
import { FORTUNE_URL, REQUIRED_VISIT_MS } from "@/lib/constants";
import { universeStore } from "@/lib/universe";
import { css, cx } from "@/styled/css";
import { useStore } from "zustand";
import { BonusIcon, CheckIcon, StarFragmentIcon } from "../SlotIcons";
import { RewardFailedPopup, RewardSuccessPopup } from "./RewardPopup";
import {
  buttonWrap,
  callout,
  calloutTitle,
  closeButtonStyle,
  headerStyle,
  popupTitle,
  stepNumber,
  stepRow,
  stepsWrap,
} from "./_style";

const color = "var(--colors-slot-bonus)";
const colorLight = "var(--colors-slot-bonus-light)";
const title = "우주의 운세";

const visitStepStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
  color: colorLight,
});

const calloutStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 19%, transparent)`,
});

function prerequisiteStepStyle(done: boolean) {
  return {
    background: done
      ? "color-mix(in srgb, var(--colors-success) 12%, transparent)"
      : `color-mix(in srgb, ${color} 8%, transparent)`,
    borderColor: done
      ? "color-mix(in srgb, var(--colors-success) 35%, transparent)"
      : `color-mix(in srgb, ${color} 25%, transparent)`,
    color: done ? "var(--colors-success)" : colorLight,
  };
}

export function BonusSlotPopup() {
  const universe = useStore(universeStore);
  const { record } = universe;
  const modal = useModal();
  const { tryVisit } = useUrlVisitor();

  const isLocked =
    !record.bonus && !(record.morning && record.lunch && record.dinner);

  const handleVisit = async () => {
    const result = await tryVisit(FORTUNE_URL, REQUIRED_VISIT_MS);
    if (result.success) {
      modal.closeSelf();
      modal.open(
        <RewardSuccessPopup
          slotLabel={title}
          rewardAmount={2}
          onSuccess={() => {
            universe.actions.completeBonus();
          }}
        />,
      );
    } else {
      modal.open(<RewardFailedPopup />);
    }
  };

  return (
    <Popup size="wide">
      <div className={headerStyle}>
        <span className={popupTitle}>
          <BonusIcon color={colorLight} size={28} />
          <Text className={css({ color: colorLight })} variant="slotTitle">
            {title}
          </Text>
        </span>
        <button
          className={closeButtonStyle}
          type="button"
          onClick={() => modal.closeSelf()}
        >
          <span className="sr-only"> 닫기</span>
          <span>✕</span>
        </button>
      </div>

      {isLocked ? (
        <>
          <div className={cx(callout(), calloutStyle)}>
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
              <div
                className={stepNumber()}
                style={prerequisiteStepStyle(record.morning)}
              >
                {record.morning ? (
                  <CheckIcon color="var(--colors-success)" size={14} />
                ) : (
                  1
                )}
              </div>
              <Text
                className={css({
                  color: record.morning ? "success" : "fg.muted",
                  textDecoration: record.morning ? "line-through" : undefined,
                  opacity: record.morning ? 0.85 : 1,
                })}
                variant="muted"
              >
                아침 운세 수령
              </Text>
            </div>
            <div className={stepRow}>
              <div
                className={stepNumber()}
                style={prerequisiteStepStyle(record.lunch)}
              >
                {record.lunch ? (
                  <CheckIcon color="var(--colors-success)" size={14} />
                ) : (
                  2
                )}
              </div>
              <Text
                className={css({
                  color: record.lunch ? "success" : "fg.muted",
                  textDecoration: record.lunch ? "line-through" : undefined,
                  opacity: record.lunch ? 0.85 : 1,
                })}
                variant="muted"
              >
                점심 운세 수령
              </Text>
            </div>
            <div className={stepRow}>
              <div
                className={stepNumber()}
                style={prerequisiteStepStyle(record.dinner)}
              >
                {record.dinner ? (
                  <CheckIcon color="var(--colors-success)" size={14} />
                ) : (
                  3
                )}
              </div>
              <Text
                className={css({
                  color: record.dinner ? "success" : "fg.muted",
                  textDecoration: record.dinner ? "line-through" : undefined,
                  opacity: record.dinner ? 0.85 : 1,
                })}
                variant="muted"
              >
                저녁 운세 수령
              </Text>
            </div>
          </div>

          <div className={buttonWrap}>
            <Button
              variant="gold"
              size="lg"
              fullWidth
              onClick={() => modal.closeSelf()}
            >
              확인
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={cx(callout(), calloutStyle)}>
            <StarFragmentIcon color={color} size={28} />
            <div>
              <div className={calloutTitle} style={{ color: colorLight }}>
                별 조각 +2 획득 가능
              </div>
              <Text variant="muted">
                강남철학관 방문 후 별 조각을 수집하세요.
              </Text>
            </div>
          </div>

          <div className={stepsWrap}>
            <div className={stepRow}>
              <div className={cx(stepNumber(), visitStepStyle)}>1</div>
              <Text variant="muted">강남철학관 운세 페이지로 이동</Text>
            </div>
            <div className={stepRow}>
              <div className={cx(stepNumber(), visitStepStyle)}>2</div>
              <Text variant="muted">3초 이상 체류하기</Text>
            </div>
            <div className={stepRow}>
              <div className={cx(stepNumber(), visitStepStyle)}>3</div>
              <Text variant="muted">돌아와서 별 조각 수령</Text>
            </div>
          </div>

          <div className={buttonWrap}>
            <Button
              variant="gold"
              size="lg"
              fullWidth
              onClick={handleVisit}
              leftIcon={<StarFragmentIcon color="#07091A" size={18} />}
            >
              강남철학관 운세 보러 가기
            </Button>
          </div>
        </>
      )}
    </Popup>
  );
}
