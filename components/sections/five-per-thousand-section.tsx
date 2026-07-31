"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function FivePerThousandSection({ lang }: { lang: 'it' | 'sl' }) {
  const isSl = lang === 'sl';
  const [copied, setCopied] = useState(false);
  
  const title = isSl ? "PODPRITE NAS Z 5x1000" : "SOSTIENICI CON IL 5x1000";
  const subtitle = isSl 
    ? "Podpri prihodnost naše mladine."
    : "Sostieni il futuro dei nostri ragazzi.";
  const thanks = isSl ? "Hvala <3" : "Grazie <3";
  const label = isSl ? "DAVČNA ŠTEVILKA" : "CODICE FISCALE";
  const cf = "00794360321";

  const handleCopy = () => {
    navigator.clipboard.writeText(cf);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white pt-0 pb-12 md:pt-4 md:pb-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[1.5rem] bg-[#001666] py-12 px-6 md:py-16 md:px-12 flex flex-col justify-center items-center text-center">
          
          {/* Basketball Court Background SVG */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
            <svg 
              viewBox="0 0 1200 800" 
              className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-125 md:scale-150"
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              xmlns="http://www.w3.org/2000/svg"
            >
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

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
              {title}
            </h2>
            
            <p className="text-base md:text-lg font-medium text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {subtitle}
              <br />
              {thanks}
            </p>
            
            <button 
              onClick={handleCopy}
              className="group bg-white hover:bg-[#001666] border border-transparent hover:border-white px-10 py-6 md:px-12 md:py-8 rounded-2xl flex flex-col items-center shadow-lg transition-colors duration-300 relative cursor-pointer"
              title={isSl ? "Kopiraj v odložišče" : "Copia negli appunti"}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-[#001666] group-hover:text-white transition-colors duration-300">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-[#001666]/70 group-hover:text-white/70 uppercase tracking-[0.2em] mb-2 transition-colors duration-300">
                {label}
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-[#001666] group-hover:text-white transition-colors duration-300">
                {cf}
              </span>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
