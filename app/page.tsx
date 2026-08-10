"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  Sparkles,
  RotateCw,
  Target,
  Users,
  CheckCircle2,
  Brain,
  Clock,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Flashcard } from "@/components/deck/Flashcard";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { SAMPLE_ARTICLES } from "@/lib/generator";

export default function LandingPage() {
  const [demoFlipped, setDemoFlipped] = useState(false);

  const sampleDemoCard = {
    id: "demo-card",
    front: "What causes O(N) packet latency degradation in standard Kubernetes iptables routing?",
    back: "iptables evaluates every rule sequentially per packet in user-space/kernel context. With thousands of services, rule evaluation scales linearly, consuming massive CPU.",
  };

  return (
    <div className="min-h-screen bg-white text-remx-black selection:bg-remx-black selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-remx-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-remx-300 bg-remx-100 text-xs font-semibold uppercase tracking-label text-remx-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-remx-black animate-pulse" />
              <span>Retention Layer for Technical Reading</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-remx-black leading-[1.08]"
            >
              Never forget what you read.
              <br />
              <span className="underline decoration-4 underline-offset-8">
                Turn articles into mental models.
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-remx-600 leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Paste any technical paper, tutorial, or architecture spec. Remx automatically extracts core invariants, creates structured summaries, immediate quizzes, and schedules spaced-repetition flashcards.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/app/new">
                <Button size="lg" variant="solid" className="gap-2 w-full sm:w-auto h-13 px-8 text-base">
                  <Sparkles className="h-4 w-4" />
                  <span>Paste to Remember</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/app">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto h-13 px-7 text-base">
                  <RotateCw className="h-4 w-4" />
                  <span>Open Review Studio</span>
                </Button>
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 flex items-center justify-center gap-6 text-xs text-remx-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-remx-900" />
                <span>1 &bull; 3 &bull; 7 &bull; 14 &bull; 30 Day Intervals</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-remx-900" />
                <span>Cohort Study Groups</span>
              </span>
            </motion.div>
          </div>

          {/* Interactive Live Hero Flashcard Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 max-w-2xl mx-auto"
          >
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold uppercase tracking-label text-remx-500">
                Interactive Preview — Try Flipped Recall
              </span>
            </div>

            <Flashcard
              card={sampleDemoCard}
              cardNumber={1}
              totalCards={4}
              showGradingActions={false}
            />
          </motion.div>
        </div>
      </section>

      {/* The 5-Stage Retention Loop */}
      <section className="py-20 bg-remx-100/60 border-b border-remx-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-label text-remx-600">
              The Retention Mechanics
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-remx-black mt-2">
              From Passive Reading to Invariable Recall
            </h2>
            <p className="mt-3 text-sm text-remx-600">
              Without active retrieval, humans forget 70% of new technical material within 48 hours. Remx locks mental models into long-term memory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-xl border border-remx-200 bg-white p-7 space-y-4 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-remx-black text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-remx-black tracking-tight">
                Extract & Deconstruct
              </h3>
              <p className="text-xs text-remx-600 leading-relaxed">
                Paste any article URL or markdown notes. Remx decomposes the architecture into key takeaways, core trade-offs, and immediate quiz gates.
              </p>
              <div className="pt-2 border-t border-remx-200 text-[11px] font-mono text-remx-500">
                &gt; Instant AI synthesis
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border-2 border-remx-black bg-white p-7 space-y-4 shadow-md relative">
              <div className="absolute top-4 right-4">
                <Badge variant="solid" size="sm">
                  Active Gate
                </Badge>
              </div>
              <div className="h-10 w-10 rounded-lg bg-remx-black text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-remx-black tracking-tight">
                Immediate Retrieval Check
              </h3>
              <p className="text-xs text-remx-600 leading-relaxed">
                Test understanding immediately after reading. Immediate recall creates the initial neural trace before the forgetting curve takes effect.
              </p>
              <div className="pt-2 border-t border-remx-200 text-[11px] font-mono text-remx-700 font-semibold">
                &gt; Zero color distraction
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-remx-200 bg-white p-7 space-y-4 shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-remx-black text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-remx-black tracking-tight">
                Spaced Interval Reinforcement
              </h3>
              <p className="text-xs text-remx-600 leading-relaxed">
                Flashcards enter a calibrated 1 &bull; 3 &bull; 7 &bull; 14 &bull; 30 day review ladder. Each successful review cements the mental model permanently.
              </p>
              <div className="pt-2 border-t border-remx-200 text-[11px] font-mono text-remx-500">
                &gt; Mastered at Day 30
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cohorts & Goal Feed Section */}
      <section className="py-20 border-b border-remx-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-label text-remx-600">
                Built For Technical Teams & Cohorts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black leading-tight">
                Shared Study Groups without Toxic Leaderboards
              </h2>
              <p className="text-sm text-remx-600 leading-relaxed">
                Form study cohorts with your engineering team, reading club, or study group. Share decks, review progress collectively, and build supportive momentum together.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-remx-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    &check;
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-remx-black">
                      Pooled Deck Repositories
                    </h4>
                    <p className="text-xs text-remx-600">
                      Any member can contribute synthesized technical decks to the group library.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-remx-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    &check;
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-remx-black">
                      Supportive Cohort Momentum
                    </h4>
                    <p className="text-xs text-remx-600">
                      Track shared streaks and cards mastered as a team milestone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-remx-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    &check;
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-remx-black">
                      Goal-Driven Discovery Feed
                    </h4>
                    <p className="text-xs text-remx-600">
                      Curated recommendations targeting your declared goals, not an engagement algorithm.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/app/groups">
                  <Button variant="solid" size="md" className="gap-2">
                    <Users className="h-4 w-4" />
                    <span>Explore Study Groups</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Cohort Card Mockup */}
            <div className="rounded-2xl border-2 border-remx-black bg-remx-100/50 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-remx-300 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-remx-black text-white flex items-center justify-center font-bold text-xs">
                    KI
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-remx-black">
                      Kernel & Infrastructure Cohort
                    </h4>
                    <span className="text-[10px] font-mono text-remx-500">
                      Invite: KERNEL-2026
                    </span>
                  </div>
                </div>
                <StreakBadge streak={7} size="sm" showLabel={true} />
              </div>

              {/* Sample Activity item */}
              <div className="p-3 rounded-lg bg-white border border-remx-200 text-xs text-remx-700 flex items-center justify-between">
                <span>&bull; Elena shared &quot;Linux Page Faults & Virtual Memory&quot;</span>
                <span className="text-[10px] text-remx-400 font-mono">2h ago</span>
              </div>

              <div className="p-3 rounded-lg bg-white border border-remx-200 text-xs text-remx-700 flex items-center justify-between">
                <span>&bull; Cohort collective review streak reached 7 days!</span>
                <span className="text-[10px] text-remx-400 font-mono">5h ago</span>
              </div>

              <div className="pt-2 text-center">
                <Link href="/app/groups">
                  <span className="text-xs font-bold text-remx-900 hover:underline">
                    View Live Cohort Feed &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-remx-black text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Stop reading articles once and forgetting them forever.
          </h2>
          <p className="text-remx-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Turn technical reading into permanent intellectual assets. Start with one article today.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link href="/app/new">
              <Button size="lg" variant="solid" className="bg-white text-remx-black hover:bg-remx-100 gap-2 border-white">
                <Sparkles className="h-4 w-4" />
                <span>Paste Your First Article</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
