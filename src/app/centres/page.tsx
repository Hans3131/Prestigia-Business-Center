import type { Metadata } from "next";
import {
  MapPin,
  Clock,
  Wifi,
  Coffee,
  Car,
  Shield,
  Printer,
  Leaf,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/sections";
import { Section, SectionLabel, Button } from "@/components/ui";
import { SlideUp, StaggerList, StaggerItem } from "@/components/animations";

export const metadata: Metadata = {
  title: "Nos Centres",
  description:
    "Découvrez le centre Prestigia de Zaventem. Une adresse stratégique à proximité de Bruxelles et de l'aéroport, conçue pour les entrepreneurs exigeants.",
};

const gallery = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
];

const equipments = [
  { icon: Wifi, label: "Fibre très haut débit" },
  { icon: Coffee, label: "Café & collation premium" },
  { icon: Car, label: "Parking privé sécurisé" },
  { icon: Shield, label: "Accès sécurisé par badge" },
  { icon: Printer, label: "Espace impression pro" },
  { icon: Leaf, label: "Terrasses végétalisées" },
];

export default function CentresPage() {
  return (
    <>
      <PageHero
        label="Nos Centres"
        title="Zaventem,"
        accent="au cœur de la Belgique."
        subtitle="Une adresse prestigieuse à quelques minutes du centre de Bruxelles et de l'aéroport international, pensée pour les dirigeants connectés au monde."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
      />

      {/* Location info */}
      <Section className="bg-ivory !pt-[30px] !pb-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
          <SlideUp>
            <SectionLabel>Adresse principale</SectionLabel>
            <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
              Prestigia <span className="italic text-gold">Zaventem</span>
            </h2>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-navy">Lozenberg 21</p>
                  <p className="text-navy/75">1932 Zaventem, Belgique</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-navy">Lun – Ven · 09h00 – 17h00</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/reserver" variant="primary" size="md">
                Planifier une visite
              </Button>
              <Button
                href="https://maps.google.com/?q=Lozenberg+21+1932+Zaventem"
                variant="ghost"
                size="md"
              >
                Itinéraire
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </Button>
            </div>
          </SlideUp>

          {/* Map placeholder */}
          <SlideUp delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-navy/10">
              <iframe
                title="Plan d'accès Prestigia Zaventem"
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.45%2C50.87%2C4.50%2C50.90&layer=mapnik&marker=50.885%2C4.475"
                className="h-full w-full grayscale-[0.5]"
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

      {/* Gallery */}
      <Section className="bg-cream !py-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionLabel align="center">Visite guidée</SectionLabel>
          <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            Un cadre <span className="italic text-gold">exceptionnel</span>
          </h2>
        </div>

        <StaggerList stagger={0.1} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {gallery.map((src, i) => (
            <StaggerItem key={src} className={i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}>
              <div
                className="group relative aspect-square overflow-hidden rounded-sm"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  style={{ backgroundImage: `url(${src})` }}
                  aria-hidden
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/20"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Section>

      {/* Equipments */}
      <Section className="bg-ivory !py-8">
        <div className="mb-10 text-center">
          <SectionLabel align="center">Équipements</SectionLabel>
          <h2 className="mt-6 font-serif font-semibold leading-[1.15] tracking-normal text-navy">
            Tout ce dont vous avez <span className="italic text-gold">besoin</span>
          </h2>
        </div>

        <StaggerList
          stagger={0.08}
          className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6"
        >
          {equipments.map(({ icon: Icon, label }) => (
            <StaggerItem key={label}>
              <div className="group flex h-full flex-col items-center rounded-sm border border-navy/10 bg-cream/60 p-5 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold/50 hover:bg-cream">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <p className="mt-4 font-medium text-navy">{label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </Section>
    </>
  );
}
