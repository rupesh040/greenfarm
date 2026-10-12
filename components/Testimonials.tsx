"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialsData } from "@/types";
import { testimonialsData as defaultTestimonialsData } from "@/data";

interface TestimonialsProps {
  data?: TestimonialsData;
}

export default function Testimonials({
  data = defaultTestimonialsData,
}: TestimonialsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const items = data.items ?? [];
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  if (!items.length) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#FCFDF9] py-4 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[2px] w-10 sm:w-16 bg-[#E5B83B] rounded-full inline-block" />
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 40 32"
                className="w-9 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 26C7 18 13 11 19 13C17 20 13 25 10 26Z"
                  fill="#1B4D36"
                />
                <path
                  d="M30 26C33 18 27 11 21 13C23 20 27 25 30 26Z"
                  fill="#1B4D36"
                />
                <path
                  d="M20 4C17 9 18 17 20 19C22 17 23 9 20 4Z"
                  fill="#E5B83B"
                />
              </svg>
            </div>
            <span className="h-[2px] w-10 sm:w-16 bg-[#E5B83B] rounded-full inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#12482C] tracking-tight">
            {data.title || "What Our Customers Say"}
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {data.subtitle ||
              "Our farmers and customers trust us for high-quality organic products, better farming practices and long-term support for a healthier tomorrow."}
          </p>

          <div className="w-14 h-1 bg-[#E5B83B] rounded-full mx-auto mt-4" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shrink-0 ring-2 ring-[#E5B83B] ring-offset-2 ring-offset-white bg-[#F3F4F6]">
                        <Image
                          src={item.avatar}
                          alt={item.author}
                          fill
                          sizes="(max-width: 640px) 64px, 72px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                            {item.author}
                          </h3>
                          <div className="flex items-center gap-0.5 text-[#F2C94C]">
                            {Array.from({ length: item.rating || 5 }).map(
                              (_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className="w-4 h-4 fill-current"
                                />
                              ),
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 font-medium mt-1">
                          <MapPin className="w-3.5 h-3.5 text-black fill-black shrink-0" />
                          <span>{item.role}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-[#F2C94C]">
                      <svg
                        viewBox="0 0 36 28"
                        className="w-8 h-8 sm:w-9 sm:h-8"
                        fill="currentColor"
                      >
                        <path d="M6 28C2.5 28 0 25.5 0 22C0 14 6 5 15 0L17 3C10.5 7 8 11.5 7.5 15C8.8 14.5 10.3 14.2 12 14.2C16 14.2 19 17.2 19 21.1C19 25 16 28 12 28H6ZM23 28C19.5 28 17 25.5 17 22C17 14 23 5 32 0L34 3C27.5 7 25 11.5 24.5 15C25.8 14.5 27.3 14.2 29 14.2C33 14.2 36 17.2 36 21.1C36 25 33 28 29 28H23Z" />
                      </svg>
                    </div>
                  </div>

                  {item.headline && (
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-5 leading-snug tracking-tight">
                      {item.headline}
                    </h4>
                  )}

                  <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-[#12482C] hover:text-white hover:border-[#12482C] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm ${
                    isActive
                      ? "bg-[#12482C] text-white border border-[#12482C]"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:bg-[#12482C] hover:text-white hover:border-[#12482C] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
