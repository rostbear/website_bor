import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPayload } from 'payload'
import config from '../../../payload.config'

const getImageUrl = (image: any): string => {
  if (!image) return "/images/placeholder.jpg";
  if (typeof image === "string") return image;
  return image.url || "/images/placeholder.jpg";
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

const translateCategory = (cat: string, isSl: boolean) => {
  if (!isSl) return cat;
  const map: Record<string, string> = {
    "Prima Squadra": "Članska Ekipa",
    "Giovanili": "Mladinski Sektor",
    "Società": "Društvo",
    "Minibasket": "Minibasket"
  };
  return map[cat] || cat;
};

export default async function NewsPage({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const isSl = resolvedParams.lang === 'sl';
  const langPrefix = isSl ? '/sl' : '/it';
  let articles: any[] = [];
  
  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'news',
      sort: '-publishDate',
      depth: 1,
    });
    articles = response.docs || [];
  } catch (error) {
    console.error("Errore nel recupero delle notizie da Payload CMS:", error);
  }

  const hasArticles = articles.length > 0;
  const featuredArticle = hasArticles ? articles[0] : null;
  const regularArticles = hasArticles ? articles.slice(1) : [];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-24 px-6">
        {/* Lines Background */}
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
            NEWS
          </h1>
        </div>
      </section>

      {/* Editoriale / Griglia News */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          
          {!hasArticles ? (
            <div className="w-full text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-gray-500 font-bold text-lg">Nessuna notizia pubblicata al momento. Accedi all&apos;area amministratore per pubblicare il tuo primo articolo!</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && (
                <Link 
                  href={`${langPrefix}/news/${featuredArticle.slug}`} 
                  className="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-[#001666]/20 transition-colors"
                >
                  <div className="w-full lg:w-3/5 h-[300px] md:h-[450px] lg:h-[500px] relative overflow-hidden">
                    <Image 
                      src={getImageUrl(featuredArticle.image)} 
                      alt={isSl ? featuredArticle.title_sl : featuredArticle.title_it} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full lg:w-2/5 p-8 lg:p-12 lg:pl-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-[#001666] text-white px-3 py-1 rounded-full">
                        {translateCategory(featuredArticle.category, isSl)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {formatDate(featuredArticle.publishDate)}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#001666] leading-tight mb-6 group-hover:underline decoration-2 underline-offset-4">
                      {isSl ? featuredArticle.title_sl : featuredArticle.title_it}
                    </h2>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#001666] group-hover:gap-4 transition-all">
                      {isSl ? "Preberi več" : "Leggi tutto"} <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularArticles.map((article: any) => (
                    <Link href={`${langPrefix}/news/${article.slug}`} key={article.id} className="group flex flex-col gap-5">
                      <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100">
                        <Image 
                          src={getImageUrl(article.image)} 
                          alt={isSl ? article.title_sl : article.title_it} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#001666]">
                            {translateCategory(article.category, isSl)}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                            {formatDate(article.publishDate)}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-[#001666] leading-tight mb-3 group-hover:underline decoration-2 underline-offset-4">
                          {isSl ? article.title_sl : article.title_it}
                        </h3>

                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
