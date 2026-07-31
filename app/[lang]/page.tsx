import { Header } from "@/components/header";
import { HeroScrollSection } from "@/components/sections/hero-scroll-section";
import { SportsCenterSection } from "@/components/sections/sports-center-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { LatestNewsSection } from "@/components/sections/latest-news-section";
import { SponsorsGridSection } from "@/components/sections/sponsors-grid-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FivePerThousandSection } from "@/components/sections/five-per-thousand-section";
import { getPayload } from 'payload'
import config from '../../payload.config'

export default async function Home({ params }: { params: Promise<{ lang: 'it' | 'sl' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'it';
  let matches: any[] = [];
  let standings: any[] = [];
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

    const standingsResponse = await payload.find({
      collection: 'standings',
      sort: '-points',
      limit: 20,
    });
    
    standings = (standingsResponse.docs || []).map((doc, index) => ({
      pos: index + 1,
      team: doc.teamName,
      pts: doc.points,
      w: doc.won,
      l: doc.lost,
    }));
  } catch (error) {
    console.error("Errore nel recupero dati da Payload CMS:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroScrollSection />
      <MarqueeSection />
      <SportsCenterSection matches={matches} standings={standings} />
      <LatestNewsSection lang={lang} />
      <FivePerThousandSection lang={lang} />
      <SponsorsGridSection lang={lang} />
      <FooterSection />
    </main>
  );
}
