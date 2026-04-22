import { BRAND, SITE_URL } from "@/lib/seo";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#business`,
    name: BRAND.name,
    legalName: BRAND.legal,
    description: BRAND.description,
    url: SITE_URL,
    telephone: BRAND.phone,
    email: BRAND.email,
    foundingDate: BRAND.founded,
    priceRange: "€€€",
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.locality,
      postalCode: BRAND.address.postalCode,
      addressRegion: BRAND.address.region,
      addressCountry: BRAND.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND.geo.latitude,
      longitude: BRAND.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Prestigia",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Domiciliation d'entreprise" },
        { "@type": "OfferCatalog", name: "Gestion administrative" },
        { "@type": "OfferCatalog", name: "Salles de réunion" },
        { "@type": "OfferCatalog", name: "Espaces coworking" },
        { "@type": "OfferCatalog", name: "Accompagnement marketing" },
      ],
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Belgique",
    },
    sameAs: [
      "https://www.linkedin.com/company/prestigia",
      "https://www.instagram.com/prestigia",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
