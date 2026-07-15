import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/sections";
import { ToastProvider } from "@/components/ui";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { BRAND, SITE_URL } from "@/lib/seo";

const GOOGLE_ADS_ID = "AW-18320182176";

const fraunces = Fraunces({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  generator: "Next.js",
  keywords: [
    "business center",
    "domiciliation",
    "coworking Zaventem",
    "salles de réunion Bruxelles",
    "gestion administrative entreprise",
    "accompagnement marketing",
    "bureau prestige Belgique",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { "fr-BE": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: BRAND.name,
    title: `${BRAND.name} ${BRAND.tagline}`,
    description: BRAND.description,
    url: SITE_URL,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} · Business Center Zaventem`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} ${BRAND.tagline}`,
    description: BRAND.description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business",
  verification: {
    google: "KYbe3sMDKkCbx4OLb--mXtUrKqeJwWdeN6VYE3BTdOk",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E4" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1A2E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-navy">
        {/* Google Ads (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        <LocalBusinessJsonLd />
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
