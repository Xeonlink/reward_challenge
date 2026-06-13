---
name: fix-do-not
description: Scans the codebase for styling and architecture patterns the user explicitly forbade, then fixes violations. Use when implementing plans, refactoring CSS/Panda, reviewing diffs, or when the user says "하지 말라", "fix-do-not", or asks to enforce project prohibitions.
---

# Fix Do-Not

사용자가 대화에서 **하지 말라**고 명시한 패턴이 코드에 있으면 찾아서 고친다.  
새 코드 작성·plan 구현·리뷰 전에 이 스킬을 적용한다.

## 워크플로

1. 아래 **금지 목록**마다 검색 명령 실행
2. 위반 파일 목록 작성
3. 각 위반을 **수정 가이드**대로 고침 (예외는 그대로 둠)
4. `pnpm run build`로 확인

## 금지 목록 (검색 → 수정)

### A. `panda.config.ts` 비대화 금지

| 금지 | 검색 | 수정 |
|------|------|------|
| `globalCss` in config | `rg 'globalCss' panda.config.ts` | 전역 규칙은 `src/app/globals.css` `@layer base` |
| `recipes` / `textStyles` / `layerStyles` | `rg 'recipes:|textStyles:|layerStyles:' panda.config.ts` | 해당 컴포넌트 `.tsx` 파일 내 `cva()` |
| 컴포넌트 variant를 config로 | `defineRecipe` / `defineSlotRecipe` | 컴포넌트 파일 `cva()` |
| 테마 palette·semanticTokens·conditions | `semanticTokens|conditions:|palette` in `panda.config.ts` | 테마 hex는 `globals.css` `@layer theme`만 |
| config에 테마 hex 직접 정의 | hex in `panda.config.ts` `colors` (브릿지 `var(--colors-*)` 제외) | `globals.css`로 이동 후 `var()` 브릿지 |

**허용**: `tokens`가 `var(--colors-*)`를 가리키는 브릿지, `keyframes`, `fonts`, `radii`, `shadows`, 비테마 literal.

### B. `_styles` · 조기 공통화 금지

| 금지 | 검색 | 수정 |
|------|------|------|
| `_styles` 디렉터리 | `rg '_styles' src` / `glob **/_styles/**` | 스타일을 사용처 `.tsx`로 분산; 디렉터리 삭제 |
| `shellStyles.ts` | `shellStyles` | `layout.tsx` 등 사용처에 인라인 `css()` |
| CSS-only 공유 파일 | `typography.ts`, `pageShell.ts` 등 스타일 전용 모듈 | 3곳+면 `src/components/ui/` 컴포넌트, 아니면 각 파일에 `cva` |

**규칙**: 동일 패턴이 **3곳 이상**일 때만 UI 컴포넌트로 추출. 1~2곳은 중복 허용.

### C. 레이아웃 셸

| 금지 | 검색 | 수정 |
|------|------|------|
| `shellColumnStyle` / 불필요 셸 래퍼 | `shellColumnStyle|shellContentStyle` in `layout.tsx` | `body` 직접 자식: `StarCanvas`, `header`, `{children}`, `footer` 만 |
| 헤더·푸터만 inner max-width에 갇힘 | `layout.tsx` 중첩 div | `body > header, main, footer { max-width: … }` 등 flat 구조 |

### D. rem · px 스케일

| 금지 | 검색 | 수정 |
|------|------|------|
| `html { font-size: … }` 루트 rem 오버라이드 | `font-size:` in `globals.css` `html` | 선언 **제거** (브라우저 기본 16px·`1rem` 유지) |
| `px` 치수 (예외 제외) | `rg '\d+px' src panda.config.ts` | `rem`으로 변환 (`÷16` 후 **0.125rem 배수**로 반올림) |
| rem 0.125 배수 아님 | 수동: `0.375rem` OK, `0.3rem` NG | 가장 가까운 0.125 배수로 |

**px 예외 (수정하지 않음)**:

- `min-height: 100vh`
- `border: 1px` / `outline: 1px` / `outline: 2px`
- `box-shadow` blur/spread 숫자
- canvas `width`/`height` 속성(픽셀 해상도)
- 아이콘 `size={N}` prop

### E. 테마 CSS variable 위치

| 금지 | 검색 | 수정 |
|------|------|------|
| 테마 hex가 `globals.css` 밖 | hex in component `tsx` (슬롯·브랜드 색) | `var(--colors-*)` 또는 Panda 토큰 `color: "accent"` |
| `@layer base`에 `--colors-*` 정의 | `--colors-bg:` inside `@layer base` only | `@layer theme`의 `html.cosmic` / `html.aurora` |
| `theme` layer가 `tokens` 앞 | layer order in `globals.css` | `@layer …, tokens, …, theme` — **theme은 tokens 뒤** |

### F. Inline style · typography

| 금지 | 검색 | 수정 |
|------|------|------|
| 정적 `style={{ fontSize, fontFamily, padding… }}` | `style={{` in `src/components` | `cva` / `css()` / `Text` variant |
| `getCardStyle(): CSSProperties` | `getCardStyle|CSSProperties` in slots UI | `cva` status variants |
| DOM hover `el.style.transform` | `el.style.transform` | `cva` `_hover` / `_active` |
| 하드코딩 폰트명 | `'Orbitron'|'JetBrains Mono'|'Noto Sans KR'` | `fontFamily: "display"|"mono"|"body"` |
| `var(--fonts-display)` | `var(--fonts-` in tsx | `fontFamily: "display"` |
| raw rem in `css()` | `fontSize: "0\.` in tsx | `fontSize: "xs"|"2xs"|"sm"` 등 토큰 |

**inline `style` 허용 (수정하지 않음)**:

- 진행률 `width: \`${pct}%\``
- CosmicOrb stage geometry (`top`/`left`/`width` from config)
- 슬롯·stage별 단일 동적 색 — 가능하면 wrapper `--slot-accent` CSS 변수

### G. 기타

| 금지 | 검색 | 수정 |
|------|------|------|
| plan 파일 수정 (구현 요청 시) | 사용자가 첨부한 `.cursor/plans/*.plan.md` | plan은 읽기만; todo/코드만 변경 |
| Panda tokens layer가 테마 덮음 | dev에서 `--colors-bg` 빈 값 | `globals.css` `@layer theme` 순서 확인 |

## 빠른 검색 스크립트

```sh
# 한 번에 스캔 (위반 후보; 예외는 수동 확인)
rg 'globalCss|semanticTokens|defineRecipe' panda.config.ts
rg '_styles|shellStyles|shellColumnStyle' src
rg "font-size:" src/app/globals.css
rg '\d+px' src --glob '*.{tsx,ts,css}' | rg -v '100vh|1px|2px|blur|shadow|canvas'
rg "fontSize: \"0\." src/components
rg "'Orbitron'|'JetBrains Mono'|var\\(--fonts-" src
rg 'getCardStyle|el\.style\.transform' src
```

## 수정 우선순위

1. **깨짐** — 테마 variable 비어 있음, layout 구조
2. **아키텍처** — `_styles`, panda.config 비대화
3. **스타일 일관성** — px→rem, inline→cva, 토큰
4. **가시성** — `fg.muted` / `fg.dim`이 너무 어두우면 `globals.css` theme layer에서만 조정

## 완료 기준

- 위 스캔에서 금지 패턴 **0건** (명시적 예외 제외)
- `pnpm run build` 통과
- 테마: DevTools `html`의 `--colors-bg`에 hex 값 존재
