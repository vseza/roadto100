export function getNextMilestone(
  countryCount: number
) {
  const milestones = [
    10,
    25,
    50,
    75,
    100,
    150,
    195
  ];

  const next =
    milestones.find(
      m => m > countryCount
    ) || 195;

  return {
    current: countryCount,
    nextMilestone: next,
    remaining: next - countryCount
  };
}
