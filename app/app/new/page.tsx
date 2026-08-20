"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  Users,
  BookOpen,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppHeader } from "@/components/layout/AppHeader";
import { ArticleInputCard } from "@/components/generator/ArticleInputCard";
import { GenerationSkeleton } from "@/components/generator/GenerationSkeleton";
import { SummaryCard } from "@/components/generator/SummaryCard";
import { QuizQuestion } from "@/components/generator/QuizQuestion";
import { Flashcard } from "@/components/deck/Flashcard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { generateRetentionArtifacts, GenerationResult } from "@/lib/generator";
import { useRemxStore } from "@/lib/store";

function NewDeckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialInput = searchParams.get("input") || "";

  const { addDeck, groups } = useRemxStore();

  const [step, setStep] = useState<"input" | "generating" | "quiz" | "summary" | "completed">("input");
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | undefined>();
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [quizScore, setQuizScore] = useState<number>(0);
  const [createdDeckId, setCreatedDeckId] = useState<string | null>(null);

  // Auto-trigger generation if input provided in query
  useEffect(() => {
    if (initialInput && step === "input") {
      handleGenerate(initialInput, initialInput.startsWith("http") ? initialInput : undefined);
    }
  }, [initialInput]);

  const handleGenerate = async (content: string, url?: string) => {
    setSourceUrl(url);
    setStep("generating");

    try {
      const result = await generateRetentionArtifacts(content, url);
      setGenerationResult(result);
      setStep("quiz"); // Immediate quiz gate!
    } catch (err) {
      console.error(err);
      setStep("input");
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleCompleteQuiz = () => {
    setStep("summary");
  };

  const handleSaveDeck = () => {
    if (!generationResult) return;

    const group = groups.find((g) => g.id === selectedGroupId);

    const newDeck = addDeck({
      title: generationResult.title,
      summary: generationResult.summary,
      keyTakeaways: generationResult.keyTakeaways,
      category: generationResult.category,
      tags: generationResult.tags,
      sourceUrl,
      groupId: selectedGroupId || undefined,
      groupName: group?.name,
      flashcards: generationResult.flashcards,
      quiz: generationResult.quiz,
    });

    setCreatedDeckId(newDeck.id);
    setStep("completed");
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto w-full">
      {/* Step Progress Tracker */}
      <div className="mb-8 flex items-center justify-between border-b border-remx-200 pb-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-label ${
              step === "input" ? "text-remx-black" : "text-remx-400"
            }`}
          >
            1. Input Source
          </span>
          <span className="text-remx-300">&rarr;</span>
          <span
            className={`text-xs font-bold uppercase tracking-label ${
              step === "generating" || step === "quiz"
                ? "text-remx-black"
                : "text-remx-400"
            }`}
          >
            2. Immediate Quiz Gate
          </span>
          <span className="text-remx-300">&rarr;</span>
          <span
            className={`text-xs font-bold uppercase tracking-label ${
              step === "summary" || step === "completed"
                ? "text-remx-black"
                : "text-remx-400"
            }`}
          >
            3. Spaced Flashcards
          </span>
        </div>

        {step !== "input" && step !== "completed" && (
          <button
            onClick={() => setStep("input")}
            className="text-xs text-remx-500 hover:text-remx-black flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Start Over</span>
          </button>
        )}
      </div>

      {/* Dynamic Step View */}
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <ArticleInputCard
              onGenerate={handleGenerate}
              initialValue={initialInput}
            />
          </motion.div>
        )}

        {step === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <GenerationSkeleton />
          </motion.div>
        )}

        {step === "quiz" && generationResult && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-remx-100 bg-remx-100 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-label text-remx-600">
                  Step 2: Immediate Retrieval Check
                </span>
                <h3 className="text-base font-bold text-remx-black">
                  Test your recall before cards enter the spaced schedule
                </h3>
              </div>
              <Badge variant="solid" size="sm">
                Active Gate
              </Badge>
            </div>

            {generationResult.quiz.map((q, idx) => (
              <QuizQuestion
                key={q.id || idx}
                question={q}
                questionNumber={idx + 1}
                totalQuestions={generationResult.quiz.length}
                onAnswered={handleQuizAnswer}
              />
            ))}

            <div className="flex justify-end pt-4">
              <Button
                size="lg"
                variant="solid"
                onClick={handleCompleteQuiz}
                className="gap-2 font-bold"
              >
                <span>Review Summary & Flashcards</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "summary" && generationResult && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-8"
          >
            <SummaryCard
              title={generationResult.title}
              summary={generationResult.summary}
              keyTakeaways={generationResult.keyTakeaways}
              category={generationResult.category}
              tags={generationResult.tags}
              sourceUrl={sourceUrl}
            />

            {/* Flashcards Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight text-remx-black">
                  Generated Flashcards ({generationResult.flashcards.length})
                </h3>
                <span className="text-xs text-remx-500">
                  Initial interval: Day 1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generationResult.flashcards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-5 rounded-xl border border-remx-100 bg-white space-y-2 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-label text-remx-500">
                      Card {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-remx-black">
                      {card.front}
                    </p>
                    <p className="text-xs text-remx-600 border-t border-remx-200 pt-2 font-medium">
                      {card.back}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assign to Cohort Selection */}
            <div className="p-5 rounded-xl border border-remx-100 bg-remx-100/60 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-remx-900" />
                <span className="text-xs font-bold uppercase tracking-label text-remx-900">
                  Share With Study Cohort (Optional)
                </span>
              </div>
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full h-10 rounded-lg border border-remx-300 bg-white px-3 text-xs text-remx-black font-medium focus:border-remx-900 focus:outline-none"
              >
                <option value="">Personal Deck (No Group)</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.members.length} members)
                  </option>
                ))}
              </select>
            </div>

            {/* Final Save Action */}
            <div className="flex items-center justify-between pt-4 border-t border-remx-200">
              <span className="text-xs text-remx-500">
                Cards will be added to your spaced repetition queue
              </span>

              <Button size="lg" variant="solid" onClick={handleSaveDeck} className="gap-2 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Lock into Spaced Repetition</span>
              </Button>
            </div>
          </motion.div>
        )}

        {step === "completed" && generationResult && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-remx-300 bg-white p-8 sm:p-12 text-center space-y-6 shadow-xl"
          >
            <div className="h-16 w-16 rounded-full bg-remx-black text-white mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="h-8 w-8 stroke-[2.5px]" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-remx-black">
                Deck Added to Spaced Repetition
              </h2>
              <p className="text-xs sm:text-sm text-remx-600 leading-relaxed">
                &quot;{generationResult.title}&quot; is now scheduled. First recall interval starts tomorrow (Day 1).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-remx-100 bg-remx-100 max-w-md mx-auto flex items-center justify-between text-xs font-semibold">
              <span>Spaced Schedule:</span>
              <span className="font-bold text-remx-black">
                1d &rarr; 3d &rarr; 7d &rarr; 14d &rarr; 30d (Mastery)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button
                size="md"
                variant="outline"
                onClick={() => router.push("/app/library")}
                className="w-full sm:w-auto"
              >
                View in Library
              </Button>
              {createdDeckId && (
                <Button
                  size="md"
                  variant="solid"
                  onClick={() => router.push(`/app/review?deckId=${createdDeckId}`)}
                  className="w-full sm:w-auto gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  <span>Practice Immediate Recall Now</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NewDeckPage() {
  return (
    <AppLayout>
      <AppHeader
        title="Artifact Generator"
        subtitle="Extract core invariants, instant quizzes, and spaced flashcards"
      />
      <Suspense fallback={<div className="p-8 text-center text-xs text-remx-500">Loading generator...</div>}>
        <NewDeckContent />
      </Suspense>
    </AppLayout>
  );
}

