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
    default: "Flujo TV - Tu Conexión con Latinoamérica | Streaming Service",
    template: "%s | Flujo TV"
  },
  description: "Flujo TV ofrece más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series en HD/4K. Disfruta de 3 pantallas simultáneas. Lleva tu cultura contigo, donde quiera que estés.",
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
    "streaming hispano"
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
    title: "Flujo TV - Tu Conexión con Latinoamérica",
    description: "Más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series. 3 pantallas simultáneas en HD/4K.",
    url: "https://flujo3tv.com",
    siteName: "Flujo TV",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Flujo TV - Streaming Latino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flujo TV - Tu Conexión con Latinoamérica",
    description: "Más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series. 3 pantallas simultáneas.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
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
                  "name": "6 Months Subscription",
                  "price": "49",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer",
                  "name": "1 Year Subscription",
                  "price": "87",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
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
