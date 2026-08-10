"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-remx-black/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={cn(
              "relative z-10 w-full bg-white rounded-xl border border-remx-200 shadow-2xl p-6 overflow-hidden",
              maxWidthStyles[maxWidth],
              className
            )}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-remx-200 bg-remx-100 flex items-center justify-center text-remx-700 hover:text-remx-black hover:border-remx-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            {(title || description) && (
              <div className="mb-5 pr-8">
                {title && (
                  <h3 className="text-xl font-bold tracking-tight text-remx-black">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="mt-1 text-sm text-remx-600">{description}</p>
                )}
              </div>
            )}

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
