"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";

export function FooterSection() {
  const pathname = usePathname() || '/it';
  const currentLang = pathname.startsWith('/sl') ? 'sl' : 'it';
  const prefix = `/${currentLang}`;

  const translations = {
    it: {
      esplora: "Esplora",
      societa: "Società",
      squadre: "Squadre",
      notizie: "Notizie",
      trasparenza: "Trasparenza",
      documenti: "Documenti Ufficiali",
      contributi: "Contributi",
      contacts: "Contatti",
      sede: "Stadio 1° Maggio - Palestra Bojan Pavletič",
      address: "Strada di Guardiella 7, 34128 Trieste",
      email: "kkbor@borbasket.com",
      phone: "+39 040 5708866",
      rights: "© 2026 ASD-AKK BOR Basket. Tutti i diritti riservati."
    },
    sl: {
      esplora: "Razišči",
      societa: "Društvo",
      squadre: "Ekipe",
      notizie: "Novice",
      trasparenza: "Transparentnost",
      documenti: "Uradni dokumenti",
      contributi: "Prispevki",
      contacts: "Stiki",
      sede: "Štadion 1. Maja - Telovadnica Bojan Pavletič",
      address: "Strada di Guardiella 7, 34128 Trst",
      email: "kkbor@borbasket.com",
      phone: "+39 040 5708866",
      rights: "© 2026 ASD-AKK BOR Basket. Vse pravice pridržane."
    }
  };

  const t = translations[currentLang];

  return (
    <footer className="relative overflow-hidden w-full border-t border-white/10 bg-[#001666]">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
        <svg viewBox="0 0 1200 800" className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-110" fill="none" stroke="white" strokeWidth="4" xmlns="http://www.w3.org/2000/svg">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand & Address */}
          <div className="flex flex-col gap-4">
            <Link href={prefix || "/"} className="inline-block">
              <span className="text-base font-semibold tracking-tight text-white">
                ASD-AKK BOR Basket
              </span>
            </Link>
            <div className="text-sm text-white/60 leading-relaxed space-y-1">
              <p>{t.sede}</p>
              <p>{t.address}</p>
              <p>P.IVA 00794360321 - C.F. 00794360321</p>
            </div>
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/KKBorTrst" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} strokeWidth={2} />
              </a>
              <a href="https://www.youtube.com/@ASD-AKKBORBasket" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube size={20} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Esplora */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white">{t.esplora}</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={`${prefix}/societa`} className="text-sm text-white/60 hover:text-white transition-colors">{t.societa}</Link></li>
              <li><Link href={`${prefix}/squadre`} className="text-sm text-white/60 hover:text-white transition-colors">{t.squadre}</Link></li>
              <li><Link href={`${prefix}/news`} className="text-sm text-white/60 hover:text-white transition-colors">{t.notizie}</Link></li>
            </ul>
          </div>

          {/* Trasparenza */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white">{t.trasparenza}</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href={`${prefix}/documenti`} className="text-sm text-white/60 hover:text-white transition-colors">{t.documenti}</Link></li>
              <li><Link href={`${prefix}/contributi`} className="text-sm text-white/60 hover:text-white transition-colors">{t.contributi}</Link></li>
              <li><Link href={`${prefix}/privacy`} className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href={`${prefix}/cookie`} className="text-sm text-white/60 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contatti */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white">{t.contacts}</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${t.email}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={16} strokeWidth={2} />
                  {t.email}
                </a>
              </li>
              <li>
                <a href={`tel:${t.phone.replace(/ /g,'')}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                  <Phone size={16} strokeWidth={2} />
                  {t.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
