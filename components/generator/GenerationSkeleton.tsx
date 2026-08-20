"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, CheckCircle, Clock } from "lucide-react";

export function GenerationSkeleton() {
  const phases = [
    "Deconstructing source architecture...",
    "Isolating core invariants & mental models...",
    "Synthesizing structured technical summary...",
    "Generating immediate retention quiz...",
    "Formulating 5-stage spaced repetition flashcards...",
  ];

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhaseIndex((prev) => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [phases.length]);

  return (
    <div className="rounded-xl border border-remx-100 bg-white p-6 sm:p-8 space-y-8 shadow-sm">
      {/* Header phase feedback */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-remx-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-remx-black text-white flex items-center justify-center">
            <Brain className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-remx-black">
              Generating Retention Artifacts
            </h3>
            <p className="text-xs text-remx-600 font-mono mt-0.5">
              {phases[currentPhaseIndex]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-remx-black animate-ping" />
          <span className="text-[11px] font-semibold uppercase tracking-label text-remx-700">
            Synthesizing
          </span>
        </div>
      </div>

      {/* Title Shimmer */}
      <div className="space-y-2.5">
        <div className="h-4 w-28 rounded skeleton-shimmer" />
        <div className="h-8 w-3/4 rounded-lg skeleton-shimmer" />
      </div>

      {/* Summary Narrative Shimmer */}
      <div className="space-y-3">
        <div className="h-3.5 w-32 rounded skeleton-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded skeleton-shimmer" />
          <div className="h-4 w-11/12 rounded skeleton-shimmer" />
          <div className="h-4 w-4/5 rounded skeleton-shimmer" />
        </div>
      </div>

      {/* Key Takeaways Shimmer */}
      <div className="space-y-3 pt-2">
        <div className="h-3.5 w-40 rounded skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-remx-100 bg-remx-100/50 space-y-2"
            >
              <div className="h-3 w-16 rounded skeleton-shimmer" />
              <div className="h-3.5 w-full rounded skeleton-shimmer" />
              <div className="h-3.5 w-4/5 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Spaced Flashcards Skeleton */}
      <div className="space-y-3 pt-2">
        <div className="h-3.5 w-36 rounded skeleton-shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-lg border border-dashed border-remx-300 p-4 flex flex-col justify-between bg-remx-100/40"
            >
              <div className="h-3 w-20 rounded skeleton-shimmer" />
              <div className="h-4 w-full rounded skeleton-shimmer" />
              <div className="h-2.5 w-12 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
