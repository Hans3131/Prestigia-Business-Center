"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error";
type ToastItem = { id: number; variant: ToastVariant; title: string; description?: string };

type ToastApi = {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
};

const ToastCtx = createContext<ToastApi | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback(
    (variant: ToastVariant, title: string, description?: string) => {
      const id = Date.now() + Math.random();
      setItems((xs) => [...xs, { id, variant, title, description }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 5500);
    },
    []
  );

  const api: ToastApi = {
    success: (t, d) => push("success", t, d),
    error: (t, d) => push("error", t, d),
  };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 md:bottom-8">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <AnimatePresence initial={false}>
            {items.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "pointer-events-auto relative overflow-hidden rounded-sm border bg-navy/85 px-5 py-4 text-ivory shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] backdrop-blur-xl",
                  t.variant === "success"
                    ? "border-gold/50"
                    : "border-red-400/50"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-px",
                    t.variant === "success"
                      ? "bg-gradient-to-r from-transparent via-gold to-transparent"
                      : "bg-gradient-to-r from-transparent via-red-400 to-transparent"
                  )}
                />
                <div className="flex items-start gap-3">
                  {t.variant === "success" ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-300" strokeWidth={1.5} />
                  )}
                  <div className="flex-1">
                    <p className="font-sans text-sm font-medium">{t.title}</p>
                    {t.description && (
                      <p className="mt-1 text-xs text-ivory/70">{t.description}</p>
                    )}
                  </div>
                  <button
                    aria-label="Fermer"
                    onClick={() =>
                      setItems((xs) => xs.filter((x) => x.id !== t.id))
                    }
                    className="text-ivory/50 transition-colors hover:text-ivory"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastCtx.Provider>
  );
}
