import React from "react";
import { Wheat, Users, Home, Tractor, Leaf } from "lucide-react";
import { MilestonesData } from "@/types";

interface MilestonesProps {
  data: MilestonesData;
}

export default function Milestones({ data }: MilestonesProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "wheat":
        return <Wheat className="w-8 h-8 text-[#F2C94C]" strokeWidth={1.5} />;
      case "users":
        return <Users className="w-8 h-8 text-[#166534]" strokeWidth={1.5} />;
      case "home":
        return <Home className="w-8 h-8 text-[#166534]" strokeWidth={1.5} />;
      case "tractor":
        return <Tractor className="w-8 h-8 text-[#166534]" strokeWidth={1.5} />;
      default:
        return <Wheat className="w-8 h-8 text-[#166534]" strokeWidth={1.5} />;
    }
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-white relative overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16 text-center animate-fadeIn font-sans">
      
      {/* Title Section */}
      <div className="w-full max-w-4xl mx-auto relative mb-20 animate-fadeUp">
        
        {/* Rotated Organic Badge */}
        <div className="absolute -top-12 sm:-top-8 left-4 sm:left-12 lg:-left-12 transform -rotate-12 bg-[#164e24] text-white px-4 py-3 rounded-lg shadow-xl border border-[#166534]/50 z-10 w-28">
          <div className="text-xl font-black leading-none">100%</div>
          <div className="text-[10px] tracking-widest font-semibold uppercase mt-0.5">Organic</div>
          <div className="flex justify-center gap-1 mt-2">
            <Leaf className="w-4 h-4 fill-white" />
            <Leaf className="w-5 h-5 fill-white transform scale-x-[-1]" />
          </div>
          {/* Badge small triangle pointer */}
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#164e24] transform rotate-45"></div>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight pb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6b8cce] via-[#b3a3c9] to-[#f4d08f]">
            {data.title}
          </span>
        </h2>
        
        <p className="text-[15px] sm:text-[17px] text-gray-700 font-medium max-w-2xl mx-auto mt-6">
          {data.subtitle}
        </p>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {data.stats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative w-full md:w-1/4 py-10 md:py-4 px-4 flex flex-col items-center group"
            >
              {/* Icon Container with offset circle and leaves */}
              <div className="relative mb-6">
                {/* Offset circle */}
                <div className={`absolute -top-2 -right-3 w-16 h-16 rounded-full opacity-30 ${index === 0 ? 'bg-[#F2C94C]' : 'bg-[#166534]'}`}></div>
                
                {/* Main white circle */}
                <div className="relative w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center border border-gray-50 z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {getIcon(stat.icon)}
                </div>

                {/* Left decorative leaf */}
                <div className="absolute -left-6 bottom-2 text-[#86C232] transform -rotate-45 z-0 opacity-80">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.5 2c0 0-7.5.5-12 5C1 11.5 2 17 2 17s5.5 1 10-4.5c4.5-4.5 5-12 5.5-10.5z"/></svg>
                </div>
                {/* Right decorative leaf */}
                <div className="absolute -right-6 bottom-2 text-[#86C232] transform rotate-45 scale-x-[-1] z-0 opacity-80">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.5 2c0 0-7.5.5-12 5C1 11.5 2 17 2 17s5.5 1 10-4.5c4.5-4.5 5-12 5.5-10.5z"/></svg>
                </div>
              </div>

              <div className="text-3xl sm:text-[34px] font-extrabold text-[#0A2F1D] tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-[13px] font-medium text-gray-500 capitalize tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
