import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

const boardMembers = [
  { role: "Presidente", name: "Sergio Pozar" },
  { role: "Vice Presidente & Resp. FIP", name: "Lauro Trevisan" },
  { role: "Tesoriere", name: "Andrej Birsa" },
  { role: "Segretaria", name: "Eva Kranjac" },
];

const counselors = [
  { role: "Consigliere & Resp. FIP", name: "Michele Sommariva" },
  { role: "Consigliere", name: "Daniel Crevatin" },
  { role: "Consigliere", name: "Marko Ursich" },
  { role: "Consigliere", name: "Bruno Kneipp" },
  { role: "Visite Mediche", name: "Andrej Birsa, Eva Kranjac" },
];

const collaborators = [
  "Paolo Corva", "Riccardo Battilana", "Paolo Savoia", "Stefano Persi", "Nives Cossutta", "Clara Michele", "Erik Filipac"
];

const coachCategories = [
  {
    category: "BOR RADENSKA C FVG",
    roles: [
      { roleIt: "Allenatore", roleSl: "Trener", names: "Saša Krčalic" },
      { roleIt: "Vice allenatore", roleSl: "Pomožni trener", names: "Alberto Consolari, Almir Kapo" }
    ]
  },
  {
    category: "Settore Giovanile",
    categorySl: "Mladinski sektor",
    roles: [
      { roleIt: "Responsabile", roleSl: "Vodja", names: "Daniel Crevatin" }
    ]
  },
  {
    category: "U 17 Maschile BOR/BREG",
    categorySl: "U 17 Moški BOR/BREG",
    roles: [
      { roleIt: "Allenatore", roleSl: "Trener", names: "Dejan Faraglia" },
      { roleIt: "Vice allenatore", roleSl: "Pomožni trener", names: "Matteo Finatti" }
    ]
  },
  {
    category: "U 14 Maschile BOR-BREG",
    categorySl: "U 14 Moški BOR-BREG",
    roles: [
      { roleIt: "Allenatore", roleSl: "Trener", names: "Giorgio Krečič, Peter Vodopivec" }
    ]
  },
  {
    category: "U 14 Femminile BOR-BREG",
    categorySl: "U 14 Deklice BOR-BREG",
    roles: [
      { roleIt: "Allenatrice", roleSl: "Trenerka", names: "Erika Stulle, Anja Battilana, Elisa Sartori" }
    ]
  },
  {
    category: "BOR MINIBASKET Grandi",
    categorySl: "BOR MINIBASKET Veliki",
    roles: [
      { roleIt: "Istruttori", roleSl: "Vaditelji", names: "Daniel Crevatin, Dejan Faraglia, Matteo Finatti, Peter Stopar, Marko Ursich, Danjel Clara" }
    ]
  },
  {
    category: "BOR MINIBASKET Medi",
    categorySl: "BOR MINIBASKET Srednji",
    roles: [
      { roleIt: "Istruttori", roleSl: "Vaditelji", names: "Daniel Crevatin, Marko Ursich, Peter Stopar" }
    ]
  },
  {
    category: "BOR MINIBASKET Piccoli",
    categorySl: "BOR MINIBASKET Mali",
    roles: [
      { roleIt: "Istruttori", roleSl: "Vaditelji", names: "Daniel Crevatin, Alina Pahor, Peter Stopar" }
    ]
  }
];

const datiSocietari = [
  { title: "Denominazione", value: "ASD-AKK BOR Basket", span: 1 },
  { title: "Fondazione", value: "1956", span: 1 },
  { title: "Colori", value: "Blu - Bianco", span: 1 },
  { title: "Codice FIP", value: "000298", span: 1 },
  { title: "Contatti", value: "Tel: +39 040 5708866 \nkkbor@borbasket.com", span: 1 },
  { title: "P. IVA & PEC", value: "00794360321 \nkkbor@pec.it", span: 1 },
  { title: "IBAN", value: "IT 37 D 08928 02200 010000015973", span: 2 },
  { title: "Sede Legale", value: "Strada di Guardiella 7, 34128 Trieste", span: 2, href: "https://maps.app.goo.gl/zTKTpz5jx1VnpLSQ6" },
  { title: "Campo di Gioco", value: "Stadio 1° Maggio - Palestra “Bojan Pavletič”", span: 2, href: "https://maps.app.goo.gl/jF2HCJVjmgJ8sx9KA" },
];

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  
  return {
    title: isSl ? 'Društvo' : 'La Società',
    description: isSl 
      ? 'Odkrijte upravni odbor, trenerje in podatke o KK Bor Trieste. Zgodovina in tradicija od 1956.' 
      : 'Scopri il direttivo, lo staff tecnico e i dati societari del Bor Basket Trieste. Storia e tradizione dal 1956.',
  }
}

