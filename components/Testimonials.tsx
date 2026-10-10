"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { TestimonialsData } from "@/types";

interface TestimonialsProps {
  data: TestimonialsData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevReview = () => {
    setActiveIdx((prev) => (prev === 0 ? data.items.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIdx((prev) => (prev === data.items.length - 1 ? 0 : prev + 1));
  };

  const current = data.items[activeIdx];

  return (
    <section id="testimonials" className="w-full py-16 sm:py-24 bg-zinc-50 relative px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5 relative w-full animate-fadeUp">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
            <Image
              src={data.farmerImage}
              alt="Happy farmer with harvest basket"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-emerald-100 flex items-center gap-3 transform group-hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5 animate-bounceGentle" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-emerald-800">
                  Trusted by 2,700+ Clients
                </div>
                <div className="text-sm font-extrabold text-gray-900">
                  Pure Quality You Can Taste
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 w-full animate-fadeUp">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-50 text-[#166534] border border-emerald-200/60">
            <Sprout className="w-3.5 h-3.5 text-emerald-600 animate-bounceGentle" />
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.15]">
            What Our <span className="text-[#166534]">Clients</span> Say?
          </h2>

          <div
            key={activeIdx}
            className="relative bg-white rounded-3xl p-7 sm:p-10 shadow-xl border border-gray-200/80 w-full animate-fadeIn"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 fill-current" />
            </div>

            <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed mb-6">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-emerald-200">
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-base">
                    {current.author}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {current.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {data.items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIdx === idx
                        ? "w-7 bg-[#166534]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="p-2 rounded-full border border-gray-200 hover:bg-[#166534] hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="p-2 rounded-full border border-gray-200 hover:bg-[#166534] hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
