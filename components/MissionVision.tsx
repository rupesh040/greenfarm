
"use client";

import React from "react";
import Image from "next/image";
import { Target, Eye } from "lucide-react";
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
    const iconClass = "h-7 w-7 sm:h-8 sm:w-8";

    switch (iconName.toLowerCase()) {
      case "target":
      case "mission":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 40 40"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="18" cy="22" r="12" />
            <circle cx="18" cy="22" r="7" />
            <circle cx="18" cy="22" r="2" />
            <path d="M18 22 31 9" />
            <path d="M25 9h6v6" />
            <path d="M27 7h6v6" />
          </svg>
        );

      case "eye":
      case "vision":
        return (
          <Eye
            className={`${iconClass} text-[#0D331A]`}
            strokeWidth={2.2}
          />
        );

      case "hand-sprout":
      case "sprout":
      case "values":
      case "core-values":
      default:
        return (
          <svg
            className={iconClass}
            viewBox="0 0 40 40"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 23h7l5 4h8l8-5c2-1 4 0 3 2l-10 8H15L9 29H4" />
            <path d="M20 22V12" />
            <path d="M20 17c-5 0-8-3-8-8 5 0 8 3 8 8Z" />
            <path d="M20 14c0-5 3-8 8-8 0 5-3 8-8 8Z" />
            <path d="M20 22c-4-2-6-5-6-9" />
            <path d="M20 22c4-2 6-5 6-9" />
          </svg>
        );
    }
  };

  return (
    <section
      id={data?.sectionId || "mission-vision"}
      className="relative w-full overflow-hidden bg-[#FCFDF9] pt-4 pb-28 font-sans sm:pt-8 sm:pb-32 lg:pt-8 lg:pb-36"
    >
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 opacity-20 sm:top-2 sm:opacity-30"
        aria-hidden="true"
      >
        <svg
          className="h-36 w-36 text-[#2E7D32] sm:h-52 sm:w-52"
          viewBox="0 0 160 160"
          fill="currentColor"
        >
          <path d="M30 140C10 100 20 50 70 20C60 60 70 110 30 140Z" />
          <path
            d="M70 20C100 40 120 80 100 130C85 95 65 60 70 20Z"
            opacity="0.75"
          />
          <path
            d="M70 20C90 70 80 120 30 140"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 z-0 opacity-20 sm:top-2 sm:opacity-30"
        aria-hidden="true"
      >
        <svg
          className="h-36 w-36 scale-x-[-1] text-[#2E7D32] sm:h-52 sm:w-52"
          viewBox="0 0 160 160"
          fill="currentColor"
        >
          <path d="M30 140C10 100 20 50 70 20C60 60 70 110 30 140Z" />
          <path
            d="M70 20C100 40 120 80 100 130C85 95 65 60 70 20Z"
            opacity="0.75"
          />
          <path
            d="M70 20C90 70 80 120 30 140"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
        >
          <div className="mb-2 flex items-center justify-center gap-3 sm:gap-4">
            <span className="inline-block h-[2.5px] w-10 rounded-full bg-[#F5B800] sm:w-14" />

            <svg
              viewBox="0 0 38 28"
              className="h-7 w-9"
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

            <span className="inline-block h-[2.5px] w-10 rounded-full bg-[#F5B800] sm:w-14" />
          </div>

          <h2 className="text-3xl font-black leading-[1.18] tracking-tight text-[#0D331A] sm:text-4xl lg:text-[44px]">
            {data?.title || "Our Mission & Vision"}
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-3 sm:text-base">
            {data?.subtitle ||
              "We are dedicated to promoting sustainable agriculture by delivering fresh, organic and natural farm products for a healthier future."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 sm:gap-6 lg:gap-5">
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border p-5 transition-all duration-300 sm:rounded-[24px] sm:p-6 lg:p-6 ${
                  isVision
                    ? "border-[#FDEECC] bg-[#FEF7EA] shadow-[0_8px_24px_rgba(245,184,0,0.08)] hover:shadow-[0_14px_32px_rgba(245,184,0,0.15)]"
                    : "border-[#DCEFD6] bg-[#EEF6EB]/90 shadow-[0_8px_24px_rgba(18,86,43,0.04)] hover:shadow-[0_14px_32px_rgba(18,86,43,0.1)]"
                }`}
              >
                <div
                  className="pointer-events-none absolute -bottom-4 -right-4 z-0"
                  aria-hidden="true"
                >
                  <svg
                    className={`h-24 w-24 sm:h-28 sm:w-28 ${
                      isVision
                        ? "text-[#F5B800]/20"
                        : "text-[#15803D]/15"
                    }`}
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <path d="M40 90C15 70 10 35 45 15C45 45 60 75 40 90Z" />
                    <path
                      d="M45 15C70 30 85 60 70 90C60 70 45 45 45 15Z"
                      opacity="0.8"
                    />
                    <path
                      d="M45 20C48 45 55 65 70 90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-4 sm:mb-5 sm:gap-5">
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-[60px] w-[60px] items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:h-[68px] sm:w-[68px] ${
                          isVision ? "bg-[#FFB900]" : "bg-[#287C28]"
                        }`}
                      >
                        {getCardIcon(card.icon || "")}
                      </div>

                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-2 border-white ${
                          isVision ? "bg-[#287C28]" : "bg-[#FFB900]"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold leading-tight tracking-tight text-[#0D331A] sm:text-xl">
                        {card.title}
                      </h3>
                      <div className="mt-2 h-[3px] w-10 rounded-full bg-[#FFB900]" />
                    </div>
                  </div>

                  <p className="relative z-10 text-sm leading-[1.6] text-[#4A5568] sm:text-[14px] sm:leading-[1.65]">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 overflow-hidden sm:h-32 lg:h-36">
        <Image
          src={data?.fieldBannerImage || "/images/organic_field_banner.jpg"}
          alt="Organic crop fields"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          style={{
            maskImage:
              "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
          }}
        />

        <svg
          className="absolute left-0 top-0 h-8 w-full text-[#FCFDF9] sm:h-10"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 0C320 45 620 10 940 35S1380 20 1440 0V0H0Z" />
        </svg>

        <svg
          className="absolute left-0 top-1 h-8 w-full sm:top-2 sm:h-10"
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 8C340 38 660 12 960 30S1390 18 1440 6"
            stroke="#F5B800"
            strokeWidth="3.5"
          />
          <path
            d="M0 14C360 42 680 18 980 34S1400 24 1440 12"
            stroke="#12562B"
            strokeWidth="2.5"
            opacity="0.8"
          />
        </svg>
      </div>
    </section>
  );
}
