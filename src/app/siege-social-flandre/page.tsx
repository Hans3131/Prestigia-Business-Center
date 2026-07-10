import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Building2,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  BadgeCheck,
  Star,
} from "lucide-react";
import { Section, SectionLabel, Button } from "@/components/ui";
import {
  SlideUp,
  SplitReveal,
  StaggerList,
  StaggerItem,
  MagneticButton,
} from "@/components/animations";
import { SITE_URL, BRAND } from "@/lib/seo";

/* ─────────────────── SEO METADATA ─────────────────── */

const PAGE_URL = `${SITE_URL}/siege-social-flandre`;
const WHATSAPP_NUMBER = "+32 496 05 72 86";
const WHATSAPP_LINK = `https://wa.me/32496057286?text=${encodeURIComponent(
  "Bonjour, je suis intéressé par la domiciliation en Flandre à 490€/an."
)}`;

export const metadata: Metadata = {
  title: "Siège Social en Flandre 490€/an | Prestigia Zaventem",
  description:
    "Domiciliez votre siège social en Flandre à seulement 490 € par an. Adresse professionnelle à Zaventem, courrier géré, espace coworking à disposition. Le centre de référence pour les entrepreneurs exigeants.",
  keywords: [
    "siège social Flandre",
    "domiciliation Zaventem",
    "adresse société Belgique",
    "domiciliation entreprise Flandre",
    "siège social pas cher",
    "coworking Zaventem",
    "adresse professionnelle Bruxelles",
    "domiciliation KBO",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: BRAND.name,
    title: "Siège Social en Flandre 490€/an | Prestigia",
    description:
      "Une adresse de prestige pour votre siège social en Flandre. Courrier géré, coworking inclus. À partir de 490 € par an.",
    url: PAGE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Siège social en Flandre à 490€/an Prestigia Zaventem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siège Social en Flandre 490€/an",
    description:
      "Domiciliez votre société en Flandre chez Prestigia à Zaventem. À partir de 490 € par an.",
  },
  robots: { index: true, follow: true },
};

/* ─────────────────── DATA ─────────────────── */

const included = [
  {
    icon: MapPin,
    title: "Adresse prestigieuse",
    text: "Une adresse commerciale reconnue par la BCE Lozenberg 21, 1932 Zaventem.",
  },
  {
    icon: Mail,
    title: "Courrier professionnel géré",
    text: "Réception, tri, numérisation et notification par email de chaque courrier reçu.",
  },
  {
    icon: Users,
    title: "Espace coworking inclus",
    text: "Accès à nos espaces de travail lumineux, wifi haut débit, café premium.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité totale",
    text: "Attestation de domiciliation officielle, contrat conforme à la législation belge.",
  },
  {
    icon: Clock,
    title: "Activation en 48h",
    text: "Ouverture du contrat, remise de l'adresse et démarrage sous 48 heures ouvrées.",
  },
  {
    icon: Sparkles,
    title: "Sans engagement long",
    text: "Formule annuelle, résiliable simplement pas de frais cachés, pas de piège.",
  },
];

const steps = [
  {
    n: "01",
    title: "Contactez-nous",
    text: "Un appel court pour valider votre besoin et vous transmettre le contrat.",
  },
  {
    n: "02",
    title: "Signature en ligne",
    text: "Vous signez électroniquement nous constituons votre dossier en interne.",
  },
  {
    n: "03",
    title: "Adresse active",
    text: "Vous recevez votre attestation officielle et démarrez sous 48h ouvrées.",
  },
];

