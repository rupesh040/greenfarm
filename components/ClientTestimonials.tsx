"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialsData } from "@/types";
import { testimonialsData as defaultTestimonialsData } from "@/data";

interface ClientTestimonialsProps {
  data?: TestimonialsData;
}

export default function ClientTestimonials({
  data = defaultTestimonialsData,
}: ClientTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = data.items ?? [];
  const totalItems = items.length;

  const current = items[currentIndex] || items[0];

  const handleNext = useCallback(() => {
    if (!totalItems) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    if (!totalItems) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (isPaused || totalItems <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, totalItems, handleNext]);

  if (!items.length || !current) {
    return null;
  }

  const farmerPhoto = data.farmerImage || "/images/farmer_harvest.jpg";

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#FDFEFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden font-sans"
    >
   
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-[#EAF5E4]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full bg-[#FEF6DB]/50 blur-3xl" />

      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center self-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] aspect-[1/1.05]">
              <div
                className="absolute -top-3.5 -left-3.5 sm:-top-5 sm:-left-5 w-[76%] h-[76%] rounded-[28px] sm:rounded-[36px] bg-[#F5B800] z-0"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-3.5 -right-3.5 sm:-bottom-5 sm:-right-5 w-[76%] h-[76%] rounded-[28px] sm:rounded-[36px] bg-[#0E3822] z-0"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -left-7 sm:-left-9 top-[38%] z-20 flex flex-col gap-2.5 opacity-85"
                aria-hidden="true"
              >
                <div className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                </div>
                <div className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                </div>
                <div className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                </div>
                <div className="flex gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                </div>
              </div>

              <div
                className="pointer-events-none absolute -left-8 sm:-left-12 top-[16%] z-30 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md"
                aria-hidden="true"
              >
                <Image
                  src="/images/leaf.png"
                  alt=""
                  width={80}
                  height={80}
                  className="-rotate-45 select-none"
                  draggable={false}
                />
              </div>

              <div
                className="pointer-events-none absolute -right-6 sm:-right-8 -bottom-4 z-30 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md"
                aria-hidden="true"
              >
                <Image
                  src="/images/leaf.png"
                  alt=""
                  width={80}
                  height={80}
                  className="rotate-[75deg] select-none"
                  draggable={false}
                />
              </div>

              <div className="relative z-10 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border-[5px] sm:border-[6px] border-white shadow-[0_16px_40px_rgba(14,56,34,0.18)] bg-white">
                <Image
                  src={farmerPhoto}
                  alt="Farmer Harvest Testimonial"
                  fill
                  priority
                  sizes="(max-width: 640px) 380px, (max-width: 1024px) 420px, 440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-7 flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#1B6834] fill-[#1B6834]" />
                <span className="text-[#1B6834] font-bold text-sm sm:text-base tracking-wide">
                  {data.badge || "Testimonials"}
                </span>
              </div>
              <span className="h-[2px] w-12 sm:w-16 bg-[#F5B800] rounded-full inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-[#0C2A18] tracking-tight leading-[1.18] mb-6 sm:mb-8">
              What Our{" "}
              <span className="text-[#157A3A]">Clients Say?</span>
            </h2>

            <div className="relative flex items-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="absolute -left-3 sm:-left-5 lg:-left-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-[#157A3A] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-gray-100/90 transition-all duration-300 hover:scale-105 hover:bg-[#157A3A] hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

  
              <div className="relative w-full rounded-[24px] sm:rounded-[30px] bg-white p-7 sm:p-9 md:p-10 shadow-[0_12px_45px_rgba(14,56,34,0.06)] border border-[#EFF5EC] overflow-hidden min-h-[310px] sm:min-h-[300px] flex flex-col justify-between">
                <svg
                  className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-[#22723A]/10"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M50 0 C70 20 85 45 80 75 C65 75 40 60 25 40 C35 25 45 10 50 0 Z" />
                  <path d="M80 75 C70 85 55 90 40 85 C45 70 55 55 70 45 C75 55 80 65 80 75 Z" opacity="0.7" />
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="mb-5 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#FFF9E6] text-[#F5B800] shadow-sm">
                        <span className="font-serif text-3xl sm:text-4xl font-extrabold leading-none mt-2">
                          “
                        </span>
                      </div>

              
                      <p className="text-[15px] sm:text-[16.5px] leading-relaxed sm:leading-[1.78] text-[#4A5568] font-normal mb-6 sm:mb-8">
                        {current.quote}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-5 pt-3">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-full overflow-hidden border-2 border-[#F5B800] shadow-sm bg-gray-100">
                        <Image
                          src={current.avatar || farmerPhoto}
                          alt={current.author}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-[#0C2A18] tracking-tight">
                            {current.author}
                          </h3>
                          <div className="flex items-center gap-1 text-[#F5B800]">
                            {Array.from({ length: current.rating || 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-current text-[#F5B800]"
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                          {current.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="absolute -right-3 sm:-right-5 lg:-right-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-[#157A3A] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-gray-100/90 transition-all duration-300 hover:scale-105 hover:bg-[#157A3A] hover:text-white active:scale-95"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
            {totalItems > 1 && (
              <div className="mt-7 flex items-center justify-center gap-2.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === idx
                        ? "w-6 h-2.5 bg-[#F5B800] shadow-sm"
                        : "w-2.5 h-2.5 bg-[#D7E6D7] hover:bg-[#A8CCA8]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
