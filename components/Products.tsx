"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Leaf,
  Apple,
  Wheat,
  Milk,
  Carrot,
} from "lucide-react";
import { ProductsData } from "@/types";
import { productsData as defaultProductsData } from "@/data";

interface ProductsProps {
  data?: ProductsData;
  variant?: "grid" | "carousel";
}

export default function Products({
  data = defaultProductsData,
  variant,
}: ProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const isProductPage = Boolean(
    pathname && (pathname === "/products" || pathname.startsWith("/products")),
  );
  const isGrid = variant === "grid" || (!variant && isProductPage);
  const items = data.items ?? [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = isGrid
    ? items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : items;

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;

    if (!container || isGrid) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(container.scrollLeft < maxScroll - 2);
  }, [isGrid]);

  useEffect(() => {
    if (isGrid) return;

    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    const firstCard = container.querySelector(".product-card-wrapper");
    if (firstCard) {
      resizeObserver.observe(firstCard);
    }

    return () => resizeObserver.disconnect();
  }, [isGrid, updateScrollState]);

  const getItemWidth = () => {
    const container = scrollRef.current;
    if (!container) return 0;

    const firstCard = container.querySelector(
      ".product-card-wrapper",
    ) as HTMLElement | null;

    if (!firstCard) return container.clientWidth;

    const gap =
      parseFloat(window.getComputedStyle(container).columnGap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container || isGrid) return;

    const distance = getItemWidth();
    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const getIcon = (title: string, iconName?: string) => {
    const key = (iconName || title).toLowerCase();
    const iconClass = "h-6 w-6 text-[#0A2F1D]";

    if (key.includes("vegetable") || key.includes("carrot")) {
      return <Carrot className={iconClass} />;
    }

    if (key.includes("fruit") || key.includes("apple")) {
      return <Apple className={iconClass} />;
    }

    if (
      key.includes("grain") ||
      key.includes("pulse") ||
      key.includes("wheat")
    ) {
      return <Wheat className={iconClass} />;
    }

    if (
      key.includes("dairy") ||
      key.includes("milk")
    ) {
      return <Milk className={iconClass} />;
    }

    return <Leaf className={iconClass} />;
  };

  const renderTitle = (title: string) => {
    const highlight = data.highlightText || "";

    if (!highlight || !title.includes(highlight)) {
      return title;
    }

    const highlightIndex = title.indexOf(highlight);
    const before = title.slice(0, highlightIndex);
    const after = title.slice(highlightIndex + highlight.length);

    return (
      <>
        {before}
        {before.trim() && <br className="hidden sm:block" />}
        <span className="relative inline-block text-[#166534]">
          {highlight}
          <span className="absolute -bottom-1 left-1/4 right-1/4 h-[3px] rounded-full bg-[#F2C94C]" />
        </span>
        {after}
      </>
    );
  };

  const viewDetailsLabel = data.buttons?.viewDetails || "View Details";
  const viewAllLabel = data.buttons?.viewAll || "View All Products";
  const prevAriaLabel = data.prevAriaLabel || "Previous product";
  const nextAriaLabel = data.nextAriaLabel || "Next product";

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-[#fcfdfa]  pb-16 font-sans pt-5 sm:pb-20  lg:pb-24"
    >
      <div className="relative z-10 mb-8 px-4 text-center sm:mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#166534]/20 bg-white px-4 py-1.5 text-sm font-bold tracking-wide text-[#166534] shadow-sm">
          {getIcon(data.badgeIcon || "leaf")}
          <span>{data.badge}</span>
        </div>

        <h2 className="mb-4 text-3xl font-extrabold leading-[1.2] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {renderTitle(data.title)}
        </h2>

        <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-gray-600 sm:text-[17px]">
          {data.description}
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[1500px]">
        {!isGrid && (
          <>
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              aria-label={prevAriaLabel}
              className="absolute left-2 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:left-4 sm:h-12 sm:w-12 lg:left-8"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              aria-label={nextAriaLabel}
              className="absolute right-2 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:right-4 sm:h-12 sm:w-12 lg:right-8"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={
            isGrid
              ? "grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
              : "hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-14 pb-8 pt-2 sm:gap-6 sm:px-16 md:px-20 lg:px-28"
          }
          style={
            isGrid
              ? undefined
              : {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
          }
        >
          {paginatedItems.map((prod) => (
            <div
              key={prod.id}
              className={`product-card-wrapper ${
                isGrid
                  ? "w-full"
                  : "w-[calc(100%-8px)] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              }`}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <Link
                  href={`/products/${prod.id}`}
                  className="relative block h-48 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-56"
                >
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {prod.badge && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#166534] shadow-sm backdrop-blur-sm">
                      {prod.badge}
                    </span>
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                </Link>

                <div className="absolute left-5 top-[168px] z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-[#F2C94C] shadow-lg transition-transform duration-300 group-hover:scale-110 sm:left-6 sm:top-[200px]">
                  {getIcon(prod.title, prod.icon)}
                </div>

                <div className="flex flex-1 flex-col bg-white p-5 pt-10 sm:p-6 sm:pt-10">
                  <Link href={`/products/${prod.id}`} className="group/title block">
                    <h3 className="mb-2 text-lg font-extrabold text-gray-900 transition-colors group-hover/title:text-[#166534] sm:text-xl">
                      {prod.title}
                    </h3>
                  </Link>

                  <p className="mb-6 line-clamp-2 text-[15px] leading-relaxed text-gray-500">
                    {prod.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    {prod.price && (
                      <span className="text-base font-bold text-[#166534] sm:text-lg">
                        {prod.price}
                      </span>
                    )}

                    <Link
                      href={`/products/${prod.id}`}
                      className="group/btn ml-auto inline-flex w-fit items-center gap-3 rounded-full bg-[#F2C94C] py-1.5 pl-3 pr-1.5 text-[12px] font-bold uppercase tracking-wide text-[#0A2F1D] shadow-sm transition-all duration-300 hover:bg-[#e6bb3b] hover:shadow-md sm:text-[13px]"
                    >
                      <span className="ml-1">{viewDetailsLabel}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2F1D] text-white transition-transform group-hover/btn:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isGrid && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 px-4 sm:mt-16">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-[#166534] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all ${
                  currentPage === pageNum
                    ? "scale-105 bg-[#166534] text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-[#166534] hover:bg-gray-50"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-[#166534] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {!isProductPage && (
          <div className="mt-10 text-center sm:mt-14">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0A2F1D] py-3.5 pl-7 pr-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#166534] hover:shadow-xl"
            >
              <span>{viewAllLabel}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2C94C] text-[#0A2F1D] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
