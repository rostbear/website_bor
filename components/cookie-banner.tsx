"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname() || '/it';
  const currentLang = pathname.startsWith('/sl') ? 'sl' : 'it';
  const prefix = `/${currentLang}`;

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie_consent");
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const text = currentLang === 'sl' 
    ? "To spletno mesto uporablja piškotke za izboljšanje vaše uporabniške izkušnje. Z nadaljnjo uporabo se strinjate z uporabo piškotkov."
    : "Questo sito utilizza i cookie per migliorare l'esperienza di navigazione. Continuando a navigare accetti l'utilizzo dei cookie.";
  
  const moreInfo = currentLang === 'sl' ? "Več informacij" : "Maggiori informazioni";
  const acceptText = currentLang === 'sl' ? "Sprejmi" : "Accetta";
  const declineText = currentLang === 'sl' ? "Zavrni" : "Rifiuta";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-0 pointer-events-none flex justify-center animate-reveal-up">
      <div className="bg-[#001666] text-white px-6 py-4 w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        
        <p className="text-xs md:text-sm text-white/80 leading-snug flex-1 text-center md:text-left">
          {text} <Link href={`${prefix}/cookie`} className="underline underline-offset-4 hover:text-white transition-colors ml-1 font-semibold">{moreInfo}</Link>
        </p>

        <div className="flex gap-3 shrink-0">
          <button 
            onClick={declineCookies}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {declineText}
          </button>
          <button 
            onClick={acceptCookies}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-[#001666] hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            {acceptText}
          </button>
        </div>
        
      </div>
    </div>
  );
}
