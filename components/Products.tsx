"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { productsData as defaultProductsData, slugify } from "@/data";

interface ProductsProps {
  data?: ProductsData;
  variant?: "grid" | "carousel";
}

const LEAF = "/images/leaf.png";
const LEAF_LIGHT = "/images/leaf-light.png";
const FARM_ART = "/images/farm-illustration.png";

type Direction = "left" | "right" | "up" | "down" | "scale";

const hiddenState: Record<Direction, string> = {
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  up: "translate-y-10 opacity-0",
  down: "-translate-y-6 opacity-0",
  scale: "scale-75 opacity-0",
};

const shownState = "translate-x-0 translate-y-0 scale-100 opacity-100";

function Reveal({
  from = "up",
  delay = 0,
  className = "",
  children,
}: {
  from?: Direction;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        show ? shownState : hiddenState[from]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LeafImage({
  src = LEAF,
  size,
  rotate = 0,
  flip = false,
  className = "",
}: {
  src?: string;
  size: number;
  rotate?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size * 2}
      height={size * 2}
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
      }}
    />
  );
}

function FilledLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.5 3.5C11.5 3.5 4.5 8.2 4.5 15.2c0 1.7.4 3.2 1.2 4.5C6.9 14.4 10.4 10.7 15.3 8.6c-4 2.7-7.1 6.3-8.6 11.1 1.2.8 2.7 1.3 4.4 1.3 7 0 9.4-9.3 9.4-17.5z" />
    </svg>
  );
}