export default async function SocietaPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';

  const translatedDatiSocietari = datiSocietari.map(item => {
    let newTitle = item.title;
    let newValue = item.value;
    if (isSl) {
      if (item.title === "Denominazione") newTitle = "Ime";
      if (item.title === "Fondazione") newTitle = "Ustanovitev";
      if (item.title === "Colori") { newTitle = "Barve"; newValue = "Modro - Bela"; }
      if (item.title === "Codice FIP") newTitle = "FIP Koda";
      if (item.title === "Sede Legale") newTitle = "Sedež";
      if (item.title === "Campo di Gioco") newTitle = "Igrišče";
      if (item.title === "Contatti") newTitle = "Stiki";
      if (item.title === "P. IVA & PEC") newTitle = "Davčna št. & PEC";
    }
    return { ...item, title: newTitle, value: newValue };
  });

  const translateRole = (role: string) => {
    if (!isSl) return role;
    const map: Record<string, string> = {
      "Presidente": "Predsednik",
      "Vice Presidente & Resp. FIP": "Podpredsednik & Odgovorni FIP",
      "Tesoriere": "Blagajnik",
      "Segretaria": "Tajnica",
      "Consigliere & Resp. FIP": "Odbornik & Odgovorni FIP",
      "Consigliere": "Odbornik",
      "Visite Mediche": "Zdravniški pregledi"
    };
    return map[role] || role;
  };

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
            {isSl ? "DRUŠTVO" : "LA SOCIETÀ"}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
          
          {/* Dati Societari */}
          <div>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
              {isSl ? "Podatki Društva" : "Dati Societari"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {translatedDatiSocietari.map((item, idx) => {
              const cardClass = `bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100 flex flex-col justify-center ${item.span === 2 ? 'md:col-span-2' : ''} ${item.href ? 'hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group' : ''}`;
              
              const innerContent = (
                <>
                  <h3 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{item.title}</h3>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-lg md:text-xl font-black text-[#001666] leading-snug whitespace-pre-line">{item.value}</p>
                    {item.href && (
                      <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#001666] group-hover:text-white text-gray-500 transition-colors shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      </div>
                    )}
                  </div>
                </>
              );

              if (item.href) {
                return (
                  <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {innerContent}
                  </a>
                );
              }

              return (
                <div key={idx} className={cardClass}>
                  {innerContent}
                </div>
              );
            })}
          </div>

          {/* Map Embed */}
          <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-gray-100 shadow-sm mt-4 md:mt-6 relative group">
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              loading="lazy" 
              allowFullScreen 
              src="https://maps.google.com/maps?q=Stadio%201%C2%B0%20Maggio%20Trieste&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title={isSl ? "Igrišče" : "Campo di Gioco"}
            ></iframe>
          </div>
          </div>
          
          {/* Odbor / Direttivo */}
          <div>
          <div className="mb-12 border-b border-gray-200 pb-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
              {isSl ? "Odbor" : "Direttivo"}
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            
            {/* Executive Board */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{isSl ? "Izvršni Odbor" : "Comitato Esecutivo"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {boardMembers.map((member, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100 flex flex-col justify-center">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{translateRole(member.role)}</p>
                    <p className="text-lg md:text-xl font-black uppercase text-[#001666] break-words leading-tight">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Counselors */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{isSl ? "Odborniki in naloge" : "Consiglieri & Incarichi"}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {counselors.map((counselor, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100 flex flex-col justify-center">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{translateRole(counselor.role)}</p>
                    <p className="text-base md:text-lg font-black uppercase text-[#001666] break-words leading-tight">{counselor.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{isSl ? "Sodelavci" : "Soci Collaboratori"}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {collaborators.map((name, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col items-center text-center justify-center">
                    <p className="text-sm md:text-base font-black uppercase text-[#001666] leading-tight">{name}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
          </div>

          {/* Allenatori / Trenerji */}
          <div>
            <div className="mb-12 border-b border-gray-200 pb-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
                {isSl ? "Trenerji" : "Allenatori"}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {coachCategories.map((cat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100 flex flex-col justify-start h-full">
                  <h3 className="text-base md:text-lg font-black uppercase text-[#001666] leading-tight mb-4 pb-3 border-b border-gray-200/60">
                    {isSl && cat.categorySl ? cat.categorySl : cat.category}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {cat.roles.map((role, roleIdx) => (
                      <div key={roleIdx} className="flex flex-col">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
                          {isSl ? role.roleSl : role.roleIt}
                        </p>
                        <p className="text-sm font-black uppercase text-[#001666] leading-tight">
                          {role.names}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
