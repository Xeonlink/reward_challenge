# 별모아 (Byulmoa) ⭐

| 하루 3번 운세를 확인하고 별 조각을 모아 나만의 우주를 성장시키는 리워드 웹사이트

<img width="665" height="450" alt="image" src="https://github.com/user-attachments/assets/3e350a47-33f1-4a66-9b9c-725c587e5568" />

**배포 주소:** [polycube-practice.vercel.app](polycube-practice.vercel.app)

---

## 서비스 기획 의도

### 왜 만들었나요?

리워드 서비스의 핵심은 **일일 활성 사용자 확보**입니다.

사용자가 매일 앱을 열어야 광고 노출이 생기고 수익이 발생합니다.
하지만 "광고 보세요"는 아무도 안 봅니다.

**별모아는 이 문제를 "우주 키우기"로 해결합니다.**
하루 3번 운세 확인 (아침 / 점심 / 저녁)
↓
강남철학관 외부 페이지 방문 (광고 수익 발생)
↓
별 조각 획득
↓
나만의 우주가 성장
↓
30일 후 완성된 우주 → 특별 보상 → 새 우주 시작

### 타겟

- 운세/타로에 관심 있는 20~30대
- 매일 소소한 보상을 원하는 직장인/대학생
- 기존 강남철학관 사용자

### 수익 모델

- 외부 URL 체류 시간 기반 광고 수익
- 강남철학관 유료 운세 업셀링
- 별 조각 빠르게 모으기 인앱 구매 확장 가능

---

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **PandaCSS** — 재사용 가능한 Button, Popup 컴포넌트
- **React 18**
- **HTML Canvas** — 우주 orb 애니메이션

---

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. PandaCSS 코드 생성
npm run prepare

# 3. 개발 서버 실행
npm run dev
```

접속: http://localhost:4000

---

## 테스트 방법

README에 적힌 동작 스펙(시간대·슬롯·보너스·추가기회·보상 Flow·우주 단계·30일 사이클)은 **Playwright E2E**로 회귀 테스트합니다.

```bash
# 최초 1회 — Chromium 브라우저 설치
pnpm exec playwright install chromium

# E2E 전체 실행 (dev 서버 :4000 자동 기동)
pnpm test:e2e

# UI 모드
pnpm test:e2e:ui
```

| E2E 스펙 파일                              | README 섹션                                        |
| ------------------------------------------ | -------------------------------------------------- |
| `test/e2e/specs/test-methods.spec.ts`      | 테스트 방법 (URL `?test=`, DevTools, localStorage) |
| `test/e2e/specs/time-slots.spec.ts`        | 슬롯 시간대                                        |
| `test/e2e/specs/extra-opportunity.spec.ts` | 추가기회 케이스                                    |
| `test/e2e/specs/reward-flow.spec.ts`       | 보상 수령 Flow                                     |
| `test/e2e/specs/universe-stages.spec.ts`   | 우주 성장 단계                                     |
| `test/e2e/specs/cycle.spec.ts`             | 30일 사이클                                        |

### URL 파라미터로 시간대 변경

### URL 파라미터로 시간대 변경

개발 서버에서 화면 우하단 **test** 버튼에 마우스를 올리면 DevTools 패널이 열립니다.

| URL              | 시뮬레이션  |
| ---------------- | ----------- |
| `/?test=morning` | 아침 시간대 |
| `/?test=lunch`   | 점심 시간대 |
| `/?test=dinner`  | 저녁 시간대 |

DevTools 1줄: 위 URL 파라미터 Chip · 2줄: 우주 성장 단계 버튼 (`2단계·15` ~ `5단계·80`, `우주 초기화`).

### 콘솔에서 우주 성장 단계 테스트

브라우저 F12 → Console 탭에서 입력 후 새로고침:

```javascript
// 2단계 테스트 (별자리 생성, 7~20개)
localStorage.setItem("byulmoa_universe", JSON.stringify({ totalStars: 15 }));
location.reload();

