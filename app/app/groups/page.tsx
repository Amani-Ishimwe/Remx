"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, KeyRound, BookOpen, Flame, ShieldCheck } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { GroupCard } from "@/components/groups/GroupCard";
import { CreateGroupModal, JoinGroupModal } from "@/components/groups/CreateGroupModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";

export default function GroupsPage() {
  const { groups } = useRemxStore();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <AppLayout>
      <AppHeader
        title="Study Groups & Cohorts"
        subtitle="Shared technical deck libraries and collaborative momentum"
        action={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setJoinModalOpen(true)}
              className="gap-1.5 font-semibold"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>Join with Code</span>
            </Button>
            <Button
              size="sm"
              variant="solid"
              onClick={() => setCreateModalOpen(true)}
              className="gap-1.5 font-bold"
            >
              <Plus className="h-4 w-4" />
              <span>Create Cohort</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-7">
        {/* Cohort Manifesto Callout */}
        <div className="rounded-xl border border-remx-100 bg-remx-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-label text-remx-600">
              Collaborative Retention Culture
            </span>
            <h3 className="text-base font-bold text-remx-black">
              Supportive Momentum Over Anxiety-Inducing Leaderboards
            </h3>
            <p className="text-xs text-remx-600 max-w-2xl">
              Study cohorts pool synthesized decks so engineers and students master complex specifications together without zero-sum competition.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="solid"
              onClick={() => setCreateModalOpen(true)}
            >
              Form New Cohort
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {groups.map((group) => (
              <motion.div
                key={group.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <GroupCard group={group} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={Users}
            title="No Active Study Groups"
            description="Create a shared reading cohort or enter an invite code to join your team."
            actionLabel="Create Cohort"
            onAction={() => setCreateModalOpen(true)}
            secondaryActionLabel="Join with Code"
            onSecondaryAction={() => setJoinModalOpen(true)}
          />
        )}
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <JoinGroupModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </AppLayout>
  );
}

