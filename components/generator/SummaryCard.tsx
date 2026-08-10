"use client";

import React from "react";
import { Bookmark, CheckSquare, Layers, Tag, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  title: string;
  summary: string;
  keyTakeaways: string[];
  category?: string;
  tags?: string[];
  sourceUrl?: string;
  className?: string;
}

export function SummaryCard({
  title,
  summary,
  keyTakeaways,
  category = "Architecture",
  tags = [],
  sourceUrl,
  className,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm",
        className
      )}
    >
      {/* Meta header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-remx-200 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="solid" size="sm">
            {category}
          </Badge>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-remx-600 hover:text-remx-black hover:underline"
            >
              <span>Source URL</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-label text-remx-500">
          Synthesized Model
        </span>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-remx-black leading-tight">
          {title}
        </h2>
      </div>

      {/* Summary Narrative */}
      <div className="p-4 rounded-lg bg-remx-100 border border-remx-200">
        <span className="block text-[11px] font-bold uppercase tracking-label text-remx-600 mb-1.5">
          Executive Summary
        </span>
        <p className="text-sm text-remx-800 leading-relaxed">{summary}</p>
      </div>

      {/* Key Takeaways */}
      {keyTakeaways.length > 0 && (
        <div className="space-y-3">
          <span className="block text-xs font-bold uppercase tracking-label text-remx-700">
            Key Architectural Takeaways
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg border border-remx-200 bg-white"
              >
                <div className="h-5 w-5 rounded bg-remx-black text-white shrink-0 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </div>
                <p className="text-xs text-remx-700 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-remx-200">
          <Tag className="h-3.5 w-3.5 text-remx-400" />
          {tags.map((tag) => (
            <Badge key={tag} variant="subtle" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