// 3단계 테스트 (행성 등장, 21~40개)
localStorage.setItem("byulmoa_universe", JSON.stringify({ totalStars: 30 }));
location.reload();

// 4단계 테스트 (밝은 보라+파티클, 41~70개)
localStorage.setItem("byulmoa_universe", JSON.stringify({ totalStars: 55 }));
location.reload();

// 5단계 테스트 (금+보라 오로라, 71개+)
localStorage.setItem("byulmoa_universe", JSON.stringify({ totalStars: 80 }));
location.reload();

// 초기화
localStorage.setItem("byulmoa_universe", JSON.stringify({ totalStars: 0 }));
location.reload();
```

---

## 슬롯 시간대

| 슬롯        | 시간             | 보상       |
| ----------- | ---------------- | ---------- |
| 🌅 아침     | 00:00 ~ 11:59    | 별 조각 +1 |
| ☀️ 점심     | 12:00 ~ 17:59    | 별 조각 +1 |
| 🌙 저녁     | 18:00 ~ 23:59    | 별 조각 +1 |
| ⭐ 보너스   | 3개 모두 완료 시 | 별 조각 +2 |
| ✨ 추가기회 | 조건 충족 시 1회 | 별 조각 +1 |

---

## 우주 성장 단계

| 별 조각 | 단계  | 우주 상태                |
| ------- | ----- | ------------------------ |
| 0 ~ 6   | 1단계 | 텅 빈 어두운 우주        |
| 7 ~ 20  | 2단계 | 파란 빛, 별자리 생성     |
| 21 ~ 40 | 3단계 | 보라빛, 행성 등장        |
| 41 ~ 70 | 4단계 | 밝은 보라 + 파티클       |
| 71 +    | 5단계 | 금 + 보라 오로라, 은하수 |

30일 사이클 완료 시 별 조각 리셋 + 특별 보상 지급

---

## 추가기회 케이스

| 케이스         | 아침       | 점심     | 저녁 |
| -------------- | ---------- | -------- | ---- |
| 점심 완료      | 추가기회   | ✅       | —    |
| 점심+저녁 완료 | 추가기회   | ✅       | ✅   |
| 저녁만 완료    | 🔒참여불가 | 추가기회 | ✅   |
| 점심+저녁 완료 | 추가기회   | ✅       | ✅   |
| 아침+저녁 완료 | ✅         | 추가기회 | ✅   |

추가기회 슬롯은 1회만 사용 가능합니다.

---

## 보상 수령 Flow

슬롯 버튼 클릭
→ 팝업 노출
→ 강남철학관 페이지 이동 (새 탭)
→ 3초 이상 체류
→ 탭 복귀 감지 (visibilitychange)
→ 조건 충족 → 별 조각 지급 + 우주 성장
→ 조건 미충족 → 보상 없음

---

## 컴포넌트 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── SlotPageClient.tsx
│   └── loading.tsx
├── components/
│   ├── cosmic-orb/
│   │   ├── CosmicOrb.tsx
│   │   ├── CosmicOrbStats.tsx
│   │   ├── orbConfig.ts
│   │   ├── useCosmicOrbCanvas.ts
│   │   └── canvas/draw.ts
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Popup.tsx
│   └── slots/
│       ├── SlotGrid.tsx
│       ├── FortuneSlotCardFrame.tsx
│       ├── BonusSlotCardFrame.tsx
│       ├── slotCardLayout.ts
│       ├── RewardPopup.tsx
│       ├── cards/          # Morning/Lunch/Dinner/BonusSlotCard
│       ├── popups/         # Fortune/BonusLocked 팝업
│       └── sections/       # 진행률, 완료 배너, 범례
├── hooks/
│   ├── useSlots.ts         # re-export
│   └── slots/              # useUniverse, useCurrentTime, useFortuneVisit
└── lib/
    ├── slotLogic.ts        # re-export (하위 호환)
    └── slots/              # 타입, 상태 계산, 보상, 시간대
```
