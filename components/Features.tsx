"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, ArrowRight, Leaf, Award, X, Sprout, Wheat } from "lucide-react";
import { WhyChooseUsData } from "@/types";
import { featuresData as defaultFeaturesData } from "@/data";

interface FeaturesProps {
  data?: WhyChooseUsData;
}

const LEAF = "/images/leaf.png";
const LEAF_LIGHT = "/images/leaf-light.png";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type Direction = "left" | "right" | "up" | "scale";

const hiddenState: Record<Direction, string> = {
  left: "-translate-x-14 opacity-0",
  right: "translate-x-14 opacity-0",
  up: "translate-y-10 opacity-0",
  scale: "scale-50 opacity-0",
};

const shownState = "translate-x-0 translate-y-0 scale-100 opacity-100";

function Reveal({
  show,
  from = "up",
  delay = 0,
  className = "",
  children,
}: {
  show: boolean;
  from?: Direction;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-[900ms] ease-out ${
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
      width={size}
      height={size}
      draggable={false}
      className={`select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
      }}
    />
  );
}

export default function Features({
  data = defaultFeaturesData,
}: FeaturesProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const top = useInView<HTMLDivElement>(0.15);
  const bottom = useInView<HTMLDivElement>(0.1);

  const getBadgeIcon = (icon?: string) => {
    switch (icon) {
      case "leaf":
        return <Leaf className="h-8 w-8 shrink-0 text-[#166534]" />;
      case "award":
        return <Award className="h-8 w-8 shrink-0 text-[#F2C94C]" />;
      case "sprout":
      case "globe":
        return <Sprout className="h-8 w-8 shrink-0 text-[#166534]" />;
      case "wheat":
      default:
        return <Wheat className="h-8 w-8 shrink-0 text-[#F2C94C]" />;
    }
  };

  const getUspIcon = (icon: string) => {
    const iconClass = "h-9 w-9 sm:h-11 sm:w-11";

    switch (icon) {
      case "leaf":
        return (
          <Leaf className={`${iconClass} text-[#2E8B3A]`} strokeWidth={1.8} />
        );
      case "award":
        return (
          <Award className={`${iconClass} text-[#F2B705]`} strokeWidth={1.8} />
        );
      case "globe":
        return (
          <Sprout className={`${iconClass} text-[#2E8B3A]`} strokeWidth={1.8} />
        );
      case "wheat":
        return (
          <Wheat className={`${iconClass} text-[#F2B705]`} strokeWidth={1.8} />
        );
      default:
        return (
          <Leaf className={`${iconClass} text-[#2E8B3A]`} strokeWidth={1.8} />
        );
    }
  };

  const renderTitle = (title: string) => {
    const highlight = data.highlightText || "Wonderful Love Of Nature";

    if (!title.includes(highlight)) {
      return <span className="block whitespace-nowrap">{title}</span>;
    }

    const parts = title.split(highlight);
    const before = parts[0].trim();
    const after = parts.slice(1).join(highlight).trim();

    return (
      <>
        {before && (
          <span className="block whitespace-nowrap text-[#0B2A18]">
            {before}
          </span>
        )}
        <span className="block whitespace-nowrap text-[#15803D]">
          {highlight}
          {after ? ` ${after}` : ""}
        </span>
      </>
    );
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) {
      return "https://www.youtube.com/embed/1V_xRb0x9aw?autoplay=1";
    }

    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    return url;
  };

  return (
    <section
      id={data.sectionId || "why-us"}
      className="relative w-full overflow-x-clip bg-[#F8FBF5] pb-4 pt-12 font-sans sm:pb-6 sm:pt-16 lg:pt-5"
    >
      <div className="pointer-events-none absolute -right-4 -top-4 z-0 hidden lg:block">
        <Reveal show={top.inView} from="scale" delay={700}>
          <LeafImage
            src={LEAF_LIGHT}
            size={300}
            rotate={38}
            className="opacity-40"
          />
        </Reveal>
      </div>
      <div className="pointer-events-none absolute right-28 top-4 z-0 hidden xl:block">
        <Reveal show={top.inView} from="scale" delay={850}>
          <LeafImage
            src={LEAF_LIGHT}
            size={170}
            rotate={-12}
            flip
            className="opacity-40"
          />
        </Reveal>
      </div>

      <div
        ref={top.ref}
        className="relative z-10 mx-auto max-w-[1400px] px-5 pb-4 sm:px-8 sm:pb-4 lg:px-8 lg:pb-4"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <Reveal show={top.inView} from="left" className="relative z-10 lg:pl-3">
            <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[560px] xl:h-[620px]">
              <div className="absolute inset-0 overflow-hidden rounded-tl-[22px] rounded-tr-[56px] shadow-xl ">
                <Image
                  src={data.videoThumbnail || "/images/farm_landscape.jpg"}
                  alt={
                    data.videoThumbnailAlt ||
                    data.title ||
                    "GreenFarm agricultural landscape"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                aria-label={data.playButtonAria || "Play GreenFarm video"}
                onClick={() => setIsVideoModalOpen(true)}
                className="group/play absolute -left-3 -top-3 z-30 sm:-left-5 sm:-top-4"
              >
                <span className="relative flex h-24 w-24 items-center justify-center rounded-[22px] border border-dashed border-white/90 bg-[#FFCB2B] shadow-xl outline outline-4 -outline-offset-4 outline-[#FFCB2B] transition-transform duration-300 group-hover/play:scale-105 sm:h-[132px] sm:w-[132px] sm:rounded-[28px]">
                  <span className="flex h-[66%] w-[66%] items-center justify-center rounded-full bg-[#062F1C] text-white shadow-md">
                    <Play className="ml-1 h-8 w-8 fill-current sm:h-11 sm:w-11" />
                  </span>
                </span>

                <svg
                  className="absolute -right-9 -top-6 h-14 w-14 text-[#FFD329] sm:-right-12 sm:-top-8 sm:h-[72px] sm:w-[72px]"
                  viewBox="0 0 72 72"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="22"
                    cy="12"
                    rx="4"
                    ry="12"
                    transform="rotate(-18 22 12)"
                  />
                  <ellipse
                    cx="38"
                    cy="26"
                    rx="4"
                    ry="13"
                    transform="rotate(72 38 26)"
                  />
                  <ellipse
                    cx="32"
                    cy="46"
                    rx="3.5"
                    ry="11"
                    transform="rotate(108 32 46)"
                  />
                </svg>
              </button>

              <div className="pointer-events-none absolute -right-20 top-[14%] z-[-9] hidden sm:block lg:-right-10">
                <Reveal show={top.inView} from="scale" delay={600}>
                  <LeafImage size={96} rotate={-15} />
                </Reveal>
                <Reveal
                  show={top.inView}
                  from="scale"
                  delay={750}
                  className="-mt-5 ml-1"
                >
                  <LeafImage size={110} rotate={25} flip />
                </Reveal>
                <Reveal
                  show={top.inView}
                  from="scale"
                  delay={900}
                  className="-mt-7"
                >
                  <LeafImage size={92} rotate={-5} />
                </Reveal>
              </div>
            </div>
          </Reveal>

          <div className="relative z-10 min-w-0 space-y-6 lg:pl-4 lg:pr-4">
            <div className="pointer-events-none absolute -left-8 -top-6 hidden h-16 w-16 opacity-70 sm:block">
              <div className="h-full w-full bg-[radial-gradient(#F2C94C_2px,transparent_2px)] [background-size:11px_11px]" />
            </div>

            <Reveal show={top.inView} from="right" delay={150}>
              <div className="relative flex items-center gap-3">
                {getBadgeIcon(data.badgeIcon)}

                <span className="text-base font-bold text-[#15803D] sm:text-lg">
                  {data.badge}
                </span>

                <span
                  className={`h-[2px] bg-[#F2C94C] transition-all duration-1000 ease-out ${
                    top.inView ? "w-24 sm:w-40" : "w-0"
                  }`}
                  style={{ transitionDelay: "700ms" }}
                />
              </div>
            </Reveal>

            <Reveal
              show={top.inView}
              from="right"
              delay={300}
              className="[container-type:inline-size]"
            >
              <h2
                className="relative text-[22px] font-extrabold leading-[1.15] tracking-tight text-[#0B2A18] sm:text-4xl lg:text-[30px] xl:text-[40px]"
                style={{ fontSize: "clamp(18px, 6.4cqw, 56px)" }}
              >
                {renderTitle(data.title)}
              </h2>
            </Reveal>

            <Reveal show={top.inView} from="right" delay={450}>
              <p className="max-w-[640px] text-base leading-7 text-[#4B5563] sm:text-[17px] sm:leading-8">
                {data.description}
              </p>
            </Reveal>

            <Reveal show={top.inView} from="right" delay={600}>
              <a
                href={data.ctaButton.href}
                className="group inline-flex w-fit items-center gap-5 rounded-full bg-[#FFCB2B] py-2 pl-8 pr-2 text-sm font-bold text-[#10351E] shadow-[0_8px_20px_rgba(242,185,5,0.35)] transition-colors duration-300 hover:bg-[#F5C51D] sm:gap-6 sm:pl-9 sm:text-base"
              >
                <span>{data.ctaButton.label || `More ${data.badge}`}</span>

                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#062F1C] text-white sm:h-[52px] sm:w-[52px]">
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        ref={bottom.ref}
        className="relative z-20 mx-3 sm:mx-5 lg:mx-6 lg:-mt-1"
      >
        <div className="pointer-events-none absolute -left-6 -top-24 z-30 hidden sm:block lg:-top-32">
          <Reveal show={bottom.inView} from="scale" delay={200}>
            <LeafImage size={110} rotate={-20} />
          </Reveal>
          <Reveal
            show={bottom.inView}
            from="scale"
            delay={350}
            className="-ml-8 -mt-8"
          >
            <LeafImage size={100} rotate={-55} />
          </Reveal>
        </div>

        <div className="pointer-events-none absolute -top-44 right-2 z-0 hidden lg:block">
          <Reveal show={bottom.inView} from="scale" delay={300}>
            <LeafImage
              src={LEAF_LIGHT}
              size={170}
              rotate={20}
              className="opacity-50"
            />
          </Reveal>
        </div>
        <div className="pointer-events-none absolute -top-24 right-0 z-30 hidden lg:block">
          <Reveal show={bottom.inView} from="scale" delay={450}>
            <LeafImage size={100} rotate={25} flip />
          </Reveal>
        </div>

        <svg
          className="pointer-events-none absolute bottom-full left-0 z-10 h-20 w-full text-[#7DBE4A]/40 sm:h-28 lg:h-32"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 100 C125 62 215 48 335 76 S490 116 615 84 S780 26 905 56 S1075 104 1195 72 S1365 56 1440 92 L1440 120 L0 120 Z" />
        </svg>

        <svg
          className="absolute bottom-[calc(100%-1px)] left-0 z-10 h-16 w-full text-[#2E8B3A] sm:h-24 lg:h-28"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 120 L0 96 C0 80 12 70 32 66 C130 44 215 40 310 64 S455 110 585 80 S735 32 860 42 S1020 96 1135 68 S1330 32 1400 58 C1428 66 1440 80 1440 96 L1440 120 Z" />
        </svg>

        <div className="relative rounded-b-[28px] bg-gradient-to-b from-[#2E8B3A] via-[#217A33] to-[#14532D] px-5 pb-9 pt-3 sm:rounded-b-[34px] sm:px-8 sm:pb-11 lg:px-12">
          <div className="relative z-30 mx-auto grid max-w-[1320px] grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {data.uspCards.map((usp, idx) => {
              const isLast = idx === data.uspCards.length - 1;

              return (
                <Reveal
                  key={usp.id}
                  show={bottom.inView}
                  from="up"
                  delay={idx * 180}
                  className={
                    isLast
                      ? ""
                      : "border-b border-[#F2C94C]/30 pb-8 md:border-b-0 md:border-r md:pb-0"
                  }
                >
                  <div
                    className={`flex items-start gap-5 ${
                      idx === 0 ? "md:pr-8 lg:pr-10" : "md:px-8 lg:px-10"
                    } ${isLast ? "md:pl-8 lg:pl-10" : ""}`}
                  >
                    <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full bg-white shadow-lg sm:h-[100px] sm:w-[100px]">
                      {getUspIcon(usp.icon)}
                    </div>

                    <div className="min-w-0 flex-1 pt-1 sm:pt-2">
                      <h3 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                        {usp.title}
                      </h3>

                      <div className="mb-3 mt-2 h-[3px] w-12 rounded-full bg-[#FFCB2B]" />

                      <p className="text-[15px] leading-7 text-white/90 sm:text-base sm:leading-7">
                        {usp.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={data.videoTitle || "GreenFarm video"}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsVideoModalOpen(false);
            }
          }}
        >
          <button
            type="button"
            aria-label={data.closeVideoAriaLabel || "Close video"}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          />

          <div className="relative z-10 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:rounded-3xl">
            <button
              type="button"
              aria-label={data.closeVideoAriaLabel || "Close video"}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black sm:right-4 sm:top-4 sm:h-12 sm:w-12"
            >
              <X className="h-6 w-6" />
            </button>

            <iframe
              src={getEmbedUrl(data.videoUrl)}
              title={data.videoTitle || "GreenFarm Video"}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}