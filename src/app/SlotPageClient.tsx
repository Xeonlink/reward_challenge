"use client";

import { SlotGrid } from "@/components/slots/SlotGrid";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { css } from "@/styled/css";

type Props = {
  testParam?: string;
};

const pageSectionsStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "40px",
  width: "100%",
  paddingTop: "20px",
});

const heroHeaderStyle = css({
  textAlign: "center",
  animation: "slideUp 0.7s ease",
  width: "100%",
});

const descriptionStyle = css({
  fontSize: "0.88rem",
  color: "fg.muted",
  lineHeight: "1.8",
  maxWidth: "360px",
  margin: "0 auto",
});

const devPanelStyle = css({
  width: "100%",
  padding: "14px 18px",
  borderRadius: "16px",
  background: "color-mix(in srgb, var(--colors-surface) 50%, transparent)",
  border: "1px solid",
  borderColor: "color-mix(in srgb, var(--colors-border) 60%, transparent)",
});

const chipRowStyle = css({
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
});

export function SlotPageClient(props: Props) {
  const { testParam } = props;
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className={pageSectionsStyle}>
      <header className={heroHeaderStyle}>
        <Badge label="Daily Fortune" />
        <Heading>별모아</Heading>
        <Text variant="subtitle">BYULMOA</Text>
        <p className={descriptionStyle}>
          매일 아침·점심·저녁 운세를 확인하고
          <br />별 조각을 모아 우주를 성장시켜요
        </p>
      </header>

      <SlotGrid testParam={testParam} />

      {isDev ? (
        <div className={devPanelStyle}>
          <Text
            className={css({ display: "block", marginBottom: "8px" })}
            variant="label"
          >
            테스트 URL 파라미터
          </Text>
          <div className={chipRowStyle}>
            {(
              [
                { param: "morning", tone: "morning" as const },
                { param: "lunch", tone: "lunch" as const },
                { param: "dinner", tone: "dinner" as const },
              ] as const
            ).map(({ param, tone }) => (
              <Chip
                key={param}
                href={`?test=${param}`}
                active={testParam === param}
                tone={tone}
              >
                ?test={param}
              </Chip>
            ))}
            {testParam ? (
              <Chip href="/" tone="default">
                초기화
              </Chip>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
