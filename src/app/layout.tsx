import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://podlahyzapletal.cz'),
  title: {
    default: "Podlahy Zapletal - Pokládka podlah a dveří Kroměříž | 20 let zkušeností",
    template: "%s | Podlahy Zapletal"
  },
  description: "Profesionální pokládka a renovace podlah v Kroměříži a okolí. Více než 20 let zkušeností. Parkety, laminát, vinyl, korkové podlahy a interiérové dveře. Kvalita, spolehlivost a fair ceny.",
  keywords: [
    "podlahy Kroměříž",
    "pokládka podlah Kroměříž",
    "parkety Kroměříž",
    "laminátové podlahy",
    "vinylové podlahy",
    "renovace podlah",
    "broušení parket",
    "interiérové dveře",
    "vchodové dveře",
    "podlahářství Kroměříž",
    "korkové podlahy",
    "Podlahy Zapletal"
  ],
  authors: [{ name: "Podlahy, s.r.o." }],
  creator: "Podlahy Zapletal",
  publisher: "Podlahy, s.r.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://podlahyzapletal.cz",
    siteName: "Podlahy Zapletal",
    title: "Podlahy Zapletal - Pokládka podlah a dveří Kroměříž | 20 let zkušeností",
    description: "Profesionální pokládka a renovace podlah v Kroměříži a okolí. Více než 20 let zkušeností. Parkety, laminát, vinyl a interiérové dveře. Kvalita a spolehlivost.",
    images: [
      {
        url: "https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_2254_1200.webp",
        width: 1200,
        height: 630,
        alt: "Podlahy Zapletal - Kvalitní pokládka podlah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podlahy Zapletal - Pokládka podlah a dveří Kroměříž",
    description: "Profesionální pokládka a renovace podlah. Více než 20 let zkušeností v oboru.",
    images: ["https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_2254_1200.webp"],
  },
  alternates: {
    canonical: "https://podlahyzapletal.cz",
  },
  verification: {
    google: "google-site-verification-code", // Přidat po registraci v Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-573NX88J');`}
        </Script>

        {/* Preload kritický LCP obrázek */}
        <link
          rel="preload"
          as="image"
          href="https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_2254_800.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="https://storage.googleapis.com/podlahy-zapletal-images/optimized/IMG_2254_800.jpg"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-573NX88J"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W6S77DKFH1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6S77DKFH1');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
