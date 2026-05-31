import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ShieldCheck, Info, Search, ListChecks, ShieldOff } from "lucide-react";

export default async function CookiePage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
        {/* Stylized Basketball Court Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <svg viewBox="0 0 1200 800" className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-110 md:scale-125" fill="none" stroke="white" strokeWidth="4" xmlns="http://www.w3.org/2000/svg">
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
            COOKIE POLICY
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          
          <div className="flex flex-col justify-start border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase flex items-center gap-4">
              <ShieldCheck size={40} className="shrink-0" />
              {isSl ? "Politika Piškotkov" : "Informativa sui Cookie"}
            </h2>
            <p className="text-sm font-bold text-gray-400 mt-2">{isSl ? "Posodobljeno 2026" : "Aggiornato al 2026"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Box 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <Info size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "Kaj so piškotki?" : "Cosa sono i cookie?"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Piškotki so majhne besedilne datoteke, ki jih spletna mesta, ki jih obiščete, shranijo na vašo napravo (računalnik, tablica, pametni telefon). Služijo za shranjevanje določenih informacij, ki spletnemu mestu omogočajo pravilno delovanje in izboljšanje vaše uporabniške izkušnje." 
                  : "I cookie sono piccoli file di testo che i siti web visitati memorizzano sul tuo dispositivo (computer, tablet, smartphone). Servono a conservare determinate informazioni che permettono al sito di funzionare correttamente e di migliorare la tua esperienza di navigazione."}
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <ListChecks size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "Tehnični Piškotki" : "Cookie Tecnici (Essenziali)"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "To spletno mesto uporablja strogo potrebne tehnične piškotke (in shrambo brskalnika / LocalStorage) izključno za delovanje samega spletnega mesta in za pomnjenje vaših nastavitev (npr. 'cookie_consent' za shranjevanje vaše izbire glede piškotkov). Ti piškotki ne zahtevajo vašega predhodnega soglasja." 
                  : "Questo sito utilizza cookie tecnici strettamente necessari (e archiviazione locale del browser / LocalStorage) esclusivamente per il funzionamento del sito stesso e per ricordare le tue preferenze (es. 'cookie_consent' per salvare la tua scelta sul banner). Questi cookie non richiedono il tuo consenso preventivo."}
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <Search size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "Brez Analitičnih Piškotkov" : "Nessun Cookie Analitico"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Spoštujemo vašo zasebnost. To spletno mesto ne uporablja piškotkov za sledenje vašemu vedenju. Ne uporabljamo zunanjih analitičnih storitev (kot je Google Analytics), ki bi sledile vašim obiskom." 
                  : "Rispettiamo la tua privacy. Questo sito web non impiega cookie analitici per tracciare il tuo comportamento. Non utilizziamo servizi di statistica esterni (come Google Analytics) che tracciano la tua visita."}
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <ShieldOff size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "Brez Piškotkov za Profiliranje" : "Nessun Cookie di Profilazione"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Vaša zasebnost je na prvem mestu. To spletno mesto ne uporablja lastnih ali tujih piškotkov za profiliranje za pošiljanje ciljnih oglasov. Ne uporabljamo orodij, kot sta Facebook Pixel ali Google Ads." 
                  : "La tua privacy è fondamentale. Questo sito NON utilizza cookie di profilazione propri o di terze parti per inviarti pubblicità mirata. Non utilizziamo strumenti come Facebook Pixel o Google Ads."}
              </p>
            </div>

          </div>

          <div className="bg-[#001666]/5 rounded-2xl p-8 border border-[#001666]/10 flex flex-col justify-start gap-4">
            <h3 className="text-xl font-black text-[#001666] uppercase">{isSl ? "Upravljanje s piškotki" : "Come gestire i cookie?"}</h3>
            <p className="text-gray-600">
              {isSl 
                ? "Svoje nastavitve brskalnika lahko kadar koli spremenite, da onemogočite piškotke. Vendar upoštevajte, da lahko popolno onemogočenje tehničnih piškotkov vpliva na pravilno delovanje spletnega mesta. Na dnu spletne strani lahko preko bannerja spremenite svojo prvotno izbiro." 
                : "Puoi in qualsiasi momento modificare le impostazioni del tuo browser per disabilitare i cookie. Tieni presente però che disabilitare completamente i cookie tecnici potrebbe compromettere il corretto funzionamento del sito. Tramite il banner posizionato in fondo alla pagina puoi modificare la tua scelta iniziale."}
            </p>
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
