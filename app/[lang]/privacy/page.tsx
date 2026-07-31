import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
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
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col justify-start border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase flex items-center gap-4">
              <ShieldCheck size={40} className="shrink-0" />
              {isSl ? "Politika Zasebnosti" : "Informativa sulla Privacy"}
            </h2>
            <p className="text-sm font-bold text-gray-400 mt-2">{isSl ? "Posodobljeno 2026" : "Aggiornato al 2026"}</p>
          </div>

          <div className="flex flex-col gap-8 text-gray-600 leading-relaxed">
            
            <div>
              <h3 className="text-xl font-black text-[#001666] uppercase mb-3 flex items-center gap-2">
                <Lock size={20} />
                {isSl ? "Upravljavec podatkov" : "Titolare del Trattamento"}
              </h3>
              <p>
                {isSl 
                  ? "Upravljavec osebnih podatkov je ASD-AKK BOR Basket, s sedežem na naslovu Strada di Guardiella 7, 34128 Trst. P.IVA 00794360321." 
                  : "Il Titolare del trattamento dei dati personali è ASD-AKK BOR Basket, con sede legale in Strada di Guardiella 7, 34128 Trieste. P.IVA 00794360321."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#001666] uppercase mb-3">
                {isSl ? "Vrste zbranih podatkov in nameni" : "Tipologia di dati raccolti e finalità"}
              </h3>
              <p className="mb-2">
                {isSl 
                  ? "To spletno mesto zbira osebne podatke izključno prek komunikacije po elektronski pošti, ki jo uporabnik pošlje prostovoljno. Podatki bodo uporabljeni samo za obdelavo in odgovor na vaše zahteve." 
                  : "Questo sito raccoglie dati personali esclusivamente tramite le comunicazioni via email inviate volontariamente dall'utente. I dati verranno utilizzati unicamente per elaborare e rispondere alle vostre richieste."}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{isSl ? "Ni registracij uporabnikov." : "Nessuna registrazione utente."}</li>
                <li>{isSl ? "Ni profiliranja in sledenja v marketinške namene." : "Nessuna profilazione o tracciamento per scopi di marketing."}</li>
                <li>{isSl ? "Podatki se ne delijo s tretjimi osebami." : "I dati non vengono condivisi con terze parti."}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#001666] uppercase mb-3">
                {isSl ? "Pravice uporabnikov" : "Diritti degli utenti"}
              </h3>
              <p>
                {isSl 
                  ? "Skladno z GDPR (člen 15 in naslednji) imate pravico kadar koli zahtevati dostop do svojih podatkov, njihov popravek, izbris ali omejitev obdelave." 
                  : "Ai sensi del GDPR (Art. 15 e seguenti), avete il diritto di richiedere in qualsiasi momento l'accesso, la rettifica, la cancellazione o la limitazione del trattamento dei vostri dati personali."}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-black text-[#001666] uppercase mb-2 flex items-center gap-2">
                <Mail size={18} />
                {isSl ? "Stik za vprašanja o zasebnosti" : "Contatto per la Privacy"}
              </h3>
              <p>
                {isSl 
                  ? "Za uveljavljanje svojih pravic ali za kakršna koli vprašanja v zvezi z zasebnostjo nam lahko pišete na:" 
                  : "Per esercitare i tuoi diritti o per qualsiasi domanda riguardante la privacy, puoi scriverci a:"}
                <a href="mailto:privacy@borbasket.com" className="font-bold text-[#001666] hover:underline ml-1">privacy@borbasket.com</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
