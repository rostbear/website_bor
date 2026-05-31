"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const sponsors = [
  { name: "Radenska", logo: "/images/radenska (1).jpg" },
  { name: "Saptecnica", logo: "/images/Striscione_SAPTECNICA (1).png" },
  { name: "Globex", logo: "/images/Globex-Logo.png" },
  { name: "Edilcem", logo: "/images/Edilcem_logo_3-1-1024x442 (1).jpg" },
  { name: "MMA Sistemi", logo: "/images/MMA-Sistemi-Logo-1-scaled (1).jpg" },
  { name: "MediacheM", logo: "/images/MediacheM-Banner-900x300-CMYK-1024x342 (1).jpg" },
  { name: "Vescovo", logo: "/images/vescovo (1).png" },
  { name: "Artgroup", logo: "/images/artgroup (1).png" },
  { name: "LR Rappresentanze", logo: "/images/LR-Rappresentanze-Logo-1-1024x1024 (1).jpg" },
  { name: "Gallocchio Luca", logo: "/images/LOGO_Gallocchio_Luca-1 (1).png" },
  { name: "Sergas", logo: "/images/Sergas (1).png" },
  { name: "Stella d'oro", logo: "/images/Stella_d_oro-1-644x1024 (1).png" },
  { name: "Body Up", logo: "/images/body-up-logo-tondo_BOR (1).jpg" },
  { name: "Chalet Rutte", logo: "/images/chalet_Rutte (1).png" },
];

export function EditorialSection() {
  const pathname = usePathname() || '/it';
  const isSl = pathname.startsWith('/sl');
  const title = isSl ? "NAŠI SPONZORJI" : "I NOSTRI SPONSOR";

  return (
    <section id="sponsors" className="bg-white pb-24">
      <div className="px-6 md:px-12 lg:px-20 mb-10 md:mb-16 max-w-7xl mx-auto pb-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#001666] uppercase">
          {title}
        </h2>
      </div>

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="group relative flex-none w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)] aspect-[4/3] flex items-center justify-center p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-gray-200"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-[85%] max-h-[85%] object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
