# 별모아 (Byulmoa)

> 하루 3번 운세를 확인하고 별 조각을 모아 나만의 우주를 성장시키는 리워드 웹사이트

## 📋 개요

<p align="center">
  <img src="docs/images/overview.png" alt="별모아 메인 화면" width="430" />
</p>

별모아는 **하루 3번 운세 확인**과 **우주 키우기**를 결합한 리워드 웹앱입니다. 아침·점심·저녁 슬롯에 참여해 별 조각을 모으면 Canvas 우주 오브가 단계별로 성장하고, 30일 사이클을 완료하면 특별 보상 후 새 여정이 시작됩니다.

**배포 주소:** [polycube-practice.vercel.app](https://polycube-practice.vercel.app)

### 서비스 기획

#### 왜 만들었나요?

리워드 서비스의 핵심은 **일일 활성 사용자 확보**입니다.

사용자가 매일 앱을 열어야 광고 노출이 생기고 수익이 발생합니다.
하지만 "광고 보세요"는 아무도 안 봅니다.

**별모아는 이 문제를 "우주 키우기"로 해결합니다.**

```
하루 3번 운세 확인 (아침 / 점심 / 저녁)
↓
강남철학관 외부 페이지 방문 (광고 수익 발생)
↓
별 조각 획득
↓
나만의 우주가 성장
↓
30일 후 완성된 우주 → 특별 보상 → 새 우주 시작
```

#### 타겟

- 운세/타로에 관심 있는 20~30대
- 매일 소소한 보상을 원하는 직장인/대학생
- 기존 강남철학관 사용자

#### 수익 모델

- 외부 URL 체류 시간 기반 광고 수익
- 강남철학관 유료 운세 업셀링
- 별 조각 빠르게 모으기 인앱 구매 확장 가능

---

## 🛠️ 기술스택

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PandaCSS](https://img.shields.io/badge/PandaCSS-1-FD8BA0)
![Zustand](https://img.shields.io/badge/Zustand-5-443B2E)
![Immer](https://img.shields.io/badge/Immer-11-00B4AB)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)
![Canvas](https://img.shields.io/badge/HTML_Canvas-Orb-111)

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **PandaCSS** — Button, Popup, Chip 등 UI 컴포넌트
- **Zustand + Immer** — 우주·슬롯 상태 (persist)
- **date-fns** — 사이클·시간대 계산
- **Radix UI** — 접근성 기반 프리미티브
- **HTML Canvas** — 우주 orb 애니메이션
- **Playwright** — README 스펙 E2E 회귀 테스트

---

## ⭐ 주요기능

### 1. 🌅 일일 운세 슬롯

<p align="center">
  <img src="docs/images/slots.png" alt="슬롯 카드 4종" width="430" />
  <img src="docs/images/slot-popup.png" alt="아침 운세 팝업" width="430" />
</p>

하루에 아침·점심·저녁 3번 운세를 확인하고, 모두 완료하면 보너스 슬롯이 열립니다. 각 슬롯은 현재 시간대에 따라 **참여 가능(active)**, **추가기회(extra)**, **잠김(locked)** 상태로 표시됩니다.

| 용어        | 설명                                    |
| ----------- | --------------------------------------- |
| 아침 슬롯   | 00:00 ~ 11:59, 별 조각 +1               |
| 점심 슬롯   | 12:00 ~ 17:59, 별 조각 +1               |
| 저녁 슬롯   | 18:00 ~ 23:59, 별 조각 +1               |
| 보너스 슬롯 | 하루 3개 슬롯 모두 완료 시, 별 조각 +2  |
| 추가기회    | 놓친 슬롯을 보충할 수 있는 1회 기회, +1 |

| 슬롯        | 시간             | 보상       |
| ----------- | ---------------- | ---------- |
| 🌅 아침     | 00:00 ~ 11:59    | 별 조각 +1 |
| ☀️ 점심     | 12:00 ~ 17:59    | 별 조각 +1 |
| 🌙 저녁     | 18:00 ~ 23:59    | 별 조각 +1 |
| ⭐ 보너스   | 3개 모두 완료 시 | 별 조각 +2 |
| ✨ 추가기회 | 조건 충족 시 1회 | 별 조각 +1 |

### 2. 🌌 우주 성장

<p align="center">
  <img src="docs/images/universe-stage-2.png" alt="우주 2단계" width="430" />
  <img src="docs/images/universe-stage-5.png" alt="우주 5단계" width="430" />
</p>

모은 별 조각 수에 따라 Canvas 우주 오브가 5단계로 성장합니다. DevTools에서 별 개수를 조절해 각 단계를 바로 확인할 수 있습니다.

| 별 조각 | 단계  | 우주 상태                |
| ------- | ----- | ------------------------ |
| 0 ~ 6   | 1단계 | 텅 빈 어두운 우주        |
| 7 ~ 20  | 2단계 | 파란 빛, 별자리 생성     |
| 21 ~ 40 | 3단계 | 보라빛, 행성 등장        |
| 41 ~ 70 | 4단계 | 밝은 보라 + 파티클       |
| 71 +    | 5단계 | 금 + 보라 오로라, 은하수 |

Day 30 도달과 별 조각 150개 달성을 동시에 충족하면 사이클 완성 팝업이 열리고, 별 조각이 리셋됩니다.

### 3. 🎁 보상 수령 Flow

<p align="center">
  <img src="docs/images/reward-flow.png" alt="별 조각 획득 팝업" width="430" />
</p>

슬롯 참여 후 강남철학관 페이지에서 일정 시간 이상 체류해야 별 조각이 지급됩니다. 탭 복귀 시 `visibilitychange`로 체류 시간을 검증합니다.

| 단계 | 동작                                 |
| ---- | ------------------------------------ |
| 1    | 슬롯 버튼 클릭                       |
| 2    | 팝업 노출                            |
| 3    | 강남철학관 페이지 이동 (새 탭)       |
| 4    | 3초 이상 체류                        |
| 5    | 탭 복귀 감지 (`visibilitychange`)    |
| 6    | 조건 충족 → 별 조각 지급 + 우주 성장 |
| 7    | 조건 미충족 → 보상 없음              |

### 4. ✨ 보너스 & 추가기회

<p align="center">
  <img src="docs/images/bonus-extra.png" alt="추가기회 슬롯 상태" width="430" />
</p>

각 슬롯은 **현재 시간대(`?test=` 또는 실제 시각)** 기준으로 상태가 결정됩니다. 표의 열(아침·점심·저녁)은 해당 시간대에 슬롯이 어떤 상태인지를 뜻합니다.

| 슬롯 | 아침 시간 | 점심 시간 | 저녁 시간 |
| ---- | --------- | --------- | --------- |
| 아침 | active    | extra     | locked    |
| 점심 | inactive  | active    | extra     |
| 저녁 | locked    | locked    | active    |

완료 조합 예시 (`?test=`는 확인 시각):

| 케이스         | test   | 아침       | 점심     | 저녁 |
| -------------- | ------ | ---------- | -------- | ---- |
| 점심 완료      | lunch  | 추가기회   | ✅       | —    |
| 점심+저녁 완료 | dinner | 🔒참여불가 | ✅       | ✅   |
| 저녁만 완료    | dinner | 🔒참여불가 | 추가기회 | ✅   |
| 아침+저녁 완료 | dinner | ✅         | 추가기회 | ✅   |

추가기회는 슬롯별 허용 시간대가 겹치지 않아, 같은 순간에 extra 슬롯은 하나뿐입니다.

### 5. 🔄 30일 사이클

<p align="center">
  <img src="docs/images/cycle-complete.png" alt="우주 완성 팝업" width="430" />
</p>

30일이 지나고 별 조각 150개를 모으면 우주가 완성됩니다. 완성 팝업에서 **새 여정 시작**을 누르면 별 조각이 리셋되고 다음 사이클이 시작됩니다.

| 용어         | 설명                                  |
| ------------ | ------------------------------------- |
| 사이클 기간  | Day 1 ~ Day 30                        |
| 완성 조건    | Day 30 도달 + 별 조각 150개 동시 충족 |
| 완성 후      | 별 조각 리셋, 사이클 시작일 갱신      |
| 새 여정 시작 | 완성 팝업 확인 후 다음 사이클로 진입  |

---

## 🚀 실행 방법

```bash
# 1. 의존성 설치
pnpm install

# 2. PandaCSS 코드 생성
pnpm run prepare

# 3. 개발 서버 실행
pnpm run dev
```

접속: http://localhost:4000

---

## 🧪 테스트 방법

README에 적힌 동작 스펙(시간대·슬롯·보너스·추가기회·보상 Flow·우주 단계·30일 사이클)은 **Playwright E2E**로 회귀 테스트합니다.

```bash
# 최초 1회 — Chromium 브라우저 설치
pnpm exec playwright install chromium

# E2E 전체 실행 (dev 서버 :4000 자동 기동)
pnpm test:e2e

# UI 모드
pnpm test:e2e:ui
```

| E2E 스펙 파일                              | README 섹션                          |
| ------------------------------------------ | ------------------------------------ |
| `test/e2e/specs/test-methods.spec.ts`      | 테스트 방법 (URL `?test=`, DevTools) |
| `test/e2e/specs/time-slots.spec.ts`        | 주요기능 1 — 슬롯 시간대             |
| `test/e2e/specs/extra-opportunity.spec.ts` | 주요기능 4 — 추가기회 케이스         |
| `test/e2e/specs/reward-flow.spec.ts`       | 주요기능 3 — 보상 수령 Flow          |
| `test/e2e/specs/universe-stages.spec.ts`   | 주요기능 2 — 우주 성장 단계          |
| `test/e2e/specs/cycle.spec.ts`             | 주요기능 5 — 30일 사이클             |

### URL 파라미터 & DevTools

개발 서버에서 화면 우하단 **개발 도구**를 클릭하면 DevTools 패널이 열리고, 다시 클릭하면 닫힙니다.

<p align="center">
  <img src="docs/images/dev-tools.png" alt="개발 도구 패널" width="430" />
</p>

| URL              | 시뮬레이션  |
| ---------------- | ----------- |
| `/?test=morning` | 아침 시간대 |
| `/?test=lunch`   | 점심 시간대 |
| `/?test=dinner`  | 저녁 시간대 |

DevTools 구성:

| 섹션          | 기능                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| 우주 상태     | 오브 단계·별 조각·사이클 시작일·슬롯 완료 기록(M/L/D/B)                 |
| 시간대        | 아침/점심/저녁 Chip 링크, 초기화                                        |
| 별 개수       | 숫자 입력 + **적용**(live) / **적용·reload** — 우주 성장 단계 확인      |
| 사이클 시작일 | `yyyy-MM-dd` 입력 + **적용**(live) / **적용·reload** — Day N 시뮬레이션 |
| 사이클        | 우주 초기화, 30일 완료·reload, 완료 팝업 미리보기                       |

우주 성장 단계·슬롯 기록·사이클 완료는 DevTools만으로 시뮬레이션할 수 있습니다. 콘솔에서 `localStorage`를 직접 수정할 필요가 없습니다.

README 스크린샷 재생성:

```bash
node scripts/capture-readme-screenshots.mjs
```

---

## 📁 컴포넌트 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   └── globals.css
├── components/
│   ├── StarBackground.tsx
│   ├── dev-tools.tsx
│   ├── modal.tsx
│   ├── Progress.tsx
│   ├── cosmic-orb/
│   │   ├── CosmicOrb.tsx
│   │   ├── CosmicOrbProgress.tsx
│   │   ├── CosmicOrbStats.tsx
│   │   ├── orbConfig.ts
│   │   ├── useCosmicOrbCanvas.ts
│   │   └── draw.ts
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Chip.tsx
│   │   ├── Heading.tsx
│   │   ├── Popup.tsx
│   │   ├── Skeleton.tsx
│   │   └── Text.tsx
│   └── slots/
│       ├── DailyStarsProgress.tsx
│       ├── OnCycleCompleteRender.tsx
│       ├── SlotIcons.tsx
│       ├── cards/          # Morning/Lunch/Dinner/BonusSlotCard
│       └── popups/         # Morning/Lunch/Dinner/Bonus, Reward, CycleComplete
├── hooks/
│   ├── useCurrentTime.ts
│   ├── useFortuneVisit.ts
│   ├── useStarsFromDay.ts
│   ├── useUniverse.ts
│   └── useUniverseDays.ts
└── lib/
    ├── constants.ts
    ├── universe.ts
    └── slots/
        └── universe.ts
```
