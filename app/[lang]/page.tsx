import { Header } from "@/components/header";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { FooterSection } from "@/components/sections/footer-section";
import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function Home({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'it';
  let matches: any[] = [];
  
  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'matches',
      sort: 'matchDate',
      where: {
        status: {
          not_equals: 'Terminata',
        }
      },
      limit: 3,
      locale: lang,
    });
    
    matches = (response.docs || []).map((doc) => {
      const dateObj = new Date(doc.matchDate);
      return {
        id: doc.id,
        homeTeam: doc.homeTeam,
        awayTeam: doc.awayTeam,
        date: dateObj.toLocaleDateString(lang === 'it' ? "it-IT" : "sl-SI", { day: '2-digit', month: 'long', year: 'numeric' }),
        time: dateObj.toLocaleTimeString(lang === 'it' ? "it-IT" : "sl-SI", { hour: '2-digit', minute: '2-digit' }),
        venue: doc.location || "PalaBor",
      };
    });
  } catch (error) {
    console.error("Errore nel recupero delle partite da Payload CMS:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TechnologySection />
      <MarqueeSection />
      <GallerySection matches={matches} />
      <CollectionSection lang={lang} />
      <EditorialSection />
      <FooterSection />
    </main>
  );
}
