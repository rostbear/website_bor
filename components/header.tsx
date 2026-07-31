"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || '/it';
  const router = useRouter();

  const currentLang = pathname.startsWith('/sl') ? 'sl' : 'it';
  const prefix = `/${currentLang}`;

  const navTranslations = {
    it: {
      societa: "Società",
      news: "Notizie",
      squadre: "Squadre",
      matches: "Partite",
      contributi: "Contributi",
      documenti: "Documenti",
      sponsors: "Sponsor"
    },
    sl: {
      societa: "Društvo",
      news: "Novice",
      squadre: "Ekipe",
      matches: "Tekme",
      contributi: "Prispevki",
      documenti: "Dokumenti",
      sponsors: "Sponzorji"
    }
  };

  const t = navTranslations[currentLang];

  const toggleLang = () => {
    const newLang = currentLang === 'it' ? 'sl' : 'it';
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`, { scroll: false });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 border ${
        isScrolled || isMenuOpen 
          ? "bg-[#001666]/75 backdrop-blur-2xl rounded-3xl border-white/10" 
          : "bg-transparent border-transparent"
      }`}
      style={{
        boxShadow: isScrolled || isMenuOpen ? "rgba(0, 0, 0, 0.25) 0px 20px 40px -15px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-4 pl-6 py-2">
        {/* Logo */}
        <Link href={prefix || "/"} className="text-lg font-bold tracking-tighter text-white">
          BOR BASKET
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`${prefix}/societa`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.societa}
          </Link>
          <Link
            href={`${prefix}/news`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.news}
          </Link>
          <Link
            href={`${prefix}/squadre`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.squadre}
          </Link>
          <Link
            href={`${prefix}#stats`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.matches}
          </Link>
          <Link
            href={`${prefix}/contributi`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.contributi}
          </Link>
          <Link
            href={`${prefix}/documenti`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.documenti}
          </Link>
          <Link
            href={`${prefix}#sponsors`}
            className="text-xs font-semibold uppercase tracking-wider transition-colors text-white/80 hover:text-white"
          >
            {t.sponsors}
          </Link>
          <Link
            href={`${prefix}/live`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors text-red-500 hover:text-red-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE
          </Link>
          <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors">
            <Globe size={14} /> {currentLang === 'it' ? 'IT' : 'SL'}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href={`${prefix}/live`}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors text-red-500 hover:text-red-400 mr-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE
          </Link>
          <button onClick={toggleLang} className="text-white hover:opacity-80 transition-opacity flex items-center gap-1 text-sm font-bold">
            <Globe size={18} /> {currentLang === 'it' ? 'IT' : 'SL'}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-2 mt-1">
            <Link
              href={`${prefix}/societa`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.societa}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}/news`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.news}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}/squadre`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.squadre}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}#stats`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.matches}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}/contributi`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.contributi}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}/documenti`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.documenti}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}#sponsors`}
              className="text-sm font-bold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{t.sponsors}</span>
              <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
            <Link
              href={`${prefix}/live`}
              className="text-sm font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </span>
              <span className="text-red-500/50 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300 font-light text-base">→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
