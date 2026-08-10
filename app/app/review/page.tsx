"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { Flashcard } from "@/components/deck/Flashcard";
import { MonochromeCelebration } from "@/components/ui/MonochromeCelebration";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressRing";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";
import { isDeckDue, getRetentionStageLabel, formatDueDate } from "@/lib/srs";
import { Deck, ReviewGrade } from "@/lib/types";

function ReviewSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedDeckId = searchParams.get("deckId");

  const { decks, gradeDeckReview, user } = useRemxStore();

  const dueDecks = decks.filter(isDeckDue);

  // Active deck being reviewed
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sessionGrades, setSessionGrades] = useState<ReviewGrade[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sessionSummary, setSessionSummary] = useState<{
    nextDueAt: string;
    intervalIndex: number;
    streak: number;
  } | null>(null);

  useEffect(() => {
    if (requestedDeckId) {
      const match = decks.find((d) => d.id === requestedDeckId);
      if (match) {
        setActiveDeck(match);
        return;
      }
    }

    if (dueDecks.length > 0) {
      setActiveDeck(dueDecks[0]);
    } else if (decks.length > 0) {
      setActiveDeck(decks[0]);
    }
  }, [requestedDeckId, decks]);

  if (!activeDeck) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <EmptyState
          icon={CheckCircle2}
          title="No Decks Found"
          description="Add articles to your library to start spaced repetition reviews."
          actionLabel="Generate New Deck"
          onAction={() => router.push("/app/new")}
        />
      </div>
    );
  }

  const currentCard = activeDeck.flashcards[currentCardIndex];
  const progressPercent = Math.round(((currentCardIndex) / activeDeck.flashcards.length) * 100);

  const handleGradeCard = (grade: ReviewGrade) => {
    const nextGrades = [...sessionGrades, grade];
    setSessionGrades(nextGrades);

    if (currentCardIndex + 1 < activeDeck.flashcards.length) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Finished all cards for this deck
      const overallGrade: ReviewGrade =
        nextGrades.filter((g) => g === "got_it").length >= nextGrades.length / 2
          ? "got_it"
          : "forgot";

      const summary = gradeDeckReview(activeDeck.id, overallGrade);
      setSessionSummary(summary);
      setIsCompleted(true);
      setShowCelebration(true);
    }
  };

  const handleNextDueDeck = () => {
    const remainingDue = decks.filter((d) => isDeckDue(d) && d.id !== activeDeck.id);
    if (remainingDue.length > 0) {
      setActiveDeck(remainingDue[0]);
      setCurrentCardIndex(0);
      setSessionGrades([]);
      setIsCompleted(false);
      setShowCelebration(false);
      setSessionSummary(null);
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
      {!isCompleted ? (
        <>
          {/* Session Status Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-remx-200 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="solid" size="sm">
                  {activeDeck.category || "Technical Notes"}
                </Badge>
                <Badge variant="subtle" size="sm">
                  Current: {getRetentionStageLabel(activeDeck.intervalIndex)}
                </Badge>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-remx-black">
                {activeDeck.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-remx-600 font-semibold">
                Card {currentCardIndex + 1} of {activeDeck.flashcards.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <ProgressBar progress={progressPercent} height={4} />

          {/* 3D Flashcard with Grading Actions */}
          <div className="pt-4">
            <Flashcard
              key={currentCard?.id || currentCardIndex}
              card={currentCard || { front: "Loading...", back: "Loading..." }}
              cardNumber={currentCardIndex + 1}
              totalCards={activeDeck.flashcards.length}
              onGrade={handleGradeCard}
              showGradingActions={true}
            />
          </div>

          {/* Shortcut helper */}
          <div className="text-center pt-2 text-[11px] text-remx-400">
            Click the card to flip &bull; Select &quot;Got it&quot; or &quot;Forgot&quot; to calibrate spacing
          </div>
        </>
      ) : (
        /* Completion Milestone View */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border-2 border-remx-black bg-white p-8 sm:p-12 text-center space-y-7 shadow-xl"
        >
          <div className="h-16 w-16 rounded-full bg-remx-black text-white mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="h-8 w-8 stroke-[2.5px]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-remx-black">
              Review Session Solidified
            </h2>
            <p className="text-xs sm:text-sm text-remx-600 leading-relaxed">
              You reviewed all {activeDeck.flashcards.length} cards for &quot;{activeDeck.title}&quot;.
            </p>
          </div>

          {/* Milestone Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
            <div className="p-4 rounded-xl border border-remx-200 bg-remx-100/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                New Interval
              </span>
              <p className="text-xs font-bold text-remx-black">
                {sessionSummary
                  ? getRetentionStageLabel(sessionSummary.intervalIndex)
                  : "Day 3"}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-remx-200 bg-remx-100/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                Retention Streak
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <Flame className="h-4 w-4 text-remx-900 fill-remx-900" />
                <span className="text-sm font-bold text-remx-black">
                  {sessionSummary?.streak || user.streak} days
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-remx-200 bg-remx-100/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                Next Recall
              </span>
              <p className="text-xs font-bold text-remx-black">
                {sessionSummary ? formatDueDate(sessionSummary.nextDueAt) : "Due in 3 days"}
              </p>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="md"
              variant="outline"
              onClick={() => router.push("/app")}
              className="w-full sm:w-auto"
            >
              Return to Dashboard
            </Button>

            {dueDecks.filter((d) => d.id !== activeDeck.id).length > 0 ? (
              <Button
                size="md"
                variant="solid"
                onClick={handleNextDueDeck}
                className="w-full sm:w-auto gap-2 font-bold"
              >
                <RotateCw className="h-4 w-4" />
                <span>
                  Review Next Deck ({dueDecks.filter((d) => d.id !== activeDeck.id).length} due)
                </span>
              </Button>
            ) : (
              <Button
                size="md"
                variant="solid"
                onClick={() => router.push("/app/library")}
                className="w-full sm:w-auto gap-2"
              >
                <span>Explore Deck Library</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* Monochrome particle celebration */}
      <MonochromeCelebration
        show={showCelebration}
        title="Spaced Interval Advanced"
        subtitle={`Retention streak increased to ${sessionSummary?.streak || user.streak} days.`}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}

export default function ReviewPage() {
  return (
    <AppLayout>
      <AppHeader
        title="Active Recall Review"
        subtitle="Review due flashcards and solidify mental models"
      />
      <Suspense fallback={<div className="p-8 text-center text-xs text-remx-500">Loading review session...</div>}>
        <ReviewSessionContent />
      </Suspense>
    </AppLayout>
  );
}
