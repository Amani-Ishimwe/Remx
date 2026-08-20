"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Link as LinkIcon, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SAMPLE_ARTICLES } from "@/lib/generator";
import { cn } from "@/lib/utils";

export interface ArticleInputCardProps {
  onGenerate: (content: string, url?: string) => void;
  isGenerating?: boolean;
  initialValue?: string;
}

export function ArticleInputCard({
  onGenerate,
  isGenerating,
  initialValue = "",
}: ArticleInputCardProps) {
  const [input, setInput] = useState(initialValue);
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const isUrl = input.trim().startsWith("http://") || input.trim().startsWith("https://");
    onGenerate(input.trim(), isUrl ? input.trim() : undefined);
  };

  const handleSelectSample = (sample: typeof SAMPLE_ARTICLES[0]) => {
    setInput(sample.content);
    setActiveTab("text");
    onGenerate(sample.content, sample.url);
  };

  return (
    <div className="rounded-xl border border-remx-100 bg-white p-6 sm:p-8 shadow-sm">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-remx-200 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-all",
              activeTab === "url"
                ? "bg-remx-black text-white"
                : "bg-remx-100 text-remx-600 hover:text-remx-black"
            )}
          >
            <LinkIcon className="h-3.5 w-3.5" />
            <span>Article URL</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-all",
              activeTab === "text"
                ? "bg-remx-black text-white"
                : "bg-remx-100 text-remx-600 hover:text-remx-black"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Raw Text / Notes</span>
          </button>
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-label text-remx-500 hidden sm:inline">
          Input Layer
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {activeTab === "url" ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-label text-remx-700 mb-2">
              Paste Article or Technical Paper URL
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://example.com/blog/distributed-systems-internals"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isGenerating}
                className="w-full h-13 rounded-lg border border-remx-300 bg-white px-4 text-sm text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none focus:ring-1 focus:ring-remx-900 transition-all font-mono text-xs"
              />
            </div>
            <p className="mt-2 text-xs text-remx-500">
              Extracts technical structure, architecture invariants, summaries, quizzes, and spaced flashcards.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold uppercase tracking-label text-remx-700 mb-2">
              Paste Technical Notes, Code Excerpts, or Spec
            </label>
            <textarea
              rows={7}
              placeholder="Paste article body, technical RFC, or tutorial notes here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isGenerating}
              className="w-full rounded-lg border border-remx-300 bg-white p-4 text-sm text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none focus:ring-1 focus:ring-remx-900 transition-all font-sans leading-relaxed"
            />
          </div>
        )}

        {/* Submit CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="text-xs text-remx-500">
            Enters spaced repetition schedule: <span className="font-semibold text-remx-900">1d &rarr; 3d &rarr; 7d &rarr; 14d &rarr; 30d</span>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="solid"
            isLoading={isGenerating}
            disabled={!input.trim() || isGenerating}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Mark to Remember</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Preset Sample Chips */}
      <div className="mt-8 pt-6 border-t border-remx-200">
        <span className="block text-[11px] font-bold uppercase tracking-label text-remx-500 mb-3">
          Or test with sample technical articles:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAMPLE_ARTICLES.map((sample) => (
            <motion.button
              key={sample.title}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectSample(sample)}
              disabled={isGenerating}
              className="text-left p-3 rounded-lg border border-remx-100 bg-remx-100/60 hover:bg-remx-100 hover:border-remx-400 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-remx-900 group-hover:underline">
                  {sample.title}
                </span>
                <ArrowRight className="h-3 w-3 text-remx-400 group-hover:text-remx-900 transition-colors" />
              </div>
              <p className="text-[11px] text-remx-600 line-clamp-1 mt-1">
                {sample.preview}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
