import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ShieldCheck, User, Database, Lock, Search } from "lucide-react";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
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
            PRIVACY POLICY
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          
          <div className="flex flex-col justify-start border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase flex items-center gap-4">
              <ShieldCheck size={40} className="shrink-0" />
              {isSl ? "Varstvo Osebnih Podatkov" : "Tutela dei Dati Personali"}
            </h2>
            <p className="text-sm font-bold text-gray-400 mt-2">GDPR (Regolamento UE 2016/679)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Titolare */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <User size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "1. Upravljavec Podatkov" : "1. Titolare del Trattamento"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Upravljavec vaših osebnih podatkov je ASD-AKK BOR Basket Trieste s sedežem na Strada di Guardiella 7, 34128 Trst. Za kakršna koli vprašanja glede zasebnosti nas lahko kontaktirate na elektronski naslov: kkbor@borbasket.com." 
                  : "Il Titolare del trattamento dei tuoi dati personali è l'ASD-AKK BOR Basket Trieste, con sede legale in Strada di Guardiella 7, 34128 Trieste. Per qualsiasi richiesta relativa alla privacy, puoi contattarci all'indirizzo email: kkbor@borbasket.com."}
              </p>
            </div>

            {/* Dati Raccolti */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <Database size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "2. Zbrani Podatki" : "2. Dati Raccolti e Modalità"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Ne zbiramo nobenih osebnih podatkov ali podatkov o brskanju uporabnikov. Spletno mesto nima kontaktnih obrazcev ali prijav na e-novice. Na strežniku se lahko začasno shranijo samo običajni tehnični dnevniki strežnika za namene varnosti." 
                  : "Non raccogliamo alcun dato personale o di navigazione da parte degli utenti. Il sito non presenta moduli di contatto, né iscrizioni a newsletter. Solamente i normali log tecnici del server potrebbero essere conservati temporaneamente dall'hosting per questioni di sicurezza."}
              </p>
            </div>

            {/* Finalità */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <Search size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "3. Namen Obdelave" : "3. Finalità del Trattamento"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "Ker spletno mesto ne beleži ali profilira nobenih podatkov, je namen obdelave omejen na morebitna e-poštna sporočila, ki nam jih boste poslali prostovoljno. Ta bodo uporabljena izključno za odgovarjanje na vaše zahteve ali upravljanje članstva, in nikoli posredovana tretjim osebam v tržne namene." 
                  : "Dato che il sito non traccia o profila alcun dato, la finalità del trattamento si riduce ad eventuali email che sceglierai di inviarci volontariamente. Queste saranno usate esclusivamente per rispondere alle tue richieste o gestire le comunicazioni istituzionali sportive, e mai cedute a terzi per fini di marketing."}
              </p>
            </div>

            {/* Diritti */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#001666] mb-2">
                <Lock size={24} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{isSl ? "4. Pravice Uporabnikov" : "4. I tuoi Diritti"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {isSl 
                  ? "V skladu z uredbo GDPR (členi 15-22) imate pravico kadar koli zahtevati dostop do svojih osebnih podatkov, njihov popravek, izbris ali omejitev obdelave, tako da pošljete zahtevo na naš kontaktni naslov." 
                  : "In conformità al GDPR (art. 15-22), hai il diritto in qualsiasi momento di chiedere l'accesso ai tuoi dati personali (ove conservati), la loro rettifica, la cancellazione o la limitazione del trattamento, inviandoci una semplice richiesta via email."}
              </p>
            </div>

          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
