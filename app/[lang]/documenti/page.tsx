import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FileText, Download, ShieldCheck, Mail } from "lucide-react";

export default async function DocumentiPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
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
            className="w-full font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[9rem] xl:text-[11rem] text-6xl md:text-7xl uppercase tracking-tight"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
          >
            {isSl ? "DOKUMENTI" : "DOCUMENTI"}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">

          {/* Statuto Section */}
          <div>
            <div className="mb-10 border-b border-gray-200 pb-6 flex items-center gap-4">
              <FileText size={40} className="text-[#001666]" />
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">{isSl ? "Društveni Statut" : "Statuto Sociale"}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Statuto Italiano */}
              <a href="/documents/statuto_it.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#001666] hover:bg-[#001666] transition-colors duration-300">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60">{isSl ? "Italijanska Različica" : "Versione Italiana"}</span>
                  <h3 className="text-xl font-black text-[#001666] group-hover:text-white leading-tight">
                    {isSl ? "Nuovo Statuto Associazione Sportiva Dilettantistica – AKK BOR Basket" : "Nuovo Statuto Associazione Sportiva Dilettantistica – AKK BOR Basket"}
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-full shadow-sm text-[#001666] group-hover:text-[#001666] group-hover:bg-white flex-shrink-0 ml-4">
                  <Download size={24} />
                </div>
              </a>

              {/* Statuto Sloveno */}
              <a href="/documents/statuto_sl.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#001666] hover:bg-[#001666] transition-colors duration-300">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60">{isSl ? "Slovenska Različica" : "Slovenska Verzija"}</span>
                  <h3 className="text-xl font-black text-[#001666] group-hover:text-white leading-tight">
                    Novi Statut Športnega društva – Amaterski Košarkarski Klub BOR Basket
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-full shadow-sm text-[#001666] group-hover:text-[#001666] group-hover:bg-white flex-shrink-0 ml-4">
                  <Download size={24} />
                </div>
              </a>
            </div>
          </div>

          {/* Safeguarding Section */}
          <div>
            <div className="mb-10 border-b border-gray-200 pb-6 flex items-center gap-4">
              <ShieldCheck size={40} className="text-[#001666]" />
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">Safeguarding</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Modello Organizzativo */}
              <a href="/documents/modello_organizzativo.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#001666] hover:bg-[#001666] transition-colors duration-300">
                <div className="flex flex-col gap-2 pr-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60">{isSl ? "Pravni Dokument" : "Documento Legale"}</span>
                  <h3 className="text-xl font-black text-[#001666] group-hover:text-white leading-tight">
                    {isSl ? "Organizacijski model upravljanja in nadzora športne dejavnosti" : "Modello Organizzativo di Gestione e Controllo dell'Attività Sportiva"}
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-full shadow-sm text-[#001666] group-hover:text-[#001666] group-hover:bg-white flex-shrink-0 ml-auto">
                  <Download size={24} />
                </div>
              </a>

              {/* Codice Etico */}
              <a href="/documents/codice_etico.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#001666] hover:bg-[#001666] transition-colors duration-300">
                <div className="flex flex-col gap-2 pr-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60">{isSl ? "Pravni Dokument" : "Documento Legale"}</span>
                  <h3 className="text-xl font-black text-[#001666] group-hover:text-white leading-tight">
                    {isSl ? "Etični Kodeks" : "Codice Etico"}<br/>ASD – AKK BOR Basket
                  </h3>
                </div>
                <div className="bg-white p-4 rounded-full shadow-sm text-[#001666] group-hover:text-[#001666] group-hover:bg-white flex-shrink-0 ml-auto">
                  <Download size={24} />
                </div>
              </a>
            </div>

            {/* Responsabile Safeguarding Box */}
            <div className="bg-[#001666]/5 rounded-2xl p-8 border border-[#001666]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-black text-[#001666] uppercase mb-1">{isSl ? "Odgovorna oseba za Safeguarding" : "Responsabile Safeguarding"}</h3>
                <p className="text-gray-600 text-sm">{isSl ? "Oseba, zadolžena za zaščito mladoletnikov in preprečevanje nadlegovanja in zlorab." : "Figura preposta alla tutela dei minori e per la prevenzione delle molestie e abusi."}</p>
              </div>
              <a href="mailto:safeguarding@borbasket.com" className="flex items-center gap-3 bg-[#001666] text-white px-6 py-4 rounded-full font-bold hover:bg-black transition-colors whitespace-nowrap">
                <Mail size={18} />
                safeguarding@borbasket.com
              </a>
            </div>

          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
