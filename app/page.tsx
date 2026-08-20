"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers, ArrowRight, Sparkles, RotateCw, Target, Users,
  CheckCircle2, Brain, Clock, BookOpen, Zap, TrendingUp,
  Check, Flame, FileText, Search, BarChart2, Shield,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function LandingPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-white text-remx-black selection:bg-remx-black selection:text-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">

        {/* HERO */}
        <section className="relative overflow-hidden min-h-screen flex flex-col border-b border-remx-100">
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img src="/lumic.jpeg" alt="Hero background" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-end">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
              <div className="max-w-xl space-y-5">
                <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.6)] leading-[1.08]">
                  Never forget<br />what you read.
                </motion.h1>
                <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
                  className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
                  Paste any technical article, architecture spec, or research paper. Remx extracts core ideas, builds structured summaries, and schedules spaced-repetition flashcards so knowledge sticks permanently.
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
                  className="flex flex-wrap items-center gap-3 pt-1">
                  <Link href="/app/new">
                    <Button size="sm" variant="solid" className="bg-white text-remx-black hover:bg-white/90 border border-white/60 shadow-lg">
                      <Sparkles className="h-3.5 w-3.5" /><span>Paste Article to Remember</span>
                    </Button>
                  </Link>
                  <Link href="/app">
                    <Button size="sm" variant="solid" className="bg-transparent text-white hover:bg-white/10 border-0 shadow-none">
                      <span>Open Studio</span><ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-b border-remx-100 py-6 bg-remx-100/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] uppercase tracking-label text-remx-400 font-semibold mb-5">
              Built for engineers, researchers, and lifelong learners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {[
                { label: "Kubernetes Docs", icon: <Layers className="h-3.5 w-3.5" /> },
                { label: "arXiv Papers", icon: <FileText className="h-3.5 w-3.5" /> },
                { label: "GitHub RFCs", icon: <BookOpen className="h-3.5 w-3.5" /> },
                { label: "System Design", icon: <BarChart2 className="h-3.5 w-3.5" /> },
                { label: "API References", icon: <Search className="h-3.5 w-3.5" /> },
                { label: "Research PDFs", icon: <Brain className="h-3.5 w-3.5" /> },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 text-xs font-semibold text-remx-500">
                  {item.icon}{item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE 1 — ARTICLE INGESTION */}
        <section id="how-it-works" className="py-24 border-b border-remx-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">01 — Article Ingestion</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black leading-[1.1]">
                    Paste any article.<br />Get a structured breakdown.
                  </h2>
                  <p className="text-sm text-remx-600 leading-relaxed max-w-md">
                    Stop passively skimming. Remx decomposes any technical URL, PDF, or raw text into core invariants, key trade-offs, structured takeaways, and an instant comprehension quiz in seconds.
                  </p>
                </div>
                <ul className="space-y-5">
                  {[
                    { icon: <Sparkles className="h-4 w-4" />, title: "AI-powered extraction", desc: "Core concepts, trade-offs, and system invariants pulled out automatically, regardless of article length or complexity." },
                    { icon: <FileText className="h-4 w-4" />, title: "Structured summaries", desc: "Every article becomes a clean, scannable summary with labeled sections. No noise, just signal." },
                    { icon: <CheckCircle2 className="h-4 w-4" />, title: "Immediate quiz gate", desc: "A comprehension check fires right after ingestion to create the first neural trace before you close the tab." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-remx-100 text-remx-black flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-remx-black">{item.title}</p>
                        <p className="text-xs text-remx-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/app/new">
                  <Button size="sm" variant="solid"><span>Try it now</span><ArrowRight className="h-3.5 w-3.5" /></Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="rounded-xl border border-remx-100 bg-white shadow-lg overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-remx-100 bg-remx-100/50">
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="ml-3 text-[10px] font-mono text-remx-400 truncate">remx.app / new</span>
                </div>
                <div className="p-5 space-y-4 bg-white">
                  <div className="rounded-lg border border-remx-100 bg-remx-100/40 p-4 space-y-2">
                    <p className="text-[10px] uppercase tracking-label font-bold text-remx-400">Article URL</p>
                    <div className="flex items-center gap-2 rounded-lg border border-remx-100 bg-white px-3 py-2 text-xs text-remx-500 font-mono">
                      <Search className="h-3 w-3 shrink-0" />
                      https://kubernetes.io/docs/concepts/networking/ingress
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-label font-bold text-remx-400">Extracted Invariants</p>
                    {[
                      "Ingress routes external HTTP/S traffic to internal services via rules",
                      "Requires an Ingress Controller to be running in the cluster",
                      "TLS termination handled at the Ingress layer, not at pods",
                    ].map((inv, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-remx-100/50 border border-remx-100">
                        <CheckCircle2 className="h-3.5 w-3.5 text-remx-700 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-remx-700 leading-relaxed">{inv}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-remx-400 font-mono">3 flashcards generated · Due Day 1</span>
                    <span className="text-[10px] font-bold text-remx-black flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Ready
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURE 2 — SPACED REPETITION */}
        <section id="spaced-repetition" className="py-24 border-b border-remx-100 bg-remx-100/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-xl border border-remx-100 bg-white shadow-lg overflow-hidden order-2 lg:order-1">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-remx-100 bg-remx-100/50">
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="ml-3 text-[10px] font-mono text-remx-400">Review Queue — 4 due today</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg border border-remx-100 bg-white p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">Card 1 of 4</span>
                      <span className="text-[10px] bg-remx-black text-white px-2 py-0.5 rounded-full font-semibold">Day 7 — Reinforcement</span>
                    </div>
                    <p className="text-xs font-semibold text-remx-black leading-relaxed">
                      What causes O(N) packet latency in standard Kubernetes iptables routing?
                    </p>
                    <div className="rounded-lg bg-remx-100/50 border border-remx-100 p-3">
                      <p className="text-[11px] text-remx-600 leading-relaxed">
                        iptables evaluates every rule sequentially per packet. With thousands of services, rule traversal scales linearly — severe CPU overhead and packet delay at scale.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-label font-bold text-remx-400">Retention Ladder</p>
                    <div className="grid grid-cols-5 gap-1.5">
                      {["Day 1", "Day 3", "Day 7", "Day 14", "Day 30"].map((d, i) => (
                        <div key={d} className="text-center space-y-1">
                          <div className={`h-1.5 rounded-full ${i < 2 ? "bg-remx-700" : i === 2 ? "bg-remx-black" : "bg-remx-200"}`} />
                          <p className="text-[9px] text-remx-400 font-mono">{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="sm" variant="outline" className="flex-1 text-[10px]">Again</Button>
                    <Button size="sm" variant="outline" className="flex-1 text-[10px]">Hard</Button>
                    <Button size="sm" variant="subtle" className="flex-1 text-[10px]">Good</Button>
                    <Button size="sm" variant="solid" className="flex-1 text-[10px]">Easy</Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">02 — Spaced Repetition</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black leading-[1.1]">
                    Reviews that fire at<br />exactly the right moment.
                  </h2>
                  <p className="text-sm text-remx-600 leading-relaxed max-w-md">
                    Without active retrieval, 70% of new technical knowledge evaporates within 48 hours. Remx schedules reviews on a proven 1 · 3 · 7 · 14 · 30 day ladder, surfacing each card at the precise point of near-forgetting to maximise long-term retention with minimum effort.
                  </p>
                </div>
                <ul className="space-y-5">
                  {[
                    { icon: <Clock className="h-4 w-4" />, title: "Automatic scheduling", desc: "No manual setup. Every card enters the review ladder the moment it is created. You just show up." },
                    { icon: <RotateCw className="h-4 w-4" />, title: "4-grade self-rating", desc: "Rate each card Again, Hard, Good, or Easy. The system adjusts future intervals based on your actual recall strength." },
                    { icon: <TrendingUp className="h-4 w-4" />, title: "Retention tracking", desc: "See mastery progress across every article ingested. Watch concepts move from fragile memory to permanent recall." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-remx-100 text-remx-black flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-remx-black">{item.title}</p>
                        <p className="text-xs text-remx-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/app/review">
                  <Button size="sm" variant="solid"><span>Start reviewing</span><ArrowRight className="h-3.5 w-3.5" /></Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURE 3 — LIBRARY & DISCOVERY */}
        <section id="features" className="py-24 border-b border-remx-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">03 — Library and Discovery</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black leading-[1.1]">
                    A library of knowledge<br />that actually grows with you.
                  </h2>
                  <p className="text-sm text-remx-600 leading-relaxed max-w-md">
                    Every article you ingest becomes a deck you own forever. Your library compounds over time — not a graveyard of bookmarks, but a live system of interconnected knowledge you can search, review, and rediscover based on your declared learning goals.
                  </p>
                </div>
                <ul className="space-y-5">
                  {[
                    { icon: <BookOpen className="h-4 w-4" />, title: "Searchable deck library", desc: "Find any concept, invariant, or flashcard across your entire reading history in milliseconds." },
                    { icon: <Target className="h-4 w-4" />, title: "Goal-driven discovery", desc: "Set a learning goal and Remx surfaces relevant unread articles ranked by gap-closing potential." },
                    { icon: <Zap className="h-4 w-4" />, title: "Smart daily queue", desc: "Your daily review queue is generated automatically. Open the app and know exactly what to study." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-remx-100 text-remx-black flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-remx-black">{item.title}</p>
                        <p className="text-xs text-remx-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/app/library">
                  <Button size="sm" variant="solid"><span>Browse library</span><ArrowRight className="h-3.5 w-3.5" /></Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="rounded-xl border border-remx-100 bg-white shadow-lg overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-remx-100 bg-remx-100/50">
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="ml-3 text-[10px] font-mono text-remx-400">Deck Library — 12 decks</span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { title: "Kubernetes CNI and eBPF Networking", cards: 8, stage: "Day 7", due: true },
                    { title: "Raft Consensus: Log Replication", cards: 6, stage: "Day 14", due: false },
                    { title: "Linux Memory Management Internals", cards: 11, stage: "Day 3", due: true },
                    { title: "HTTP/2 and gRPC Protocol Semantics", cards: 5, stage: "Mastered", due: false },
                  ].map((deck) => (
                    <div key={deck.title} className="flex items-center justify-between p-3 rounded-lg border border-remx-100 bg-white hover:bg-remx-100/30 transition-colors">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="text-xs font-bold text-remx-black truncate">{deck.title}</p>
                        <p className="text-[10px] text-remx-400 font-mono">{deck.cards} cards · {deck.stage}</p>
                      </div>
                      {deck.due
                        ? <span className="ml-3 shrink-0 text-[9px] uppercase tracking-label font-bold bg-remx-black text-white px-2 py-0.5 rounded-full">Due</span>
                        : <span className="ml-3 shrink-0 text-[9px] uppercase tracking-label font-semibold text-remx-400 bg-remx-100 px-2 py-0.5 rounded-full">{deck.stage === "Mastered" ? "Done" : "Scheduled"}</span>
                      }
                    </div>
                  ))}
                  <div className="pt-1 flex items-center justify-between text-[10px] text-remx-400">
                    <span>2 decks due today</span>
                    <span className="font-bold text-remx-black">19 cards total</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURE 4 — STUDY COHORTS */}
        <section id="comparison" className="py-24 border-b border-remx-100 bg-remx-100/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-xl border border-remx-100 bg-white shadow-lg overflow-hidden order-2 lg:order-1">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-remx-100 bg-remx-100/50">
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-remx-300" />
                  <span className="ml-3 text-[10px] font-mono text-remx-400">Study Groups</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-lg border border-remx-100 bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-remx-black">Kernel and Infrastructure Cohort</p>
                      <span className="text-[9px] bg-remx-100 text-remx-600 px-2 py-0.5 rounded-full font-semibold">4 members</span>
                    </div>
                    <div className="flex -space-x-2">
                      {["AK", "MJ", "RS", "TL"].map((a) => (
                        <div key={a} className="h-7 w-7 rounded-full bg-remx-black text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">{a}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      {[["18", "Shared Decks"], ["312", "Cards Mastered"], ["14d", "Top Streak"]].map(([val, label]) => (
                        <div key={label} className="rounded-lg bg-remx-100/50 p-2">
                          <p className="text-sm font-extrabold text-remx-black">{val}</p>
                          <p className="text-[9px] text-remx-400 leading-tight mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-label font-bold text-remx-400">Shared Decks</p>
                    {["eBPF Networking Deep-Dive", "Linux Scheduler Internals", "TCP/IP Congestion Control"].map((d) => (
                      <div key={d} className="flex items-center gap-2 p-2 rounded-lg bg-remx-100/40 border border-remx-100">
                        <Layers className="h-3 w-3 text-remx-500 shrink-0" />
                        <p className="text-[11px] text-remx-700 font-medium truncate">{d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
                className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">04 — Study Cohorts</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black leading-[1.1]">
                    Learn faster when<br />you learn together.
                  </h2>
                  <p className="text-sm text-remx-600 leading-relaxed max-w-md">
                    Create a study group with your team, share decks from articles you have each ingested, and track collective mastery. Social accountability combined with shared knowledge compounds learning velocity for everyone in the cohort.
                  </p>
                </div>
                <ul className="space-y-5">
                  {[
                    { icon: <Users className="h-4 w-4" />, title: "Shared deck pools", desc: "Pool flashcard decks from articles each member reads. One person reads it, the whole cohort learns from it." },
                    { icon: <Flame className="h-4 w-4" />, title: "Streak and leaderboard", desc: "Group streaks and mastery leaderboards create healthy accountability without gamification gimmicks." },
                    { icon: <Shield className="h-4 w-4" />, title: "Invite by code", desc: "Create a private cohort and invite teammates with a simple invite code. No account required to join." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-remx-100 text-remx-black flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <p className="text-sm font-bold text-remx-black">{item.title}</p>
                        <p className="text-xs text-remx-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/app/groups">
                  <Button size="sm" variant="solid"><span>Create a cohort</span><ArrowRight className="h-3.5 w-3.5" /></Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 border-b border-remx-100">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: "5 Stages", label: "Spaced review intervals", sub: "1 · 3 · 7 · 14 · 30 days" },
                { value: "95%+", label: "Retention after 30 days", sub: "vs. less than 5% passive reading" },
                { value: "< 30s", label: "From URL to flashcards", sub: "Instant AI extraction" },
                { value: "Unlimited", label: "Articles you can ingest", sub: "No limits on your library" },
              ].map((stat) => (
                <motion.div key={stat.value} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black">{stat.value}</p>
                  <p className="text-xs font-semibold text-remx-700">{stat.label}</p>
                  <p className="text-[10px] text-remx-400">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-24 border-b border-remx-100 bg-remx-100/20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">Why Remx</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-remx-black">Bookmarking is not learning.</h2>
              <p className="text-sm text-remx-600 max-w-lg mx-auto leading-relaxed">
                Read-it-later apps help you save articles. Remx helps you retain them. Here is the difference.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-remx-100 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-remx-100 bg-remx-100/60">
                    <th className="p-4 font-bold uppercase tracking-label text-remx-600">Capability</th>
                    <th className="p-4 font-semibold uppercase tracking-label text-remx-400">Passive Reading</th>
                    <th className="p-4 font-semibold uppercase tracking-label text-remx-400">Bookmark Apps</th>
                    <th className="p-4 font-bold uppercase tracking-label text-remx-black bg-remx-100">Remx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-remx-100 bg-white">
                  {[
                    ["Spaced Interval Reviews", "None", "None", "1 · 3 · 7 · 14 · 30 Days"],
                    ["Comprehension Quiz Gates", "None", "None", "Automatic on every article"],
                    ["AI-Generated Flashcards", "None", "None", "Full deck in seconds"],
                    ["Study Cohorts", "None", "Basic link sharing", "Shared momentum and streaks"],
                    ["Goal-Driven Discovery", "Algorithmic feeds", "Manual tagging", "Gap-closing article matching"],
                    ["Retention After 30 Days", "Less than 5%", "Less than 5%", "Over 95% mastery"],
                  ].map(([capability, passive, bookmark, remx]) => (
                    <tr key={capability} className="hover:bg-remx-100/20 transition-colors">
                      <td className="p-4 font-semibold text-remx-800">{capability}</td>
                      <td className="p-4 text-remx-400">{passive}</td>
                      <td className="p-4 text-remx-400">{bookmark}</td>
                      <td className="p-4 font-bold text-remx-black bg-remx-100/40">
                        <span className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 shrink-0" />{remx}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WORKS WITH */}
        <section className="py-16 border-b border-remx-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-label font-bold text-remx-400">Works with your reading workflow</span>
              <h3 className="text-xl font-extrabold text-remx-black">Paste from anywhere.</h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {[
                { name: "arXiv", icon: <FileText className="h-5 w-5" /> },
                { name: "GitHub", icon: <Layers className="h-5 w-5" /> },
                { name: "Medium", icon: <BookOpen className="h-5 w-5" /> },
                { name: "Substack", icon: <Brain className="h-5 w-5" /> },
                { name: "Hacker News", icon: <Zap className="h-5 w-5" /> },
                { name: "Any URL", icon: <Search className="h-5 w-5" /> },
              ].map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-remx-100 bg-white hover:border-remx-200 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-remx-100 flex items-center justify-center text-remx-700">{item.icon}</div>
                  <p className="text-[10px] font-semibold text-remx-600 text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 bg-remx-black text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-label font-bold text-remx-400 border border-remx-700 rounded-full px-3 py-1">
              <Sparkles className="h-3 w-3" /> Free to start
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">Still wondering?</h2>
            <p className="text-sm text-remx-400 max-w-md mx-auto leading-relaxed">
              Paste one article right now. In under 30 seconds you will have a structured summary, a comprehension quiz, and your first spaced-repetition deck ready for tomorrow's review.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/app/new">
                <Button size="sm" variant="solid" className="bg-white text-remx-black hover:bg-remx-100 border-white font-bold">
                  <Sparkles className="h-3.5 w-3.5" /><span>Paste Your First Article</span><ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="border-remx-700 text-remx-300 hover:bg-white/5 font-medium">
                  <span>View Pricing</span>
                </Button>
              </Link>
            </div>
            <div className="pt-6 border-t border-remx-800 max-w-sm mx-auto space-y-3">
              <p className="text-[11px] text-remx-500 font-semibold uppercase tracking-label">Get retention tips in your inbox</p>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input type="email" placeholder="you@example.com" value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)} required
                    className="flex-1 h-8 px-3 rounded-lg bg-remx-900 border border-remx-700 text-xs text-white placeholder:text-remx-600 focus:border-remx-500 focus:outline-none" />
                  <Button size="sm" variant="solid" type="submit" className="bg-white text-remx-black hover:bg-remx-100 border-white">Subscribe</Button>
                </form>
              ) : (
                <p className="text-xs text-remx-400 flex items-center justify-center gap-1.5">
                  <Check className="h-3.5 w-3.5" /> You are subscribed, thanks!
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-remx-100 bg-white pt-14 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-remx-black text-white flex items-center justify-center"><Layers className="h-4 w-4" /></div>
                <span className="text-lg font-extrabold tracking-tight text-remx-black">REMX</span>
              </Link>
              <p className="text-xs text-remx-500 max-w-xs leading-relaxed">
                The retention layer for reading-to-learn. Engineered for technical papers, systems architecture, RFCs, and deep tutorials.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-remx-100 bg-remx-100 text-[10px] font-semibold text-remx-700">
                <span className="h-1.5 w-1.5 rounded-full bg-remx-black animate-pulse" />Retention Engine Operational
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-label font-bold text-remx-800">Studio</p>
              <ul className="space-y-2 text-xs text-remx-500">
                {[["Dashboard", "/app"], ["New Article", "/app/new"], ["Review Queue", "/app/review"], ["Deck Library", "/app/library"], ["Discovery", "/app/discover"], ["Study Groups", "/app/groups"]].map(([label, href]) => (
                  <li key={label}><Link href={href} className="hover:text-remx-black transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-label font-bold text-remx-800">Learn</p>
              <ul className="space-y-2 text-xs text-remx-500">
                {[["Spaced Repetition", "#spaced-repetition"], ["How It Works", "#how-it-works"], ["Why Remx", "#comparison"], ["Pricing", "/pricing"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="hover:text-remx-black transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-label font-bold text-remx-800">Platform</p>
              <ul className="space-y-2 text-xs text-remx-500">
                <li><Link href="/app/settings" className="hover:text-remx-black transition-colors">Settings</Link></li>
                {["Privacy (Local-First)", "Terms of Service", "Security"].map((label) => (
                  <li key={label}><span className="text-remx-300 cursor-not-allowed">{label}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-remx-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-remx-400">
            <p>Copyright {new Date().getFullYear()} Remx. All rights reserved.</p>
            <div className="flex items-center gap-4"><span>Epilogue Typography</span><span>·</span><span>Calibrated for Engineers</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
