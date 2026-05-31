import React from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getPayload } from 'payload'
import config from '../../../../payload.config'
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    lang: 'it' | 'sl';
    slug: string;
  }>;
};

// Parser ricorsivo per il formato Lexical JSON di Payload v3
function renderLexicalNode(node: any): React.ReactNode {
  if (!node) return null;
  
  if (node.type === 'text') {
    let text = node.text || '';
    if (node.format === 1) {
      return <strong key={Math.random()}>{text}</strong>;
    }
    if (node.format === 2) {
      return <em key={Math.random()}>{text}</em>;
    }
    if (node.format === 8) {
      return <u key={Math.random()}>{text}</u>;
    }
    return text;
  }

  const children = node.children ? node.children.map((child: any) => renderLexicalNode(child)) : null;

  switch (node.type) {
    case 'root':
      return <div key={Math.random()} className="space-y-6">{children}</div>;
    case 'paragraph':
      return <p key={Math.random()} className="text-gray-700 leading-relaxed text-base md:text-lg">{children}</p>;
    case 'heading':
      const Tag = node.tag || 'h2';
      let headingClass = "text-[#001666] font-black mt-8 mb-4 ";
      if (Tag === 'h1') headingClass += "text-3xl md:text-4xl";
      else if (Tag === 'h2') headingClass += "text-2xl md:text-3xl";
      else headingClass += "text-xl md:text-2xl";
      return <Tag key={Math.random()} className={headingClass}>{children}</Tag>;
    case 'list':
      if (node.listType === 'number') {
        return <ol key={Math.random()} className="list-decimal list-inside pl-6 space-y-2 text-gray-700">{children}</ol>;
      }
      return <ul key={Math.random()} className="list-disc list-inside pl-6 space-y-2 text-gray-700">{children}</ul>;
    case 'listitem':
      return <li key={Math.random()} className="text-gray-700">{children}</li>;
    case 'quote':
      return (
        <blockquote key={Math.random()} className="border-l-4 border-[#001666] pl-6 my-6 italic text-gray-500 text-lg">
          {children}
        </blockquote>
      );
    default:
      return children;
  }
}

function RichText({ content }: { content: any }) {
  if (!content) return null;
  if (typeof content === 'string') {
    return <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">{content}</div>;
  }
  if (content.root) {
    return <>{renderLexicalNode(content.root)}</>;
  }
  return null;
}

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

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const isSl = lang === 'sl';
  let article: any = null;

  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'news',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1,
    });
    
    if (response.docs && response.docs.length > 0) {
      article = response.docs[0];
    }
  } catch (error) {
    console.error("Errore nel recupero della notizia da Payload CMS:", error);
  }

  // Se non si trova nel database, 404
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-[#001666] pt-32 pb-16 px-6">
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

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center flex flex-col items-center">
          {/* Metadata */}
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 text-white/90 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <Tag size={12} className="text-white/60" />
              {translateCategory(article.category, isSl)}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
              <Calendar size={12} className="text-white/40" />
              {formatDate(article.publishDate)}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-oswald)] font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-[1.1] max-w-3xl text-center">
            {isSl ? article.title_sl : article.title_it}
          </h1>
        </div>
      </section>

      {/* Article Content Section */}
      <section className="bg-white py-16 px-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href={`/${lang}/news`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#001666] mb-8 transition-colors">
            <ArrowLeft size={14} /> {isSl ? "Nazaj na Novice" : "Torna a Notizie"}
          </Link>

          {/* Featured Image */}
          <div className="w-full h-[300px] md:h-[500px] relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-12">
            <Image 
              src={getImageUrl(article.image)} 
              alt={isSl ? article.title_sl : article.title_it} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Reading body */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#001666] prose-headings:font-black prose-p:text-gray-700">
            <RichText content={isSl ? article.content_sl : article.content_it} />
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
