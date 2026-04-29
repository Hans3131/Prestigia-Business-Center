"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/centres", label: "Centres" },
  { href: "/franchise", label: "Franchise" },
  { href: "/reserver", label: "Réserver" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* ---- Top gold hairline ---- */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      {/* ---- Main bar ---- */}
      <div className="relative isolate">
        {/* Layered background */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1829] via-navy to-[#0c1d33]"
        />
        {/* Radial gold glow, very subtle */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08),transparent_65%)]"
        />
        {/* Noise texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0.8 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* Bottom hairline — subtle, stronger when scrolled */}
        <motion.div
          aria-hidden
          animate={{ opacity: scrolled ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        {/* Content */}
        <motion.div
          animate={{ height: scrolled ? 72 : 92 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10"
        >
          {/* ---------- Logo + slogan ---------- */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-4"
          >
            {/* Monogram mark */}
            <span
              aria-hidden
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <span className="absolute inset-0 rotate-45 rounded-[2px] border border-gold/70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[60deg] group-hover:border-gold" />
              <span className="relative font-serif text-[15px] font-semibold text-gold">
                P
              </span>
            </span>

            {/* Wordmark + tagline */}
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[22px] font-semibold tracking-normal text-ivory">
                Prestigia
              </span>
              <span className="mt-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.42em] text-gold/75">
                Business Center
              </span>
            </span>
          </Link>

          {/* ---------- Center nav ---------- */}
          <nav className="hidden items-center gap-2 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative px-5 py-2 font-sans text-[13px] font-medium text-ivory/75 transition-colors duration-500 hover:text-ivory"
                >
                  <span
                    className={cn(
                      "relative transition-colors duration-500",
                      active && "text-ivory"
                    )}
                  >
                    {item.label}
                  </span>
                  {/* Underline sliding left → right */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/10 via-gold to-gold/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---------- CTA ---------- */}
          <div className="hidden shrink-0 items-center lg:flex">
            <LuxuryCTA href="/reserver">Prendre rendez-vous</LuxuryCTA>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="relative flex h-10 w-10 items-center justify-center text-ivory lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>

      {/* ---- Mobile drawer ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0a1829] lg:hidden"
          >
            {/* Layered background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1829] via-navy to-[#0c1d33]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_-10%,rgba(201,168,76,0.18),transparent_55%)]"
            />
            {/* Top gold hairline */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />
            {/* Decorative corner */}
            <span aria-hidden className="pointer-events-none absolute left-5 top-20 h-6 w-6 border-l border-t border-gold/40" />
            <span aria-hidden className="pointer-events-none absolute right-5 bottom-[210px] h-6 w-6 border-r border-b border-gold/40" />

            {/* Header */}
            <div className="relative flex h-20 shrink-0 items-center justify-between px-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <span className="relative flex h-9 w-9 items-center justify-center">
                  <span className="absolute inset-0 rotate-45 rounded-[2px] border border-gold/70" />
                  <span className="relative font-serif text-sm font-semibold text-gold">P</span>
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-xl font-semibold text-ivory">Prestigia</span>
                  <span className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-gold/70">
                    Business Center
                  </span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="group relative flex h-10 w-10 items-center justify-center text-ivory"
              >
                <span className="absolute inset-0 rounded-full border border-ivory/10 transition-colors duration-500 group-hover:border-gold/50" />
                <X size={18} strokeWidth={1.5} className="relative" />
              </button>
            </div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-3 px-6 pb-4 pt-4"
            >
              <span className="h-px w-8 bg-gold/50" aria-hidden />
              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold/80">
                Navigation
              </span>
            </motion.div>

            {/* Menu items */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.25 },
                },
              }}
              className="relative flex-1 overflow-y-auto px-6"
            >
              {nav.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="group relative border-b border-ivory/10"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-4 font-sans text-[15px] font-medium tracking-[0.04em] transition-all duration-500",
                        active ? "text-gold" : "text-ivory/85 group-hover:text-ivory"
                      )}
                    >
                      <span className="flex items-center gap-4">
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                        )}
                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                          {item.label}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-sans text-[10px] tabular-nums tracking-[0.2em] text-gold/50">
                          0{i + 1}
                        </span>
                        <ArrowUpRight
                          size={13}
                          strokeWidth={1.5}
                          className="text-ivory/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                        />
                      </span>
                    </Link>
                    {/* Gold underline slide-in */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    />
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom — contact + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0 space-y-5 border-t border-ivory/10 bg-navy/40 px-6 pb-7 pt-6 backdrop-blur-sm"
            >
              {/* Contact lines */}
              <div className="space-y-2.5 text-[13px] text-ivory/75">
                <a
                  href="tel:+32489820523"
                  className="flex items-center gap-3 transition-colors hover:text-ivory"
                  onClick={() => setOpen(false)}
                >
                  <Phone size={13} strokeWidth={1.5} className="text-gold" />
                  +32 489 82 05 23
                </a>
                <a
                  href="mailto:info@prestigiazaventem.com"
                  className="flex items-center gap-3 transition-colors hover:text-ivory"
                  onClick={() => setOpen(false)}
                >
                  <Mail size={13} strokeWidth={1.5} className="text-gold" />
                  info@prestigiazaventem.com
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={13} strokeWidth={1.5} className="text-gold" />
                  <span>Lozenberg 21 · 1932 Zaventem</span>
                </div>
              </div>

              <LuxuryCTA
                href="/reserver"
                onClick={() => setOpen(false)}
                fullWidth
              >
                Prendre rendez-vous
              </LuxuryCTA>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------ Luxury CTA ------------------------------ */

function LuxuryCTA({
  href,
  children,
  onClick,
  fullWidth = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden border border-gold/70 px-7 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-gold transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-navy",
        fullWidth && "w-full px-8 py-4 text-xs"
      )}
    >
      {/* Gold fill, slow sweep from left */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      {/* Inner corner ticks — ornamental */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l border-t border-gold/60 transition-colors duration-500 group-hover:border-navy/50"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-gold/60 transition-colors duration-500 group-hover:border-navy/50"
      />
      {/* Soft glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: "#C9A84C" }}
      />

      <span className="relative">{children}</span>
      <ArrowUpRight
        size={13}
        strokeWidth={1.75}
        className="relative transition-transform duration-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
