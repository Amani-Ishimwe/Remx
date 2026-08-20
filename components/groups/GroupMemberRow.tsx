"use client";

import React from "react";
import { Flame, CheckCircle, BookOpen, Crown } from "lucide-react";
import { GroupMember } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { cn } from "@/lib/utils";

export interface GroupMemberRowProps {
  member: GroupMember;
  isCurrentUser?: boolean;
}

export function GroupMemberRow({ member, isCurrentUser }: GroupMemberRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all gap-4",
        isCurrentUser
          ? "border-2 border-remx-black bg-remx-100/60"
          : "border-remx-200 bg-white"
      )}
    >
      {/* Member identity */}
      <div className="flex items-center gap-3.5">
        <div className="h-10 w-10 rounded-full bg-remx-black text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
          {member.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-remx-black">{member.name}</span>
            {member.role === "owner" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-label bg-remx-black text-white px-2 py-0.5 rounded-full">
                <Crown className="h-2.5 w-2.5" />
                <span>Owner</span>
              </span>
            )}
            {isCurrentUser && (
              <Badge variant="subtle" size="sm">
                You
              </Badge>
            )}
          </div>
          <p className="text-xs text-remx-500 mt-0.5">
            Active cohort contributor
          </p>
        </div>
      </div>

      {/* Supportive momentum stats (not a toxic leaderboard) */}
      <div className="flex items-center gap-6 text-xs text-remx-700 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-remx-200">
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">
            Decks Reviewed
          </span>
          <span className="font-bold text-remx-black text-sm">
            {member.decksReviewed}
          </span>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">
            Cards Retained
          </span>
          <span className="font-bold text-remx-black text-sm">
            {member.cardsMastered}
          </span>
        </div>

        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">
            Active Streak
          </span>
          <StreakBadge streak={member.streak} size="sm" showLabel={false} />
        </div>
      </div>
    </div>
  );
}

export interface GroupActivityItemProps {
  activity: {
    id: string;
    type: string;
    message: string;
    at: string;
    user: string;
  };
}

export function GroupActivityItem({ activity }: GroupActivityItemProps) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-lg border border-remx-100 bg-white">
      <div className="h-7 w-7 rounded-full bg-remx-100 border border-remx-300 text-remx-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
        {activity.user.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-remx-900 leading-relaxed">
          {activity.message}
        </p>
        <span className="text-[10px] text-remx-400 font-mono mt-0.5 block">
          {activity.at}
        </span>
      </div>
    </div>
  );
}
