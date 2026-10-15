"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MissionVisionData } from "@/types";
import { missionVisionData as defaultMissionVisionData } from "@/data";

interface MissionVisionProps {
  data?: MissionVisionData;
}

export default function MissionVision({
  data = defaultMissionVisionData,
}: MissionVisionProps) {
  const cards = data?.cards ?? [];

  const getCardIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "target":
      case "mission":
        return (
          <svg
            className="h-8 w-8 text-white drop-shadow-sm"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Bullseye target circles */}
            <circle cx="20" cy="20" r="14" />
            <circle cx="20" cy="20" r="9" />
            <circle cx="20" cy="20" r="4" fill="white" />
            {/* Dart arrow */}
            <path d="M28 12 L35 5" />
            <path d="M30 5 H35 V10" />
          </svg>
        );

      case "eye":
      case "vision":
        return (
          <svg
            className="h-8 w-8 text-[#0D381E] drop-shadow-sm"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 20 C10 11 30 11 36 20 C30 29 10 29 4 20 Z" />
            <circle cx="20" cy="20" r="5" strokeWidth="2.2" />
            <circle cx="20" cy="20" r="2.5" fill="#0D381E" />
          </svg>
        );

      case "hand-sprout":
      case "sprout":
      case "values":
      case "core-values":
      default:
        return (
          <svg
            className="h-8 w-8 text-white drop-shadow-sm"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Gently cupped hand */}
            <path d="M6 25 C10 23 15 25 18 27 L25 30 C27 30 30 29 32 27 C34 25 33 22 30 21 L22 19 C18 18 16 19 13 21" />
            {/* Seedling stem */}
            <path d="M22 19 V9" />
            {/* Left leaf */}
            <path
              d="M22 14 C18 14 16 11 16 7 C20 7 22 10 22 14 Z"
              fill="white"
              fillOpacity="0.18"
            />
            {/* Right leaf */}
            <path
              d="M22 11 C26 11 28 8 28 4 C24 4 22 7 22 11 Z"
              fill="white"
              fillOpacity="0.18"
            />
          </svg>
        );
    }
  };

  return (
    <section
      id={data?.sectionId || "mission-vision"}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAFDF8] to-[#EDF6EB]/60 pt-10 pb-0 font-sans sm:pt-14 lg:pt-16"
    >
      {/* Central soft sunlit ambient radial gradient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(245,184,0,0.06),transparent_65%)] z-0"
        aria-hidden="true"
      />

      {/* Decorative botanical leaves at Top-Left */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 select-none opacity-25 sm:opacity-35"
        aria-hidden="true"
      >
        <svg
          className="h-40 w-40 text-[#4E8F59] sm:h-56 sm:w-56"
          viewBox="0 0 160 160"
          fill="currentColor"
        >
          <path d="M10 20 C50 20 80 50 90 90 C50 90 20 60 10 20 Z" />
          <path
            d="M15 50 C60 60 95 100 110 145 C65 140 30 105 15 50 Z"
            opacity="0.8"
          />
          <path
            d="M45 15 C85 35 125 75 140 120 C95 110 60 70 45 15 Z"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Decorative botanical leaves at Top-Right */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-0 select-none opacity-25 sm:opacity-35"
        aria-hidden="true"
      >
        <svg
          className="h-40 w-40 scale-x-[-1] text-[#4E8F59] sm:h-56 sm:w-56"
          viewBox="0 0 160 160"
          fill="currentColor"
        >
          <path d="M10 20 C50 20 80 50 90 90 C50 90 20 60 10 20 Z" />
          <path
            d="M15 50 C60 60 95 100 110 145 C65 140 30 105 15 50 Z"
            opacity="0.8"
          />
          <path
            d="M45 15 C85 35 125 75 140 120 C95 110 60 70 45 15 Z"
            opacity="0.6"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Gradient Title & Accent Lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          {/* Top emblem: two gradient yellow lines flanking central sprout */}
          <div className="mb-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="inline-block h-[2.5px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-[#F5B800] to-[#E59800]" />

            <svg
              viewBox="0 0 38 28"
              className="h-6 w-8 sm:h-7 sm:w-9 drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 24C6 16 12 8 18 10C16 18 12 23 10 24Z"
                fill="#15803D"
              />
              <path
                d="M28 24C32 16 26 8 20 10C22 18 26 23 28 24Z"
                fill="#15803D"
              />
              <path
                d="M19 4C16 8 17 15 19 17C21 15 22 8 19 4Z"
                fill="#F5B800"
              />
            </svg>

            <span className="inline-block h-[2.5px] w-12 sm:w-16 rounded-full bg-gradient-to-l from-[#F5B800] to-[#E59800]" />
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-[42px] leading-tight">
            <span className="text-[#0D381E]">Our </span>
            <span className="bg-gradient-to-r from-[#125B2A] via-[#1B7938] to-[#2E8B42] bg-clip-text text-transparent">
              Mission & Vision
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#556358] sm:text-[15.5px]">
            {data?.subtitle ||
              "We are dedicated to promoting sustainable agriculture by delivering fresh, organic and natural farm products for a healthier future."}
          </p>
        </motion.div>

        {/* 3 Mission, Vision & Values Cards with Rich Vertical Gradients */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 sm:gap-6 lg:gap-7">
          {cards.map((card, idx) => {
            const iconKey = (card.icon || "").toLowerCase();
            const isVision =
              card.highlighted ||
              card.accentColor === "yellow" ||
              iconKey === "eye" ||
              iconKey === "vision";

            return (
              <motion.div
                key={card.id || idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border p-6 sm:p-7 transition-all duration-300 ${
                  isVision
                    ? "border-[#FCE4B8] bg-gradient-to-b from-[#FFFDF7] via-[#FEF8EB] to-[#FCEAC2] shadow-[0_4px_22px_rgba(245,184,0,0.08)] hover:shadow-[0_10px_30px_rgba(245,184,0,0.16)]"
                    : "border-[#D8EBD5] bg-gradient-to-b from-[#F7FCF6] via-[#EEF7EC] to-[#E1F1DF] shadow-[0_4px_22px_rgba(18,86,43,0.05)] hover:shadow-[0_10px_30px_rgba(18,86,43,0.12)]"
                }`}
              >
                {/* Subtle Botanical 3-Leaf Watermark with Gradient Opacity */}
                <div
                  className="pointer-events-none absolute bottom-0 right-0 z-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <svg
                    className={`h-24 w-24 translate-x-3 translate-y-3 ${
                      isVision ? "text-[#F5B800]/30" : "text-[#58A560]/30"
                    }`}
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    {/* Leaf 1 (center) */}
                    <path d="M75 75 C60 55 45 35 50 15 C68 28 72 52 75 75 Z" />
                    {/* Leaf 2 (left) */}
                    <path d="M75 75 C50 65 30 55 15 35 C38 32 60 48 75 75 Z" />
                    {/* Leaf 3 (right) */}
                    <path d="M75 75 C68 52 60 35 70 20 C78 38 78 58 75 75 Z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Card Header with 3D Gradient Icon Circle and Underlined Title */}
                  <div className="mb-4 flex items-center gap-4 sm:mb-5 sm:gap-4.5">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
                          isVision
                            ? "bg-gradient-to-br from-[#FFCA38] via-[#FFB900] to-[#E59A00] shadow-[0_4px_14px_rgba(255,185,0,0.3)]"
                            : "bg-gradient-to-br from-[#248D42] via-[#1B6F35] to-[#125326] shadow-[0_4px_14px_rgba(27,111,53,0.3)]"
                        }`}
                      >
                        {getCardIcon(card.icon || "")}
                      </div>

                      {/* Small overlapping contrast accent dot with gradient */}
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 sm:h-4.5 sm:w-4.5 rounded-full border-2 ${
                          isVision
                            ? "bg-gradient-to-br from-[#248D42] to-[#125326] border-[#FEF8EB]"
                            : "bg-gradient-to-br from-[#FFCA38] to-[#E59A00] border-[#EEF7EC]"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-black leading-tight tracking-tight text-[#0D381E] sm:text-xl">
                        {card.title}
                      </h3>
                      {/* Gradient underline */}
                      <div className="mt-2 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#F5B800] via-[#F7C02B] to-[#E59A00]" />
                    </div>
                  </div>

                  {/* Card Description */}
                  <p
                    className={`relative z-10 text-sm leading-[1.65] font-normal sm:text-[14.5px] ${
                      isVision ? "text-[#555243]" : "text-[#4A5E4E]"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Wave Ribbons & Lush Crop Field Banner with Dual Gradient Ribbons */}
      <div className="relative w-full h-24 sm:h-28 lg:h-32 mt-12 sm:mt-16 overflow-hidden">
        {/* Lush green crop field photograph */}
        <Image
          src="/images/mission_crop_field.jpg"
          alt="Lush green organic crop fields"
          fill
          sizes="100vw"
          priority
          className="object-cover object-bottom"
        />

        {/* Sunlight atmospheric depth overlay on crop field */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />

        {/* Smooth organic mask for the top contour */}
        <svg
          className="absolute top-0 left-0 w-full h-8 sm:h-10 text-[#EDF6EB]/60 sm:text-[#EDF6EB]/40"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 0C340 38 660 12 960 30S1390 18 1440 0V0H0Z" />
        </svg>

        {/* Dynamic Dual Gradient Wave Ribbons across the top of the crop field */}
        <svg
          className="absolute top-0.5 sm:top-1 left-0 w-full h-8 sm:h-10 pointer-events-none"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="yellowWaveGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#F5B800" />
              <stop offset="50%" stopColor="#FFD043" />
              <stop offset="100%" stopColor="#E59800" />
            </linearGradient>

            <linearGradient
              id="greenWaveGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#1E823E" />
              <stop offset="50%" stopColor="#155D28" />
              <stop offset="100%" stopColor="#0B3E19" />
            </linearGradient>
          </defs>

          {/* Vibrant golden-yellow wave ribbon with linear gradient */}
          <path
            d="M0 8C340 38 660 12 960 30S1390 18 1440 6"
            stroke="url(#yellowWaveGrad)"
            strokeWidth="4"
          />
          {/* Deep forest green wave ribbon with linear gradient */}
          <path
            d="M0 14C360 42 680 18 980 34S1400 24 1440 12"
            stroke="url(#greenWaveGrad)"
            strokeWidth="3"
            opacity="0.95"
          />
        </svg>
      </div>
    </section>
  );
}
