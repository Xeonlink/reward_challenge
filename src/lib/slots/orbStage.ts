export function getOrbStage(totalStars: number): 1 | 2 | 3 | 4 | 5 {
  if (totalStars <= 6) return 1;
  if (totalStars <= 20) return 2;
  if (totalStars <= 40) return 3;
  if (totalStars <= 70) return 4;
  return 5;
}
