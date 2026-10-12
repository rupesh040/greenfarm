"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Leaf } from "lucide-react";
import { BlogData } from "@/types";
import { blogData as defaultBlogData } from "@/data";

interface BlogProps {
  data?: BlogData;
}

export default function Blog({ data = defaultBlogData }: BlogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemWidth = () => {
    if (!scrollRef.current) return 0;
    const firstItem = scrollRef.current.querySelector('.blog-card-wrapper') as HTMLElement;
    return firstItem ? firstItem.clientWidth + 32 : 0; 
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

  const renderTitle = (title: string) => {
    const highlight = data.highlightText || "Articles";
    if (title.includes(highlight)) {
      const parts = title.split(highlight);
      return (
        <>
          {parts[0]} <span className="text-[#166534]">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section id="blog" className="w-full py-10 bg-[#fcfdfa] relative overflow-hidden animate-fadeIn font-sans">
      
      
      <div className="absolute -top-20 -right-20 w-72 h-72 opacity-60 pointer-events-none z-0 hidden lg:block transform rotate-12 mix-blend-multiply">
        <Image src="/images/blog_leaf.jpg" alt="Leaf Decoration" fill className="object-contain filter blur-[2px]" />
      </div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 opacity-60 pointer-events-none z-0 hidden lg:block transform -rotate-45 mix-blend-multiply">
        <Image src="/images/blog_leaf.jpg" alt="Leaf Decoration" fill className="object-contain filter blur-[1px]" />
      </div>
      <div className="absolute -bottom-20 -right-10 w-64 h-64 opacity-50 pointer-events-none z-0 hidden lg:block transform rotate-[120deg] mix-blend-multiply">
        <Image src="/images/blog_leaf.jpg" alt="Leaf Decoration" fill className="object-contain filter blur-[3px]" />
      </div>

      
      <div className="absolute top-24 right-48 w-12 h-12 text-[#F2C94C] opacity-80 hidden xl:block z-0 transform -rotate-12">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M10,50 Q50,10 90,50 Q50,90 10,50 Z" />
        </svg>
      </div>
      <div className="absolute top-12 right-36 w-8 h-8 text-[#F2C94C] opacity-60 hidden xl:block z-0 transform rotate-45">
         <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" />
        </svg>
      </div>

      <div className="w-full text-center mb-16 animate-fadeUp relative z-10 px-4">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#166534]/30 hidden sm:block"></div>
          <div className="inline-flex items-center gap-1.5 text-sm font-bold tracking-wide text-[#166534]">
            <Leaf className="w-4 h-4" />
            <span>{data.badge}</span>
          </div>
          <div className="w-12 h-[1px] bg-[#166534]/30 hidden sm:block"></div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] text-gray-900 mb-5">
          {renderTitle(data.title)}
        </h2>
        
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-gray-600 max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      
      <div className="w-full relative max-w-[1500px] mx-auto z-10">
        
        
        <button
          onClick={scrollLeft}
          aria-label="Previous blog"
          className="absolute left-2 sm:left-4 lg:left-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#114227] active:scale-95 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <button
          onClick={scrollRight}
          aria-label="Next blog"
          className="absolute right-2 sm:right-4 lg:right-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#114227] active:scale-95 transition-all cursor-pointer hidden md:flex"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-4 px-4 sm:px-12 md:px-20 lg:px-28 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />

          {data.items.map((post) => (
            <article
              key={post.id}
              className="blog-card-wrapper snap-start shrink-0 w-[85vw] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21px)]"
            >
              <div className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative">
                
                
                <div className="relative h-60 w-full overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-sm text-center min-w-[56px] border border-gray-100">
                    <span className="block text-[22px] font-black text-[#0A2F1D] leading-none mb-1">
                      {post.date.split(" ")[0]}
                    </span>
                    <span className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                      {post.date.split(" ")[1]} 2025
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-7 flex-1 flex flex-col bg-white">
                  
                  <div className="mb-4">
                    <span className="inline-flex text-[#D97706] bg-[#FEF3C7] border border-[#FDE68A] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-[22px] text-gray-900 group-hover:text-[#166534] transition-colors leading-[1.3] mb-3">
                    {post.title}
                  </h3>

                  <p className="text-[15px] text-gray-500 leading-relaxed line-clamp-3 mb-6">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-2">
                    <a
                      href={post.href}
                      className="inline-flex items-center gap-3 bg-[#F2C94C] hover:bg-[#e6bb3b] text-[#0A2F1D] font-bold text-[13px] uppercase tracking-wide px-4 py-2 pr-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group/btn w-fit"
                    >
                      <span className="ml-2">Read More</span>
                      <div className="w-8 h-8 rounded-full bg-[#0A2F1D] text-white flex items-center justify-center transform group-hover/btn:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        
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
        
        
        <div className="absolute right-4 sm:right-12 lg:right-28 -bottom-4 lg:-bottom-2 z-20">
          <a
             href="#blog"
             className="inline-flex items-center gap-3 bg-[#0A2F1D] hover:bg-[#114227] text-white font-bold text-[13px] uppercase tracking-wide px-4 py-2 pr-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
           >
             <span className="ml-2">View All Blogs</span>
             <div className="w-8 h-8 rounded-full bg-white text-[#0A2F1D] flex items-center justify-center transform group-hover/btn:translate-x-1 transition-transform">
               <ArrowRight className="w-4 h-4" />
             </div>
           </a>
        </div>
      </div>
    </section>
  );
}
