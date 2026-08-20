"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, BookOpen, Flame, ArrowRight, ShieldCheck } from "lucide-react";
import { Group } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface GroupCardProps {
  group: Group;
  className?: string;
}

export function GroupCard({ group, className }: GroupCardProps) {
  const totalMastered = group.members.reduce((acc, m) => acc + (m.cardsMastered || 0), 0);
  const maxStreak = Math.max(...group.members.map((m) => m.streak || 0), 0);

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
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-remx-black text-white flex items-center justify-center font-bold text-xs">
              <Users className="h-4 w-4" />
            </div>
            <Badge variant="subtle" size="sm">
              Cohort Code: {group.inviteCode}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-remx-black bg-remx-100 px-2 py-0.5 rounded-full border border-remx-100">
            <Flame className="h-3.5 w-3.5 fill-remx-black text-remx-black" />
            <span>{maxStreak}d streak</span>
          </div>
        </div>

        {/* Group Name */}
        <Link href={`/app/groups/${group.id}`}>
          <h3 className="text-lg font-bold text-remx-black hover:underline tracking-tight">
            {group.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-xs text-remx-600 line-clamp-2 leading-relaxed">
          {group.description}
        </p>

        {/* Member Avatars preview */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {group.members.slice(0, 4).map((member, idx) => (
              <div
                key={member.userId || idx}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-remx-black text-[10px] font-bold text-white ring-2 ring-white"
                title={member.name}
              >
                {member.avatar}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-remx-500 font-medium">
            {group.members.length} member{group.members.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Footer statistics and link */}
      <div className="mt-6 pt-4 border-t border-remx-200 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-remx-600">
          <span className="flex items-center gap-1 font-semibold text-remx-900">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{group.deckIds.length} shared decks</span>
          </span>
          <span>&bull;</span>
          <span>{totalMastered} cards mastered</span>
        </div>

        <Link href={`/app/groups/${group.id}`}>
          <Button size="sm" variant="outline" className="gap-1 text-xs">
            <span>View Cohort</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
