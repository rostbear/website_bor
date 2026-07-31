import { FadeImage } from "@/components/fade-image";
import { getPayload } from 'payload'
import config from '../../payload.config'
import Link from 'next/link'

const getImageUrl = (image: any): string => {
  if (!image) return "/images/placeholder.jpg";
  if (typeof image === "string") return image;
  return image.url || "/images/placeholder.jpg";
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
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

export async function LatestNewsSection({ lang }: { lang: 'it' | 'sl' }) {
  const isSl = lang === 'sl';
  let articles: any[] = [];
  const { getDictionary } = await import("@/dictionaries");
  const dict = await getDictionary(lang);
  
  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'news',
      sort: '-publishDate',
      limit: 3,
      depth: 1,
    });
    articles = response.docs || [];
  } catch (error) {
    console.error("Errore nel recupero delle notizie per la Homepage:", error);
  }

  if (articles.length === 0) {
    return (
      <section id="news" className="bg-white py-12 md:py-24">
        <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-12 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
            {dict.sections.news}
          </h2>
        </div>
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center py-12 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-500 font-bold text-lg">{dict.sections.no_news}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="bg-white py-12 md:py-24">
      {/* Section Title */}
      <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
          {dict.sections.news}
        </h2>
      </div>

      {/* News Grid */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((item) => (
            <Link href={`/${isSl ? 'sl' : 'it'}/news/${item.slug}`} key={item.id} className="group block">
              {/* Image - Shorter height */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                <FadeImage
                  src={getImageUrl(item.image)}
                  alt={isSl ? item.title_sl : item.title_it}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <p className="text-xs font-bold text-[#001666]/50 uppercase tracking-widest mb-2">
                  {formatDate(item.publishDate)}
                </p>
                <h3 className="text-xl font-black tracking-tight leading-snug text-[#001666] group-hover:opacity-80 transition-opacity group-hover:underline decoration-2 underline-offset-4">
                  {isSl ? item.title_sl : item.title_it}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
