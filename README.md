# 별모아 (Byulmoa) ⭐

| 하루 3번 운세를 확인하고 별 조각을 모아 나만의 우주를 성장시키는 리워드 웹사이트

<img width="665" height="450" alt="image" src="https://github.com/user-attachments/assets/3e350a47-33f1-4a66-9b9c-725c587e5568" />



**배포 주소:** [polycube-practice.vercel.app](polycube-practice.vercel.app)

---

## 서비스 기획 의도

### 왜 만들었나요?

폴리큐브는 OK캐시백, 강남철학관 등 리워드 기반 플랫폼을 운영하는 기업입니다.
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

접속: http://localhost:3000

---

## 테스트 방법

### URL 파라미터로 시간대 변경

| URL | 시뮬레이션 |
|-----|-----------|
| `/?test=morning` | 아침 시간대 |
| `/?test=lunch` | 점심 시간대 |
| `/?test=dinner` | 저녁 시간대 |

### 콘솔에서 우주 성장 단계 테스트

브라우저 F12 → Console 탭에서 입력 후 새로고침:

```javascript
// 2단계 테스트 (별자리 생성, 7~20개)
localStorage.setItem('byulmoa_universe', JSON.stringify({totalStars: 15})); location.reload();

// 3단계 테스트 (행성 등장, 21~40개)
localStorage.setItem('byulmoa_universe', JSON.stringify({totalStars: 30})); location.reload();

// 4단계 테스트 (밝은 보라+파티클, 41~70개)
localStorage.setItem('byulmoa_universe', JSON.stringify({totalStars: 55})); location.reload();

// 5단계 테스트 (금+보라 오로라, 71개+)
localStorage.setItem('byulmoa_universe', JSON.stringify({totalStars: 80})); location.reload();

// 초기화
localStorage.setItem('byulmoa_universe', JSON.stringify({totalStars: 0})); location.reload();
```

---

## 슬롯 시간대

| 슬롯 | 시간 | 보상 |
|------|------|------|
| 🌅 아침 | 00:00 ~ 11:59 | 별 조각 +1 |
| ☀️ 점심 | 12:00 ~ 17:59 | 별 조각 +1 |
| 🌙 저녁 | 18:00 ~ 23:59 | 별 조각 +1 |
| ⭐ 보너스 | 3개 모두 완료 시 | 별 조각 +2 |
| ✨ 추가기회 | 조건 충족 시 1회 | 별 조각 +1 |

---

## 우주 성장 단계

| 별 조각 | 단계 | 우주 상태 |
|---------|------|----------|
| 0 ~ 6 | 1단계 | 텅 빈 어두운 우주 |
| 7 ~ 20 | 2단계 | 파란 빛, 별자리 생성 |
| 21 ~ 40 | 3단계 | 보라빛, 행성 등장 |
| 41 ~ 70 | 4단계 | 밝은 보라 + 파티클 |
| 71 + | 5단계 | 금 + 보라 오로라, 은하수 |

30일 사이클 완료 시 별 조각 리셋 + 특별 보상 지급

---

## 추가기회 케이스

| 케이스 | 아침 | 점심 | 저녁 |
|--------|------|------|------|
| 점심 완료 | 추가기회 | ✅ | — |
| 점심+저녁 완료 | 추가기회 | ✅ | ✅ |
| 저녁만 완료 | 🔒참여불가 | 추가기회 | ✅ |
| 점심+저녁 완료 | 추가기회 | ✅ | ✅ |
| 아침+저녁 완료 | ✅ | 추가기회 | ✅ |

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
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   ├── SlotPageClient.tsx  # 클라이언트 (useSearchParams)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # 재사용 버튼 (variant/size/loading/disabled)
│   │   └── Popup.tsx       # 재사용 팝업
│   └── slots/
│       ├── SlotCard.tsx    # 슬롯 카드
│       ├── SlotGrid.tsx    # 슬롯 전체 레이아웃
│       ├── SlotPopup.tsx   # 슬롯 클릭 팝업
│       ├── RewardPopup.tsx # 보상 결과 팝업
│       └── CosmicOrb.tsx  # 우주 orb 캔버스
├── hooks/
│   └── useSlots.ts         # 슬롯 상태 관리
└── lib/
    └── slotLogic.ts        # 비즈니스 로직
```
