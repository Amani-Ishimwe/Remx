"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StreakBadgeProps {
  streak: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StreakBadge({
  streak,
  showLabel = true,
  size = "md",
  className,
}: StreakBadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm font-bold gap-2",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center rounded-full bg-remx-black text-white font-semibold shadow-sm select-none border border-remx-black",
        sizeStyles[size],
        className
      )}
      title={`${streak}-day retention streak`}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flame className={cn("text-white fill-white", iconSizes[size])} />
      </motion.div>
      <span>{streak}</span>
      {showLabel && <span className="text-remx-400 font-normal">days</span>}
    </motion.div>
  );
}
