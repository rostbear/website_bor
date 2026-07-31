"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function Counter({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const duration = 2000;

  useEffect(() => {
    if (!isVisible) return;

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

  return (
    <>
      {value.startsWith(suffix) ? suffix : ""}{count}{!value.startsWith(suffix) ? suffix : ""}
    </>
  );
}

const stats = [
  { label: "Fondazione", value: "1956" },
  { label: "Atleti", value: "250+" },
  { label: "Campionati", value: "12" },
  { label: "Squadre", value: "6" },
];



const fallbackStandings = [
  { pos: 1, team: "Bor Radenska", pts: 28, w: 14, l: 2 },
  { pos: 2, team: "Kontovel", pts: 24, w: 12, l: 4 },
  { pos: 3, team: "Breg San Dorligo", pts: 22, w: 11, l: 5 },
  { pos: 4, team: "Interclub Muggia", pts: 20, w: 10, l: 6 },
  { pos: 5, team: "Santos Trieste", pts: 18, w: 9, l: 7 },
  { pos: 6, team: "Azzurra Trieste", pts: 14, w: 7, l: 9 },
  { pos: 7, team: "CUS Trieste", pts: 12, w: 6, l: 10 },
  { pos: 8, team: "San Vito", pts: 8, w: 4, l: 12 },
];

export function SportsCenterSection({ matches = [], standings = [] }: { matches?: any[], standings?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname() || '/it';
  const isSl = pathname.startsWith('/sl');

  const t = {
    matchesTitle: isSl ? "NASLEDNJE TEKME" : "PROSSIME PARTITE",
    standingsTitle: isSl ? "LESTVICA" : "CLASSIFICA",
    stats: [
      { label: isSl ? "Ustanovitev" : "Fondazione", value: "1956" },
      { label: isSl ? "Športniki" : "Atleti", value: "250+" },
      { label: isSl ? "Prvenstva" : "Campionati", value: "12" },
      { label: isSl ? "Ekipe" : "Squadre", value: "6" },
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative overflow-hidden bg-background pt-12 pb-16 md:py-24">
      {/* Stylized Basketball Court Lines Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <svg 
          viewBox="0 0 1200 800" 
          className="w-[250%] md:w-[150%] h-auto min-w-[1200px] -rotate-[15deg] scale-110 md:scale-125"
          fill="none" 
          stroke="white" 
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

      <div className="relative z-10 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* Left Side: Next Matches Tower */}
          <div className="flex flex-col h-full">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-8 md:mb-12">
              {t.matchesTitle}
            </h2>
            
            <div className="flex flex-col gap-5 flex-1">
              {matches.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center flex-1 flex flex-col justify-center items-center h-full min-h-[300px]">
                  <p className="text-white/60 font-bold uppercase tracking-widest text-sm">Nessuna partita in programma</p>
                </div>
              ) : (
                matches.slice(0, 3).map((match, index) => {
                  const isNext = index === 0;
                return (
                  <div
                    key={match.id}
                    className={`relative overflow-hidden rounded-[2rem] px-3 py-[1.125rem] md:px-5 md:py-[1.875rem] flex flex-col justify-center group transition-all duration-700 flex-1 min-h-[140px] ${
                      isNext
                        ? "bg-white shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)] z-10 md:scale-[1.02]"
                        : "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      
                      {/* Date & Time Column */}
                      <div className="flex flex-col items-start md:w-1/4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isNext ? "text-[#001666]/50" : "text-white/40"}`}>
                          {match.date}
                        </span>
                        <span className={`text-2xl md:text-3xl font-black tracking-tighter ${isNext ? "text-[#001666]" : "text-white"}`}>
                          {match.time}
                        </span>
                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 ${isNext ? "text-[#001666]" : "text-white"}`}>
                          {match.venue}
                        </span>
                      </div>

                      {/* Teams Column */}
                      <div className="flex flex-col flex-1 items-start md:items-center w-full">
                        <div className="flex items-center justify-between md:justify-center w-full gap-4">
                          <span className={`font-black uppercase tracking-tighter text-xl md:text-3xl w-[40%] md:w-auto text-left md:text-right leading-none ${isNext ? "text-[#001666]" : "text-white/90"}`}>
                            {match.homeTeam}
                          </span>
                          <span className={`font-black italic tracking-tighter text-2xl md:text-4xl w-[20%] text-center ${isNext ? "text-[#001666]/20" : "text-white/10"}`}>
                            VS
                          </span>
                          <span className={`font-black uppercase tracking-tighter text-xl md:text-3xl w-[40%] md:w-auto text-right md:text-left leading-none ${isNext ? "text-[#001666]" : "text-white/90"}`}>
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>

          {/* Right Side: Classifica */}
          <div className="flex flex-col h-full">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-8 md:mb-12">
              {t.standingsTitle}
            </h2>
            
            <div className="flex-1 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 p-3 md:p-5 shadow-2xl flex flex-col justify-start overflow-hidden">
              <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
                <table className="w-full text-left border-separate border-spacing-y-2 md:border-spacing-y-3 min-w-[300px]">
                  <thead>
                    <tr>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-white/40 font-bold pl-2">{isSl ? "Mesto" : "Pos"}</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">{isSl ? "Ekipa" : "Squadra"}</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-white/40 font-bold text-center">{isSl ? "Z" : "V"}</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-white/40 font-bold text-center">P</th>
                      <th className="pb-4 text-[10px] uppercase tracking-widest text-white/40 font-bold text-right pr-2">{isSl ? "Točke" : "Pts"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(standings.length > 0 ? standings : fallbackStandings).map((team) => {
                      const isBor = team.team.toLowerCase().includes("bor");
                      return (
                        <tr key={team.pos} className={`transition-colors duration-300 ${isBor ? "bg-white" : "bg-white/5"} rounded-xl md:rounded-2xl`}>
                          <td className={`py-2 md:py-3 text-xs md:text-sm font-black w-8 md:w-12 pl-4 md:pl-6 rounded-l-xl md:rounded-l-2xl ${isBor ? "text-[#001666]" : "text-white/60"}`}>
                            {team.pos}
                          </td>
                          <td className={`py-2 md:py-3 text-xs md:text-base font-bold truncate max-w-[120px] md:max-w-none ${isBor ? "text-[#001666]" : "text-white/80"}`}>
                            {team.team}
                          </td>
                          <td className={`py-2 md:py-3 text-xs md:text-sm text-center font-medium ${isBor ? "text-[#001666]/80" : "text-white/50"}`}>
                            {team.w}
                          </td>
                          <td className={`py-2 md:py-3 text-xs md:text-sm text-center font-medium ${isBor ? "text-[#001666]/80" : "text-white/50"}`}>
                            {team.l}
                          </td>
                          <td className={`py-2 md:py-3 text-sm md:text-lg font-black text-right pr-4 md:pr-6 rounded-r-xl md:rounded-r-2xl ${isBor ? "text-[#001666]" : "text-white/80"}`}>
                            {team.pts}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
