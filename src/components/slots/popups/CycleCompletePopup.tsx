"use client";

import { useModal } from "@/components/modal";
import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { useUniverse } from "@/hooks/useUniverse";
import { css } from "@/styled/css";
import { buttonWrap } from "./_style";

const content = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "1.125rem",
  paddingTop: "0.5rem",
});

export function CycleCompletePopup() {
  const modal = useModal();
  const startNewCycle = useUniverse((state) => state.actions.startNewCycle);

  const handleStartNewCycle = () => {
    startNewCycle();
    modal.closeSelf();
  };

  return (
    <Popup backdrop="noClose">
      <div className={content}>
        <div className={css({ fontSize: "4xl" })}>✨</div>
        <Text
          className={css({ color: "accent", fontSize: "lg" })}
          variant="slotTitle"
        >
          우주가 완성되었습니다!
        </Text>
        <Text className={css({ lineHeight: 1.7 })} variant="body">
          30일간의 여정을 완주했어요.
        </Text>
        <Text variant="muted">별 조각이 새롭게 초기화됩니다.</Text>
        <Text variant="muted">새로운 여정을 시작하세요</Text>
        <div className={buttonWrap}>
          <Button
            variant="gold"
            size="lg"
            fullWidth
            onClick={handleStartNewCycle}
          >
            새 여정 시작
          </Button>
        </div>
      </div>
    </Popup>
  );
}
