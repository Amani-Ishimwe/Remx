"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  const navLinks = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#features", label: "Features" },
    { href: "/#spaced-repetition", label: "Spaced Repetition" },
    { href: "/#comparison", label: "Why Remx" },
    { href: "/pricing", label: "Pricing", isRoute: true },
  ];

  const glass = isLanding && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        glass
          ? "bg-transparent border-b border-white/10"
          : "bg-white/95 border-b border-remx-200 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
              glass ? "bg-white text-remx-black" : "bg-remx-black text-white"
            )}
          >
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-lg font-extrabold tracking-tight leading-none",
                glass ? "text-white" : "text-remx-black"
              )}
            >
              REMX
            </span>
            <span
              className={cn(
                "text-[10px] font-medium tracking-label uppercase",
                glass ? "text-white/70" : "text-remx-500"
              )}
            >
              Retention Layer
            </span>
          </div>
        </Link>

        {/* Landing Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.isRoute && pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  glass
                    ? "text-white/85 hover:text-white"
                    : isActive
                    ? "text-remx-black font-bold underline decoration-2 underline-offset-8"
                    : "text-remx-600 hover:text-remx-black"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/app/new">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "hidden sm:inline-flex gap-1.5 font-semibold transition-colors",
                glass
                  ? "border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  : ""
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Paste Article</span>
            </Button>
          </Link>
          <Link href="/app">
            <Button
              variant="solid"
              size="sm"
              className={cn(
                "gap-1.5 font-bold transition-colors",
                glass
                  ? "bg-white text-remx-black hover:bg-white/90"
                  : ""
              )}
            >
              <span>Open Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
