import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import GlobalBackground from "@/components/shared/GlobalBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Flujo TV - Tu Conexión con Latinoamérica | Streaming Service 2026",
    template: "%s | Flujo TV"
  },
  description: "Flujo TV ofrece más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series en HD/4K. Disfruta de 3 pantallas simultáneas. ¡1 mes GRATIS en plan de 6 meses, 2 meses GRATIS en plan anual! Lleva tu cultura contigo.",
  keywords: [
    "Flujo TV", 
    "streaming latino", 
    "canales latinoamérica", 
    "canales USA", 
    "TV en español", 
    "streaming service", 
    "Latin American TV", 
    "Spanish streaming", 
    "IPTV latino", 
    "American channels",
    "ver tv latina",
    "canales de mexico",
    "canales de colombia",
    "tv en vivo",
    "streaming hispano",
    "Flujo TV Firestick",
    "Flujo TV precio",
    "Flujo TV instalar",
    "Flujo TV no funciona",
    "Flujo TV gratis",
    "ver canales latinos USA",
    "IPTV barato",
    "streaming económico",
    "television en vivo",
    "deportes en vivo",
    "Liga MX en vivo",
    "futbol latinoamericano"
  ],
  authors: [{ name: "Flujo TV Team" }],
  creator: "Flujo TV",
  publisher: "Flujo TV",
  metadataBase: new URL("https://flujo3tv.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Flujo TV - Tu Conexión con Latinoamérica | Streaming HD/4K",
    description: "Más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series. 3 pantallas simultáneas en HD/4K. ¡Planes desde $9/mes con meses GRATIS!",
    url: "https://flujo3tv.com",
    siteName: "Flujo TV",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Flujo TV - Streaming Latino en HD/4K",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flujo TV - Tu Conexión con Latinoamérica",
    description: "Más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series. 3 pantallas simultáneas en HD/4K.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://flujo3tv.com",
    languages: {
      "es": "https://flujo3tv.com?lang=es",
      "en": "https://flujo3tv.com?lang=en",
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
    "msvalidate.01": "8B0AB8FDFDEA1E0CF4BD3DE98FD706CC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Flujo TV",
              "alternateName": "FlujoTV",
              "url": "https://flujo3tv.com",
              "logo": "https://flujo3tv.com/logo.png",
              "description": "Servicio de streaming con más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series en HD/4K.",
              "email": "flujotv@flujootv.com",
              "sameAs": [
                "https://facebook.com/flujotv",
                "https://instagram.com/flujotv",
                "https://twitter.com/flujotv"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English"]
              }
            })
          }}
        />
        
        {/* WebSite Schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Flujo TV",
              "url": "https://flujo3tv.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://flujo3tv.com/blog?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* VideoStreamingService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoStreamingService",
              "name": "Flujo TV",
              "description": "Servicio de streaming con más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series en HD/4K.",
              "url": "https://flujo3tv.com",
              "logo": "https://flujo3tv.com/logo.png",
              "email": "flujotv@flujootv.com",
              "areaServed": {
                "@type": "Place",
                "name": "Latin America, USA, Canada, Worldwide"
              },
              "inLanguage": ["es", "en"],
              "genre": ["Sports", "News", "Entertainment", "Movies", "Series"],
              "offers": [
                {
                  "@type": "Offer",
                  "name": "1 Month Subscription",
                  "price": "9",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "3 Months Subscription",
                  "price": "25",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "6 Months Subscription - 1 Month FREE",
                  "price": "49",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "description": "6 meses pagados + 1 mes GRATIS = 7 meses total"
                },
                {
                  "@type": "Offer",
                  "name": "1 Year Subscription - 2 Months FREE",
                  "price": "87",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "description": "12 meses pagados + 2 meses GRATIS = 14 meses total"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
        
        {/* FAQ Schema for common questions */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Qué es Flujo TV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flujo TV es un servicio de streaming (IPTV) que ofrece más de 1200 canales de Latinoamérica y Estados Unidos, incluyendo películas, series y deportes en vivo en calidad HD y 4K."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuánto cuesta Flujo TV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flujo TV tiene planes desde $9 USD al mes. El plan de 6 meses cuesta $49 (incluye 1 mes GRATIS) y el plan anual cuesta $87 (incluye 2 meses GRATIS)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿En qué dispositivos funciona Flujo TV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flujo TV es compatible con Smart TVs (Samsung, LG, Sony), Amazon Fire Stick, Roku, Android TV, dispositivos Android, iOS, y computadoras."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cómo instalo Flujo TV en Firestick?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Para instalar Flujo TV en Firestick: 1) Habilita 'Apps de orígenes desconocidos' en Configuración, 2) Instala la app Downloader, 3) Ingresa el código 9978138 en Downloader, 4) Descarga e instala la app de Flujo TV."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuántas pantallas simultáneas permite Flujo TV?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Flujo TV permite 3 pantallas simultáneas con una sola cuenta, para que puedas ver en múltiples dispositivos al mismo tiempo."
                  }
                }
              ]
            })
          }}
        />
        
        <link rel="alternate" type="application/rss+xml" title="Flujo TV Blog RSS Feed" href="https://flujo3tv.com/feed.xml" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <GlobalBackground />
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
