"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ArrowRight, Leaf, Award, X, Sprout, Wheat } from "lucide-react";
import { WhyChooseUsData } from "@/types";

interface FeaturesProps {
  data: WhyChooseUsData;
}

export default function Features({ data }: FeaturesProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const getUspIcon = (icon: string) => {
    switch (icon) {
      case "leaf":
        return <Leaf className="w-7 h-7 text-[#166534]" />;
      case "award":
        return <Award className="w-7 h-7 text-[#F2C94C]" />;
      case "globe":
        return <Sprout className="w-7 h-7 text-[#166534]" />;
      default:
        return <Leaf className="w-7 h-7 text-[#166534]" />;
    }
  };

  const renderTitle = (title: string) => {
    if (title === "Our Crops Are Grown With Wonderful Love Of Nature") {
      return (
        <>
          Our Crops Are Grown With <br className="hidden lg:block" />
          <span className="text-[#166534]">Wonderful Love Of Nature</span>
        </>
      );
    }
    return title;
  };

  return (
    <section id="why-us" className="w-full bg-[#fcfdfa] pt-16 sm:pt-24 pb-0 relative overflow-hidden font-sans">
      
      {/* Decorative leaf background top right */}
      <div className="absolute -top-10 -right-10 w-64 h-64 opacity-20 pointer-events-none transform rotate-45 hidden lg:block">
        <Leaf className="w-full h-full text-[#166534]" />
      </div>

      {/* Top Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-16 sm:pb-32 lg:pb-40 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left: Image with Video Button */}
          <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:h-[450px] lg:h-[550px] rounded-[32px] overflow-visible group shadow-2xl z-10">
            <Image
              src="/images/farm_landscape.jpg"
              alt="Farm landscape"
              fill
              className="object-cover rounded-[32px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Play Button - Top Left (floating slightly outside) */}
            <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 z-30 p-2 rounded-2xl bg-[#FFD700] bg-opacity-90 border border-dashed border-white shadow-xl shadow-amber-500/20">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#0A2F1D] text-white flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 text-white" />
              </button>
            </div>
            
            {/* Decorative leaf at bottom left of image */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 text-[#86C232] transform -rotate-12 z-20">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.5 2c0 0-7.5.5-12 5C1 11.5 2 17 2 17s5.5 1 10-4.5c4.5-4.5 5-12 5.5-10.5z"/></svg>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 lg:pl-6 relative z-10">
             {/* Decorative dots top left of content */}
             <div className="absolute -top-6 -left-6 w-16 h-16 bg-[radial-gradient(#F2C94C_2px,transparent_2px)] [background-size:8px_8px] opacity-40"></div>

             {/* Badge */}
            <div className="inline-flex items-center gap-2 relative z-10">
              <Wheat className="w-6 h-6 text-[#F2C94C]" />
              <span className="text-[15px] font-bold text-[#166534] tracking-wide">{data.badge}</span>
              <div className="w-16 h-[2px] bg-[#F2C94C] ml-2 opacity-80"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.2] relative z-10">
              {renderTitle(data.title)}
            </h2>

            <p className="text-base sm:text-[17px] text-gray-600 leading-relaxed max-w-lg relative z-10">
              {data.description}
            </p>

            <div className="pt-6 relative z-10">
              <a
                href={data.ctaButton.href}
                className="inline-flex items-center gap-4 bg-[#F2C94C] hover:bg-[#e6bb3b] text-[#0A2F1D] font-bold text-sm sm:text-base px-2 py-2 pr-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer w-fit"
              >
                <span className="ml-5">More {data.badge}</span>
                <div className="w-10 h-10 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Dark Green Wave) */}
      <div className="relative w-full bg-[#114227] mt-10 z-30 pt-12 pb-16 px-4 sm:px-8 lg:px-12 xl:px-16">
         {/* Wave Top (Darker Green) */}
        <svg 
          className="absolute top-0 left-0 w-full text-[#114227] transform -translate-y-[99%] z-20 drop-shadow-xl" 
          viewBox="0 0 1440 120" 
          fill="currentColor" 
          preserveAspectRatio="none"
          style={{ height: '8vw', minHeight: '60px' }}
        >
          <path d="M0,64L60,74.7C120,85,240,107,360,101.3C480,96,600,64,720,64C840,64,960,96,1080,96C1200,96,1320,64,1380,48L1440,32L1440,121L1380,121C1320,121,1200,121,1080,121C960,121,840,121,720,121C600,121,480,121,360,121C240,121,120,121,60,121L0,121Z"></path>
        </svg>

        {/* Decorative Wave underneath (Lighter Green) */}
        <svg 
          className="absolute top-0 left-0 w-full text-[#2D6A4F] transform -translate-y-[99%] z-10" 
          viewBox="0 0 1440 120" 
          fill="currentColor" 
          preserveAspectRatio="none"
          style={{ height: '12vw', minHeight: '90px' }}
        >
          <path d="M0,96L80,85.3C160,75,320,53,480,48C640,43,800,53,960,64C1120,75,1280,85,1360,90.7L1440,96L1440,121L1360,121C1280,121,1120,121,960,121C800,121,640,121,480,121C320,121,160,121,80,121L0,121Z"></path>
        </svg>

        {/* Decorative Leaf on the right wave side */}
        <div className="absolute -top-16 right-0 w-40 h-40 text-[#86C232] transform rotate-90 opacity-60 z-30 pointer-events-none hidden md:block">
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17.5 2c0 0-7.5.5-12 5C1 11.5 2 17 2 17s5.5 1 10-4.5c4.5-4.5 5-12 5.5-10.5z"/></svg>
        </div>


        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 relative z-40">
          {data.uspCards.map((usp, idx) => (
            <div
              key={usp.id}
              className={`flex items-start gap-5 group relative ${
                idx < data.uspCards.length - 1
                  ? "md:after:content-[''] md:after:absolute md:after:-right-5 lg:after:-right-6 md:after:top-2 md:after:w-[1px] md:after:h-[80%] md:after:bg-white/20"
                  : ""
              }`}
            >
              <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
                {getUspIcon(usp.icon)}
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#F2C94C] transition-colors">
                  {usp.title}
                </h3>
                <p className="text-[15px] text-gray-200/95 leading-relaxed pr-2">
                  {usp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          />
          <div className="relative w-full sm:w-[860px] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10 animate-scaleUp">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/1V_xRb0x9aw?autoplay=1"
              title="GreenFarm Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
