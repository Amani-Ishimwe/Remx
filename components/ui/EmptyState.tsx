"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl border border-dashed border-remx-300 bg-remx-100/50",
        className
      )}
    >
      {/* Animated pulsing outline container */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          borderColor: ["#E4E4E1", "#0A0A0A", "#E4E4E1"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-16 w-16 rounded-xl border-2 border-remx-200 bg-white flex items-center justify-center mb-4 shadow-sm"
      >
        <Icon className="h-7 w-7 text-remx-900" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-remx-black animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-remx-black" />
      </motion.div>

      <h4 className="text-base font-bold text-remx-900 tracking-tight">{title}</h4>
      <p className="mt-1.5 text-sm text-remx-600 max-w-sm">{description}</p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-5 flex items-center gap-3 flex-wrap justify-center">
          {actionLabel && onAction && (
            <Button size="sm" variant="solid" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button size="sm" variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
