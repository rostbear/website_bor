import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { getPayload } from "payload";
import configPromise from "../../../payload.config";
import type { Metadata } from 'next';


export async function generateMetadata({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  
  return {
    title: isSl ? 'V živo' : 'Diretta Live',
    description: isSl 
      ? 'Spremljajte tekme in dogodke KK Bor Trieste v živo.' 
      : 'Guarda le partite e gli eventi del Bor Basket Trieste in diretta streaming.',
  }
}

function extractYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

export default async function LivePage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  let isLive = false;
  let videoId = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const liveGlobal = await payload.findGlobal({
      slug: 'live-stream',
    }) as any;

    if (liveGlobal && liveGlobal.isActive && liveGlobal.youtubeUrl) {
      isLive = true;
      videoId = extractYouTubeId(liveGlobal.youtubeUrl);
    }
  } catch (error) {
    console.error("Errore nel recupero della diretta da Payload CMS:", error);
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] md:min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
        {/* Stylized Basketball Court Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <svg viewBox="0 0 1200 800" className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-110 md:scale-125" fill="none" stroke="white" strokeWidth="4" xmlns="http://www.w3.org/2000/svg">
            <rect x="100" y="50" width="1000" height="700" />
            <line x1="600" y1="50" x2="600" y2="750" />
            <circle cx="600" cy="400" r="100" />
            <circle cx="600" cy="400" r="30" />
            <rect x="100" y="275" width="190" height="250" />
            <path d="M 290 275 A 125 125 0 0 1 290 525" />
            <path d="M 100 100 L 250 100 A 300 300 0 0 1 250 700 L 100 700" />
            <rect x="910" y="275" width="190" height="250" />
            <path d="M 910 525 A 125 125 0 0 1 910 275" />
            <path d="M 1100 100 L 950 100 A 300 300 0 0 0 950 700 L 1100 700" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl text-center flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4">
            <h1 
              className="font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[9rem] text-6xl uppercase tracking-tight"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
            >
              LIVE
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          {isLive && videoId ? (
            <div className="w-full bg-gray-50 p-2 md:p-4 rounded-3xl border border-gray-200 shadow-2xl">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-12 md:p-24 flex flex-col items-center justify-center text-center gap-6 shadow-sm">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#001666] tracking-tight uppercase mb-4">
                  {isSl ? "Trenutno ni prenosa v živo" : "Nessuna diretta in corso"}
                </h2>
                <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
                  {isSl 
                    ? "Ko bo naša ekipa igrala, boste tukaj našli prenos tekme v živo." 
                    : "Quando la nostra squadra scenderà in campo, troverai qui la diretta streaming della partita."}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
