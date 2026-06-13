---
name: fix-layout-shift
description: loading.tsx와 로드 후 page/view 간 CLS(layout shift) 정적 일관성 검사 — Panda CSS(css()) 기준
metadata:
  author: cursor-agent
---

# Fix Layout Shift (CLS) - 정적 UI 일관성 검사

`loading.tsx`(로딩 fallback)와 로드 후의 `page.tsx` / `view.tsx` / client view 사이에서 **layout shift가 없도록** 레이아웃·구조·치수를 맞췄는지 정적으로 점검합니다.

이 프로젝트는 **Panda CSS**(`css()`, `cx()` from `styled-system/css`)를 사용합니다. Tailwind utility class(`w-*`, `min-h-*` 등)는 사용하지 않습니다.

## 입력

다음 중 하나를 지정합니다.

- 단일 파일: `src/app/**/loading.tsx` 또는 `src/app/**/view.tsx` 또는 `src/app/**/page.tsx`
- 경로 패턴: `src/app/**/loading.tsx`

## 동작 방식 (정적 분석)

1. **페어 찾기**: 같은 폴더(또는 같은 Suspense boundary)에서 대응되는 `view.tsx`, `page.tsx`, 또는 page가 렌더하는 client 컴포넌트(예: `SlotPageClient.tsx`)를 찾습니다.
2. **스켈레톤-콘텐츠 매칭**: 최상위 래퍼 → 주요 섹션(헤더, 폼, 카드, 그리드) → 하단 영역 순으로 DOM 구조와 “자리”를 맞춥니다.
3. **치수·레이아웃 속성 비교**: loading과 로드 후가 **동일한 CSS 속성값**을 갖는지 확인합니다. Panda `css({ ... })` 객체 또는 `style={{ ... }}`에서 아래 속성을 대조합니다.
   - 폭/높이: `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`
   - flex/grid: `display`, `flexDirection`, `alignItems`, `justifyContent`, `gap`, `gridTemplateColumns`
   - 간격: `padding`, `paddingInline`, `paddingBlock`, `margin`, `marginBottom` 등
   - 테두리/라운드: `border`, `borderRadius`
   - 배경/타이포(높이에 영향): `background`, `fontSize`, `lineHeight`, `letterSpacing`
4. **Panda 스타일 추출 방법**:
   - `className={loadingStyle}` → module scope의 `const loadingStyle = css({ ... })` 정의를 읽어 속성 비교
   - `className={css({ ... })}` 인라인 → 객체 리터럴 직접 비교
   - `className={cx(a, b)}` → 각 variant의 `css()` 정의를 합쳐 effective style 비교
   - `style={{ ... }}` only → inline 객체 직접 비교
   - design token(`var(--colors-brand-bg)`, `var(--fonts-display)`) 사용 시 [`panda.config.ts`](../../panda.config.ts) 값이 literal과 동일한지 확인
5. **공유 스타일 권장**: loading과 page가 같은 레이아웃 래퍼를 쓰면 **동일 `css()` constant를 export/import**해 drift를 방지합니다.

   ```tsx
   // src/app/_styles/pageShell.ts (예시)
   import { css } from "../../styled-system/css";

   export const pageShellStyle = css({
     minHeight: "100vh",
     display: "flex",
     justifyContent: "center",
     background: "#07091A",
   });
   ```

6. **누락/조건부 분기 점검**: 로드 후에만 존재하는 섹션이 loading에 없으면 BAD. 조건부 렌더링은 **초기 분기(SSR/first paint)**와 동일한 높이 placeholder로 안정화했는지 확인합니다.
7. **정적 우선 검토**: `loading.tsx`에 불필요한 훅·클라이언트 상태가 들어가 레이아웃/조건이 달라지는지 확인합니다. loading은 가능하면 Server Component + 정적 `css()`만 사용합니다.

## 출력 형식

각 이슈는 아래처럼 제시합니다.

- `BAD:` 무엇이 왜 달라져서 layout shift 위험이 있는지 (속성명·값 단위)
- `GOOD:` 로드 후와 맞추기 위해 무엇을 추가/수정해야 하는지 (`css()` 속성 또는 공유 constant 이름)

추가로, 마지막에 `추천 변경 범위`를 짧게 요약합니다.

## 적용 시 예시 (Panda CSS)

### BAD / GOOD

```tsx
// BAD — loading만 center flex, page는 top-aligned content wrapper
// loading.tsx
const loadingStyle = css({ minHeight: "100vh", display: "flex", alignItems: "center", ... });
// SlotPageClient.tsx
const mainStyle = css({ minHeight: "100vh", display: "flex", justifyContent: "center" }); // alignItems 없음 → 콘텐츠 상단 정렬

// GOOD — 공통 shell + loading은 그 안에서 center
export const mainShellStyle = css({
  minHeight: "100vh",
  background: "#07091A",
  display: "flex",
  justifyContent: "center",
});
// loading: className={cx(mainShellStyle, css({ alignItems: "center" }))}
// page:   className={mainShellStyle}
```

```tsx
// BAD — padding/gap 불일치
// loading content wrapper: padding 없음
// page content wrapper: padding: "48px 24px 80px"

// GOOD — 동일 padding
const contentWrapStyle = css({
  width: "100%",
  maxWidth: "740px",
  padding: "48px 24px 80px",
  display: "flex",
  flexDirection: "column",
  gap: "52px",
});
```

```tsx
// BAD — 로드 후에만 있는 헤더 배지·슬롯 그리드가 loading에 없어 전체 높이 점프

// GOOD — loading에 skeleton placeholder (동일 minHeight / gap)
const headerSkeletonStyle = css({ minHeight: "120px", marginBottom: "22px" });
const gridSkeletonStyle = css({ minHeight: "400px", width: "100%", maxWidth: "740px" });
```

### 비교 체크리스트 (Panda 속성)

| 영역 | 비교할 `css()` 속성 |
|------|---------------------|
| 페이지 shell | `minHeight`, `display`, `flexDirection`, `alignItems`, `justifyContent`, `background` |
| 콘텐츠 wrapper | `width`, `maxWidth`, `padding`, `gap` |
| 헤더/타이틀 | `fontSize`, `lineHeight`, `marginBottom`, `textAlign` |
| 카드/그리드 | `minWidth`, `gap`, `flexWrap`, section `minHeight` |

## 범위 밖

- Tailwind class 이름 비교 (`w-full`, `min-h-screen` 등)
- Panda `recipes` / `patterns` 도입 여부 (레이아웃 drift만 본 skill 범위)
- 런타임 동적 `style={{ color: x }}` — layout 치수에 영향 없으면 CLS 검사에서 제외
