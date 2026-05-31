"use client";

import { Calendar, Clock, MapPin } from "lucide-react";

const matches = [
  {
    id: 1,
    homeTeam: "Bor Basket",
    awayTeam: "Alpine United",
    date: "15 Maggio 2024",
    time: "20:45",
    venue: "PalaBor",
    homeLogo: "/images/logo_bor_basket.png",
    awayLogo: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=100",
  },
  {
    id: 2,
    homeTeam: "Forest Rangers",
    awayTeam: "Bor Basket",
    date: "22 Maggio 2024",
    time: "18:00",
    venue: "Wilderness Stadium",
    homeLogo: "https://images.unsplash.com/photo-1533873984035-25970ab07461?q=80&w=100",
    awayLogo: "/images/logo_bor_basket.png",
  },
  {
    id: 3,
    homeTeam: "Bor Basket",
    awayTeam: "Summit Peaks",
    date: "02 Giugno 2024",
    time: "21:00",
    venue: "PalaBor",
    homeLogo: "/images/logo_bor_basket.png",
    awayLogo: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=100",
  },
  {
    id: 4,
    homeTeam: "Canyon Giants",
    awayTeam: "Bor Basket",
    date: "10 Giugno 2024",
    time: "19:30",
    venue: "Deep Ravine Ground",
    homeLogo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=100",
    awayLogo: "/images/logo_bor_basket.png",
  },
];

export function MatchesSection() {
  return (
    <section id="matches" className="bg-background">
      {/* Section Title - Matching Essential Accessories style */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Prossime Partite
        </h2>
      </div>

      {/* Matches Grid */}
      <div className="px-6 md:px-12 lg:px-20 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {matches.map((match, index) => {
            const isNext = index === 0;
            return (
              <div 
                key={match.id} 
                className={`relative overflow-hidden rounded-[2rem] p-6 md:p-8 shadow-xl flex flex-col justify-between group transition-all duration-500 bg-secondary/30 backdrop-blur-3xl border ${
                  isNext 
                    ? "border-white/40 ring-1 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                    : "border-white/10 hover:bg-secondary/50"
                }`}
              >
                {/* Next Match Badge - More prominent */}
                {isNext && (
                  <div className="absolute top-0 right-0 bg-white text-[#001666] text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-[0.2em] shadow-lg animate-pulse-subtle">
                    Prossima Partita
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border bg-white/5 border-white/10`}>
                    {isNext && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <Calendar className={`w-3.5 h-3.5 text-muted-foreground`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground`}>{match.date}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border bg-white/5 border-white/10`}>
                    <Clock className={`w-3.5 h-3.5 text-muted-foreground`} />
                    <span className={`text-xs font-semibold text-muted-foreground`}>{match.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className={`w-16 h-16 rounded-full overflow-hidden border flex-shrink-0 p-2 bg-white/5 border-white/10`}>
                      <img src={match.homeLogo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className={`text-sm md:text-base font-bold text-center line-clamp-1 text-foreground`}>{match.homeTeam}</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <div className={`text-xl font-black italic tracking-tighter text-white/20`}>VS</div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className={`w-16 h-16 rounded-full overflow-hidden border flex-shrink-0 p-2 bg-white/5 border-white/10`}>
                      <img src={match.awayLogo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <span className={`text-sm md:text-base font-bold text-center line-clamp-1 text-foreground`}>{match.awayTeam}</span>
                  </div>
                </div>

                <div className={`pt-6 border-t flex items-center justify-center border-white/5`}>
                  <div className={`flex items-center gap-2 text-muted-foreground`}>
                    <MapPin className="w-4 h-4 opacity-50" />
                    <span className="text-xs font-medium uppercase tracking-widest">{match.venue}</span>
                  </div>
                </div>

                {/* Subtle highlight gradient for 'Next' match */}
                {isNext && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
