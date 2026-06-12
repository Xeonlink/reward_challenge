interface IconProps {
  color: string;
  size?: number;
  className?: string;
}

// 아침 - 일출 (반원 + 지평선 + 빛살)
export function MorningIcon({ color, size = 40, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* 지평선 */}
      <line
        x1="4"
        y1="27"
        x2="36"
        y2="27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* 태양 반원 */}
      <path
        d="M13 27 A7 7 0 0 1 27 27"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* 태양 중심 빛 */}
      <circle cx="20" cy="27" r="2.5" fill={color} opacity="0.45" />
      {/* 빛살 5개 */}
      <line
        x1="20"
        y1="16.5"
        x2="20"
        y2="12"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="25.5"
        y1="18.5"
        x2="28.5"
        y2="15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="14.5"
        y1="18.5"
        x2="11.5"
        y2="15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="29.5"
        y1="23.5"
        x2="33"
        y2="22.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <line
        x1="10.5"
        y1="23.5"
        x2="7"
        y2="22.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

// 점심 - 태양 (원 + 8방향 빛살)
export function LunchIcon({ color, size = 40, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* 태양 본체 */}
      <circle
        cx="20"
        cy="20"
        r="6.5"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
      />
      {/* 내부 채움 */}
      <circle cx="20" cy="20" r="3.5" fill={color} opacity="0.35" />
      {/* 빛살 8개 (긴 4 + 짧은 4) */}
      <line
        x1="29"
        y1="20"
        x2="33.5"
        y2="20"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="20"
        x2="6.5"
        y2="20"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="11"
        x2="20"
        y2="6.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="29"
        x2="20"
        y2="33.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="25"
        y1="15"
        x2="28"
        y2="12"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="15"
        y1="25"
        x2="12"
        y2="28"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="25"
        y1="25"
        x2="28"
        y2="28"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <line
        x1="15"
        y1="15"
        x2="12"
        y2="12"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

// 저녁 - 초승달 + 별
export function DinnerIcon({ color, size = 40, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* 초승달 */}
      <path
        d="M19,9 A11,11 0 1,0 19,31 A8,9 0 1,1 19,9 Z"
        fill={`${color}30`}
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* 큰 별 */}
      <path
        d="M31,11 L32.1,14.2 L35.5,14.2 L32.8,16.2 L33.9,19.4 L31,17.4 L28.1,19.4 L29.2,16.2 L26.5,14.2 L29.9,14.2 Z"
        fill={color}
        opacity="0.85"
      />
      {/* 작은 별 */}
      <circle cx="33" cy="24" r="1.2" fill={color} opacity="0.5" />
      <circle cx="28" cy="27" r="0.8" fill={color} opacity="0.35" />
    </svg>
  );
}

// 보너스 - 유성 (별 + 꼬리)
export function BonusIcon({ color, size = 40, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      {/* 유성 꼬리 3개 */}
      <line
        x1="24"
        y1="17"
        x2="7"
        y2="34"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.65"
      />
      <line
        x1="22"
        y1="15"
        x2="5"
        y2="32"
        stroke={color}
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.35"
      />
      <line
        x1="26"
        y1="18"
        x2="9"
        y2="35"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* 5각 별 */}
      <path
        d="M28,5 L29.9,10.5 L35.8,10.5 L31.1,13.9 L33,19.4 L28,16 L23,19.4 L24.9,13.9 L20.2,10.5 L26.1,10.5 Z"
        fill={`${color}40`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 별 조각 아이콘 (보상 표시용)
export function StarFragmentIcon({
  color = "#FFD166",
  size = 24,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12,2 L14.5,8.5 L21.5,9.3 L16.5,14.2 L18,21 L12,17.5 L6,21 L7.5,14.2 L2.5,9.3 L9.5,8.5 Z"
        fill={`${color}35`}
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 잠금 아이콘
export function LockIcon({
  color = "#3A4870",
  size = 24,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2.5"
        stroke={color}
        strokeWidth="1.6"
        fill={`${color}20`}
      />
      <path
        d="M8,11 V7.5 A4,4 0 0,1 16,7.5 V11"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="16" r="1.5" fill={color} opacity="0.7" />
    </svg>
  );
}

// 체크 아이콘
export function CheckIcon({
  color = "#5CE8A0",
  size = 20,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        stroke={color}
        strokeWidth="1.4"
        fill={`${color}15`}
      />
      <path
        d="M6 10.5 L8.5 13 L14 7.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