const faq = [
  {
    q: "L'adresse est-elle acceptée par la BCE et le SPF Finances ?",
    a: "Oui. Prestigia délivre une attestation de domiciliation officielle conforme à la législation belge. L'adresse Lozenberg 21, 1932 Zaventem est enregistrée comme siège social par des centaines d'entreprises actives.",
  },
  {
    q: "Que comprend exactement l'offre à 490 € par an ?",
    a: "Adresse commerciale reconnue, réception et gestion complète du courrier (tri, numérisation, notification), accès à l'espace coworking pendant les heures d'ouverture, ainsi que la mise à disposition d'une salle de réunion ponctuelle. Aucun frais caché.",
  },
  {
    q: "Combien de temps faut-il pour activer la domiciliation ?",
    a: "Une fois le contrat signé et le paiement reçu, votre attestation officielle est délivrée sous 48 heures ouvrées. Vous pouvez immédiatement l'utiliser pour la BCE, le fisc et vos partenaires.",
  },
  {
    q: "Puis-je recevoir des colis à l'adresse ?",
    a: "Oui, la réception des colis est incluse pendant les heures d'ouverture (9h – 17h, du lundi au vendredi). Nous vous notifions par email dès réception.",
  },
  {
    q: "Puis-je résilier facilement ?",
    a: "Le contrat annuel est renouvelable ou résiliable en fin d'échéance, avec un préavis d'un mois. Aucun engagement long, aucun frais de résiliation.",
  },
  {
    q: "L'adresse convient-elle pour une société étrangère créant en Belgique ?",
    a: "Absolument. C'est même un cas d'usage fréquent : de nombreux fondateurs étrangers utilisent notre adresse pour établir leur siège social belge dans un cadre professionnel et fiable.",
  },
];

/* ─────────────────── JSON-LD ─────────────────── */

function StructuredData() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Domiciliation d'entreprise en Flandre",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#business`,
      name: BRAND.name,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Flandre, Belgique" },
    description:
      "Siège social professionnel à Zaventem avec gestion du courrier et accès à un espace coworking.",
    offers: {
      "@type": "Offer",
      price: "490",
      priceCurrency: "EUR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: PAGE_URL,
      itemOffered: {
        "@type": "Service",
        name: "Domiciliation annuelle",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Siège Social en Flandre",
        item: PAGE_URL,
      },
    ],
  };

  const esc = (obj: object) =>
    JSON.stringify(obj).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: esc(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: esc(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: esc(breadcrumb) }}
      />
    </>
  );
}

/* ─────────────────── WHATSAPP BUTTON ─────────────────── */

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

