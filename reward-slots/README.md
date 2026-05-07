# 행운 도장 — 일일 보상 슬롯

> PandaCSS 기반 재사용 가능한 버튼 & 팝업 컴포넌트 + 시간대별 보상 슬롯 시스템

---

## 🚀 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. PandaCSS 코드 생성
npm run prepare

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 🧪 테스트 방법

URL 쿼리 파라미터로 시간대를 오버라이드할 수 있습니다.

| URL | 시뮬레이션 시간대 |
|-----|------------|
| `/?test=morning` | 아침 (00:00 ~ 11:59) |
| `/?test=lunch` | 점심 (12:00 ~ 17:59) |
| `/?test=dinner` | 저녁 (18:00 ~ 23:59) |

팝업 내 **테스트: 성공 / 실패** 버튼으로 외부 방문 결과를 시뮬레이션할 수 있습니다.

---

## 🛠️ 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **PandaCSS** — CSS-in-JS 스타일링
- **React 18**

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지 (Suspense wrapping)
│   ├── SlotPageClient.tsx  # 클라이언트 페이지 (useSearchParams)
│   └── globals.css         # 전역 스타일
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # 재사용 버튼 컴포넌트
│   │   └── Popup.tsx       # 재사용 팝업 컴포넌트
│   └── slots/
│       ├── SlotCard.tsx    # 개별 슬롯 카드
│       ├── SlotGrid.tsx    # 슬롯 전체 레이아웃
│       ├── SlotPopup.tsx   # 슬롯 클릭 팝업
│       └── RewardPopup.tsx # 보상 결과 팝업
├── hooks/
│   └── useSlots.ts         # 슬롯 상태 관리 훅
└── lib/
    └── slotLogic.ts        # 슬롯 비즈니스 로직
```

---

## 🎨 컴포넌트 스펙

### Button 컴포넌트

```tsx
<Button
  variant="primary" | "secondary" | "ghost" | "danger" | "gold"
  size="sm" | "md" | "lg" | "xl"
  disabled={boolean}
  loading={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  fullWidth={boolean}
>
  버튼 텍스트
</Button>
```

### Popup 컴포넌트

```tsx
<Popup
  open={boolean}
  onClose={() => void}
  title={ReactNode}
  size="sm" | "md" | "lg"
  closeOnBackdrop={boolean}
  showClose={boolean}
>
  팝업 내용
</Popup>
```

---

## ⏰ 슬롯 시간대

| 슬롯 | 시간 |
|------|------|
| 🌅 아침 | 00:00 ~ 11:59 |
| ☀️ 점심 | 12:00 ~ 17:59 |
| 🌙 저녁 | 18:00 ~ 23:59 |
| ⭐ 보너스 | 3개 슬롯 모두 완료 시 |

---

## 🔄 보상 수령 Flow

1. 슬롯 버튼 클릭
2. 팝업 노출 (SlotPopup)
3. 외부 URL 방문 (새 탭)
4. 3초 이상 체류 후 복귀
5. 조건 충족 → 보상 지급 팝업 (RewardPopup)
6. 조건 불충족 → 보상 없음 팝업

---

## 🎁 추가 기회 로직

| 케이스 | 아침 | 점심 | 저녁 |
|--------|------|------|------|
| 점심 완료 | 추가기회 | ✅ | - |
| 점심 완료 + 저녁 접속 | 추가기회 | ✅ | 참여가능 |
| 저녁만 완료 (케이스1) | 🔒참여불가 | 추가기회 | ✅ |
| 점심+저녁 완료 (케이스2) | 추가기회 | ✅ | ✅ |
| 아침+저녁 완료 (케이스3) | ✅ | 추가기회 | ✅ |

> 추가 기회 슬롯은 1회만 사용 가능

---

## 💾 데이터 저장

- `localStorage`에 당일 완료 기록 저장
- 날짜가 변경되면 자동 초기화
- `sessionStorage`로 외부 방문 시간 추적
