"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface MonochromeCelebrationProps {
  show: boolean;
  title?: string;
  subtitle?: string;
  onComplete?: () => void;
}

export function triggerMonochromeConfetti() {
  if (typeof window === "undefined") return;

  // Strict monochrome particle palette: black, white, deep gray, light gray
  const monochromeColors = ["#0A0A0A", "#FFFFFF", "#6B6B66", "#D1D1CD", "#262624"];

  const count = 75;
  const defaults = {
    origin: { y: 0.7 },
    colors: monochromeColors,
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function MonochromeCelebration({
  show,
  title = "Review Streak Solidified",
  subtitle = "Mental models strengthened for the next retention interval.",
  onComplete,
}: MonochromeCelebrationProps) {
  useEffect(() => {
    if (show) {
      triggerMonochromeConfetti();
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-4 rounded-xl border-2 border-remx-black bg-white p-5 shadow-2xl max-w-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-remx-black text-white">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-remx-black tracking-tight">{title}</h4>
            <p className="text-xs text-remx-600 mt-0.5">{subtitle}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
