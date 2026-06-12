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
import { DinnerIcon, StarFragmentIcon } from "../SlotIcons";
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

const color = "var(--colors-slot-dinner)";
const colorLight = "var(--colors-slot-dinner-light)";
const title = "달빛의 운세";

const stepStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 25%, transparent)`,
  color: colorLight,
});

const calloutStyle = css({
  background: `color-mix(in srgb, ${color} 8%, transparent)`,
  borderColor: `color-mix(in srgb, ${color} 19%, transparent)`,
});

export function DinnerSlotPopup() {
  const universe = useStore(universeStore);
  const modal = useModal();
  const { tryVisit } = useUrlVisitor();

  const handleVisit = async () => {
    const result = await tryVisit(FORTUNE_URL, REQUIRED_VISIT_MS);
    if (result.success) {
      modal.closeSelf();
      modal.open(
        <RewardSuccessPopup
          slotLabel={title}
          rewardAmount={1}
          onSuccess={() => {
            universe.actions.completeFortune("dinner");
          }}
        />,
      );
    } else {
      modal.open(<RewardFailedPopup />);
    }
  };

  return (
    <Popup>
      <div className={headerStyle}>
        <span className={popupTitle}>
          <DinnerIcon color={colorLight} size={28} />
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

      <div className={cx(callout(), calloutStyle)}>
        <StarFragmentIcon color={color} size={28} />
        <div>
          <div className={calloutTitle} style={{ color: colorLight }}>
            별 조각 +1 획득 가능
          </div>
          <Text variant="muted">강남철학관 방문 후 별 조각을 수집하세요.</Text>
        </div>
      </div>

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
          leftIcon={<StarFragmentIcon color="#07091A" size={18} />}
        >
          강남철학관 운세 보러 가기
        </Button>
      </div>
    </Popup>
  );
}
