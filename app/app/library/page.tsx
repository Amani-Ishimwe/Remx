"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Library,
  Search,
  Plus,
  RotateCw,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { DeckCard } from "@/components/deck/DeckCard";
import { DeckDetailModal } from "@/components/deck/DeckDetailModal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";
import { isDeckDue } from "@/lib/srs";
import { Deck } from "@/lib/types";

export default function LibraryPage() {
  const { decks, deleteDeck } = useRemxStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "due" | "upcoming" | "mastered" | "group">("all");
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const dueDecksCount = decks.filter(isDeckDue).length;
  const masteredCount = decks.filter((d) => d.intervalIndex === 4).length;

  const filteredDecks = decks.filter((deck) => {
    // Search match
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      deck.title.toLowerCase().includes(query) ||
      deck.summary.toLowerCase().includes(query) ||
      (deck.category && deck.category.toLowerCase().includes(query)) ||
      (deck.tags && deck.tags.some((t) => t.toLowerCase().includes(query)));

    if (!matchesSearch) return false;

    // Filter tab
    if (activeFilter === "due") return isDeckDue(deck);
    if (activeFilter === "upcoming") return !isDeckDue(deck) && deck.intervalIndex < 4;
    if (activeFilter === "mastered") return deck.intervalIndex === 4;
    if (activeFilter === "group") return !!deck.groupId;

    return true;
  });

  const filterTabs = [
    { id: "all", label: "All Decks", count: decks.length },
    { id: "due", label: "Due Today", count: dueDecksCount, solid: dueDecksCount > 0 },
    { id: "upcoming", label: "Upcoming", count: decks.length - dueDecksCount - masteredCount },
    { id: "mastered", label: "Mastered (30d)", count: masteredCount },
    { id: "group", label: "Cohort Shared", count: decks.filter((d) => !!d.groupId).length },
  ];

  return (
    <AppLayout>
      <AppHeader
        title="Deck Library"
        subtitle="Manage saved knowledge decks and review schedules"
        action={
          <Link href="/app/new">
            <Button size="sm" variant="solid" className="gap-1.5 font-bold">
              <Plus className="h-4 w-4" />
              <span>New Deck</span>
            </Button>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-remx-200 pb-5">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-remx-black text-white"
                      : "bg-remx-100 text-remx-700 hover:text-remx-black hover:bg-remx-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white text-remx-black"
                        : tab.solid
                        ? "bg-remx-black text-white"
                        : "bg-remx-200 text-remx-800"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-remx-400" />
            <input
              type="text"
              placeholder="Search decks by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-remx-100 bg-white text-xs text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Deck Grid with Staggered Entrance */}
        {filteredDecks.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredDecks.map((deck) => (
              <motion.div
                key={deck.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <DeckCard
                  deck={deck}
                  onInspect={(d) => setSelectedDeck(d)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No Decks Matching Criteria"
            description={
              searchQuery
                ? `No decks found matching "${searchQuery}". Try refining your query.`
                : "No decks found in this filter category."
            }
            actionLabel="Paste New Article"
            onAction={() => window.location.assign("/app/new")}
            secondaryActionLabel={searchQuery ? "Clear Search" : undefined}
            onSecondaryAction={searchQuery ? () => setSearchQuery("") : undefined}
          />
        )}
      </div>

      {/* Detail Modal */}
      <DeckDetailModal
        deck={selectedDeck}
        isOpen={!!selectedDeck}
        onClose={() => setSelectedDeck(null)}
        onDelete={(id) => deleteDeck(id)}
      />
    </AppLayout>
  );
}

