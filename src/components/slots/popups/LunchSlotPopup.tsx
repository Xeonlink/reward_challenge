"use client";

import LunchIcon from "@/assets/icons/lunch.svg";
import StarFragmentIcon from "@/assets/icons/star-fragment.svg";
import { useModal } from "@/components/modal";
import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useUrlVisitor } from "@/hooks/useFortuneVisit";
import { useUniverse } from "@/hooks/useUniverse";
import { FORTUNE_URL, REQUIRED_VISIT_MS } from "@/lib/constants";
import { css, cx } from "@/styled/css";
import { RewardFailedPopup, RewardSuccessPopup } from "./RewardPopup";
import {
  buttonWrap,
  callout,
  calloutTitle,
  closeButtonStyle,
  extraNotice,
  headerStyle,
  popupPanel,
  popupTitle,
  stepNumber,
  stepRow,
  stepsWrap,
} from "./_style";

const color = "var(--colors-slot-lunch)";
const colorLight = "var(--colors-slot-lunch-light)";
const title = "하늘의 운세";

const stepStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
  color: colorLight,
});

const calloutStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 19%, transparent)`,
});

export function LunchSlotPopup() {
  const record = useUniverse((state) => state.record);
  const completeFortune = useUniverse((state) => state.actions.completeFortune);
  const currentTime = useCurrentTime();
  const modal = useModal();
  const { tryVisit } = useUrlVisitor();

  const isExtra = !record.lunch && currentTime === "dinner";

  const handleVisit = async () => {
    const result = await tryVisit(FORTUNE_URL, REQUIRED_VISIT_MS);
    if (result.success) {
      modal.closeSelf();
      modal.open(
        <RewardSuccessPopup
          slotLabel={title}
          rewardAmount={1}
          onSuccess={() => {
            completeFortune("lunch");
          }}
        />,
      );
    } else {
      modal.open(<RewardFailedPopup />);
    }
  };

  return (
    <Popup>
      <div
        className={popupPanel({ size: "wide" })}
        aria-modal="true"
        role="dialog"
      >
        <div className={headerStyle}>
          <span className={popupTitle}>
            <LunchIcon
              className={css({ fontSize: "1.75rem", color: colorLight })}
            />
            <Text className={css({ color: colorLight })} variant="slotTitle">
              {isExtra ? "추가 기회 — " : null}
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

        <div className={cx(callout(), calloutStyle)}>
          <StarFragmentIcon className={css({ fontSize: "1.75rem", color })} />
          <div>
            <div className={calloutTitle} style={{ color: colorLight }}>
              별 조각 +1 획득 가능
            </div>
            <Text variant="muted">
              강남철학관 방문 후 별 조각을 수집하세요.
            </Text>
          </div>
        </div>

        {isExtra ? (
          <Text className={extraNotice} variant="muted">
            추가 기회는 하루 1회만 사용할 수 있어요.
          </Text>
        ) : null}

        <div className={stepsWrap}>
          <div className={stepRow}>
            <div className={cx(stepNumber(), stepStyle)}>1</div>
            <Text variant="muted">강남철학관 운세 페이지로 이동</Text>
          </div>
          <div className={stepRow}>
            <div className={cx(stepNumber(), stepStyle)}>2</div>
            <Text variant="muted">3초 이상 체류하기</Text>
          </div>
          <div className={stepRow}>
            <div className={cx(stepNumber(), stepStyle)}>3</div>
            <Text variant="muted">돌아와서 별 조각 수령</Text>
          </div>
        </div>

        <div className={buttonWrap}>
          <Button
            variant="gold"
            size="lg"
            fullWidth
            onClick={handleVisit}
            leftIcon={
              <StarFragmentIcon
                className={css({ fontSize: "1.125rem", color: "bg" })}
              />
            }
          >
            강남철학관 운세 보러 가기
          </Button>
        </div>
      </div>
    </Popup>
  );
}
