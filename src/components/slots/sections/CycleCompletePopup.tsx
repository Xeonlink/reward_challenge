"use client";

import { useModal } from "@/components/modal";
import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";

export function CycleCompletePopup() {
  const modal = useModal();

  return (
    <Popup>
      <Text
        className={css({
          color: "accent",
          fontSize: "lg",
          marginBottom: "1rem",
        })}
        variant="slotTitle"
      >
        우주가 완성되었습니다!
      </Text>
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
        <Button variant="gold" size="sm" onClick={() => modal.closeSelf()}>
          새 여정 시작
        </Button>
      </div>
    </Popup>
  );
}
