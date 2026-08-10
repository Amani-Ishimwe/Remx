export type FlashcardItem = {
  id: string;
  front: string;
  back: string;
  mastered?: boolean;
};

export type QuizQuestionItem = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

export type Deck = {
  id: string;
  title: string;
  sourceUrl?: string;
  sourceText?: string;
  summary: string;
  keyTakeaways: string[];
  ownerId: string;
  groupId?: string; // present if shared with a group
  groupName?: string;
  flashcards: FlashcardItem[];
  quiz: QuizQuestionItem[];
  createdAt: string;
  intervalIndex: number; // index into [1, 3, 7, 14, 30]
  nextDueAt: string | null;
  reviewCount: number;
  lastReviewedAt?: string | null;
  category?: string;
  tags?: string[];
  masteredCount?: number;
};

export type GroupMember = {
  userId: string;
  name: string;
  avatar: string;
  role: "owner" | "member";
  streak: number;
  cardsMastered: number;
  decksReviewed: number;
};

export type GroupActivity = {
  id: string;
  type: "deck_added" | "review_completed" | "streak_milestone" | "member_joined";
  message: string;
  at: string;
  user: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  inviteCode: string;
  members: GroupMember[];
  deckIds: string[];
  activity: GroupActivity[];
  createdAt: string;
};

export type Goal = {
  id: string;
  label: string; // e.g. "Understand Kubernetes networking"
  category: string;
  createdAt: string;
  progressPercent?: number;
};

export type FeedItem = {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  readTimeMins: number;
  relatedGoalId: string;
  relevanceNote: string; // e.g. "fills a gap in: Kubernetes networking"
  sampleContent: string;
  category: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  streak: number;
  lastReviewDate: string | null;
  totalReviewsCompleted: number;
  cardsMastered: number;
  activeGoalIds: string[];
  notificationIntervals: number[]; // [1, 3, 7, 14, 30]
  emailDigest: boolean;
};

export type ReviewGrade = "got_it" | "forgot";

export type SpacedInterval = 1 | 3 | 7 | 14 | 30;
