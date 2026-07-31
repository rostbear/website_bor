import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SquadraPage({ params }: { params: Promise<{ lang: 'it' | 'sl', id: string }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
        <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
          <Link href={`/${resolvedParams.lang}/squadre`} className="text-white/60 hover:text-white flex items-center gap-2 justify-center mb-8 font-bold uppercase tracking-widest text-sm transition-colors">
            <ArrowLeft size={16} />
            {isSl ? "Nazaj na ekipe" : "Torna alle squadre"}
          </Link>
          <h1 
            className="w-full font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[7rem] text-5xl uppercase tracking-tight"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
          >
            {isSl ? "STRAN V IZDELAVI" : "PAGINA IN COSTRUZIONE"}
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 px-6 relative z-20 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-[#001666] uppercase mb-4">
          {isSl ? "Kmalu na voljo" : "Prossimamente"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isSl 
            ? "Tukaj bodo kmalu na voljo informacije o ekipi, seznam igralcev, statistika in koledar tekem." 
            : "Qui saranno presto disponibili le informazioni sulla squadra, il roster, le statistiche e il calendario delle partite."}
        </p>
      </section>

      <FooterSection />
    </main>
  );
}
