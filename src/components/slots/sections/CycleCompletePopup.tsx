"use client";

import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";

type CycleCompletePopupProps = {
  open: boolean;
  onClose: () => void;
};

export function CycleCompletePopup(props: CycleCompletePopupProps) {
  const { open, onClose } = props;

  return (
    <Popup
      open={open}
      onClose={onClose}
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
        <div className={css({ fontSize: "4xl", marginBottom: "1rem" })}>✨</div>
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
        <Button variant="gold" size="sm" onClick={onClose}>
          새 여정 시작
        </Button>
      </div>
    </Popup>
  );
}