function CTAs({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 ${centered ? "justify-center" : ""}`}
    >
      <MagneticButton strength={0.18}>
        <Button href="/contact" variant="primary" size="lg">
          Nous contacter
          <ArrowRight size={16} strokeWidth={1.5} />
        </Button>
      </MagneticButton>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${WHATSAPP_NUMBER}`}
        className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-sm bg-[#25D366] px-8 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#1FBA57] hover:shadow-[0_20px_40px_-16px_rgba(37,211,102,0.45)]"
      >
        <WhatsAppIcon size={18} />
        <span>WhatsApp</span>
        <span className="hidden font-normal tracking-normal text-white/85 md:inline">
          · {WHATSAPP_NUMBER}
        </span>
      </a>
    </div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function SiegeSocialFlandrePage() {
  return (
    <>
      <StructuredData />

      {/* ============ HERO ============ */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-ivory pt-[120px] pb-[80px]">
        {/* Background image */}
        <div className="absolute inset-0 -z-20">
          <div
            role="img"
            aria-label="Bureaux professionnels Prestigia à Zaventem"
            className="h-full w-full bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop')",
            }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/65 via-navy/80 to-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_25%_15%,rgba(201,168,76,0.16),transparent_55%)]"
        />
        <span aria-hidden className="pointer-events-none absolute left-6 top-32 hidden h-10 w-10 border-l border-t border-gold/50 md:block md:left-12" />
        <span aria-hidden className="pointer-events-none absolute right-6 bottom-12 hidden h-10 w-10 border-r border-b border-gold/50 md:block md:right-12" />

        <SlideUp className="relative mx-auto flex w-[92%] max-w-[1200px] flex-col items-center text-center md:w-full md:px-[50px]">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-ivory/15 bg-ivory/5 px-5 py-2 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-ivory/90 md:text-[12px]">
              Domiciliation · Zaventem · Flandre
            </span>
          </div>

          <h1 className="font-serif font-semibold leading-[1.08] tracking-normal text-ivory text-[clamp(2.2rem,4.8vw,4.5rem)]">
            Siège social en Flandre
            <br />
            <span className="italic text-gold">
              à seulement 490&nbsp;€&nbsp;par&nbsp;an.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.75] text-ivory/85 md:text-lg">
            Le meilleur centre pour installer le siège social de votre société en Flandre.
          </p>

          {/* Bullet list — clear value props */}
          <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left text-[14px] text-ivory/90 md:grid-cols-2 md:text-[15px]">
            {[
              "Adresse commerciale reconnue à Zaventem",
              "Courrier professionnel géré au quotidien",
              "Espace coworking à disposition",
              "Attestation officielle BCE en 48 h",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CheckCircle2 size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <CTAs centered />
          </div>

          {/* Trust strip — with SPF Finance certification */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13px] text-ivory/75">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5">
              <ShieldCheck size={15} className="text-gold" strokeWidth={1.5} />
              <span className="font-medium tracking-wide text-ivory">
                Centre agréé par le SPF Finance
              </span>
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck size={16} className="text-gold" strokeWidth={1.5} />
              Attestation officielle BCE
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck size={16} className="text-gold" strokeWidth={1.5} />
              Sans engagement long
            </span>
            <span className="inline-flex items-center gap-2">
              <Star size={14} className="fill-gold text-gold" strokeWidth={1} />
              <Star size={14} className="fill-gold text-gold" strokeWidth={1} />
              <Star size={14} className="fill-gold text-gold" strokeWidth={1} />
              <Star size={14} className="fill-gold text-gold" strokeWidth={1} />
              <Star size={14} className="fill-gold text-gold" strokeWidth={1} />
              <span>4.9/5 · plus de 2 500 clients</span>
            </span>
          </div>
        </SlideUp>
      </section>

      {/* ============ INTRO ============ */}
      <Section className="bg-ivory !py-[50px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          {/* Image */}
          <SlideUp>
            <div className="relative">
              <div
                role="img"
                aria-label="Bureaux Prestigia cadre professionnel à Zaventem, Flandre"
                className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cover bg-center transition-transform duration-[1600ms] hover:scale-[1.02]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1600&auto=format&fit=crop')",
                }}
              />
              {/* Gold frame corners */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 border-r border-t border-gold md:-right-6 md:-top-6 md:h-28 md:w-28"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-gold md:-bottom-6 md:-left-6 md:h-28 md:w-28"
              />
            </div>
          </SlideUp>

          {/* Text */}
          <SlideUp delay={0.1}>
            <SectionLabel>Pourquoi Prestigia</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.2] tracking-normal text-navy">
              <SplitReveal
                pre="Le centre de référence"
                accent="en Flandre."
              />
            </h2>
            <span
              aria-hidden
              className="mt-6 block h-px w-16 bg-gradient-to-r from-gold via-gold/60 to-transparent"
            />
            <p className="mt-8 leading-[1.85] text-navy/80 md:text-[17px]">
              Depuis 15 ans, Prestigia accueille les entrepreneurs qui exigent une
              <strong className="font-semibold"> adresse professionnelle fiable </strong>
              en Flandre.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Centre agréé par le SPF Finance",
                  text: "Attestation officielle reconnue par l'administration belge, conforme à la législation en vigueur.",
                },
                {
                  title: "Position stratégique",
                  text: "Entre Bruxelles et l'aéroport international — la meilleure vitrine pour votre société.",
                },
                {
                  title: "Cadre premium",
                  text: "Une équipe disponible, un service pensé pour les exigences du monde des affaires belge.",
                },
                {
                  title: "Plus de 2 500 clients accompagnés",
                  text: "Note moyenne de 4.9/5 — un modèle de confiance éprouvé sur 15 années.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckCircle2 size={13} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-semibold text-navy md:text-[16px]">
                      {item.title}
                    </p>
                    <p className="mt-1 leading-[1.7] text-navy/70 md:text-[15px]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SlideUp>
        </div>
      </Section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <Section className="bg-cream !py-[50px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel align="center">Ce que vous obtenez</SectionLabel>
          <h2 className="mt-6 max-w-3xl font-serif font-semibold leading-[1.2] tracking-normal text-navy">
            <SplitReveal pre="Un pack complet à" accent="490&nbsp;€ par an." />
          </h2>
          <p className="mt-6 max-w-xl leading-[1.7] text-navy/70">
            Tout ce qu'il faut pour installer et gérer votre siège social en
            Flandre, sans surprise ni frais additionnel.
          </p>
        </div>

        <StaggerList
          stagger={0.08}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {included.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="group relative flex h-full flex-col rounded-sm border border-navy/10 bg-ivory/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-ivory hover:shadow-[0_24px_50px_-24px_rgba(11,26,46,0.15)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-700 group-hover:scale-x-100"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold/30 bg-gold/5 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ivory group-hover:-rotate-3">
                    <Icon size={20} strokeWidth={1.25} />
                  </span>
                  <h3 className="mt-6 font-serif text-lg font-semibold leading-tight text-navy md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-navy/75">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </Section>

      {/* ============ PRICING BLOCK ============ */}
      <Section className="bg-ivory !py-[50px]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {/* Left image */}
          <SlideUp>
            <div className="relative overflow-hidden rounded-sm">
              <div
                role="img"
                aria-label="Espace coworking Prestigia à Zaventem"
                className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-[1600ms] hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1600&auto=format&fit=crop')",
                }}
              />
              <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 border-r border-t border-gold md:-right-6 md:-top-6 md:h-28 md:w-28" />
              <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-gold md:-bottom-6 md:-left-6 md:h-28 md:w-28" />
            </div>
          </SlideUp>

          {/* Right offer card */}
          <SlideUp delay={0.1}>
            <div className="relative overflow-hidden rounded-sm border border-gold/40 bg-navy p-10 text-ivory">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(201,168,76,0.18),transparent_55%)]"
              />

              <p className="relative font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
                Offre annuelle
              </p>

              <div className="relative mt-6 flex items-baseline gap-3">
                <span className="font-serif text-6xl font-semibold leading-none text-ivory md:text-7xl">
                  490
                </span>
                <span className="font-serif text-3xl font-semibold text-gold">
                  €
                </span>
                <span className="text-sm text-ivory/60">/ an</span>
              </div>

              <p className="relative mt-5 text-[13px] leading-relaxed text-ivory/70">
                Tout inclus. Sans frais cachés. Résiliable en fin d'échéance.
                Attestation officielle sous 48h.
              </p>

              <ul className="relative mt-8 space-y-3 border-t border-ivory/10 pt-6 text-[14px] text-ivory/85">
                {[
                  "Centre agréé par le SPF Finance",
                  "Adresse BCE reconnue à Zaventem",
                  "Courrier reçu, trié, scanné",
                  "Coworking pendant les heures d'ouverture",
                  "Sans engagement long",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-gold"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-10">
                <CTAs />
              </div>
            </div>
          </SlideUp>
        </div>
      </Section>

      {/* ============ HOW IT WORKS ============ */}
      <Section className="bg-cream !py-[50px]">
        <div className="mb-14 text-center">
          <SectionLabel align="center">En 3 étapes</SectionLabel>
          <h2 className="mt-6 font-serif font-semibold leading-[1.2] tracking-normal text-navy">
            <SplitReveal pre="Actif en" accent="48 heures." />
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-sm border border-navy/10 bg-ivory/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-transform duration-700 group-hover:scale-x-100"
              />
              <p className="font-serif text-4xl font-semibold italic text-gold/70 group-hover:text-gold">
                {s.n}
              </p>
              <h3 className="mt-6 font-serif text-xl font-semibold leading-tight text-navy">
                {s.title}
              </h3>
              <p className="mt-3 leading-[1.7] text-navy/75 text-[14px]">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ TRUST / ADDRESS ============ */}
      <Section className="bg-navy !py-[50px] text-ivory">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <SlideUp>
            <SectionLabel className="text-gold">L'adresse</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.2] tracking-normal text-ivory">
              Une adresse <span className="italic text-gold">reconnue</span>
              <br /> au cœur de Zaventem.
            </h2>
            <p className="mt-8 leading-[1.85] text-ivory/80">
              À proximité immédiate de Bruxelles et de l'aéroport international,
              notre centre est stratégiquement positionné pour les entrepreneurs
              qui travaillent avec des partenaires belges, européens et
              internationaux.
            </p>

            <div className="mt-8 space-y-4 text-[15px]">
              <div className="flex items-start gap-4">
                <Building2 size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-ivory">Prestigia Business Center</p>
                  <p className="text-ivory/75">Lozenberg 21, 1932 Zaventem, Belgique</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-ivory/75">Lundi – Vendredi · 09h00 – 17h00</p>
              </div>
            </div>

            <div className="mt-10">
              <CTAs />
            </div>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ivory/10">
              <iframe
                title="Emplacement Prestigia Zaventem"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.45%2C50.87%2C4.50%2C50.90&layer=mapnik&marker=50.885%2C4.475"
                className="h-full w-full grayscale-[0.4]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30"
              />
            </div>
          </SlideUp>
        </div>
      </Section>

      {/* ============ FAQ ============ */}
      <Section className="bg-ivory !py-[50px]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <SectionLabel align="center">Questions fréquentes</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.2] tracking-normal text-navy">
              <SplitReveal pre="Tout ce que vous voulez" accent="savoir." />
            </h2>
          </div>

          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group py-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="font-serif text-lg font-semibold text-navy transition-colors duration-500 group-hover:text-navy/70 group-open:text-gold">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy/60 transition-all duration-500 group-hover:border-gold/60 group-hover:text-gold group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-navy"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeLinecap="round">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl leading-[1.85] text-navy/75 text-[15px]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <Section className="relative bg-cream !py-[50px]">
        <div className="relative mx-auto max-w-3xl text-center">
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l border-t border-gold md:-left-6 md:-top-6 md:h-12 md:w-12" />
          <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-2 h-8 w-8 border-r border-b border-gold md:-right-6 md:-bottom-6 md:h-12 md:w-12" />

          <SlideUp>
            <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold">
              Prêt à commencer
            </p>
            <h2 className="mt-6 font-serif font-semibold leading-[1.1] tracking-normal text-navy text-[clamp(1.9rem,4vw,3rem)]">
              Installez votre siège social{" "}
              <span className="italic text-gold">dès aujourd'hui.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl leading-[1.85] text-navy/75">
              Un appel, une signature, une adresse active en 48h. Contactez-nous
              par téléphone, WhatsApp ou email nous répondons vite.
            </p>

            <div className="mt-10">
              <CTAs centered />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-warmgray">
              Réponse sous 24h · info@prestigiabusinesscenter.com
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* ============ FLOATING WHATSAPP (mobile) ============ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contacter Prestigia sur WhatsApp au ${WHATSAPP_NUMBER}`}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-500 hover:scale-105 hover:bg-[#1FBA57] md:bottom-8 md:right-8 md:h-16 md:w-16"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40"
        />
        <WhatsAppIcon size={26} />
      </a>

      {/* Breadcrumbs visible in top of hero not shown, but embedded via schema */}
      <nav aria-label="Fil d'Ariane" className="sr-only">
        <ol>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li aria-current="page">Siège Social en Flandre</li>
        </ol>
      </nav>
    </>
  );
}
