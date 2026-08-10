"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { useRemxStore } from "@/lib/store";

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function AppHeader({ title, subtitle, action }: AppHeaderProps) {
  const router = useRouter();
  const { user } = useRemxStore();
  const [quickPaste, setQuickPaste] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPaste.trim()) return;
    router.push(`/app/new?input=${encodeURIComponent(quickPaste.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-remx-200 bg-white/90 backdrop-blur-md px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Title / Subtitle */}
        <div>
          {title && (
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-remx-black">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-remx-600 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Quick paste form */}
          <form onSubmit={handleQuickSubmit} className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-remx-400" />
            <input
              type="text"
              placeholder="Paste article URL or note..."
              value={quickPaste}
              onChange={(e) => setQuickPaste(e.target.value)}
              className="w-full h-9 pl-9 pr-8 rounded-lg border border-remx-200 bg-remx-100 text-xs text-remx-black placeholder:text-remx-400 focus:bg-white focus:border-remx-900 focus:outline-none transition-colors"
            />
            {quickPaste && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-label bg-remx-black text-white px-1.5 py-0.5 rounded"
              >
                Go
              </button>
            )}
          </form>

          <StreakBadge streak={user.streak} size="md" />

          {action || (
            <Link href="/app/new">
              <Button size="sm" variant="solid" className="gap-1.5">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Deck</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
