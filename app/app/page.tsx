"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  RotateCw,
  Sparkles,
  Flame,
  CheckCircle2,
  Brain,
  Layers,
  ArrowRight,
  Target,
  Plus,
  BookOpen,
  Users,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { DeckCard } from "@/components/deck/DeckCard";
import { DeckDetailModal } from "@/components/deck/DeckDetailModal";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressRing";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";
import { isDeckDue, formatDueDate } from "@/lib/srs";
import { Deck } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { decks, user, goals, groups, deleteDeck } = useRemxStore();
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [quickInput, setQuickInput] = useState("");

  const dueDecks = decks.filter(isDeckDue);
  const upcomingDecks = decks.filter((d) => !isDeckDue(d));
  const masteredCount = decks.filter((d) => d.intervalIndex === 4).length;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    router.push(`/app/new?input=${encodeURIComponent(quickInput.trim())}`);
  };

  return (
    <AppLayout>
      <AppHeader
        title="Retention Studio"
        subtitle="Active recall queue & spaced repetition schedule"
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Momentum Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Due Review Session CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 rounded-xl border-2 border-remx-black bg-remx-black text-white p-6 sm:p-7 flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-label text-remx-400">
                  Daily Review Session
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <span>{dueDecks.length} Decks Due</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {dueDecks.length > 0
                  ? `${dueDecks.length} deck${dueDecks.length > 1 ? "s" : ""} scheduled for active recall today.`
                  : "All scheduled spaced reviews complete for today!"}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-remx-300 max-w-xl">
                {dueDecks.length > 0
                  ? "Strengthen neural pathways before the forgetting curve erodes the mental model."
                  : "Excellent consistency. You can practice ahead of time or add new technical papers to your library."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-remx-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-remx-400 font-medium">
                Target intervals: Day 1 &bull; 3 &bull; 7 &bull; 14 &bull; 30
              </div>

              {dueDecks.length > 0 ? (
                <Link href={`/app/review?deckId=${dueDecks[0].id}`}>
                  <Button
                    size="md"
                    variant="solid"
                    className="bg-white text-remx-black hover:bg-remx-100 border-white gap-2 font-bold"
                  >
                    <RotateCw className="h-4 w-4" />
                    <span>Start Due Reviews ({dueDecks.length})</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/app/new">
                  <Button
                    size="md"
                    variant="solid"
                    className="bg-white text-remx-black hover:bg-remx-100 border-white gap-2 font-bold"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Paste New Article</span>
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Quick Metrics Capsule */}
          <div className="rounded-xl border border-remx-200 bg-remx-100/50 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-label text-remx-500">
                Retention Momentum
              </span>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-remx-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-remx-700">
                    <Flame className="h-4 w-4 text-remx-900 fill-remx-900" />
                    <span>Active Streak</span>
                  </div>
                  <StreakBadge streak={user.streak} size="sm" showLabel={false} />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-remx-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-remx-700">
                    <CheckCircle2 className="h-4 w-4 text-remx-900" />
                    <span>Mastered (30d)</span>
                  </div>
                  <span className="text-sm font-bold text-remx-black font-mono">
                    {masteredCount} decks
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-remx-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-remx-700">
                    <RotateCw className="h-4 w-4 text-remx-900" />
                    <span>Reviews Completed</span>
                  </div>
                  <span className="text-sm font-bold text-remx-black font-mono">
                    {user.totalReviewsCompleted}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/app/library">
              <Button size="sm" variant="outline" className="w-full text-xs">
                View Full Library ({decks.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick "Paste to Remember" bar */}
        <div className="rounded-xl border border-remx-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 relative">
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-remx-500" />
              <input
                type="text"
                placeholder="Paste article URL, blog post, or notes to generate spaced flashcards..."
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-remx-300 bg-white text-sm text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none transition-colors"
              />
            </div>
            <Button size="md" variant="solid" type="submit" disabled={!quickInput.trim()} className="gap-2">
              <span>Mark to Remember</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Due Reviews Queue Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-remx-black">
                Due for Review Today
              </h3>
              <Badge variant={dueDecks.length > 0 ? "solid" : "subtle"} size="sm">
                {dueDecks.length}
              </Badge>
            </div>

            <span className="text-xs text-remx-500 hidden sm:inline">
              Ranked by spaced interval urgency
            </span>
          </div>

          {dueDecks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {dueDecks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onInspect={(d) => setSelectedDeck(d)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="All Daily Reviews Completed"
              description="No decks currently due today. Next review cycle unlocks as intervals mature."
              actionLabel="Practice Upcoming Decks"
              onAction={() => router.push("/app/library")}
              secondaryActionLabel="Add New Article"
              onSecondaryAction={() => router.push("/app/new")}
            />
          )}
        </div>

        {/* Learning Goals Alignment */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-remx-900" />
              <h3 className="text-lg font-bold tracking-tight text-remx-black">
                Active Learning Goals
              </h3>
            </div>
            <Link href="/app/discover">
              <span className="text-xs font-semibold text-remx-900 hover:underline">
                Explore Goal Feed &rarr;
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="p-4 rounded-xl border border-remx-200 bg-white space-y-3 shadow-sm hover:border-remx-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="subtle" size="sm">
                    {goal.category}
                  </Badge>
                  <span className="text-[10px] font-bold text-remx-500 font-mono">
                    {goal.progressPercent || 50}% Retained
                  </span>
                </div>
                <h4 className="text-xs font-bold text-remx-black leading-snug">
                  {goal.label}
                </h4>
                <ProgressBar progress={goal.progressPercent || 50} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Decks */}
        {upcomingDecks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-remx-black">
                Upcoming Spaced Intervals
              </h3>
              <Link href="/app/library">
                <span className="text-xs font-semibold text-remx-900 hover:underline">
                  View All &rarr;
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcomingDecks.slice(0, 3).map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onInspect={(d) => setSelectedDeck(d)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deck Inspector Modal */}
      <DeckDetailModal
        deck={selectedDeck}
        isOpen={!!selectedDeck}
        onClose={() => setSelectedDeck(null)}
        onDelete={(id) => deleteDeck(id)}
      />
    </AppLayout>
  );
}
