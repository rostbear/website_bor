import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";

import { getPayload } from "payload";
import configPromise from "../../../payload.config";
import type { Metadata } from 'next';

type Squadra = {
  id: string | number;
  name: string;
  season: string;
  category: string;
  importance: string;
  image: string;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  
  return {
    title: isSl ? 'Naše Ekipe' : 'Le Nostre Squadre',
    description: isSl 
      ? 'Spoznajte ekipe KK Bor Trieste: od članske ekipe do mladinskih kategorij in minibasketa.' 
      : 'Conosci le formazioni del Bor Basket Trieste: dalla Prima Squadra alle giovanili e minibasket.',
  }
}

export default async function SquadrePage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  const translateCategory = (cat: string) => {
    if (!isSl) return cat;
    const map: Record<string, string> = {
      "Prima Squadra": "Članska Ekipa",
      "Under 19 Maschile": "Under 19 Moški",
      "Under 17 Maschile": "Under 17 Moški",
      "Under 14 Maschile": "Under 14 Moški",
      "Under 14 Femminile": "Under 14 Deklice",
      "Minibasket": "Minibasket"
    };
    return map[cat] || cat;
  };

  let cmsSquadre: Squadra[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const response = await payload.find({
      collection: 'squadre',
      sort: 'order',
      limit: 100,
    });
    
    cmsSquadre = response.docs.map(doc => ({
      id: doc.id,
      name: doc.name,
      season: doc.season,
      category: doc.category,
      importance: doc.importance,
      image: typeof doc.image === 'object' && doc.image !== null && 'url' in doc.image ? (doc.image.url as string) : (doc.image as string),
    }));
  } catch (error) {
    console.error("Errore nel recupero delle squadre da Payload CMS:", error);
  }

  const primaSquadra = cmsSquadre.find(s => s.importance === 'primary');
  const underSenior = cmsSquadre.filter(s => s.importance === 'secondary');
  const giovanili = cmsSquadre.filter(s => s.importance === 'tertiary');
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
        {/* Stylized Basketball Court Lines Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <svg 
            viewBox="0 0 1200 800" 
            className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-110 md:scale-125"
            fill="none" 
            stroke="white" 
            strokeWidth="4" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="100" y="50" width="1000" height="700" />
            <line x1="600" y1="50" x2="600" y2="750" />
            <circle cx="600" cy="400" r="100" />
            <circle cx="600" cy="400" r="30" />
            <rect x="100" y="275" width="190" height="250" />
            <path d="M 290 275 A 125 125 0 0 1 290 525" />
            <path d="M 290 525 A 125 125 0 0 1 290 275" strokeDasharray="12 12" />
            <path d="M 100 100 L 250 100 A 300 300 0 0 1 250 700 L 100 700" />
            <rect x="910" y="275" width="190" height="250" />
            <path d="M 910 525 A 125 125 0 0 1 910 275" />
            <path d="M 910 275 A 125 125 0 0 1 910 525" strokeDasharray="12 12" />
            <path d="M 1100 100 L 950 100 A 300 300 0 0 0 950 700 L 1100 700" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
          <h1 
            className="w-full font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[9rem] xl:text-[11rem] text-7xl uppercase tracking-tight"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
          >
            {isSl ? "EKIPE" : "SQUADRE"}
          </h1>
        </div>
      </section>

      {/* Grid Squadre */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
              {isSl ? "Naše Ekipe" : "Le Nostre Squadre"}
            </h2>
          </div>

          {/* Prima Squadra - Full Width Split Layout */}
          {primaSquadra && (
            <div className="flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <div className="w-full md:w-1/2 lg:w-3/5 relative min-h-[300px] md:min-h-[400px]">
                <Image 
                  src={primaSquadra.image} 
                  alt={primaSquadra.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {translateCategory(primaSquadra.category)}
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001666] leading-none uppercase tracking-tight mb-6">
                  {primaSquadra.name}
                </h3>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-[#001666] text-white px-5 py-2 rounded-full self-start">
                  {primaSquadra.season}
                </span>
              </div>
            </div>
          )}

          {/* Under 19 & Under 17 - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {underSenior.map((squadra) => (
              <div key={squadra.id} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="w-full relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={squadra.image} 
                    alt={squadra.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between w-full mb-3">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
                      {translateCategory(squadra.category)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {squadra.season}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#001666] leading-tight uppercase tracking-tight mt-auto">
                    {squadra.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the youth teams - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {giovanili.map((squadra) => (
              <div key={squadra.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex flex-col">
                <div className="w-full relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={squadra.image} 
                    alt={squadra.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {translateCategory(squadra.category)}
                  </span>
                  <h3 className="text-xl font-black text-[#001666] leading-tight uppercase tracking-tight mt-auto">
                    {squadra.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
