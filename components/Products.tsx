"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Leaf, Apple, Wheat, Milk, Carrot } from "lucide-react";
import { ProductsData } from "@/types";

interface ProductsProps {
  data: ProductsData;
}

export default function Products({ data }: ProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemWidth = () => {
    if (!scrollRef.current) return 0;
    // Find the first actual product card div
    const firstItem = scrollRef.current.querySelector('.product-card-wrapper') as HTMLElement;
    return firstItem ? firstItem.clientWidth + 24 : 0; // +24 for gap-6
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = getItemWidth();
      if (width > 0) {
        const newIndex = Math.round(scrollPosition / width);
        setCurrentIndex(newIndex);
      }
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -getItemWidth(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: getItemWidth(), behavior: 'smooth' });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: getItemWidth() * index, behavior: 'smooth' });
    }
  };

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("vegetable")) return <Carrot className="w-6 h-6 text-[#0A2F1D]" />;
    if (lowerTitle.includes("fruit")) return <Apple className="w-6 h-6 text-[#0A2F1D]" />;
    if (lowerTitle.includes("grain") || lowerTitle.includes("pulse")) return <Wheat className="w-6 h-6 text-[#0A2F1D]" />;
    if (lowerTitle.includes("dairy") || lowerTitle.includes("milk")) return <Milk className="w-6 h-6 text-[#0A2F1D]" />;
    return <Leaf className="w-6 h-6 text-[#0A2F1D]" />;
  };

  const renderTitle = (title: string) => {
    if (title.includes("Straight From Our Fields")) {
      const parts = title.split("Straight From Our Fields");
      return (
        <>
          {parts[0]} <br className="hidden sm:block" />
          <span className="text-[#166534] relative inline-block">
            Straight From Our Fields
            <div className="absolute -bottom-1 left-1/4 right-1/4 h-[3px] bg-[#F2C94C] rounded-full"></div>
          </span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section id="products" className="w-full py-20 sm:py-28 bg-[#fcfdfa] relative overflow-hidden animate-fadeIn font-sans">
      
      {/* Header Section */}
      <div className="w-full text-center mb-16 animate-fadeUp relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide bg-white text-[#166534] border border-[#166534]/20 shadow-sm mb-6">
          <Leaf className="w-4 h-4 text-[#166534]" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] text-gray-900 mb-6">
          {renderTitle(data.title)}
        </h2>
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-gray-600 max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      {/* Carousel Section */}
      <div className="w-full relative max-w-[1500px] mx-auto">
        
        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          aria-label="Previous product"
          className="absolute left-2 sm:left-4 lg:left-8 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#114227] active:scale-95 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <button
          onClick={scrollRight}
          aria-label="Next product"
          className="absolute right-2 sm:right-4 lg:right-8 top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#114227] active:scale-95 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 sm:px-12 md:px-20 lg:px-28 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Inject style to hide scrollbar for webkit as well */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />

          {data.items.map((prod) => (
            <div
              key={prod.id}
              className="product-card-wrapper snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="group bg-white rounded-[24px] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                
                {/* Image Box */}
                <div className="relative h-56 w-full bg-gray-100 shrink-0 overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Faded overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Icon Badge */}
                <div className="absolute top-[200px] left-6 w-12 h-12 rounded-full bg-[#F2C94C] text-[#0A2F1D] flex items-center justify-center shadow-lg border-[3px] border-white z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {getIcon(prod.title)}
                </div>

                {/* Content */}
                <div className="p-6 pt-10 flex-1 flex flex-col bg-white">
                  <h3 className="font-extrabold text-xl text-gray-900 mb-2 group-hover:text-[#166534] transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-6 line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="mt-auto">
                    <button
                      type="button"
                      className="inline-flex items-center gap-3 bg-[#F2C94C] hover:bg-[#e6bb3b] text-[#0A2F1D] font-bold text-[13px] uppercase tracking-wide px-4 py-2 pr-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group/btn w-fit"
                    >
                      <span className="ml-2">View Details</span>
                      <div className="w-8 h-8 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center transform group-hover/btn:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-2">
          {data.items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-[#F2C94C]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
