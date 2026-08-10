"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  Target,
  Plus,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { FeedItemCard } from "@/components/discover/FeedItemCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";
import { FeedItem } from "@/lib/types";

export default function DiscoverPage() {
  const router = useRouter();
  const { feedItems, goals, addGoal, addDeck } = useRemxStore();

  const [selectedGoalId, setSelectedGoalId] = useState<string>("all");
  const [addingFeedId, setAddingFeedId] = useState<string | null>(null);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [newGoalLabel, setNewGoalLabel] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("");

  const filteredItems = feedItems.filter((item) => {
    if (selectedGoalId === "all") return true;
    return item.relatedGoalId === selectedGoalId;
  });

  const handleAddToRemx = (item: FeedItem) => {
    setAddingFeedId(item.id);
    // Route to new deck generator with pre-filled content
    router.push(`/app/new?input=${encodeURIComponent(item.sampleContent)}`);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalLabel.trim()) return;

    const created = addGoal(newGoalLabel.trim(), newGoalCategory.trim() || "Technical Domain");
    setNewGoalLabel("");
    setNewGoalCategory("");
    setIsNewGoalModalOpen(false);
    setSelectedGoalId(created.id);
  };

  return (
    <AppLayout>
      <AppHeader
        title="Goal-Driven Discovery Feed"
        subtitle="Articles ranked strictly by connection to your declared learning goals"
        action={
          <Button
            size="sm"
            variant="solid"
            onClick={() => setIsNewGoalModalOpen(true)}
            className="gap-1.5 font-bold"
          >
            <Plus className="h-4 w-4" />
            <span>Add Learning Goal</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-7">
        {/* Goal Filter Chips Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-label text-remx-600 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5" />
              <span>Active Target Learning Goals</span>
            </span>

            <span className="text-[11px] text-remx-400 font-mono hidden sm:inline">
              Explicit Non-Algorithmic Feed
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedGoalId("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-label transition-colors whitespace-nowrap ${
                selectedGoalId === "all"
                  ? "bg-remx-black text-white font-bold"
                  : "bg-remx-100 text-remx-700 hover:text-remx-black hover:bg-remx-200"
              }`}
            >
              All Goals ({feedItems.length})
            </button>

            {goals.map((goal) => {
              const isActive = selectedGoalId === goal.id;
              const count = feedItems.filter((f) => f.relatedGoalId === goal.id).length;

              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-remx-black text-white font-bold"
                      : "bg-remx-100 text-remx-700 hover:text-remx-black hover:bg-remx-200"
                  }`}
                >
                  <span>{goal.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-white text-remx-black"
                        : "bg-remx-200 text-remx-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed Items Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <FeedItemCard
                  item={item}
                  onAddToRemx={handleAddToRemx}
                  isAdding={addingFeedId === item.id}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={Compass}
            title="No Feed Items for this Goal"
            description="We haven't indexed articles matching this specific goal yet, or you can paste your own."
            actionLabel="Paste Custom Article"
            onAction={() => router.push("/app/new")}
            secondaryActionLabel="View All Goals"
            onSecondaryAction={() => setSelectedGoalId("all")}
          />
        )}
      </div>

      {/* Add New Goal Modal */}
      <Modal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        title="Add Learning Goal"
        description="Feed recommendations and flashcards will prioritize closing gaps in this technical domain."
      >
        <form onSubmit={handleCreateGoal} className="space-y-4 mt-4">
          <Input
            label="Learning Goal Title"
            placeholder="e.g. Master Rust Concurrency & Rayon"
            value={newGoalLabel}
            onChange={(e) => setNewGoalLabel(e.target.value)}
            required
          />

          <Input
            label="Category / Domain (Optional)"
            placeholder="e.g. Systems Programming, Linux, Cloud"
            value={newGoalCategory}
            onChange={(e) => setNewGoalCategory(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-remx-200">
            <Button variant="outline" type="button" onClick={() => setIsNewGoalModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" type="submit" disabled={!newGoalLabel.trim()}>
              Save Learning Goal
            </Button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
