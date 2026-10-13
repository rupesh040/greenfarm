"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ServiceDetailData } from "@/types";
import { serviceDetailData as defaultServiceDetailData } from "@/data";

interface ServiceDetailProps {
  data?: ServiceDetailData;
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
  hand: [
    { d: "M10.9 9.4V7.6C8.8 7.6 7.4 6.2 7.4 4c2.2 0 3.6 1.3 3.5 3.4C11 5 12.6 3.3 15.2 3.3c0 2.7-1.6 4.3-3.9 4.3v1.8z" },
    {
      d: "M2.5 14.4h3.1c.7 0 1.4.2 2 .7l1.4 1.1h4c.9 0 1.6.7 1.6 1.5l5.4-2.7c.8-.4 1.8-.1 2.2.7.4.7.2 1.6-.5 2.1l-6.7 4.4c-.4.3-.9.4-1.4.4H8.2c-.5 0-1-.2-1.4-.5L2.5 18.6z",
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
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  const paths = filledIcons[name.toLowerCase()] ?? filledIcons.sprout;

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

export default function ServiceDetail({
  data = defaultServiceDetailData,
}: ServiceDetailProps) {
  const renderBenefitIcon = (icon: string) => {
    return <Icon name={icon} className="w-5 h-5 text-[#1B4D36]" />;
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-12 sm:space-y-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#1B4D36] text-xs font-bold tracking-wide mb-3">
                  <Icon name="leaf" className="w-3.5 h-3.5 text-[#1B4D36]" />
                  <span>{data.badge || "Our Services"}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#12482C] leading-[1.18] tracking-tight mb-4">
                  {data.title}
                </h1>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-7">
                  {data.shortDescription}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#FFD32F] text-[#12482C] font-bold text-sm sm:text-base pl-6 pr-2 py-2 rounded-full shadow-sm hover:bg-[#F2C94C] transition-all group"
                >
                  <span>{data.enquiryButtonText || "Enquiry Now"}</span>
                  <span className="w-9 h-9 rounded-full bg-[#12482C] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              <div className="md:col-span-5">
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100">
                  <Image
                    src={data.heroImage}
                    alt={data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                  {data.overviewTitle || "Service Overview"}
                </h2>
                <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                {data.overviewDescription}
              </p>

              <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100">
                <Image
                  src={data.overviewImage}
                  alt={data.overviewTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                  {data.benefitsTitle || "Key Benefits"}
                </h2>
                <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7">
                {data.benefits.map((b) => (
                  <div key={b.id} className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#EAF5EC] text-[#1B4D36] flex items-center justify-center shrink-0">
                      {renderBenefitIcon(b.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-5">
                <div className="relative aspect-[4/3] md:aspect-[3/3.6] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100">
                  <Image
                    src={data.whyChooseImage}
                    alt={data.whyChooseTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                    {data.whyChooseTitle || "Why Choose Our Service"}
                  </h2>
                  <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {data.whyChooseDescription}
                </p>

                <div className="space-y-2.5 pt-2">
                  {data.whyChoosePoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Icon name="check" className="w-5 h-5 text-[#12482C] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8 sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="bg-[#12482C] px-5 py-4">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Our Services
                </h3>
              </div>

              <div className="p-3 sm:p-4 space-y-2">
                {data.sidebarServices?.map((item) => {
                  const isActive =
                    item.active ||
                    item.id === data.id ||
                    item.title.toLowerCase().replace(/\s+/g, "-") ===
                      data.id.toLowerCase();

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-[#EAF5EC] text-[#12482C] font-bold"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold leading-snug truncate">
                          {item.title}
                        </span>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 ${
                          isActive
                            ? "bg-[#12482C] text-white"
                            : "border border-gray-200 text-gray-400 group-hover:border-[#12482C] group-hover:text-[#12482C]"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="relative rounded-2xl bg-[#EAF5EC] p-6 border border-[#D5EAD8] overflow-hidden">
              <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-25 w-36 h-36">
                <Image
                  src="/images/leaf.png"
                  alt=""
                  fill
                  sizes="144px"
                  className="object-contain object-bottom-right"
                />
              </div>

              <h3 className="text-xl font-extrabold text-[#12482C] relative z-10">
                {data.helpCard?.title || "Need Help?"}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-[200px] leading-relaxed relative z-10">
                {data.helpCard?.description ||
                  "Our team is here to guide you with the best organic farming solutions."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
