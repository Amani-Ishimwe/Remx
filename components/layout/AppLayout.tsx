"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Menu, X } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row text-remx-black">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-remx-200 bg-white sticky top-0 z-40">
        <span className="font-extrabold text-base tracking-tight">REMX</span>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg border border-remx-200 text-remx-black"
          aria-label="Toggle Navigation"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="md:hidden fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="flex justify-end p-4 border-b border-remx-200">
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2 rounded-lg border border-remx-200 text-remx-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto" onClick={() => setMobileNavOpen(false)}>
              <Sidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area with Page Transition */}
      <main className="flex-1 min-w-0 flex flex-col bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
