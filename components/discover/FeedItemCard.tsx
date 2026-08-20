"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Target, Plus, Sparkles, ExternalLink } from "lucide-react";
import { FeedItem } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface FeedItemCardProps {
  item: FeedItem;
  onAddToRemx: (item: FeedItem) => void;
  isAdding?: boolean;
  className?: string;
}

export function FeedItemCard({
  item,
  onAddToRemx,
  isAdding,
  className,
}: FeedItemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "rounded-xl border border-remx-100 bg-white p-6 transition-all flex flex-col justify-between shadow-sm hover:border-remx-200 group",
        className
      )}
    >
      <div>
        {/* Top goal connection banner */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-remx-900 bg-remx-100 px-2.5 py-1 rounded-full border border-remx-200">
            <Target className="h-3 w-3" />
            <span className="text-[11px] uppercase tracking-label">
              {item.relevanceNote}
            </span>
          </div>

          <Badge variant="outline" size="sm">
            {item.difficulty}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-remx-black leading-snug tracking-tight group-hover:underline">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 text-xs text-remx-600 line-clamp-3 leading-relaxed">
          {item.sampleContent}
        </p>
      </div>

      {/* Meta & 1-tap Remx Action */}
      <div className="mt-6 pt-4 border-t border-remx-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-remx-500">
          <span className="font-semibold text-remx-800">{item.source}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{item.readTimeMins} min read</span>
          </span>
        </div>

        <Button
          size="sm"
          variant="solid"
          isLoading={isAdding}
          onClick={() => onAddToRemx(item)}
          className="gap-1.5 text-xs font-bold w-full sm:w-auto"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Add to Remx</span>
        </Button>
      </div>
    </motion.div>
  );
}
