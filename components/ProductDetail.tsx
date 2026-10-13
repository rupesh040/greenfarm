"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductDetailData } from "@/types";
import { productDetailData as defaultProductDetailData } from "@/data";

interface ProductDetailProps {
  data?: ProductDetailData;
}

type IconPath = { d: string; evenodd?: boolean };

const filledIcons: Record<string, IconPath[]> = {
  leaf: [
    {
      d: "M20.5 3.5C11.5 3.5 4.5 8.2 4.5 15.2c0 1.7.4 3.2 1.2 4.5C6.9 14.4 10.4 10.7 15.3 8.6c-4 2.7-7.1 6.3-8.6 11.1 1.2.8 2.7 1.3 4.4 1.3 7 0 9.4-9.3 9.4-17.5z",
    },
  ],
  sprout: [
    { d: "M11 14.2C11 9.4 8 6.6 2.8 6.6c0 5.2 3 8.2 8.2 7.6z" },
    { d: "M13 12.2C13 6.8 16.2 3.4 21.2 3.4c0 5.8-3.1 9-8.2 8.8z" },
    { d: "M10.9 13h2.2v8.2a1.1 1.1 0 01-2.2 0z" },
  ],
  flask: [
    {
      d: "M9 2.5h6a.9.9 0 010 1.8h-.6v4.9l5 8.4c1 1.7-.2 3.9-2.2 3.9H6.8c-2 0-3.2-2.2-2.2-3.9l5-8.4V4.3H9a.9.9 0 010-1.8zM9.4 15.2l-1.6 2.7h8.4l-1.6-2.7z",
      evenodd: true,
    },
    { d: "M12 11.2a1 1 0 100 2 1 1 0 000-2z" },
  ],
  hand: [
    { d: "M10.9 9.4V7.6C8.8 7.6 7.4 6.2 7.4 4c2.2 0 3.6 1.3 3.5 3.4C11 5 12.6 3.3 15.2 3.3c0 2.7-1.6 4.3-3.9 4.3v1.8z" },
    {
      d: "M2.5 14.4h3.1c.7 0 1.4.2 2 .7l1.4 1.1h4c.9 0 1.6.7 1.6 1.5l5.4-2.7c.8-.4 1.8-.1 2.2.7.4.7.2 1.6-.5 2.1l-6.7 4.4c-.4.3-.9.4-1.4.4H8.2c-.5 0-1-.2-1.4-.5L2.5 18.6z",
    },
  ],
  layers: [
    { d: "M12 2.8l9.6 4.8L12 12.4 2.4 7.6z" },
    { d: "M4.2 11.1l7.8 3.9 7.8-3.9 1.8.9L12 17 2.4 12z" },
    { d: "M4.2 15.7l7.8 3.9 7.8-3.9 1.8.9L12 21.6 2.4 16.6z" },
  ],
  droplet: [
    { d: "M12 2.4s-6.8 7.3-6.8 12.3a6.8 6.8 0 0013.6 0C18.8 9.7 12 2.4 12 2.4z" },
  ],
  package: [
    { d: "M12 2.2L3.2 6.6 12 11l8.8-4.4z" },
    { d: "M2.8 8.4v8l8.4 4.2v-8z" },
    { d: "M21.2 8.4v8l-8.4 4.2v-8z" },
  ],
  truck: [
    { d: "M3.2 5.2h10.6c.7 0 1.2.5 1.2 1.2V15H2V6.4c0-.7.5-1.2 1.2-1.2z" },
    { d: "M16.2 8.4h3.1l2.7 3.4V15h-5.8z" },
    {
      d: "M7 14.6a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm0 1.7a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM17.6 14.6a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm0 1.7a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z",
      evenodd: true,
    },
  ],
  pin: [
    {
      d: "M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.6A2.6 2.6 0 1112 6.4a2.6 2.6 0 010 5.2z",
      evenodd: true,
    },
  ],
  apple: [
    {
      d: "M18.7 8.3c-.8-.9-1.9-1.5-3.2-1.5-1.5 0-2.4.9-3.5.9s-2.1-.9-3.6-.9c-1.3 0-2.5.6-3.3 1.5C3.3 10.5 3.8 15.8 7 19.8c1 1.2 2.1 2.2 3.5 2.2 1.3 0 1.8-.8 3.5-.8 1.6 0 2.1.8 3.5.8 1.4 0 2.5-1.1 3.5-2.2 2.4-3.1 3.2-6.9 2-9.5-.9-1.2-2.3-1.9-4.3-2zM12 2c0 2.2 1.3 3.8 3 4-.2-2.2-1.5-3.8-3-4z",
      evenodd: true,
    },
  ],
  coins: [
    {
      d: "M12 3c-4.4 0-8 1.8-8 4s3.6 4 8 4 8-1.8 8-4-3.6-4-8-4zm0 6c-3.3 0-6-1.1-6-2.5S8.7 4 12 4s6 1.1 6 2.5S15.3 9 12 9zm8 2.2c-.7.5-1.6.9-2.6 1.2.4.8.6 1.6.6 2.6 0 2.2-3.6 4-8 4s-8-1.8-8-4c0-.9.2-1.8.6-2.6-1-.3-1.9-.7-2.6-1.2V13c0 2.2 3.6 4 8 4s8-1.8 8-4v-1.8zm0 5c-.7.5-1.6.9-2.6 1.2.4.8.6 1.6.6 2.6 0 2.2-3.6 4-8 4s-8-1.8-8-4c0-.9.2-1.8.6-2.6-1-.3-1.9-.7-2.6-1.2V18c0 2.2 3.6 4 8 4s8-1.8 8-4v-1.8z",
      evenodd: true,
    },
  ],
  globe: [
    {
      d: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1 17.9A8.02 8.02 0 014.1 13H7c.6 0 1-.4 1-1v-1c0-.6.4-1 1-1h2c.6 0 1-.4 1-1V7c0-.6.4-1 1-1h1c.6 0 1-.4 1-1v-.9A8.01 8.01 0 0119.9 12c0 .3 0 .7-.1 1h-2.8c-.6 0-1 .4-1 1v1c0 .6-.4 1-1 1H13c-.6 0-1 .4-1 1v2.9z",
      evenodd: true,
    },
  ],
  check: [
    {
      d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      evenodd: true,
    },
  ],
  award: [
    {
      d: "M12 15.4l-4.1 2.5 1.1-4.7L5.3 10l4.8-.4L12 5.2l1.9 4.4 4.8.4-3.7 3.2 1.1 4.7z",
      evenodd: true,
    },
  ],
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths = filledIcons[name.toLowerCase()] ?? filledIcons.leaf;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fillRule={p.evenodd ? "evenodd" : undefined}
          clipRule={p.evenodd ? "evenodd" : undefined}
        />
      ))}
    </svg>
  );
}


