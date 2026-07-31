import React from "react"
import type { Metadata } from 'next'
import { Inter, Montserrat, Anton, Archivo_Black, Oswald } from 'next/font/google'
import { SmoothScrolling } from "@/components/smooth-scrolling"
import '../globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ weight: '900', subsets: ['latin'], variable: '--font-montserrat' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo-black' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: {
    default: 'Bor Basket Trieste | Passione e Tradizione dal 1956',
    template: '%s | Bor Basket Trieste'
  },
  description: 'Sito ufficiale del Bor Basket Trieste. Scopri la nostra storia, le squadre, le prossime partite, i risultati e le ultime notizie dal mondo bianco-blu.',
  keywords: ['Basket', 'Trieste', 'Bor Basket', 'Pallacanestro', 'Sport', 'Minibasket', 'Slovenska manjšina'],
  openGraph: {
    title: 'Bor Basket Trieste',
    description: 'Sito ufficiale del Bor Basket Trieste. Scopri la nostra storia, le squadre e le prossime partite.',
    type: 'website',
    locale: 'it_IT',
    siteName: 'Bor Basket Trieste',
    images: [{
      url: '/images/logo_bor_basket.png',
      width: 800,
      height: 800,
      alt: 'Logo Bor Basket Trieste',
    }],
  },
  icons: {
    icon: [
      {
        url: '/images/logo_bor_basket.png',
      },
    ],
  },
}

import { CookieBanner } from "@/components/cookie-banner"

export const revalidate = 60;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'it';
  return (
    <html lang={lang}>
      <body className={`${inter.variable} ${montserrat.variable} ${anton.variable} ${archivoBlack.variable} ${oswald.variable} font-sans antialiased`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <CookieBanner />
      </body>
    </html>
  )
}
