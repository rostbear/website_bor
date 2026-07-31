import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "../../payload.config";

type Sponsor = {
  name: string;
  logo: string;
  url?: string;
};



export async function SponsorsGridSection({ lang = 'it' }: { lang?: string }) {
  const isSl = lang === 'sl';
  const title = isSl ? "NAŠI SPONZORJI" : "I NOSTRI SPONSOR";

  let cmsSponsors: Sponsor[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const response = await payload.find({
      collection: 'sponsors',
      sort: 'order',
      limit: 100,
    });
    
    cmsSponsors = response.docs.map(doc => ({
      name: doc.name,
      logo: typeof doc.logo === 'object' && doc.logo !== null && 'url' in doc.logo ? (doc.logo.url as string) : (doc.logo as string),
      url: doc.url || undefined,
    }));
  } catch (error) {
    console.error("Errore nel recupero degli sponsor da Payload CMS:", error);
  }

  const allSponsors = cmsSponsors;

  return (
    <section id="sponsors" className="bg-white pb-24 scroll-mt-32">
      <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
          {title}
        </h2>
      </div>

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {allSponsors.map((sponsor, index) => {
            const Wrapper = sponsor.url ? 'a' : 'div';
            const wrapperProps = sponsor.url 
              ? { href: sponsor.url, target: "_blank", rel: "noopener noreferrer" } 
              : {};
              
            return (
              <Wrapper 
                key={index}
                {...wrapperProps}
                className={`relative flex-none w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)] aspect-[4/3] flex items-center justify-center p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100 ${
                  sponsor.url ? 'hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer' : ''
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
