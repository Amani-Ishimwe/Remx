"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Flame,
  Share2,
  Copy,
  Check,
  Plus,
  ArrowLeft,
  Activity,
  Crown,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { DeckCard } from "@/components/deck/DeckCard";
import { DeckDetailModal } from "@/components/deck/DeckDetailModal";
import { GroupMemberRow, GroupActivityItem } from "@/components/groups/GroupMemberRow";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRemxStore } from "@/lib/store";
import { Deck } from "@/lib/types";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const { groups, decks, user, shareDeckToGroup, deleteDeck } = useRemxStore();
  const group = groups.find((g) => g.id === groupId);

  const [copiedInvite, setCopiedInvite] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deckToShareId, setDeckToShareId] = useState("");

  if (!group) {
    return (
      <AppLayout>
        <AppHeader title="Cohort Not Found" />
        <div className="p-8 max-w-xl mx-auto">
          <EmptyState
            icon={Users}
            title="Cohort Not Found"
            description="The requested study group does not exist or you are not a member."
            actionLabel="Return to Groups"
            onAction={() => router.push("/app/groups")}
          />
        </div>
      </AppLayout>
    );
  }

  // Decks belonging to this group
  const groupDecks = decks.filter(
    (d) => d.groupId === group.id || group.deckIds.includes(d.id)
  );

  // User's personal decks that aren't yet in this group
  const unsharedPersonalDecks = decks.filter(
    (d) => d.groupId !== group.id && !group.deckIds.includes(d.id)
  );

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText(group.inviteCode);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const handleShareDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckToShareId) return;

    shareDeckToGroup(deckToShareId, group.id);
    setDeckToShareId("");
    setIsShareModalOpen(false);
  };

  const totalCardsRetained = group.members.reduce((acc, m) => acc + (m.cardsMastered || 0), 0);
  const totalDecksReviewed = group.members.reduce((acc, m) => acc + (m.decksReviewed || 0), 0);

  return (
    <AppLayout>
      <AppHeader
        title={group.name}
        subtitle="Study Group & Cohort Dashboard"
        action={
          <div className="flex items-center gap-2">
            <Link href="/app/groups">
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Groups</span>
              </Button>
            </Link>
            <Button
              size="sm"
              variant="solid"
              onClick={() => setIsShareModalOpen(true)}
              className="gap-1.5 font-bold"
            >
              <Plus className="h-4 w-4" />
              <span>Contribute Deck</span>
            </Button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Cohort Header Hero */}
        <div className="rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-remx-200 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-remx-black">
                  {group.name}
                </h1>
                <Badge variant="solid" size="sm">
                  {group.members.length} Members
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-remx-600 max-w-2xl">
                {group.description}
              </p>
            </div>

            {/* Invite Code Pill */}
            <div className="flex items-center gap-2 bg-remx-100 p-2 rounded-lg border border-remx-200 shrink-0">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-label text-remx-500">
                  Invite Code
                </span>
                <span className="text-xs font-bold font-mono text-remx-black">
                  {group.inviteCode}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyInvite}
                className="h-8 px-2.5 text-xs gap-1"
              >
                {copiedInvite ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Supportive Momentum Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-remx-100/50 border border-remx-200">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                Shared Deck Library
              </span>
              <p className="text-xl font-bold text-remx-black mt-1">
                {groupDecks.length} technical decks
              </p>
            </div>

            <div className="p-4 rounded-lg bg-remx-100/50 border border-remx-200">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                Collective Reviews
              </span>
              <p className="text-xl font-bold text-remx-black mt-1">
                {totalDecksReviewed} completed
              </p>
            </div>

            <div className="p-4 rounded-lg bg-remx-100/50 border border-remx-200">
              <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                Total Cards Retained
              </span>
              <p className="text-xl font-bold text-remx-black mt-1">
                {totalCardsRetained} cards
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Shared Decks & Member Momentum / Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shared Decks (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-remx-900" />
                <h3 className="text-lg font-bold tracking-tight text-remx-black">
                  Cohort Shared Decks ({groupDecks.length})
                </h3>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsShareModalOpen(true)}
                className="text-xs gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add Deck</span>
              </Button>
            </div>

            {groupDecks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupDecks.map((deck) => (
                  <DeckCard
                    key={deck.id}
                    deck={deck}
                    onInspect={(d) => setSelectedDeck(d)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No Decks Shared Yet"
                description="Contribute your first synthesized technical deck to this cohort."
                actionLabel="Contribute Deck"
                onAction={() => setIsShareModalOpen(true)}
              />
            )}
          </div>

          {/* Sidebar: Member Momentum & Activity Feed */}
          <div className="space-y-6">
            {/* Member Momentum Rows */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-remx-900" />
                <h3 className="text-sm font-bold tracking-tight text-remx-black">
                  Member Momentum
                </h3>
              </div>

              <div className="space-y-2.5">
                {group.members.map((member) => (
                  <GroupMemberRow
                    key={member.userId}
                    member={member}
                    isCurrentUser={member.userId === user.id}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-remx-900" />
                <h3 className="text-sm font-bold tracking-tight text-remx-black">
                  Cohort Activity
                </h3>
              </div>

              <div className="space-y-2">
                {group.activity.map((act) => (
                  <GroupActivityItem key={act.id} activity={act} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Deck Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Contribute Deck to Cohort"
        description={`Select one of your existing decks to share with ${group.name}.`}
      >
        <form onSubmit={handleShareDeck} className="space-y-4 mt-4">
          {unsharedPersonalDecks.length > 0 ? (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-label text-remx-700">
                Choose Deck
              </label>
              <select
                value={deckToShareId}
                onChange={(e) => setDeckToShareId(e.target.value)}
                required
                className="w-full h-11 rounded-lg border border-remx-300 bg-white px-3 text-xs text-remx-black font-semibold focus:border-remx-900 focus:outline-none"
              >
                <option value="">Select a deck...</option>
                {unsharedPersonalDecks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.flashcards.length} cards)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-xs text-remx-600">
              All your current decks are already shared with this group, or create a new deck first!
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-remx-200">
            <Button variant="outline" type="button" onClick={() => setIsShareModalOpen(false)}>
              Cancel
            </Button>
            {unsharedPersonalDecks.length > 0 && (
              <Button variant="solid" type="submit" disabled={!deckToShareId}>
                Share with Cohort
              </Button>
            )}
          </div>
        </form>
      </Modal>

      {/* Deck Detail Inspector Modal */}
      <DeckDetailModal
        deck={selectedDeck}
        isOpen={!!selectedDeck}
        onClose={() => setSelectedDeck(null)}
        onDelete={(id) => deleteDeck(id)}
      />
    </AppLayout>
  );
}