type Direction = "left" | "right" | "up" | "scale";

const hiddenState: Record<Direction, string> = {
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  up: "translate-y-10 opacity-0",
  scale: "scale-90 opacity-0",
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
      { threshold: 0.12 }
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 sm:mb-7">
      <h3 className="text-2xl font-extrabold tracking-tight text-[#0B3B1E] sm:text-[30px]">
        {children}
      </h3>
      <div className="mt-3 h-[5px] w-11 rounded-full bg-[#F5C518]" />
    </div>
  );
}

const cardCls =
  "rounded-[24px] border border-[#E6EFE3] bg-gradient-to-br from-[#F3F8F1] to-[#EDF4EA] p-5 shadow-[0_2px_14px_rgba(20,83,45,0.04)] sm:p-8";

const iconCircle =
  "flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(20,83,45,0.10)] ring-1 ring-[#E3EDE0]";

export default function ProductDetail({
  data = defaultProductDetailData,
}: ProductDetailProps) {
  const [active, setActive] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRender = useRef(true);

  const images = data.images ?? [];
  const total = images.length;

  const go = (next: number) => {
    if (total === 0) return;
    setActive((next + total) % total);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    thumbRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <section
      id={data.sectionId || "product-detail"}
      className="w-full overflow-x-clip bg-[#FBFDFA] py-2"
    >
      <div className="mx-auto max-w-[1320px] space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          <Reveal from="left">
            <div>
              <div className="relative aspect-[1.1] w-full overflow-hidden rounded-[24px] bg-[#E6EFE3] shadow-[0_14px_40px_rgba(20,83,45,0.18)]">
                {images.map((img, i) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-500 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                {data.imageBadges && data.imageBadges.length > 0 && (
                  <div className="absolute bottom-[20%] right-3 top-3 flex w-[104px] flex-col justify-around rounded-[22px] bg-gradient-to-b from-[#14532D]/80 to-[#0F4A28]/70 px-2 py-3 shadow-lg ring-1 ring-white/15 backdrop-blur-sm sm:right-5 sm:top-5 sm:w-[128px]">
                    {data.imageBadges.map((badge) => (
                      <div key={badge.id} className="flex flex-col items-center text-center">
                        <span className={`${iconCircle} h-12 w-12 sm:h-[64px] sm:w-[64px]`}>
                          <Icon name={badge.icon} className="h-6 w-6 text-[#15803D] sm:h-8 sm:w-8" />
                        </span>
                        <span className="mt-2 text-[12px] font-semibold leading-tight text-white sm:text-[15px]">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {total > 1 && (
                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => go(active - 1)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0B3B1E] shadow-sm transition-colors hover:bg-[#F0F6EE]"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                  </button>

                  <div className="flex flex-1 gap-3 overflow-x-auto px-1.5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        ref={(el) => {
                          thumbRefs.current[i] = el;
                        }}
                        aria-label={`Show image ${i + 1}`}
                        aria-current={i === active}
                        onClick={() => setActive(i)}
                        className={`relative aspect-square w-[68px] shrink-0 overflow-hidden rounded-xl transition-all duration-300 sm:w-[90px] ${
                          i === active
                            ? "ring-[3px] ring-[#FFD60A] ring-offset-2"
                            : "opacity-90 ring-1 ring-gray-200 hover:opacity-100"
                        }`}
                      >
                        <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => go(active + 1)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0B3B1E] shadow-sm transition-colors hover:bg-[#F0F6EE]"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                </div>
              )}
            </div>
          </Reveal>
          <div className="min-w-0">
            <Reveal from="right" delay={100}>
              <span className="inline-block rounded-lg bg-[#F3F8D0] px-3.5 py-1.5 text-sm font-medium text-[#4E7A12]">
                {data.category}
              </span>
            </Reveal>

            <Reveal from="right" delay={200}>
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0B2A18] sm:text-5xl lg:text-[46px] xl:text-[54px]">
                {data.title}
              </h2>
            </Reveal>

            <Reveal from="right" delay={300}>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#4B5563] sm:text-[17px] sm:leading-8">
                {data.description}
              </p>
            </Reveal>

            <Reveal from="up" delay={400}>
              <div className="mt-8 rounded-[24px] border border-[#E6EFE3] bg-gradient-to-br from-[#F3F8F1] to-[#EAF3E7] p-5 sm:p-7">
                {data.highlights && data.highlights.length > 0 && (
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-3">
                    {data.highlights.map((item, i) => (
                      <Reveal key={item.id} from="scale" delay={500 + i * 120}>
                        <div className="flex flex-col items-center text-center">
                          <span className={`${iconCircle} h-[86px] w-[86px]`}>
                            <Icon name={item.icon} className="h-9 w-9 text-[#15803D]" />
                          </span>
                          <span className="mt-3 max-w-[110px] text-[15px] font-medium leading-snug text-[#0B3B1E]">
                            {item.label}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}

                {data.enquiry && (
                  <Link
                    href={data.enquiry.href || "/contact"}
                    className="group mt-8 inline-flex w-fit items-center gap-10 rounded-full bg-[#FFD60A] py-2 pl-9 pr-2 text-lg font-bold text-[#0B3B1E] shadow-[0_10px_24px_rgba(245,197,24,0.40)] ring-2 ring-[#FFD60A] ring-offset-2 ring-offset-[#EDF4EA] transition-colors duration-300 hover:bg-[#F5CB00]"
                  >
                    <span>{data.enquiry.label}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#062F1C] text-white">
                      <ChevronRight className="h-6 w-6" strokeWidth={2.75} />
                    </span>
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
        {data.overview && (
          <Reveal from="up">
            <div className={`${cardCls} grid grid-cols-1 items-center gap-8 md:grid-cols-[1.05fr_1fr]`}>
              <div>
                <SectionHeading>{data.overview.title}</SectionHeading>
                <p className="max-w-xl text-base leading-8 text-[#4B5563] sm:text-[17px]">
                  {data.overview.description}
                </p>
              </div>

              <div className="relative aspect-[1.55] w-full overflow-hidden rounded-[18px] shadow-[0_10px_28px_rgba(20,83,45,0.18)]">
                <Image
                  src={data.overview.image}
                  alt={data.overview.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        )}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          {data.keyFeatures && (
            <Reveal from="left">
              <div className={`${cardCls} h-full`}>
                <SectionHeading>{data.keyFeatures.title}</SectionHeading>

                <ul className="space-y-3.5">
                  {data.keyFeatures.items.map((item, i) => (
                    <li key={item.id}>
                      <Reveal from="up" delay={i * 100} className="flex items-center gap-5">
                        <span className={`${iconCircle} h-[62px] w-[62px]`}>
                          <Icon name={item.icon} className="h-6 w-6 text-[#15803D]" />
                        </span>
                        <span className="text-[17px] text-[#4B5563]">{item.text}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {data.specifications && (
            <Reveal from="right">
              <div className={`${cardCls} h-full`}>
                <SectionHeading>{data.specifications.title}</SectionHeading>

                <div className="overflow-hidden rounded-xl border border-[#DDE8DA] bg-white shadow-sm">
                  <table className="w-full border-collapse text-left">
                    <tbody>
                      {data.specifications.rows.map((row) => (
                        <tr key={row.label} className="border-b border-[#E7EFE4] last:border-b-0">
                          <th
                            scope="row"
                            className="w-[38%] bg-[#E4EEE1] px-4 py-3.5 align-top text-[15px] font-semibold text-[#0B3B1E] sm:px-6"
                          >
                            {row.label}
                          </th>
                          <td className="px-4 py-3.5 text-[15px] leading-6 text-[#4B5563] sm:px-6">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1.75fr_1fr]">
          {data.benefits && (
            <Reveal from="up">
              <div className={`${cardCls} h-full`}>
                <SectionHeading>{data.benefits.title}</SectionHeading>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {data.benefits.items.map((item, i) => (
                    <Reveal key={item.id} from="up" delay={i * 130}>
                      <div>
                        <div className="relative aspect-[1.2] w-full overflow-hidden rounded-xl shadow-[0_6px_18px_rgba(20,83,45,0.15)]">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                            className="object-cover"
                          />
                        </div>
                        <h4 className="mt-3.5 text-[17px] font-bold leading-snug text-[#0B3B1E]">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-[15px] leading-6 text-[#6B7280]">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {data.availability && (
            <Reveal from="right">
              <div className={`${cardCls} h-full`}>
                <SectionHeading>{data.availability.title}</SectionHeading>

                <ul className="space-y-4">
                  {data.availability.items.map((item, i) => (
                    <li key={item.id}>
                      <Reveal
                        from="up"
                        delay={i * 130}
                        className="flex items-center gap-4 rounded-2xl bg-white px-3.5 py-3.5 shadow-[0_3px_12px_rgba(20,83,45,0.06)] sm:px-4"
                      >
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E4EFE1]">
                          <Icon name={item.icon} className="h-6 w-6 text-[#14532D]" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[15px] font-semibold text-[#0B3B1E]">{item.label}</p>
                          <p className="text-[15px] text-[#4B5563]">{item.value}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}