"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Leaf,
} from "lucide-react";
import { BlogData } from "@/types";
import { blogData as defaultBlogData } from "@/data";

interface BlogProps {
  data?: BlogData;
  variant?: "grid" | "carousel";
}

export default function Blog({
  data = defaultBlogData,
  variant,
}: BlogProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const blogsPerPage = data.blogsPerPage || 6;
  const items = data.items ?? [];
  const isGrid = variant
    ? variant === "grid"
    : pathname === "/blog" || pathname === "/blogs";

  const totalPages = Math.ceil(items.length / blogsPerPage);

  const visibleBlogs = isGrid
    ? items.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage,
      )
    : items;

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;

    if (!container || isGrid) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const firstCard = container.querySelector(
      ".blog-card-wrapper",
    ) as HTMLElement | null;

    setCanScrollLeft(container.scrollLeft > 2);
    setCanScrollRight(container.scrollLeft < maxScroll - 2);

    if (firstCard) {
      const gap =
        parseFloat(window.getComputedStyle(container).columnGap) || 0;
      const cardWidth = firstCard.getBoundingClientRect().width + gap;

      if (cardWidth > 0) {
        setCurrentIndex(
          Math.max(
            0,
            Math.min(
              items.length - 1,
              Math.round(container.scrollLeft / cardWidth),
            ),
          ),
        );
      }
    }
  }, [isGrid, items.length]);

  useEffect(() => {
    if (isGrid) return;

    const container = scrollRef.current;

    if (!container) return;

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(container);

    const firstCard = container.querySelector(".blog-card-wrapper");

    if (firstCard) {
      observer.observe(firstCard);
    }

    return () => observer.disconnect();
  }, [isGrid, updateScrollState]);

  const getCardWidth = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return 0;

    const firstCard = container.querySelector(
      ".blog-card-wrapper",
    ) as HTMLElement | null;

    if (!firstCard) return container.clientWidth;

    const gap =
      parseFloat(window.getComputedStyle(container).columnGap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  }, []);
  useEffect(() => {
    if (isGrid || isHovered || items.length <= 1) return;

    const timer = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const distance = getCardWidth();

      if (distance <= 0) return;

      if (container.scrollLeft >= maxScroll - 12) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: distance,
          behavior: "smooth",
        });
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isGrid, isHovered, items.length, getCardWidth]);

  const scrollCarousel = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    const distance = getCardWidth();

    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollTo({
      left: getCardWidth() * index,
      behavior: "smooth",
    });
  };

  const renderTitle = (title: string) => {
    const highlight = data.highlightText || "Articles";
    const highlightIndex = title.indexOf(highlight);

    if (highlightIndex === -1) return title;

    return (
      <>
        {title.slice(0, highlightIndex)}
        <span className="text-[#166534]">{highlight}</span>
        {title.slice(highlightIndex + highlight.length)}
      </>
    );
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) return [1, 2, 3, 4, 5];

    if (currentPage >= totalPages - 2) {
      return Array.from(
        { length: 5 },
        (_, index) => totalPages - 4 + index,
      );
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <section
      id="blog"
      className="relative w-full overflow-hidden bg-[#fcfdfa] pt-4 sm:pt-6 pb-8 sm:pb-10 font-sans"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 z-0 hidden h-72 w-72 rotate-12 opacity-30 lg:block">
        <Image
          src={data.leafImage || "/images/blog_leaf.jpg"}
          alt=""
          fill
          sizes="288px"
          className="object-contain blur-[2px]"
        />
      </div>

      <div className="pointer-events-none absolute -bottom-32 -left-20 z-0 hidden h-80 w-80 -rotate-45 opacity-30 lg:block">
        <Image
          src={data.leafImage || "/images/blog_leaf.jpg"}
          alt=""
          fill
          sizes="320px"
          className="object-contain blur-[2px]"
        />
      </div>

      <div className="relative z-10 mx-auto mb-10 max-w-4xl px-4 text-center sm:mb-14 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-3"
        >
          <span className="hidden h-px w-10 bg-[#166534]/30 sm:block" />

          <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#166534]">
            <Leaf className="h-4 w-4" />
            {data.badge}
          </span>

          <span className="hidden h-px w-10 bg-[#166534]/30 sm:block" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          {renderTitle(data.title)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-[15px] leading-relaxed text-gray-600 sm:text-[17px]"
        >
          {data.description}
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {!isGrid && (
          <>
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              disabled={!canScrollLeft}
              aria-label={data.prevAriaLabel || "Previous blog"}
              className="absolute left-1 top-[36%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:left-3 sm:h-12 sm:w-12 lg:left-5"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              disabled={!canScrollRight}
              aria-label={data.nextAriaLabel || "Next blog"}
              className="absolute right-1 top-[36%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A2F1D] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#166534] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:right-3 sm:h-12 sm:w-12 lg:right-5"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className={
            isGrid
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
              : "hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-10 pb-8 pt-3 sm:gap-7 sm:px-12 lg:gap-8 lg:px-14"
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
          <AnimatePresence>
            {visibleBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className={`blog-card-wrapper group flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-2xl ${
                  isGrid
                    ? "w-full"
                    : "w-[calc(100%-8px)] shrink-0 snap-start sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-22px)]"
                }`}
              >
                <div className="relative h-56 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-60">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes={
                      isGrid
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute left-4 top-4 min-w-14 rounded-xl border border-gray-100 bg-white/95 p-2 text-center shadow-sm backdrop-blur-md">
                    <span className="mb-1 block text-[22px] font-black leading-none text-[#0A2F1D]">
                      {post.date.split(" ")[0]}
                    </span>

                    <span className="block text-[9px] font-bold uppercase leading-none tracking-widest text-gray-500">
                      {post.date.split(" ")[1]} {post.year || data.year || "2025"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col bg-white p-5 sm:p-6">
                  <div className="mb-4">
                    <span className="inline-flex rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-extrabold leading-[1.35] text-gray-900 transition-colors duration-300 group-hover:text-[#166534] sm:text-[22px]">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-gray-500">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-2">
                    <Link
                      href={post.href}
                      className="group/btn inline-flex w-fit items-center gap-3 rounded-full bg-[#F2C94C] py-1.5 pl-4 pr-1.5 text-[12px] font-bold uppercase tracking-wide text-[#0A2F1D] shadow-sm transition-all duration-300 hover:bg-[#e6bb3b] hover:shadow-md sm:text-[13px]"
                    >
                      <span>{data.buttons?.readMore || "Read More"}</span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2F1D] text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {isGrid ? (
          totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-14">
              <button
                type="button"
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label={data.pagination?.prevAriaLabel || "Previous page"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0A2F1D] transition-all hover:border-[#166534] hover:bg-[#166534] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => changePage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-bold transition-all duration-300 ${
                    currentPage === page
                      ? "bg-[#0A2F1D] text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-[#166534] hover:text-[#166534]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  changePage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                aria-label={data.pagination?.nextAriaLabel || "Next page"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0A2F1D] transition-all hover:border-[#166534] hover:bg-[#166534] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )
        ) : (
          <>
            {items.length > 1 && (
              <div className="mt-2 flex items-center justify-center gap-2.5">
                {items.map((post, index) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to blog ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-8 bg-[#F2C94C]"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center sm:justify-end">
              <Link
                href={data.allBlogsHref || "/blog"}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-[#0A2F1D] py-1.5 pl-5 pr-1.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-[#166534] hover:shadow-xl sm:text-[13px]"
              >
                <span>{data.buttons?.viewAll || "View All Blogs"}</span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0A2F1D] transition-transform duration-300 group-hover/btn:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </>
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