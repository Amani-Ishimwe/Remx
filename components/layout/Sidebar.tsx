"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  Library,
  RotateCw,
  Compass,
  Users,
  Settings,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { useRemxStore } from "@/lib/store";
import { isDeckDue } from "@/lib/srs";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { decks, user, groups } = useRemxStore();

  const dueDecksCount = decks.filter(isDeckDue).length;

  const navigation = [
    {
      name: "Dashboard",
      href: "/app",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      name: "New Deck",
      href: "/app/new",
      icon: PlusCircle,
      badge: null,
    },
    {
      name: "Review Queue",
      href: "/app/review",
      icon: RotateCw,
      badge: dueDecksCount > 0 ? `${dueDecksCount} due` : null,
      badgeSolid: dueDecksCount > 0,
    },
    {
      name: "Deck Library",
      href: "/app/library",
      icon: Library,
      badge: decks.length > 0 ? `${decks.length}` : null,
    },
    {
      name: "Goal Feed",
      href: "/app/discover",
      icon: Compass,
      badge: null,
    },
    {
      name: "Study Groups",
      href: "/app/groups",
      icon: Users,
      badge: groups.length > 0 ? `${groups.length}` : null,
    },
    {
      name: "Settings",
      href: "/app/settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-remx-200 bg-white flex flex-col justify-between h-screen sticky top-0">
      {/* Top Header */}
      <div>
        <div className="p-5 border-b border-remx-200">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-remx-black text-white transition-transform group-hover:scale-105">
              <Layers className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-remx-black leading-none">
                REMX
              </span>
              <span className="text-[9px] font-semibold tracking-label uppercase text-remx-500 mt-0.5">
                Technical Retention
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-remx-black text-white font-semibold"
                    : "text-remx-700 hover:bg-remx-100 hover:text-remx-black"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110",
                      isActive ? "stroke-[2.5px] fill-white/20" : "stroke-[1.75px]"
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-label select-none",
                      isActive
                        ? "bg-white text-remx-black"
                        : item.badgeSolid
                        ? "bg-remx-black text-white"
                        : "bg-remx-200 text-remx-800"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Cohorts & User Status Footer */}
      <div className="p-4 border-t border-remx-200 space-y-4">
        {/* Streak card */}
        <div className="p-3 rounded-lg bg-remx-100 border border-remx-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-label text-remx-600">
              Retention Streak
            </span>
            <StreakBadge streak={user.streak} size="sm" showLabel={false} />
          </div>
          <p className="text-xs text-remx-700">
            {dueDecksCount > 0
              ? `${dueDecksCount} review${dueDecksCount > 1 ? "s" : ""} pending today`
              : "All scheduled reviews complete!"}
          </p>
        </div>

        {/* User profile capsule */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-remx-black text-white flex items-center justify-center font-bold text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-remx-black leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-remx-500">{user.email}</span>
            </div>
          </div>
          <Link
            href="/app/settings"
            className="text-remx-400 hover:text-remx-black p-1 transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
