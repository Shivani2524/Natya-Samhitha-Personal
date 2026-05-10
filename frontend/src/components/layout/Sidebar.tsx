"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, History, Plus, X, Menu } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sessions, sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  const handleSessionTap = (sessionId: string) => {
    router.push(`/results?sessionId=${sessionId}`);
    // Close sidebar on mobile after selection
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const sortedSessions = Object.values(sessions).sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <>
      {/* Persistent Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed top-4 left-4 z-[70] p-3 rounded-xl
          transition-all duration-300
          ${sidebarOpen 
            ? "bg-transparent text-[var(--gold-bright)] hover:bg-[var(--glass-gold)]" 
            : "bg-[var(--maroon-black)]/80 backdrop-blur-md border border-[var(--gold-royal)]/30 text-[var(--gold-bright)] shadow-xl hover:bg-[var(--maroon-deep)]"}
        `}
        aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : 0,
          x: sidebarOpen ? 0 : -280,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed md:relative h-screen z-[60] md:z-40 shrink-0
          glass-maroon overflow-hidden border-r border-[var(--gold-royal)]/20
          shadow-2xl md:shadow-none
        `}
      >
        <div className="w-[280px] flex flex-col h-full">
          {/* Header Area */}
          <div className="p-6 border-b border-[var(--gold-royal)]/10 flex items-center justify-between shrink-0">
            <Link
              href="/"
              className="flex flex-col gap-1 group pl-12"
              aria-label="Natya Samhitha Home"
              onClick={() => typeof window !== "undefined" && window.innerWidth < 768 && setSidebarOpen(false)}
            >
              <span className="font-sanskrit text-2xl text-[var(--gold-bright)] group-hover:text-[var(--gold-pale)] transition-colors whitespace-nowrap">
                नाट्य संहिता
              </span>
              <span className="font-nav text-[0.6rem] tracking-[0.2em] text-gradient-gold whitespace-nowrap uppercase">
                Natya Samhitha
              </span>
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto py-8 px-5 scrollbar-hide space-y-10">
            
            {/* New Inquiry Button */}
            <div>
              <button
                onClick={() => {
                  router.push("/");
                  if (typeof window !== "undefined" && window.innerWidth < 768) setSidebarOpen(false);
                }}
                className="
                  flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-xl
                  font-nav text-[0.7rem] tracking-[0.2em] whitespace-nowrap uppercase
                  bg-[var(--gold-royal)] text-[var(--cream-warm)]
                  hover:bg-[var(--gold-bright)] hover:scale-[1.02] active:scale-95
                  transition-all duration-300 shadow-lg shadow-[var(--shadow-warm)]
                "
              >
                <Plus className="w-4 h-4 shrink-0" />
                New Chat
              </button>
            </div>

            {/* Recent Sessions */}
            {sortedSessions.length > 0 && (
              <div className="space-y-4">
                <h2 className="px-2 text-[0.6rem] font-nav tracking-[0.25em] text-[var(--gold-bright)]/40 flex items-center gap-2 whitespace-nowrap uppercase">
                  <History className="w-3.5 h-3.5 shrink-0" />
                  Recent History
                </h2>
                <div className="flex flex-col gap-2">
                  {sortedSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSessionTap(session.id)}
                      className="
                        flex items-start gap-3 px-3 py-2.5 rounded-xl text-left
                        text-sm font-body w-full group
                        text-[var(--text-cream)]/60 hover:text-[var(--gold-bright)]
                        hover:bg-[var(--glass-gold)]/30
                        transition-all duration-200
                      "
                    >
                      <Clock className="w-3.5 h-3.5 mt-0.5 opacity-30 group-hover:opacity-100 shrink-0 transition-opacity" />
                      <span className="line-clamp-2 leading-relaxed capitalize">{session.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Ornament */}
          <div className="p-8 border-t border-[var(--gold-royal)]/10 text-center shrink-0">
            <span className="font-sanskrit text-2xl text-[var(--gold-bright)]/10 block mb-1">
              ॐ
            </span>
            <p className="font-nav text-[0.5rem] tracking-[0.3em] text-[var(--gold-royal)]/20 uppercase">
              The Sacred Theatre
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
