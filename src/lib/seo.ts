export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://prestigia.be";

export const BRAND = {
  name: "Prestigia",
  legal: "Prestigia Business Center",
  tagline: "L'Excellence au Service de votre Entreprise",
  description:
    "Business center premium à Zaventem : domiciliation, gestion administrative, salles de réunions, espaces coworking et accompagnement marketing pour entrepreneurs et porteurs de projets.",
  phone: "+32-489-82-05-23",
  email: "info@prestigiazaventem.com",
  address: {
    street: "Lozenberg 21",
    postalCode: "1932",
    locality: "Zaventem",
    region: "Flandre",
    country: "BE",
  },
  geo: { latitude: 50.885, longitude: 4.475 },
  openingHours: "Mo-Fr 08:00-20:00",
  founded: "2010",
} as const;
