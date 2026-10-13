"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { GalleryData, GalleryItem } from "@/types";
import { galleryData as defaultGalleryData } from "@/data";

interface GalleryProps {
  data?: GalleryData;
}

export default function Gallery({ data = defaultGalleryData }: GalleryProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = data?.categories ?? [
    "All Projects",
    "Organic",
    "Farms",
    "Harvest",
    "Vegetable",
    "Fruit",
    "Cattle",
  ];

  const allItems = data?.items ?? [];

  const filteredItems =
    activeCategory === "All Projects"
      ? allItems
      : allItems.filter(
          (item) =>
            item.category === activeCategory ||
            item.categories?.includes(activeCategory)
        );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const openModal = (item: GalleryItem) => {
    const index = filteredItems.findIndex((f) => f.id === item.id);
    setModalIndex(index >= 0 ? index : 0);
  };

  const closeModal = () => {
    setModalIndex(null);
  };

  const showPrev = useCallback(() => {
    if (modalIndex === null || filteredItems.length === 0) return;
    setModalIndex(
      (modalIndex - 1 + filteredItems.length) % filteredItems.length
    );
  }, [modalIndex, filteredItems.length]);

  const showNext = useCallback(() => {
    if (modalIndex === null || filteredItems.length === 0) return;
    setModalIndex((modalIndex + 1) % filteredItems.length);
  }, [modalIndex, filteredItems.length]);

  useEffect(() => {
    if (modalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIndex, showPrev, showNext]);

  const activeItem = modalIndex !== null ? filteredItems[modalIndex] : null;

  return (
    <section
      ref={sectionRef}
      id={data?.sectionId || "gallery"}
      className="w-full overflow-hidden bg-white py-2 pb-20"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-[2px] w-12 sm:w-16 rounded-full bg-[#E5B83B]" />
            <svg
              className="h-8 w-8 sm:h-9 sm:w-9"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3.5C16 3.5 12 9.5 12 14.5C12 16.71 13.79 18.5 16 18.5C18.21 18.5 20 16.71 20 14.5C20 9.5 16 3.5 16 3.5Z"
                fill="#F2C94C"
              />
              <path
                d="M13 18C7.5 18 3 13 3 7C8.5 7 13.5 11.5 14 17"
                fill="#166534"
              />
              <path
                d="M19 18C24.5 18 29 13 29 7C23.5 7 18.5 11.5 18 17"
                fill="#166534"
              />
            </svg>
            <span className="h-[2px] w-12 sm:w-16 rounded-full bg-[#E5B83B]" />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#16532D] sm:text-5xl lg:text-[52px]">
            {data?.title || "Our Gallery"}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            {data?.subtitle ||
              "Explore the moments from our farms, organic produce, farming activities and community engagements."}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3">
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-2.5 sm:text-base ${
                    isSelected
                      ? "scale-105 bg-[#16532D] text-white shadow-md ring-2 ring-[#16532D] ring-offset-2"
                      : "bg-[#F2F6EF] text-[#2D4A3E] hover:bg-[#E5EFE1] hover:text-[#16532D]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="group relative aspect-[1.22] w-full cursor-pointer overflow-hidden rounded-[24px] bg-[#EEF5EC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-[26px]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/75" />

              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                <span className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#166534] shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Maximize2 className="h-6 w-6" strokeWidth={2.2} />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-6">
                <div className="min-w-0 pr-3">
                  <h3 className="truncate text-lg font-bold drop-shadow-md sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-white/85 sm:text-sm">
                    {item.alt}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md sm:text-sm">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 px-4 sm:mt-16">
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#16532D] shadow-sm transition-all hover:border-[#166534] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Go to page ${pageNum}`}
              aria-current={currentPage === pageNum ? "page" : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all sm:text-base ${
                currentPage === pageNum
                  ? "scale-105 bg-[#16532D] text-white shadow-md ring-2 ring-[#16532D] ring-offset-2"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-[#16532D] hover:bg-gray-50 hover:text-[#16532D]"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#16532D] shadow-sm transition-all hover:border-[#166534] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {modalIndex !== null && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            aria-label="Close popup"
            onClick={closeModal}
            className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:scale-105 hover:bg-white/30 sm:right-6 sm:top-6 sm:h-14 sm:w-14"
          >
            <X className="h-7 w-7" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white shadow-lg transition-all hover:scale-110 hover:bg-white/30 sm:left-6 sm:h-14 sm:w-14"
          >
            <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white shadow-lg transition-all hover:scale-110 hover:bg-white/30 sm:right-6 sm:h-14 sm:w-14"
          >
            <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-[1100px] flex-col items-center overflow-hidden rounded-[24px] bg-[#0c1f14] shadow-2xl"
          >
            <div className="relative aspect-[4/3] max-h-[75vh] w-full min-w-[300px] overflow-hidden bg-black sm:min-w-[600px] md:min-w-[800px]">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <div className="flex w-full items-center justify-between border-t border-white/10 bg-[#0F3D22] px-6 py-4 text-white">
              <div>
                <span className="rounded-full bg-[#FFD60A] px-2.5 py-0.5 text-xs font-bold text-[#0F3D22]">
                  {activeItem.category}
                </span>
                <h4 className="mt-1 text-base font-bold sm:text-lg">
                  {activeItem.title}
                </h4>
              </div>

              <div className="text-right text-xs font-medium text-white/70 sm:text-sm">
                <span>
                  {modalIndex + 1} / {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
