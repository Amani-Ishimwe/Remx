import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "subtle" | "dashed" | "dot";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "subtle",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full uppercase tracking-label select-none";

  const variantStyles = {
    solid: "bg-remx-black text-white border border-remx-black/0",
    outline: "bg-white text-remx-900 border border-remx-100",
    subtle: "bg-remx-100 text-remx-700 border border-remx-100",
    dashed: "bg-white text-remx-600 border border-dashed border-remx-200",
    dot: "bg-remx-100 text-remx-900 border border-remx-100 pl-2",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {variant === "dot" && (
        <span className="h-1.5 w-1.5 rounded-full bg-remx-black mr-1.5 animate-pulse" />
      )}
      {children}
    </span>
  );
}
