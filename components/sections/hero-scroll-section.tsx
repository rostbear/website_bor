"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;

      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;

      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-2xl font-black tracking-tighter leading-[1.15] md:text-4xl lg:text-5xl text-center"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;

        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "#001666" : "rgba(0, 22, 102, 0.2)",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/bor_squadra_principale.jpg",
    alt: "Prima Squadra",
    position: "left",
    span: 1,
  },
  {
    src: "/images/bor_u19.jpg",
    alt: "Under 19",
    position: "left",
    span: 1,
  },
  {
    src: "/images/bor_u17m.jpg",
    alt: "Under 17",
    position: "right",
    span: 1,
  },
  {
    src: "/images/bor_minibasket.jpg",
    alt: "Minibasket",
    position: "right",
    span: 1,
  },
];

export function HeroScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const pathname = usePathname() || '/it';
  const isSl = pathname.startsWith('/sl');

  const descriptionText = isSl
    ? "BOR BASKET ZDRUŽUJE GLOBOKE ZGODOVINSKE KORENINE, PONOS POVEZANE SKUPNOSTI IN NEIZBRISNO DEDIŠČINO, KI NAVDIHUJE VSAKO NOVO GENERACIJO. OD PIONIRJEV PRETEKLOSTI DO PRVAKOV BODOČNOSTI, NAŠA ZGODBA SE NADALJUJE NA IGRIŠČU."
    : "BOR BASKET UNISCE RADICI STORICHE PROFONDE, L'ORGOGLIO DI UNA COMUNITÀ UNITA E UN'EREDITÀ INDISSOLUBILE PER ISPIRARE OGNI NUOVA GENERAZIONE. DAI PIONIERI DEL PASSATO AI CAMPIONI DI DOMANI, LA NOSTRA STORIA CONTINUA SUL PARQUET.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const centerWidth = 100 - (imageProgress * 58);
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * 24;
  const gap = imageProgress * 16;

  return (
    <section id="technology" ref={sectionRef} className="relative bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative flex h-full w-full items-stretch justify-center" style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}>
            
            <div className="flex flex-col" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateLeft}%)`, opacity: sideOpacity }}>
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div key={idx} className="relative overflow-hidden" style={{ flex: img.span, borderRadius: `${borderRadius}px` }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden" style={{ width: `${centerWidth}%`, height: "100%", flex: "0 0 auto", borderRadius: `${borderRadius}px` }}>
              <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
                <source src="/videos/bor_home_video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/50" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <div 
                  className="mb-6 md:mb-10 transition-all duration-300"
                  style={{ 
                    opacity: Math.max(0, 1 - (scrollProgress * 5)), 
                    transform: `translateY(${scrollProgress * 20}px)`,
                    filter: `blur(${scrollProgress * 10}px)`
                  }}
                >
                  <Image 
                    src="/images/logo_bor_basket.png" 
                    alt="Bor Basket Logo" 
                    width={200} 
                    height={200} 
                    className="w-32 md:w-48 lg:w-56 h-auto drop-shadow-2xl"
                  />
                </div>
                <h2 
                  className="w-full font-[family-name:var(--font-oswald)] font-bold leading-[0.85] text-transparent md:text-8xl lg:text-[10rem] xl:text-[11rem] text-6xl uppercase tracking-tight"
                  style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}
                >
                  {["BOR BASKET"].map((word, index) => {
                    const wordFadeStart = index * 0.07;
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    return (
                      <span key={index} className="inline-block transition-all duration-300" style={{ opacity: 1 - wordProgress, filter: `blur(${wordProgress * 10}px)`, transform: `translateY(${wordProgress * 20}px)` }}>
                        {word}
                      </span>
                    );
                  })}
                </h2>

                {/* Premium Scroll Indicator */}
                <div 
                  className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer z-50 group"
                  style={{ 
                    opacity: Math.max(0, 1 - (scrollProgress * 5)),
                    transform: `translateY(${scrollProgress * 10}px)`
                  }}
                  onClick={() => {
                    textSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {isSl ? "ODKRIJ ZGODOVINO" : "SCOPRI LA STORIA"}
                  </span>
                  <div className="w-[1px] h-12 md:h-16 bg-white/20 relative overflow-hidden group-hover:h-20 transition-all duration-500 ease-out">
                    <div className="w-full h-full bg-white origin-top animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col" style={{ width: `${sideWidth}%`, gap: `${gap}px`, transform: `translateX(${sideTranslateRight}%)`, opacity: sideOpacity }}>
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div key={idx} className="relative overflow-hidden" style={{ flex: img.span, borderRadius: `${borderRadius}px` }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="h-[200vh]" />

      <div ref={textSectionRef} className="relative overflow-hidden bg-white px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32">
        
        {/* Stylized Basketball Court Lines Background (Rotated Opposite) */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <svg 
            viewBox="0 0 1200 800" 
            className="w-[250%] md:w-[150%] h-auto min-w-[1200px] rotate-[15deg] scale-110 md:scale-125"
            fill="none" 
            stroke="#001666" 
            strokeWidth="4" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Boundary */}
            <rect x="100" y="50" width="1000" height="700" />
            {/* Half court line */}
            <line x1="600" y1="50" x2="600" y2="750" />
            {/* Center Circles */}
            <circle cx="600" cy="400" r="100" />
            <circle cx="600" cy="400" r="30" />
            {/* Left Paint */}
            <rect x="100" y="275" width="190" height="250" />
            {/* Left Free Throw Circle */}
            <path d="M 290 275 A 125 125 0 0 1 290 525" />
            <path d="M 290 525 A 125 125 0 0 1 290 275" strokeDasharray="12 12" />
            {/* Left 3-Point Line */}
            <path d="M 100 100 L 250 100 A 300 300 0 0 1 250 700 L 100 700" />

            {/* Right Paint */}
            <rect x="910" y="275" width="190" height="250" />
            {/* Right Free Throw Circle */}
            <path d="M 910 525 A 125 125 0 0 1 910 275" />
            <path d="M 910 275 A 125 125 0 0 1 910 525" strokeDasharray="12 12" />
            {/* Right 3-Point Line */}
            <path d="M 1100 100 L 950 100 A 300 300 0 0 0 950 700 L 1100 700" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-5xl mx-auto mb-24 md:mb-32">
            <ScrollRevealText text={descriptionText} />
          </div>
          
          <StatsGrid />
          
          {/* Federations & Partners Logos */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <a 
              href="https://www.fip.it"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-gray-50 border border-gray-200 py-8 px-4 md:py-10 md:px-6 shadow-xl flex flex-col justify-center items-center text-center block transition-transform duration-300 hover:-translate-y-1"
            >
              <Image 
                src="/images/fip-logo.png" 
                alt="FIP - Federazione Italiana Pallacanestro" 
                width={300} 
                height={300} 
                className="relative z-10 h-24 md:h-32 w-auto object-contain"
              />
            </a>
            <a 
              href="https://www.zssdi.it"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-gray-50 border border-gray-200 py-8 px-4 md:py-10 md:px-6 shadow-xl flex flex-col justify-center items-center text-center block transition-transform duration-300 hover:-translate-y-1"
            >
              <Image 
                src="/images/zssdi-logo.png" 
                alt="ZSSDI" 
                width={400} 
                height={300} 
                className="relative z-10 h-32 md:h-44 w-auto object-contain"
              />
            </a>
            <a 
              href="https://www.kzs.si"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-gray-50 border border-gray-200 py-8 px-4 md:py-10 md:px-6 shadow-xl flex flex-col justify-center items-center text-center block transition-transform duration-300 hover:-translate-y-1"
            >
              <Image 
                src="/images/logo-kzs.png" 
                alt="KZS - Košarkarska Zveza Slovenije" 
                width={300} 
                height={300} 
                className="relative z-10 h-32 md:h-40 w-auto object-contain"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

const stats = [
  { label: "Fondazione", value: "1956", labelSl: "Ustanovitev" },
  { label: "Atleti", value: "250+", labelSl: "Športniki" },
  { label: "Campionati", value: "12", labelSl: "Prvenstva" },
  { label: "Squadre", value: "6", labelSl: "Ekipe" },
];

function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname() || '/it';
  const isSl = pathname.startsWith('/sl');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-gray-50 border border-gray-200 py-8 px-4 md:py-10 md:px-6 shadow-xl flex flex-col justify-center items-center text-center group transition-all duration-500 hover:bg-white hover:border-gray-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#001666]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <p className="text-[10px] font-bold text-[#001666]/60 uppercase tracking-[0.2em] mb-2 relative z-10">
            {isSl ? item.labelSl : item.label}
          </p>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#001666] relative z-10">
            <Counter value={item.value} isVisible={isVisible} />
          </h3>
        </div>
      ))}
    </div>
  );
}

function Counter({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const duration = 2000;

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target]);

  return <>{value.startsWith(suffix) ? suffix : ""}{count}{!value.startsWith(suffix) ? suffix : ""}</>;
}
