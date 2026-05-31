"use client";

import { usePathname } from "next/navigation";

export function MarqueeSection() {
  const pathname = usePathname() || '/it';
  const isSl = pathname.startsWith('/sl');
  const text1 = isSl ? "STRAST • DISCIPLINA • ZMAGA" : "PASSIONE • DISCIPLINA • VITTORIA";
  const text2 = "BOR BASKET TRIESTE";

  return (
    <div className="bg-royal-blue py-3 md:py-4 overflow-hidden w-full border-y border-white/5 relative grain-overlay">
      <div className="marquee-container marquee-mask relative z-10">
        <div className="marquee-content text-white/90 font-black text-2xl md:text-5xl uppercase tracking-tight flex items-center gap-12 md:gap-16">
          <span>{text1}</span>
          <span>{text2}</span>
          <span>{text1}</span>
          <span>{text2}</span>
          <span>{text1}</span>
          <span>{text2}</span>
          {/* Duplicate for seamless loop */}
          <span>{text1}</span>
          <span>{text2}</span>
          <span>{text1}</span>
          <span>{text2}</span>
          <span>{text1}</span>
          <span>{text2}</span>
        </div>
      </div>
    </div>
  );
}
