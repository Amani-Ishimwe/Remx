"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "subtle" | "dashed";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remx-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none text-sm";

    const variantStyles = {
      solid: "bg-remx-black text-white hover:bg-remx-800 active:bg-remx-900 border border-remx-black shadow-sm",
      outline: "bg-white text-remx-black border border-remx-300 hover:border-remx-900 hover:bg-remx-100 active:bg-remx-200",
      subtle: "bg-remx-100 text-remx-black hover:bg-remx-200 active:bg-remx-300 border border-transparent",
      ghost: "text-remx-black hover:bg-remx-100 active:bg-remx-200 border border-transparent",
      dashed: "bg-white text-remx-black border border-dashed border-remx-400 hover:border-remx-900 hover:bg-remx-100",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base font-semibold gap-2.5",
      icon: "h-10 w-10 p-0 rounded-lg",
    };

    return (
      <motion.button
        ref={ref as any}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        whileHover={{ y: disabled || isLoading ? 0 : -1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
