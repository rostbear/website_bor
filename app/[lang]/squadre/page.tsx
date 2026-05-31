import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";

// Dati Placeholder Squadre
const squadre = [
  {
    id: 1,
    name: "Bor Radenska C FVG",
    season: "2025/2026",
    category: "Prima Squadra",
    image: "/images/bor_squadra_principale.jpg",
  },
  {
    id: 2,
    name: "BREG/BOR U 19 M",
    season: "2025/2026",
    category: "Under 19 Maschile",
    image: "/images/bor_u19.jpg",
  },
  {
    id: 3,
    name: "BOR/BREG U 17 M",
    season: "2025/2026",
    category: "Under 17 Maschile",
    image: "/images/bor_u17m.jpg",
  },
  {
    id: 4,
    name: "BOR/BREG U 14 M",
    season: "2025/2026",
    category: "Under 14 Maschile",
    image: "/images/bor_u14.jpg",
  },
  {
    id: 5,
    name: "BOR/BREG U 14 F/Ž",
    season: "2025/2026",
    category: "Under 14 Femminile",
    image: "/images/bor_u14f.jpg",
  },
  {
    id: 6,
    name: "KK BOR MINIBASKET",
    season: "2025/2026",
    category: "Minibasket",
    image: "/images/bor_minibasket.jpg",
  },
];

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
      "Under 14 Femminile": "Under 14 Ženske",
      "Minibasket": "Minibasket"
    };
    return map[cat] || cat;
  };
  const primaSquadra = squadre.find(s => s.id === 1);
  const underSenior = squadre.filter(s => s.id === 2 || s.id === 3);
  const giovanili = squadre.filter(s => s.id >= 4);
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
          
          <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
              {isSl ? "Naše Ekipe" : "Le Nostre Squadre"}
            </h2>
          </div>

          {/* Prima Squadra - Full Width */}
          {primaSquadra && (
            <div className="group w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
              <Image 
                src={primaSquadra.image} 
                alt={primaSquadra.name} 
                fill
                className="object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001666]/90 via-[#001666]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Text Content overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">
                    {translateCategory(primaSquadra.category)}
                  </span>
                  <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-none uppercase tracking-tight">
                    {primaSquadra.name}
                  </h3>
                </div>
                <div className="bg-white text-[#001666] px-5 py-2 rounded-full shadow-lg backdrop-blur-md">
                  <span className="text-xs font-black uppercase tracking-widest">
                    {primaSquadra.season}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Under 19 & Under 17 - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {underSenior.map((squadra) => (
              <div key={squadra.id} className="group w-full aspect-[4/3] md:aspect-[16/11] relative rounded-3xl overflow-hidden bg-gray-200 shadow-lg">
                <Image 
                  src={squadra.image} 
                  alt={squadra.name} 
                  fill
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001666]/90 via-[#001666]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Text Content overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80">
                      {translateCategory(squadra.category)}
                    </span>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/60">
                      {squadra.season}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight">
                    {squadra.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the youth teams - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {giovanili.map((squadra) => (
              <div key={squadra.id} className="group w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-200 shadow-md">
                <Image 
                  src={squadra.image} 
                  alt={squadra.name} 
                  fill
                  className="object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001666]/90 via-[#001666]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Text Content overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                      {translateCategory(squadra.category)}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                      {squadra.season}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">
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
