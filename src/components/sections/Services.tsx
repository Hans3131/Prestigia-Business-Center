"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Building2,
  FileText,
  Users,
  Briefcase,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";
import { Section, SectionLabel } from "@/components/ui";
import { SplitReveal } from "@/components/animations";
import { easePremium, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  description: string;
  href: string;
  icon: typeof Building2;
  variant: "light" | "dark" | "gold" | "image";
  image?: string;
};

const services: Service[] = [
  {
    title: "Domiciliation d'entreprise",
    description:
      "Une adresse prestigieuse à Zaventem pour asseoir la crédibilité de votre société.",
    href: "/services#domiciliation",
    icon: Building2,
    variant: "image",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Gestion administrative",
    description:
      "Traitement du courrier, secrétariat et support administratif sur-mesure.",
    href: "/services#gestion",
    icon: FileText,
    variant: "dark",
  },
  {
    title: "Salles de réunion",
    description:
      "Espaces équipés et raffinés pour vos rendez-vous les plus stratégiques.",
    href: "/services#salles",
    icon: Users,
    variant: "light",
  },
  {
    title: "Coworking",
    description:
      "Un environnement calme et inspirant pour travailler avec sérénité.",
    href: "/services#coworking",
    icon: Briefcase,
    variant: "light",
  },
  {
    title: "Accompagnement marketing",
    description:
      "Stratégie, visibilité et outils pour faire rayonner votre entreprise.",
    href: "/services#marketing",
    icon: Megaphone,
    variant: "gold",
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-ivory !py-8 relative overflow-hidden">
      {/* Header */}
      <div className="relative mb-10 flex flex-col items-center text-center">
        <SectionLabel align="center">Ce que nous offrons</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-serif font-semibold leading-[1.15] tracking-normal text-navy">
          <SplitReveal pre="Nos Services" accent="d'Élite" />
        </h2>
        <p className="mt-5 max-w-xl leading-[1.7] text-navy/70">
          Cinq piliers conçus pour accompagner chaque étape de votre croissance,
          avec la même exigence d'excellence.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09 } },
        }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2"
      >
        {services.map((s, i) => (
          <ServiceCard key={s.href} service={s} index={i} />
        ))}
      </motion.div>
    </Section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const spanClass = index === 0 ? "md:row-span-2" : "";

  const palette = {
    light: {
      bg: "bg-cream",
      text: "text-navy",
      desc: "text-navy/65",
      icon: "text-gold group-hover:text-ivory",
      iconBg: "border-gold/25 bg-gold/5",
      iconHover: "group-hover:bg-gold group-hover:border-gold",
      label: "text-gold",
      line: "bg-gold",
      hoverBg: "group-hover:bg-white",
    },
    dark: {
      bg: "bg-navy",
      text: "text-ivory",
      desc: "text-ivory/70",
      icon: "text-gold group-hover:text-ivory",
      iconBg: "border-gold/40 bg-gold/10",
      iconHover: "group-hover:bg-gold group-hover:border-gold",
      label: "text-gold",
      line: "bg-gold",
      hoverBg: "",
    },
    gold: {
      bg: "bg-gold",
      text: "text-navy",
      desc: "text-navy/80",
      icon: "text-navy group-hover:text-ivory",
      iconBg: "border-navy/30 bg-navy/5",
      iconHover: "group-hover:bg-navy group-hover:border-navy",
      label: "text-navy",
      line: "bg-navy",
      hoverBg: "",
    },
    image: {
      bg: "bg-navy",
      text: "text-ivory",
      desc: "text-ivory/75",
      icon: "text-gold group-hover:text-ivory",
      iconBg: "border-gold/50 bg-navy/30 backdrop-blur-sm",
      iconHover: "group-hover:bg-gold group-hover:border-gold",
      label: "text-gold",
      line: "bg-gold",
      hoverBg: "",
    },
  }[service.variant];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: easePremium },
        },
      }}
      className={cn(spanClass)}
    >
      <Link
        href={service.href}
        aria-label={`${service.title} — en savoir plus`}
        className={cn(
          "group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-sm p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-10",
          palette.bg,
          palette.text,
          palette.hoverBg,
          "hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(11,26,46,0.28)]"
        )}
      >
        {/* Background image for image variant */}
        {service.variant === "image" && service.image && (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/65 to-navy/95 transition-colors duration-700 group-hover:from-navy/30 group-hover:via-navy/55 group-hover:to-navy/95"
            />
          </>
        )}

        {/* Gold ambient glow on dark */}
        {service.variant === "dark" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(201,168,76,0.14),transparent_55%)]"
          />
        )}

        {/* Top hairline on dark/image */}
        {(service.variant === "dark" || service.variant === "image") && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          />
        )}

        {/* Decorative corner ticks */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t opacity-40 transition-all duration-700 group-hover:h-5 group-hover:w-5 group-hover:opacity-100",
            service.variant === "gold" ? "border-navy" : "border-gold"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-r border-b opacity-40 transition-all duration-700 group-hover:h-5 group-hover:w-5 group-hover:opacity-100",
            service.variant === "gold" ? "border-navy" : "border-gold"
          )}
        />

        {/* Top row: icon + number */}
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-sm border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[4deg]",
              palette.iconBg,
              palette.iconHover
            )}
          >
            <Icon
              size={22}
              strokeWidth={1.25}
              className={cn(
                "transition-transform duration-700 group-hover:scale-110",
                palette.icon
              )}
            />
          </span>

          <span
            className={cn(
              "font-sans text-[10px] font-medium tabular-nums tracking-[0.3em]",
              palette.label,
              "opacity-70"
            )}
          >
            0{index + 1}
          </span>
        </div>

        {/* Bottom content */}
        <div className="relative mt-10">
          <h3
            className={cn(
              "font-serif font-semibold leading-tight tracking-normal",
              service.variant === "image" ? "text-[1.65rem] md:text-[1.85rem]" : "text-[1.4rem] md:text-[1.6rem]"
            )}
          >
            {service.title}
          </h3>

          {/* Expanding gold line under title */}
          <span
            aria-hidden
            className={cn(
              "mt-4 block h-px w-8 origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20",
              palette.line,
              "opacity-60 group-hover:opacity-100"
            )}
          />

          <p className={cn("mt-5 text-[15px] leading-[1.7]", palette.desc)}>
            {service.description}
          </p>

          <span
            className={cn(
              "mt-7 inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.26em] transition-colors duration-500",
              palette.label
            )}
          >
            Découvrir
            <span
              aria-hidden
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                service.variant === "gold"
                  ? "border-navy/40 group-hover:bg-navy group-hover:text-gold"
                  : "border-gold/40 group-hover:bg-gold group-hover:text-navy"
              )}
            >
              <ArrowUpRight size={12} strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
