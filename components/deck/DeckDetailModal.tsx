"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Deck } from "@/lib/types";
import { getRetentionStageLabel, formatDueDate, isDeckDue } from "@/lib/srs";
import { RotateCw, Layers, ExternalLink, Users, Trash2 } from "lucide-react";
import { Flashcard } from "./Flashcard";

export interface DeckDetailModalProps {
  deck: Deck | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (deckId: string) => void;
}

export function DeckDetailModal({
  deck,
  isOpen,
  onClose,
  onDelete,
}: DeckDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "quiz">("summary");

  if (!deck) return null;

  const isDue = isDeckDue(deck);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6">
        {/* Header info */}
        <div className="space-y-2 border-b border-remx-200 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="solid" size="sm">
              {deck.category || "Architecture"}
            </Badge>
            <Badge variant={isDue ? "solid" : "dashed"} size="sm">
              {formatDueDate(deck.nextDueAt)}
            </Badge>
            <Badge variant="subtle" size="sm">
              {getRetentionStageLabel(deck.intervalIndex)}
            </Badge>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-remx-black tracking-tight leading-snug">
            {deck.title}
          </h2>

          {deck.sourceUrl && (
            <a
              href={deck.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-remx-600 hover:text-remx-black hover:underline"
            >
              <span>{deck.sourceUrl}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-remx-200 pb-2">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-colors ${
              activeTab === "summary"
                ? "bg-remx-black text-white"
                : "bg-remx-100 text-remx-600 hover:text-remx-black"
            }`}
          >
            Summary & Takeaways
          </button>
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-colors ${
              activeTab === "flashcards"
                ? "bg-remx-black text-white"
                : "bg-remx-100 text-remx-600 hover:text-remx-black"
            }`}
          >
            Flashcards ({deck.flashcards.length})
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-colors ${
              activeTab === "quiz"
                ? "bg-remx-black text-white"
                : "bg-remx-100 text-remx-600 hover:text-remx-black"
            }`}
          >
            Retention Quiz ({deck.quiz.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {activeTab === "summary" && (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-remx-100 border border-remx-200">
                <span className="block text-[11px] font-bold uppercase tracking-label text-remx-600 mb-1">
                  Executive Abstract
                </span>
                <p className="text-sm text-remx-800 leading-relaxed">{deck.summary}</p>
              </div>

              {deck.keyTakeaways.length > 0 && (
                <div className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-label text-remx-700">
                    Key Architectural Takeaways
                  </span>
                  <div className="space-y-2">
                    {deck.keyTakeaways.map((takeaway, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg border border-remx-100 bg-white text-xs text-remx-700"
                      >
                        <span className="h-5 w-5 rounded bg-remx-black text-white shrink-0 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "flashcards" && (
            <div className="space-y-4">
              {deck.flashcards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="p-4 rounded-xl border border-remx-100 bg-remx-100/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                      Card {idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-remx-400">Front / Back</span>
                  </div>
                  <div className="text-xs font-bold text-remx-black">
                    Q: {card.front}
                  </div>
                  <div className="text-xs text-remx-700 border-t border-remx-200 pt-2 font-medium">
                    A: {card.back}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-4">
              {deck.quiz.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-xl border border-remx-100 bg-white space-y-3"
                >
                  <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                    Question {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-remx-black">{q.question}</p>
                  <div className="space-y-1.5 pl-2">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`text-xs p-2 rounded-md ${
                          opt === q.answer
                            ? "bg-remx-black text-white font-semibold"
                            : "bg-remx-100 text-remx-600"
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-remx-200">
          {onDelete ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onDelete(deck.id);
                onClose();
              }}
              className="text-remx-700 hover:text-remx-black hover:border-remx-400 gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Deck</span>
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Link href={`/app/review?deckId=${deck.id}`} onClick={onClose}>
              <Button variant="solid" size="sm" className="gap-1.5">
                <RotateCw className="h-3.5 w-3.5" />
                <span>Start Review</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
