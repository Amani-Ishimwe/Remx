"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Target,
  Bell,
  Trash2,
  RotateCcw,
  Plus,
  Check,
  User,
  Shield,
  Download,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useRemxStore } from "@/lib/store";
import { SRS_INTERVALS } from "@/lib/srs";

export default function SettingsPage() {
  const { user, goals, addGoal, removeGoal, updateUserProfile, resetToDefaults } = useRemxStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newGoalLabel, setNewGoalLabel] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalLabel.trim()) return;

    addGoal(newGoalLabel.trim(), newGoalCategory.trim() || "Domain");
    setNewGoalLabel("");
    setNewGoalCategory("");
  };

  const handleExportData = () => {
    const data = {
      user,
      goals,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `remx-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <AppLayout>
      <AppHeader
        title="Settings & Preferences"
        subtitle="Manage target learning goals, notification intervals, and account configuration"
      />

      <div className="p-6 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Profile Settings */}
        <div className="rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-remx-200 pb-4">
            <User className="h-5 w-5 text-remx-900" />
            <div>
              <h2 className="text-lg font-bold text-remx-black">Account Profile</h2>
              <p className="text-xs text-remx-500">Your display identity for study cohorts and decks</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex items-center gap-3 pt-2">
              <Button size="md" variant="solid" type="submit">
                Save Changes
              </Button>
              {savedSuccess && (
                <span className="flex items-center gap-1 text-xs text-remx-900 font-bold">
                  <Check className="h-4 w-4" />
                  <span>Profile updated</span>
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Learning Goals Manager */}
        <div className="rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-remx-200 pb-4">
            <div className="flex items-center gap-2.5">
              <Target className="h-5 w-5 text-remx-900" />
              <div>
                <h2 className="text-lg font-bold text-remx-black">Declared Learning Goals</h2>
                <p className="text-xs text-remx-500">
                  Drives recommendation ranking in the Discovery Feed
                </p>
              </div>
            </div>
            <Badge variant="solid" size="sm">
              {goals.length} Active Goals
            </Badge>
          </div>

          {/* Goals List */}
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-remx-200 bg-remx-100/50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-remx-black">{goal.label}</span>
                    <Badge variant="subtle" size="sm">
                      {goal.category}
                    </Badge>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeGoal(goal.id)}
                  className="h-8 w-8 p-0 text-remx-500 hover:text-remx-black"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Goal Subform */}
          <form onSubmit={handleAddGoal} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              placeholder="Add new goal (e.g. Master TypeScript Compiler API)..."
              value={newGoalLabel}
              onChange={(e) => setNewGoalLabel(e.target.value)}
              className="flex-1 h-10 px-3.5 rounded-lg border border-remx-300 bg-white text-xs text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category (e.g. Compilers)"
              value={newGoalCategory}
              onChange={(e) => setNewGoalCategory(e.target.value)}
              className="w-full sm:w-44 h-10 px-3.5 rounded-lg border border-remx-300 bg-white text-xs text-remx-black placeholder:text-remx-400 focus:border-remx-900 focus:outline-none"
            />
            <Button size="md" variant="solid" type="submit" disabled={!newGoalLabel.trim()} className="gap-1.5 font-bold">
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </Button>
          </form>
        </div>

        {/* Spaced Interval Schedule Info */}
        <div className="rounded-xl border border-remx-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-remx-200 pb-4">
            <Bell className="h-5 w-5 text-remx-900" />
            <div>
              <h2 className="text-lg font-bold text-remx-black">Spaced Repetition Intervals</h2>
              <p className="text-xs text-remx-500">
                Calibrated against the Ebbinghaus forgetting curve
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SRS_INTERVALS.map((days, idx) => (
              <div
                key={days}
                className="p-3.5 rounded-lg border border-remx-200 bg-remx-100/60 text-center space-y-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                  Stage {idx + 1}
                </span>
                <p className="text-base font-extrabold text-remx-black">
                  {days} {days === 1 ? "day" : "days"}
                </p>
                <span className="text-[10px] text-remx-600 block">
                  {idx === 4 ? "Mastery achieved" : "Reinforcement"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management & Reset */}
        <div className="rounded-xl border border-dashed border-remx-300 bg-white p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-remx-black">Data & Backup</h3>
          <p className="text-xs text-remx-600">
            Export your decks and goals to JSON, or reset to sample study materials.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportData}
              className="gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Knowledge Backup (JSON)</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (confirm("Reset all decks and cohorts back to initial sample state?")) {
                  resetToDefaults();
                }
              }}
              className="gap-1.5 text-remx-700 hover:text-remx-black"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Sample Data</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
