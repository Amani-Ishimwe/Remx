"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuizQuestionItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface QuizQuestionProps {
  question: QuizQuestionItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswered: (isCorrect: boolean) => void;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswered,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isCorrect = selectedOption === question.answer;

  const handleSelectOption = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
    setHasSubmitted(true);
    onAnswered(option === question.answer);
  };

  return (
    <div className="rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-remx-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-label text-remx-600">
          Immediate Retention Check — Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-[11px] font-semibold text-remx-400 font-mono">
          Quiz Gate
        </span>
      </div>

      {/* Question prompt */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-remx-black leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isThisCorrect = option === question.answer;

          // Monochrome feedback state styles:
          // Correct: black-fill with check icon and scale pop
          // Incorrect: gray-outline with dashed border and horizontal shake
          let stateStyle = "border-remx-300 bg-white text-remx-900 hover:border-remx-900 hover:bg-remx-100";
          let icon = null;

          if (hasSubmitted) {
            if (isThisCorrect) {
              stateStyle = "border-remx-black bg-remx-black text-white font-semibold shadow-md";
              icon = <Check className="h-4 w-4 text-white stroke-[3px]" />;
            } else if (isSelected && !isThisCorrect) {
              stateStyle = "border-2 border-dashed border-remx-400 bg-remx-100 text-remx-600";
              icon = <X className="h-4 w-4 text-remx-900 stroke-[2.5px]" />;
            } else {
              stateStyle = "border-remx-200 bg-remx-100/50 text-remx-400 opacity-60";
            }
          }

          return (
            <motion.button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(option)}
              disabled={hasSubmitted}
              // Motion physics: scale-pop for correct, horizontal shake for incorrect
              animate={
                hasSubmitted && isSelected
                  ? isThisCorrect
                    ? { scale: [1, 1.03, 1] }
                    : { x: [0, -6, 6, -4, 4, 0] }
                  : {}
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
              whileTap={!hasSubmitted ? { scale: 0.98 } : {}}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between gap-3 text-sm select-none",
                stateStyle
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    hasSubmitted && isThisCorrect
                      ? "border-white bg-white text-remx-black"
                      : "border-remx-300 bg-remx-100 text-remx-700"
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{option}</span>
              </div>

              {icon && <div className="shrink-0">{icon}</div>}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation feedback */}
      <AnimatePresence>
        {hasSubmitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="p-4 rounded-lg border border-remx-200 bg-remx-100 text-xs text-remx-700 space-y-1"
          >
            <div className="flex items-center gap-1.5 font-bold text-remx-black uppercase tracking-label">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Explanation</span>
            </div>
            <p className="leading-relaxed">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
