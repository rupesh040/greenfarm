"use client";

import React from "react";
import Image from "next/image";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { HeroData } from "@/types";
import { heroData as defaultHeroData } from "@/data";

interface HeroProps {
  data?: HeroData;
}

export default function Hero({ data = defaultHeroData }: HeroProps) {
  const renderTitle = () => {
    if (data.highlightText && data.title.includes(data.highlightText)) {
      const parts = data.title.split(data.highlightText);
      return (
        <>
          {parts[0]}
          <span className="text-[#facc15] block sm:inline font-black">
            {data.highlightText}
          </span>
          {parts[1]}
        </>
      );
    }
    return data.title;
  };

  return (
    <section
      id="home"
      className="w-full relative bg-gradient-to-r from-[#0c2815] via-[#11341c] to-[#143e21] overflow-hidden pt-6 sm:pt-8 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="absolute top-0 right-4 sm:right-12 w-80 sm:w-[420px] h-80 sm:h-[420px] pointer-events-none opacity-20 select-none">
        <svg viewBox="0 0 300 300" fill="none" stroke="#4ade80" strokeWidth="1.8" className="w-full h-full">
          <path d="M60,260 C90,170 150,100 260,50 C230,140 180,210 60,260 Z" />
          <path d="M60,260 C120,195 180,145 260,50" />
          <path d="M120,190 C150,170 180,160 195,150" />
          <path d="M90,220 C120,200 150,190 165,180" />
          <path d="M150,160 C180,140 210,130 225,120" />
          <path d="M110,290 C130,210 195,160 290,110 C260,180 220,240 110,290 Z" />
          <path d="M110,290 C160,225 220,185 290,110" />
        </svg>
      </div>

      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 bg-[#173a21]/90 border border-emerald-500/40 text-emerald-200 text-xs sm:text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm">
              <Sprout className="w-4 h-4 text-[#facc15]" />
              <span>{data.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-black text-white tracking-normal leading-[1.08]">
              {renderTitle()}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-[1.5/1] w-full drop-shadow-2xl group sm:aspect-[1.65/1] lg:aspect-[1.5/1] lg:w-[112%]"
          >
            <svg
              className="absolute h-0 w-0"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <clipPath
                  id="left-farmer-image-shape"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="
                      M 0.08,0
                      L 0.92,0
                      Q 1,0 1,0.08
                      L 0.95,0.88
                      Q 0.945,0.96 0.88,1
                      L 0.08,1
                      Q 0,1 0,0.92
                      L 0,0.08
                      Q 0,0 0.08,0
                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-[#d5d94b]/70 p-[2px]"
              style={{
                clipPath: "url(#left-farmer-image-shape)",
              }}
            >
              <div
                className="group relative h-full w-full overflow-hidden"
                style={{
                  clipPath: "url(#left-farmer-image-shape)",
                }}
              >
                <Image
                  src={data.leftFarmerImage.url || "/hero/hero-1.webp"}
                  alt={data.leftFarmerImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-7 relative flex flex-col justify-end w-full"
        >
          <div className="relative h-[440px] w-full drop-shadow-2xl sm:h-[540px] lg:h-[580px] xl:h-[620px]">
            <svg
              className="absolute h-0 w-0"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <clipPath
                  id="farmer-image-shape"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="
                      M 0.15,0
                      L 0.78,0
                      Q 0.88,0 0.92,0.04
                      Q 0.96,0.08 0.96,0.14
                      L 0.96,0.91
                      Q 0.96,1 0.90,1
                      L 0.045,1
                      Q 0,1 0.005,0.945
                      L 0.055,0.14
                      Q 0.06,0 0.15,0
                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-[#d5d94b]/70 p-[2px]"
              style={{
                clipPath: "url(#farmer-image-shape)",
              }}
            >
              <div
                className="group relative h-full w-full overflow-hidden"
                style={{
                  clipPath: "url(#farmer-image-shape)",
                }}
              >
                <Image
                  src={data.rightFarmerImage.url || "/hero/hero-2.webp"}
                  alt={data.rightFarmerImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="absolute -left-4 sm:-left-8 lg:-left-12 bottom-12 sm:bottom-16 z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#eab308] border-4 border-white shadow-2xl flex items-center justify-center select-none transform hover:scale-105 transition-transform duration-300">
            <svg
              className="w-full h-full animate-[spin_24s_linear_infinite]"
              viewBox="0 0 140 140"
            >
              <path
                id="sealCirclePath"
                d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="none"
              />
              <text className="text-[10px] font-black uppercase fill-[#0e2b17] tracking-[3px]">
                <textPath href="#sealCirclePath" startOffset="0%">
                  • {data.organicSeal.title} • {data.organicSeal.subtitle} •
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#0e2b17] flex items-center justify-center shadow-inner p-2.5">
                <Image
                  src="/hero/leaf.webp"
                  alt="Organic leaf"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
