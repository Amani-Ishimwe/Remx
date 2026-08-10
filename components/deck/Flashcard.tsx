"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FlashcardItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface FlashcardProps {
  card: FlashcardItem;
  cardNumber?: number;
  totalCards?: number;
  onGrade?: (grade: "got_it" | "forgot") => void;
  showGradingActions?: boolean;
  className?: string;
}

export function Flashcard({
  card,
  cardNumber,
  totalCards,
  onGrade,
  showGradingActions = false,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto perspective-1000 select-none", className)}>
      {/* 3D Flip Card Container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        onClick={handleFlip}
        className="relative min-h-[340px] sm:min-h-[380px] w-full cursor-pointer preserve-3d"
      >
        {/* CARD FRONT */}
        <div className="absolute inset-0 w-full h-full rounded-2xl border-2 border-remx-200 bg-white p-7 sm:p-9 flex flex-col justify-between shadow-lg backface-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-label text-remx-500">
              {cardNumber && totalCards
                ? `Card ${cardNumber} of ${totalCards}`
                : "Active Recall Prompt"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-remx-500 bg-remx-100 px-2.5 py-1 rounded-full border border-remx-200">
              <RotateCw className="h-3 w-3" />
              <span>Tap or click to reveal</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="my-auto py-4">
            <p className="text-xs font-semibold uppercase tracking-label text-remx-400 mb-2">
              Question / Prompt
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-remx-black leading-snug tracking-tight">
              {card.front}
            </h3>
          </div>

          {/* Footer prompt */}
          <div className="flex items-center justify-between pt-4 border-t border-remx-200">
            <span className="text-xs text-remx-500">
              Test your recall before flipping
            </span>
            <span className="text-xs font-bold text-remx-900">
              Flip Card &rarr;
            </span>
          </div>
        </div>

        {/* CARD BACK */}
        <div className="absolute inset-0 w-full h-full rounded-2xl border-2 border-remx-900 bg-remx-100 p-7 sm:p-9 flex flex-col justify-between shadow-xl backface-hidden rotate-y-180">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-label text-remx-900">
              Target Mental Model
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white bg-remx-black px-2.5 py-1 rounded-full">
              <RotateCw className="h-3 w-3" />
              <span>Answer Revealed</span>
            </div>
          </div>

          {/* Answer Text */}
          <div className="my-auto py-4">
            <p className="text-xs font-semibold uppercase tracking-label text-remx-600 mb-2">
              Core Concept / Invariant
            </p>
            <p className="text-base sm:text-lg font-medium text-remx-black leading-relaxed">
              {card.back}
            </p>
          </div>

          {/* Footer flip back */}
          <div className="flex items-center justify-between pt-4 border-t border-remx-300 text-xs text-remx-600">
            <span>Click again to flip back</span>
            <span className="font-semibold text-remx-black">&larr; Return to prompt</span>
          </div>
        </div>
      </motion.div>

      {/* Grading Controls (Active in Review Mode) */}
      {showGradingActions && onGrade && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onGrade("forgot");
              setIsFlipped(false);
            }}
            className="flex-1 max-w-xs border-2 border-remx-300 hover:border-remx-900 text-remx-800 gap-2 h-14"
          >
            <X className="h-5 w-5 stroke-[2.5px]" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm">Forgot</span>
              <span className="text-[10px] text-remx-500 font-normal">Reset interval (1d)</span>
            </div>
          </Button>

          <Button
            size="lg"
            variant="solid"
            onClick={(e) => {
              e.stopPropagation();
              onGrade("got_it");
              setIsFlipped(false);
            }}
            className="flex-1 max-w-xs bg-remx-black hover:bg-remx-800 text-white gap-2 h-14"
          >
            <Check className="h-5 w-5 stroke-[3px]" />
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm">Got it</span>
              <span className="text-[10px] text-remx-300 font-normal">Advance interval</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
