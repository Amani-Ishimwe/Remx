"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RotateCw,
  Layers,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
  MoreVertical,
  Trash2,
  Share2,
} from "lucide-react";
import { Deck } from "@/lib/types";
import { isDeckDue, formatDueDate, SRS_INTERVALS, getRetentionStageLabel } from "@/lib/srs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface DeckCardProps {
  deck: Deck;
  onReview?: (deckId: string) => void;
  onInspect?: (deck: Deck) => void;
  onDelete?: (deckId: string) => void;
  className?: string;
}

export function DeckCard({
  deck,
  onReview,
  onInspect,
  onDelete,
  className,
}: DeckCardProps) {
  const due = isDeckDue(deck);
  const isMastered = deck.intervalIndex === 4;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "rounded-xl bg-white p-5 sm:p-6 transition-all flex flex-col justify-between relative shadow-sm group",
        due
          ? "border border-remx-300"
          : isMastered
          ? "border border-remx-100 bg-remx-100/40"
          : "border border-remx-100 hover:border-remx-300",
        className
      )}
    >
      {/* Top badges bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {due ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-remx-black text-white text-[10px] font-semibold uppercase tracking-label">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70 animate-ping" />
                <span>Due for Review</span>
              </span>
            ) : isMastered ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-remx-200 bg-white text-remx-700 text-[10px] font-semibold uppercase tracking-label">
                <CheckCircle2 className="h-3 w-3 text-remx-500" />
                <span>Mastered (30d)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-remx-200 bg-remx-100 text-remx-600 text-[10px] font-medium uppercase tracking-label">
                <Clock className="h-3 w-3" />
                <span>{formatDueDate(deck.nextDueAt)}</span>
              </span>
            )}

            {deck.category && (
              <Badge variant="subtle" size="sm">
                {deck.category}
              </Badge>
            )}
          </div>

          {deck.groupName && (
            <span className="inline-flex items-center gap-1 text-[10px] text-remx-500 font-medium bg-remx-100 px-2 py-0.5 rounded-md border border-remx-100">
              <Users className="h-2.5 w-2.5" />
              <span>{deck.groupName}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onInspect?.(deck)}
          className="text-base sm:text-lg font-bold text-remx-black leading-snug tracking-tight hover:underline cursor-pointer"
        >
          {deck.title}
        </h3>

        {/* Summary excerpt */}
        <p className="mt-2 text-xs text-remx-600 line-clamp-2 leading-relaxed">
          {deck.summary}
        </p>
      </div>

      {/* Bottom SRS Progress Timeline */}
      <div className="mt-5 pt-4 border-t border-remx-200 space-y-3">
        {/* Interval ladder */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-label text-remx-500">
            <span>Interval Stage</span>
            <span>{getRetentionStageLabel(deck.intervalIndex)}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {SRS_INTERVALS.map((days, idx) => {
              const isPast = idx < deck.intervalIndex;
              const isCurrent = idx === deck.intervalIndex;

              return (
                <div
                  key={days}
                  className={cn(
                    "h-2 rounded flex items-center justify-center transition-all",
                    isCurrent
                      ? "bg-remx-black ring-2 ring-remx-black/30"
                      : isPast
                      ? "bg-remx-700"
                      : "bg-remx-200"
                  )}
                  title={`Stage ${idx + 1}: ${days} day interval`}
                />
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-remx-500 font-medium">
            {deck.flashcards.length} cards &bull; {deck.reviewCount} reviews
          </span>

          <div className="flex items-center gap-2">
            {onInspect && (
              <Button
                size="sm"
                variant="subtle"
                onClick={() => onInspect(deck)}
                className="text-xs"
              >
                Inspect
              </Button>
            )}

            {due ? (
              <Link href={`/app/review?deckId=${deck.id}`}>
                <Button size="sm" variant="solid" className="gap-1 font-bold">
                  <RotateCw className="h-3 w-3" />
                  <span>Review Now</span>
                </Button>
              </Link>
            ) : (
              <Link href={`/app/review?deckId=${deck.id}`}>
                <Button size="sm" variant="outline" className="gap-1">
                  <span>Practice</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
