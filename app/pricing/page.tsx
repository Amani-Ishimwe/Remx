"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, ShieldCheck, Users, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PricingPage() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      cadence: "forever",
      description: "For individual engineers building a personal retention habit.",
      badge: null,
      highlight: false,
      features: [
        "Up to 25 saved technical decks",
        "5-stage spaced repetition schedule (1/3/7/14/30d)",
        "Instant quiz gates & active recall",
        "Goal-driven discovery feed",
        "1 study cohort membership",
      ],
      cta: "Get Started Free",
      href: "/app",
    },
    {
      name: "Learner Pro",
      price: "$12",
      cadence: "per month",
      description: "For serious developers, researchers, and engineers reading daily.",
      badge: "Most Popular",
      highlight: true,
      features: [
        "Unlimited technical decks & flashcards",
        "Full AI extraction & invariant synthesis",
        "Unlimited declared learning goals",
        "Full discovery feed ranking",
        "Up to 5 study cohorts",
        "Data backup & markdown export",
      ],
      cta: "Start 14-Day Free Trial",
      href: "/app",
    },
    {
      name: "Study Group / Cohort",
      price: "$29",
      cadence: "per month",
      description: "For engineering teams, university cohorts, and technical book clubs.",
      badge: "For Teams",
      highlight: false,
      features: [
        "Everything in Learner Pro",
        "Unlimited team cohorts & shared libraries",
        "Collaborative momentum tracking & activity feed",
        "Pooled deck repository per team",
        "Admin role management & invite codes",
        "Priority technical support",
      ],
      cta: "Create Team Cohort",
      href: "/app/groups",
    },
  ];

  const faqs = [
    {
      q: "What makes Remx different from generic bookmarking apps?",
      a: "Bookmarking apps are where articles go to die unread. Remx extracts core architectural invariants, tests immediate comprehension via quiz gates, and schedules spaced flashcard reviews so you actually retain what you read.",
    },
    {
      q: "How does the spaced repetition schedule work?",
      a: "Remx reviews are calibrated on intervals of 1, 3, 7, 14, and 30 days. When you successfully recall a concept ('Got it'), it moves to the next interval. A concept reviewed at Day 30 is considered permanent mastery.",
    },
    {
      q: "Why is the interface strictly monochrome?",
      a: "Monochrome eliminates visual noise and cognitive fatigue. Instead of distracting colors, feedback uses weight, shape, and crisp micro-animations so you focus 100% on the conceptual material.",
    },
    {
      q: "Can I use Remx for team engineering documentation?",
      a: "Yes. Study cohorts allow engineering teams to turn architecture RFCs, postmortems, and system specs into shared decks with collective retention momentum.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-remx-black selection:bg-remx-black selection:text-white">
      <Navbar />

      <main className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="subtle" size="md">
            Transparent Pricing
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-remx-black">
            Invest in what you retain, not just what you read.
          </h1>
          <p className="text-sm sm:text-base text-remx-600">
            Simple, transparent tiers for individual learners, researchers, and technical cohorts.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                tier.highlight
                  ? "border-2 border-remx-black bg-remx-black text-white shadow-2xl"
                  : "border border-remx-200 bg-white text-remx-black shadow-sm"
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-base font-bold tracking-tight">
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span
                      className={`text-[10px] font-bold uppercase tracking-label px-2.5 py-0.5 rounded-full ${
                        tier.highlight
                          ? "bg-white text-remx-black"
                          : "bg-remx-black text-white"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {tier.price}
                  </span>
                  <span
                    className={`text-xs ${
                      tier.highlight ? "text-remx-400" : "text-remx-500"
                    }`}
                  >
                    / {tier.cadence}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed mb-6 ${
                    tier.highlight ? "text-remx-300" : "text-remx-600"
                  }`}
                >
                  {tier.description}
                </p>

                {/* Features list */}
                <div className="space-y-3 pt-4 border-t border-remx-200/20 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.highlight
                            ? "bg-white text-remx-black"
                            : "bg-remx-black text-white"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3px]" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <Link href={tier.href}>
                <Button
                  size="lg"
                  variant={tier.highlight ? "solid" : "outline"}
                  className={`w-full font-bold ${
                    tier.highlight
                      ? "bg-white text-remx-black hover:bg-remx-100 border-white"
                      : "border-remx-300 hover:border-remx-900"
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-remx-black tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-remx-600">
              Everything you need to know about the Remx retention architecture.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-xl border border-remx-200 bg-remx-100/50 space-y-2"
              >
                <h3 className="text-sm font-bold text-remx-black">{faq.q}</h3>
                <p className="text-xs text-remx-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
