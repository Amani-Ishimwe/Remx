"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 56,
  strokeWidth = 5,
  showText = true,
  className,
}: ProgressRingProps) {
  const clamped = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E4E4E1"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress indicator */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#0A0A0A"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {showText && (
        <span className="absolute text-[11px] font-bold tracking-tight text-remx-900">
          {clamped}%
        </span>
      )}
    </div>
  );
}

export interface ProgressBarProps {
  progress: number;
  height?: number;
  className?: string;
}

export function ProgressBar({ progress, height = 6, className }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={cn("w-full rounded-full bg-remx-200 overflow-hidden", className)}
      style={{ height }}
    >
      <motion.div
        className="h-full bg-remx-900 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
