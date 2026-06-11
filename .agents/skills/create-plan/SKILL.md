---
name: create-plan
description: Plan 작성 시 작업 완료 후 fix-do-not, format, lint, build를 순서대로 검증한다. plan을 세우거나 작업 계획을 작성할 때 적용.
---

# Plan

plan을 작성할 때 **작업이 모두 끝난 뒤** 반드시 검증 단계를 plan에 포함한다.

## 적용 시점

- 사용자가 plan, 계획, 작업 순서를 요청할 때
- 여러 단계가 있는 작업의 단계를 나열할 때
- "순서대로 진행해줘", "계획 세워줘" 등 plan 작성이 포함된 요청일 때

## 검증 규칙

### 1) fix-do-not

[fix-do-not](../fix-do-not/SKILL.md) 스킬을 적용한다.

- plan 구현·리팩터 완료 직후, 커밋·PR 전에 실행
- 사용자가 대화에서 금지한 패턴(`_styles`, `panda.config` 비대화, px/rem, inline style, 테마 variable 위치 등)이 남아 있으면 **먼저 수정**한 뒤 아래 format/lint/build로 진행
- 위반 0건(명시적 예외 제외) + `pnpm run build` 통과가 이 단계의 완료 조건

### 2) format

```sh
pnpm run format
```

- format 실패시 건너뜀

### 3) lint

```sh
pnpm run lint
```

- 린트 실행 후 발생하는 오류를 수정

### 4) build

```sh
pnpm run build
```

- 빌드 실행 후 타입에러나 빌드에러가 발생하면 다음과 같이 처리:
  1. 에러가 쉽게 수정 가능한 경우 바로 수정
  2. 쉽게 수정할 수는 없지만 이번 plan과 직접적으로 관련된 에러인 경우에도 바로 수정
  3. plan과 관계없는 에러라면, 해당 에러를 해결하기 위한 새로운 plan을 작성
