"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { easePremium, viewportOnce } from "@/lib/animations";

const primary = [
  { href: "/services", label: "Services" },
  { href: "/centres", label: "Centres" },
  { href: "/reserver", label: "Réserver" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
];

const socials = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy text-ivory">
      {/* Top gold hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(201,168,76,0.1),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* ---- Signature row ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: easePremium }}
          className="flex flex-col items-center pb-16 pt-20 text-center md:pb-20 md:pt-28"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Prestigia · Accueil"
          >
            <span className="relative flex h-12 w-12 items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[60deg]">
              <span className="absolute inset-0 rotate-45 rounded-[2px] border border-gold/70 transition-colors duration-500 group-hover:border-gold" />
              <span className="relative font-serif text-base font-semibold text-gold">
                P
              </span>
            </span>
            <span className="font-serif text-3xl font-semibold tracking-normal text-ivory md:text-4xl">
              Prestigia
            </span>
          </Link>

          <p className="mt-8 max-w-xl text-balance font-serif text-lg italic leading-[1.5] text-ivory/75 md:text-xl">
            « L'excellence est une exigence silencieuse, au service de ceux qui
            bâtissent dans la durée. »
          </p>

          <span
            aria-hidden
            className="mt-10 h-px w-16 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
          />
        </motion.div>

        {/* ---- Essentials row ---- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-12 border-t border-ivory/8 py-14 md:grid-cols-3 md:gap-10 md:py-16"
        >
          {/* Navigation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: easePremium },
              },
            }}
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold/80">
              Navigation
            </p>
            <ul className="mt-6 space-y-3">
              {primary.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: easePremium },
              },
            }}
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold/80">
              Contact
            </p>
            <ul className="mt-6 space-y-4 text-[15px] text-ivory/75">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-gold/80"
                />
                <span>
                  Lozenberg 21
                  <br />
                  1932 Zaventem, Belgique
                </span>
              </li>
              <li>
                <a
                  href="tel:+32489820523"
                  className="group inline-flex items-center gap-3 transition-colors duration-500 hover:text-ivory"
                >
                  <Phone
                    size={14}
                    strokeWidth={1.5}
                    className="text-gold/80 transition-colors duration-500 group-hover:text-gold"
                  />
                  +32 489 82 05 23
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@prestigiazaventem.com"
                  className="group inline-flex items-center gap-3 transition-colors duration-500 hover:text-ivory"
                >
                  <Mail
                    size={14}
                    strokeWidth={1.5}
                    className="text-gold/80 transition-colors duration-500 group-hover:text-gold"
                  />
                  info@prestigiazaventem.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Horaires + Socials */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: easePremium },
              },
            }}
          >
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold/80">
              Ouvert
            </p>
            <p className="mt-6 text-[15px] text-ivory/75">
              Lundi – Vendredi
              <br />
              <span className="text-ivory">09h00 – 17h00</span>
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group flex items-center gap-2 rounded-full border border-ivory/15 px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/60 hover:text-ivory"
                >
                  {s.label}
                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---- Bottom strip ---- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory/8 py-8 text-center text-[11px] uppercase tracking-[0.22em] text-ivory/40 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Prestigia — Zaventem</p>

          <ul className="flex items-center gap-6">
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors duration-500 hover:text-ivory/70"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="font-sans">
            <span className="text-ivory/30">Conçu par</span>{" "}
            <a
              href="https://nhboost-agency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/80 transition-colors duration-500 hover:text-gold"
            >
              NHBoost Agency
            </a>
          </p>
        </div>
      </div>

      {/* Oversized wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-serif text-[18rem] font-bold leading-none text-ivory/[0.025] md:text-[22rem]"
      >
        Prestigia
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-3 font-sans text-[15px] text-ivory/70 transition-colors duration-500 hover:text-ivory"
    >
      <span
        aria-hidden
        className="h-px w-0 bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-5"
      />
      <span>{children}</span>
    </Link>
  );
}
