import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-label text-remx-700">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-remx-300 bg-white px-3.5 py-2 text-sm text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none focus:ring-1 focus:ring-remx-900 transition-colors disabled:cursor-not-allowed disabled:bg-remx-100 disabled:opacity-50",
            error && "border-dashed border-remx-900",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && <p className="text-xs text-remx-500">{hint}</p>}
        {error && (
          <p className="text-xs font-medium text-remx-900 underline decoration-dashed underline-offset-2">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-label text-remx-700">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border border-remx-300 bg-white p-3.5 text-sm text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none focus:ring-1 focus:ring-remx-900 transition-colors disabled:cursor-not-allowed disabled:bg-remx-100 disabled:opacity-50",
            error && "border-dashed border-remx-900",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && <p className="text-xs text-remx-500">{hint}</p>}
        {error && (
          <p className="text-xs font-medium text-remx-900 underline decoration-dashed underline-offset-2">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
