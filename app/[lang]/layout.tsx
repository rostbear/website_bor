import React from "react"
import type { Metadata } from 'next'
import { Inter, Montserrat, Anton, Archivo_Black, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScrolling } from "@/components/smooth-scrolling"
import '../globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ weight: '900', subsets: ['latin'], variable: '--font-montserrat' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const archivoBlack = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-archivo-black' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Bor Basket Trieste | Passione e Tradizione dal 1956',
  description: 'Sito ufficiale del Bor Basket Trieste. Scopri la nostra storia, le prossime partite, i risultati e le ultime notizie dal mondo bianco-blu.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/logo_bor_basket.png',
      },
    ],
  },
}

import { CookieBanner } from "@/components/cookie-banner"

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
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  )
}
