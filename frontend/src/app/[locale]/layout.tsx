import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { WebSite as WebSiteLd, WithContext } from "schema-dts";

import "./global.css";

import { WishlistProvider } from "@/contexts/wishlist";
import { locales } from "@/i18n";
import { queryHeader } from "@/lib/query-header.helper";
import { cn } from "@/lib/utils";

import { FooterComponent } from "./components/footer";
import { HeaderComponent } from "./components/header";

export const metadata: Metadata = {
  title: "Schild Einrichtung",
  description:
    "Schild provides innovative and sustainable outdoor urban furniture solutions. Our ergonomic benches, bike racks, and planters transform public spaces into vibrant community hubs.",
  keywords: [
    "Sustainable urban furniture",
    "Outdoor benches",
    "Public space litter bins",
    "Bicycle racks",
    "Playground safety flooring",
    "Eco-friendly urban design",
    "Street furniture for parks",
    "Durable outdoor seating",
    "Nachhaltige Stadtmöbel",
    "Außenbänke",
    "Mülleimer für öffentliche Räume",
    "Fahrradständer",
    "Fallschutzböden für Spielplätze",
    "Umweltfreundliches Stadtmobiliar",
    "Straßenmöbel für Parks",
    "Robuste Außenmöbel",
  ],
};

const neueRegrade = localFont({
  src: "../../../public/fonts/Neue Regrade Variable.ttf",
  variable: "--font-neue-regrade",
  weight: "1 1000",
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);

  /* Header data loading */
  const headerData = await queryHeader(locale);

  /* Translations loading */
  const messages = await getMessages();

  /* SEO structured data */
  const jsonLd: WithContext<WebSiteLd> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Schild Einrichtung",
    alternateName: "Schild",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  };

  return (
    <html lang={locale}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Schild Einrichtung" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body
        className={`
          ${neueRegrade.className}
          ${cn("font-sans antialiased", neueRegrade.variable)}
        `}
      >
        <SpeedInsights />
        <NextIntlClientProvider messages={messages}>
          <WishlistProvider>
            <HeaderComponent data={headerData} />
            {children}
            <FooterComponent />
          </WishlistProvider>
        </NextIntlClientProvider>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
