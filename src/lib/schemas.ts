import { z } from "zod";

/**
 * Honeypot: accepts any string, the route handler checks emptiness manually.
 * We do NOT fail validation here — a validation error would leak the
 * honeypot's existence to bots. Instead, routes silently succeed when a bot
 * fills this field.
 */
const honeypot = z.string().optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(120),
  email: z.string().trim().toLowerCase().email("Email invalide").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.enum(["info", "quote", "visit", "partnership", "other"]),
  message: z.string().trim().min(10, "Message trop court").max(4000),
  consent: z.literal("on", { message: "Consentement requis" }).or(z.literal(true)),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const reservationSchema = z.object({
  firstname: z.string().trim().min(1, "Prénom requis").max(80),
  lastname: z.string().trim().min(1, "Nom requis").max(80),
  email: z.string().trim().toLowerCase().email("Email invalide").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum([
    "domiciliation",
    "gestion",
    "salles",
    "coworking",
    "marketing",
    "all",
  ]),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  slot: z
    .enum(["", "morning", "afternoon", "evening"])
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Consentement requis" }).or(z.literal(true)),
  website: honeypot,
});

export type ReservationInput = z.infer<typeof reservationSchema>;

const SUBJECT_LABELS: Record<string, string> = {
  info: "Demande d'information",
  quote: "Devis sur-mesure",
  visit: "Réservation de visite",
  partnership: "Partenariat",
  other: "Autre",
};

const SERVICE_LABELS: Record<string, string> = {
  domiciliation: "Domiciliation",
  gestion: "Gestion administrative",
  salles: "Salles de réunion",
  coworking: "Coworking",
  marketing: "Accompagnement marketing",
  all: "Découverte générale",
};

const SLOT_LABELS: Record<string, string> = {
  morning: "Matinée (08h – 12h)",
  afternoon: "Après-midi (13h – 17h)",
  evening: "Fin de journée (17h – 20h)",
};

export const labels = {
  subject: SUBJECT_LABELS,
  service: SERVICE_LABELS,
  slot: SLOT_LABELS,
};
