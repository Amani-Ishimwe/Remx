import { Deck, ReviewGrade } from "./types";

export const SRS_INTERVALS: number[] = [1, 3, 7, 14, 30];

export function calculateNextReview(
  currentIntervalIndex: number,
  grade: ReviewGrade
): { nextIntervalIndex: number; nextDueAt: string } {
  let nextIntervalIndex = currentIntervalIndex;

  if (grade === "got_it") {
    nextIntervalIndex = Math.min(currentIntervalIndex + 1, SRS_INTERVALS.length - 1);
  } else {
    // Forgot resets to index 0 (1 day interval)
    nextIntervalIndex = 0;
  }

  const daysToAdd = SRS_INTERVALS[nextIntervalIndex];
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return {
    nextIntervalIndex,
    nextDueAt: nextDate.toISOString(),
  };
}

export function isDeckDue(deck: Deck): boolean {
  if (!deck.nextDueAt) return true;
  return new Date(deck.nextDueAt).getTime() <= new Date().getTime();
}

export function getDaysUntilDue(deck: Deck): number {
  if (!deck.nextDueAt) return 0;
  const diffMs = new Date(deck.nextDueAt).getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function formatDueDate(isoString: string | null): string {
  if (!isoString) return "Due today";
  const dueDate = new Date(isoString);
  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  return `Due in ${diffDays} days`;
}

export function getRetentionStageLabel(intervalIndex: number): string {
  switch (intervalIndex) {
    case 0:
      return "Day 1 (Immediate Recall)";
    case 1:
      return "Day 3 (Consolidation)";
    case 2:
      return "Day 7 (Reinforcement)";
    case 3:
      return "Day 14 (Long-Term Retention)";
    case 4:
      return "Day 30 (Mastered)";
    default:
      return "Day 1";
  }
}

export function getRetentionStrength(intervalIndex: number): number {
  return Math.round(((intervalIndex + 1) / SRS_INTERVALS.length) * 100);
}