export default function Products({
  data = defaultProductsData,
  variant,
}: ProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const isProductPage = Boolean(
    pathname &&
      (pathname === "/products" || pathname.startsWith("/products")),
  );

  const isGrid = variant === "grid" || (!variant && isProductPage);
  const items = data.items ?? [];

  const [activeCategory, setActiveCategory] = useState("All Products");
  const productCategories = [
    "All Products",
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy & More",
  ];

  const filteredItems = isGrid
    ? items.filter((item) => {
        if (activeCategory === "All Products") return true;
        const t = (
          item.title +
          " " +
          (item.badge || "") +
          " " +
          item.description
        ).toLowerCase();
        if (activeCategory === "Vegetables") {
          return (
            t.includes("vegetable") ||
            t.includes("carrot") ||
            t.includes("green") ||
            t.includes("broccoli")
          );
        }
        if (activeCategory === "Fruits") {
          return (
            t.includes("fruit") ||
            t.includes("apple") ||
            t.includes("avocado") ||
            t.includes("orange")
          );
        }
        if (activeCategory === "Grains") {
          return (
            t.includes("grain") ||
            t.includes("rice") ||
            t.includes("wheat") ||
            t.includes("flour") ||
            t.includes("almond")
          );
        }
        if (activeCategory === "Dairy & More") {
          return (
            t.includes("milk") ||
            t.includes("dairy") ||
            t.includes("cheese") ||
            t.includes("honey") ||
            t.includes("egg") ||
            t.includes("oil") ||
            t.includes("tea")
          );
        }
        return true;
      })
    : items;

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 4 : 8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, activeCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = isGrid
    ? filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : items;

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;

    if (!container || isGrid) return;
  }, [isGrid]);

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

  useEffect(() => {
    if (isGrid || isPaused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const distance = getItemWidth();

      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: distance, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isGrid, isPaused]);

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

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container || isGrid) return;

    const distance = getItemWidth();
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: distance, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 15) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -distance, behavior: "smooth" });
      }
    }
  };

  const getIcon = (title: string, iconName?: string, iconClass = "h-7 w-7 text-[#0A2F1D]") => {
    const key = (iconName || title).toLowerCase();

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

    if (key.includes("dairy") || key.includes("milk")) {
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
        <span className="text-[#4C9A3C]">{highlight}</span>
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
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const badgeKey = (data.badgeIcon || "leaf").toLowerCase();

  return (
    <section
      id="products"
      className={`relative w-full overflow-hidden bg-[#FAFCF7] font-sans ${
        isProductPage ? "pt-6 sm:pt-8 pb-8 sm:pb-12" : "pt-2 pb-6 sm:pb-8 lg:pb-10"
      }`}
    >


      <div className="pointer-events-none absolute right-0 top-0 hidden h-[360px] w-[320px] md:block lg:w-[380px]">
        <Reveal from="scale" delay={700} className="absolute left-6 top-24">
          <span className="absolute left-0 top-9 block h-3 w-12 -rotate-[8deg] rounded-full bg-[#FFD60A]" />
          <span className="absolute left-6 top-0 block h-3.5 w-12 rotate-[62deg] rounded-full bg-[#FFD60A]" />
          <span className="absolute left-[74px] top-1 block h-3 w-9 rotate-[75deg] rounded-full bg-[#FFD60A]" />
          <span className="absolute left-3 top-[66px] block h-3 w-9 -rotate-[4deg] rounded-full bg-[#FFD60A]" />
        </Reveal>

        <Reveal from="scale" delay={500} className="absolute right-0 top-0 h-full w-full">
          <LeafImage src={LEAF_LIGHT} size={170} rotate={-48} flip className="absolute right-28 top-0 opacity-60" />
          <LeafImage size={190} rotate={20} className="absolute -right-6 top-6" />
          <LeafImage size={150} rotate={52} className="absolute -right-10 top-40" />
          <LeafImage src={LEAF_LIGHT} size={170} rotate={-70} flip className="absolute right-16 top-44 opacity-80" />
          <LeafImage size={80} rotate={-30} className="absolute right-36 top-[270px]" />
        </Reveal>
      </div>

      <div className="relative z-10 mb-10 px-4 text-center sm:mb-14">
        <Reveal from="down">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2 text-[15px] font-semibold text-[#0A3D1F] shadow-[0_4px_18px_rgba(20,83,45,0.10)] ring-1 ring-[#E6EFE3]">
            {badgeKey === "leaf" ? (
              <FilledLeaf className="h-5 w-5 text-[#166534]" />
            ) : (
              getIcon(data.badgeIcon || "leaf", undefined, "h-5 w-5 text-[#166534]")
            )}
            <span>{data.badge}</span>
          </div>
        </Reveal>

        <Reveal from="up" delay={150}>
          <h2 className="mx-auto mb-5 max-w-4xl text-3xl font-extrabold leading-[1.18] tracking-tight text-[#0B2A18] sm:text-4xl lg:text-[48px]">
            {renderTitle(data.title)}
          </h2>
        </Reveal>

        <Reveal from="scale" delay={300}>
          <div className="mx-auto mb-5 h-[3px] w-20 rounded-full bg-[#F5C518]" />
        </Reveal>

        <Reveal from="up" delay={400}>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-[#5B6470] sm:text-[17px]">
            {data.description}
          </p>
        </Reveal>
      </div>

      {isGrid && (
        <div className="relative z-10 mx-auto mb-10 max-w-5xl px-2 sm:px-4 text-center">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {productCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 sm:px-6 sm:py-2.5 sm:text-base ${
                    isSelected
                      ? "scale-105 bg-[#12482C] text-white shadow-md ring-2 ring-[#12482C] ring-offset-2"
                      : "bg-white text-gray-700 hover:bg-[#EAF5EC] hover:text-[#12482C] shadow-xs border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1340px]">
        <div
          className={`pointer-events-none absolute -left-3 z-10 hidden lg:block ${
            isGrid ? "top-[200px]" : "top-[340px]"
          }`}
        >
          <Reveal from="left" delay={600}>
            <LeafImage size={96} rotate={-62} />
          </Reveal>
        </div>

        <div className="relative">
        {!isGrid && (
          <>
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              aria-label={prevAriaLabel}
              className="absolute left-0 top-[calc(50%-20px)] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard("right")}
              aria-label={nextAriaLabel}
              className="absolute right-0 top-[calc(50%-20px)] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={
            isGrid
              ? "grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
              : "hide-scrollbar mx-12 flex snap-x snap-mandatory scroll-px-3 gap-4 overflow-x-auto scroll-smooth px-3 pb-10 pt-2 sm:mx-14 sm:gap-6 lg:mx-16"
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
          {paginatedItems.map((prod, index) => {
            const prodSlug = slugify(prod.title);

            return (
              <div
                key={prod.id}
                className={`product-card-wrapper ${
                  isGrid
                    ? "w-full"
                    : "w-[280px] max-w-[360px] shrink-0 snap-start sm:w-[320px] lg:w-[345px] xl:w-[355px]"
                }`}
              >
                <Reveal from="up" delay={Math.min(index, 4) * 120} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_10px_34px_rgba(20,83,45,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(20,83,45,0.18)]">
                    <Link
                      href={`/products/${prodSlug}`}
                      className="relative block h-48 w-full shrink-0 overflow-hidden rounded-t-[24px] bg-gray-100 sm:h-56"
                    >
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 355px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {prod.badge && (
                        <span className="absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#166534] shadow-sm backdrop-blur-sm">
                          {prod.badge}
                        </span>
                      )}
                    </Link>

                    <LeafImage
                      size={46}
                      rotate={40}
                      className="absolute right-0 top-[158px] z-10 sm:top-[190px]"
                    />

                    <div className="absolute left-5 top-[164px] z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD33D] shadow-[0_6px_16px_rgba(242,185,5,0.45)] transition-transform duration-300 group-hover:scale-110 sm:left-6 sm:top-[196px]">
                      {getIcon(prod.title, prod.icon)}
                    </div>

                    <div className="flex flex-1 flex-col bg-white px-5 pb-6 pt-10 sm:px-6 sm:pt-11">
                      <Link
                        href={`/products/${prodSlug}`}
                        className="group/title block"
                      >
                        <h3 className="mb-2 break-words text-xl font-extrabold leading-snug text-[#0B2A18] transition-colors group-hover/title:text-[#166534] sm:text-[22px]">
                          {prod.title}
                        </h3>
                      </Link>

                      <p className="mb-5 line-clamp-2 text-[15px] leading-relaxed text-[#5B6470] sm:text-base">
                        {prod.description}
                      </p>

                      <div className="mt-auto flex min-w-0 items-center justify-between gap-3 pt-1">
                        <Link
                          href={`/products/${prodSlug}`}
                          className="group/btn inline-flex w-fit shrink-0 items-center gap-6 whitespace-nowrap rounded-full bg-[#FFD33D] py-1.5 pl-6 pr-1.5 text-[15px] font-bold text-[#0A2F1D] shadow-[0_8px_18px_rgba(242,185,5,0.35)] transition-all duration-300 hover:bg-[#F5C51D]"
                        >
                          <span className="whitespace-nowrap">{viewDetailsLabel}</span>

                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#062F1C] text-white transition-transform group-hover/btn:translate-x-0.5">
                            <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
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
              ),
            )}

            <button
              type="button"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:border-[#166534] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {!isProductPage && (
          <div className="mt-6 text-center sm:mt-8">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-[#0A2F1D] py-3 pl-6 pr-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#166534] hover:shadow-xl sm:gap-3 sm:py-3.5 sm:pl-7 sm:pr-3 sm:text-sm sm:tracking-wider"
            >
              <span className="whitespace-nowrap">{viewAllLabel}</span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2C94C] text-[#0A2F1D] transition-transform duration-300 group-hover:translate-x-1 sm:h-8 sm:w-8">
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