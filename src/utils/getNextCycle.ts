export function getNextCycle(
  currentCycle: number,
): number {
  return currentCycle == 0 || currentCycle == 8 ? 1 : currentCycle + 1; // Reset to the first cycle if the last cycle is reached
}