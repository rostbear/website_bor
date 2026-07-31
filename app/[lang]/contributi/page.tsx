import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { getPayload } from 'payload'
import config from '../../../payload.config'



export default async function ContributiPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  
  let contributi: any[] = [];
  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'contributi',
      sort: '-year',
      limit: 100,
    });
    contributi = response.docs || [];
  } catch (error) {
    console.error("Errore nel recupero contributi da Payload CMS:", error);
  }

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
            className="w-full font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[9rem] xl:text-[11rem] text-6xl uppercase tracking-tight"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
          >
            {isSl ? "PRISPEVKI" : "CONTRIBUTI"}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
          
          {/* Intestazione Legale */}
          <div className="flex flex-col justify-start border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">{isSl ? "Obveznost transparentnosti" : "Obbligo di Trasparenza"}</h2>
            <p className="text-sm font-bold text-gray-400 mt-2">L. 124/2017, art. 1, c. 125-129</p>
          </div>

          {/* Tabella Contributi */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-[#001666]">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-500 w-24">{isSl ? "Leto" : "Anno"}</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-500 w-1/4">{isSl ? "Izplačevalec" : "Soggetto Erogante"}</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-500 w-1/2">{isSl ? "Namen" : "Causale"}</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">{isSl ? "Prejeti znesek" : "Somma Incassata"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributi.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-4">
                      <span className="font-black text-xl text-[#001666]/30">{item.year}</span>
                    </td>
                    <td className="py-5 px-4 font-bold text-gray-900">{item.ente}</td>
                    <td className="py-5 px-4 text-sm text-gray-600">{item.causale}</td>
                    <td className="py-5 px-4 text-right">
                      <span className="font-black text-lg text-[#001666] whitespace-nowrap">{item.importo}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
