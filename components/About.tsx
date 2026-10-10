"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Check, Sprout, Home } from "lucide-react";
import { AboutData } from "@/types";

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-white relative overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="absolute -bottom-8 -left-8 w-44 sm:w-56 h-44 sm:h-56 pointer-events-none select-none z-0">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
          <path d="M0,160 C30,100 80,60 140,40 C110,95 85,130 0,160 Z" fill="#84cc16" opacity="0.8" />
          <path d="M20,160 C60,120 110,85 160,70 C140,115 110,145 20,160 Z" fill="#22c55e" opacity="0.9" />
          <path d="M0,130 C20,80 60,40 110,20 C85,70 65,105 0,130 Z" fill="#facc15" opacity="0.85" />
          <path d="M0,160 C15,130 40,110 80,95 C60,130 45,150 0,160 Z" fill="#15803d" opacity="0.7" />
        </svg>
      </div>

      <div className="absolute -bottom-4 right-2 sm:right-8 w-72 sm:w-88 h-40 pointer-events-none opacity-20 select-none hidden md:block">
        <svg viewBox="0 0 320 140" fill="none" stroke="#15803d" strokeWidth="1.2" className="w-full h-full">
          <path d="M0,125 Q80,110 160,120 T320,115" />
          <path d="M0,135 Q100,125 200,132 T320,128" />
          <path d="M260,120 L270,75 L280,120 Z" fill="#15803d" opacity="0.25" />
          <circle cx="270" cy="75" r="3" fill="#15803d" />
          <line x1="270" y1="75" x2="250" y2="60" strokeWidth="1.5" />
          <line x1="270" y1="75" x2="290" y2="60" strokeWidth="1.5" />
          <line x1="270" y1="75" x2="270" y2="50" strokeWidth="1.5" />
          <line x1="270" y1="75" x2="270" y2="100" strokeWidth="1.5" />
          <rect x="180" y="105" width="40" height="20" rx="2" fill="#15803d" opacity="0.2" />
          <polygon points="176,105 200,90 224,105" fill="#15803d" opacity="0.3" />
        </svg>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center relative z-10">
        <div className="lg:col-span-6 relative w-full">
          <div className="relative w-full pb-20 sm:pb-28">
            <div className="absolute top-8 right-2 sm:right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#facc15] opacity-95 blur-0 pointer-events-none -z-0" />

            <div className="relative z-10 w-[84%] sm:w-[86%] aspect-[1.5/1] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl border-4 border-white group about-image-float-primary">
              <Image
                src={data.images.couple || "/about/about-1.jpg"}
                alt="Farmer couple harvesting fresh produce"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 80vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute right-0 -bottom-8 sm:-bottom-12 z-20 w-[76%] sm:w-[78%] aspect-[1.25/1] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group about-image-float-secondary">
              <Image
                src={data.images.femaleFarmer || "/about/about-2.jpg"}
                alt="Female farmer in nursery greenhouse"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 75vw, 38vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col space-y-6 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-bold tracking-wide bg-[#e8f5e9] text-[#1b5e20] border border-emerald-200/50 self-start shadow-sm">
            <Sprout className="w-4 h-4 text-[#15803d]" />
            <span>{data.badge}</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Growing Naturally, Living Fully
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold tracking-tight leading-[1.15] text-[#15803d]">
                Nurturing Nature
              </span>
              <span className="text-3xl sm:text-4xl xl:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                at Home
              </span>
              <span className="inline-flex items-center text-[#facc15] ml-1">
                <svg viewBox="0 0 50 30" fill="none" className="w-10 sm:w-12 h-6 sm:h-7">
                  <path d="M2,24 C14,24 28,16 46,6" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M46,6 C43,12 37,14 31,14 C36,10 40,8 46,6 Z" fill="#facc15" />
                  <path d="M36,12 C33,18 27,20 21,20 C26,16 30,14 36,12 Z" fill="#facc15" />
                  <path d="M26,18 C23,24 17,26 11,26 C16,22 20,20 26,18 Z" fill="#facc15" />
                </svg>
              </span>
            </div>
            <div className="w-24 h-[2px] bg-[#15803d] rounded-full mt-1.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch pt-1">
            <div className="md:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.07)] border border-gray-100 relative overflow-hidden flex flex-col justify-center group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -bottom-5 -left-5 w-24 h-24 opacity-10 pointer-events-none text-[#15803d]">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M10,90 C30,40 60,20 90,10 C80,50 60,70 10,90 Z" />
                </svg>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 shrink-0 text-[#15803d] flex items-center justify-center">
                  <svg viewBox="0 0 48 48" fill="currentColor" className="w-11 h-11">
                    <path d="M12,40 C14,24 24,14 40,8 C36,24 28,34 12,40 Z" />
                    <path
                      d="M20,40 C22,28 30,20 40,16 C38,28 32,36 20,40 Z"
                      opacity="0.8"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-[#0f3b1e] tracking-tight leading-none">
                    {data.experienceYears}
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-gray-500 mt-1.5 leading-snug">
                    {data.experienceLabel}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-3 pl-0 md:pl-2">
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-full bg-[#e8f5e9] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-108 transition-transform">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {data.features[0]?.title || "Built for Green Living"}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mt-0.5">
                    {data.features[0]?.description ||
                      "At GreenFarm, we believe that everyone deserves the joy of fresh and healthy produce."}
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-200/70" />

              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-full bg-[#e8f5e9] text-[#15803d] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-108 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {data.features[1]?.title || "Grow with Intention"}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mt-0.5">
                    {data.features[1]?.description ||
                      "Our mission is to reconnect people with nature through sustainable and organic farming."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-[14px] text-gray-600 leading-relaxed pt-1">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
            <div className="space-y-2.5">
              {data.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#e8f5e9] text-[#15803d] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-[14px] font-semibold text-gray-800">
                    {cp}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block w-[1px] h-10 bg-gray-200" />
              <a
                href={data.ctaButton.href}
                className="inline-flex items-center gap-3.5 bg-[#facc15] hover:bg-[#eab308] text-gray-950 font-bold text-sm sm:text-base pl-7 pr-3 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
              >
                <span>{data.ctaButton.label}</span>
                <span className="w-8 h-8 rounded-full bg-[#0d2a17] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about-image-float-primary {
          animation: aboutFloatPrimary 6s ease-in-out infinite alternate;
        }
        .about-image-float-secondary {
          animation: aboutFloatSecondary 7s ease-in-out infinite alternate;
        }
        @keyframes aboutFloatPrimary {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-6px);
          }
        }
        @keyframes aboutFloatSecondary {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(6px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-image-float-primary,
          .about-image-float-secondary {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
