"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/lib/../components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Overview" },
    { href: "/app/discover", label: "Discovery Feed" },
    { href: "/app/groups", label: "Study Groups" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-remx-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-remx-black text-white transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-remx-black leading-none">
              REMX
            </span>
            <span className="text-[10px] font-medium tracking-label uppercase text-remx-500">
              Retention Layer
            </span>
          </div>
        </Link>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-remx-black",
                  isActive
                    ? "text-remx-black font-semibold underline decoration-2 underline-offset-8"
                    : "text-remx-600"
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
            <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Paste Article</span>
            </Button>
          </Link>
          <Link href="/app">
            <Button variant="solid" size="sm" className="gap-1.5">
              <span>Open Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
