"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Leaf,
  Sprout,
  Apple,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Package,
  Layers,
  Droplets,
  Award,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ProductDetailData } from "@/types";
import { productDetailData as defaultProductDetailData } from "@/data";

interface ProductDetailProps {
  data?: ProductDetailData;
}

function ProductIcon({
  name,
  className = "w-5 h-5 text-[#1B4D36]",
}: {
  name: string;
  className?: string;
}) {
  const key = name.toLowerCase();
  if (
    key.includes("sprout") ||
    key.includes("soil") ||
    key.includes("natural")
  ) {
    return <Sprout className={className} />;
  }
  if (key.includes("leaf") || key.includes("organic")) {
    return <Leaf className={className} />;
  }
  if (
    key.includes("flask") ||
    key.includes("chemical") ||
    key.includes("zero") ||
    key.includes("shield")
  ) {
    return <ShieldCheck className={className} />;
  }
  if (key.includes("hand") || key.includes("pick") || key.includes("sparkle")) {
    return <Sparkles className={className} />;
  }
  if (key.includes("apple") || key.includes("fruit")) {
    return <Apple className={className} />;
  }
  if (key.includes("truck") || key.includes("delivery")) {
    return <Truck className={className} />;
  }
  if (key.includes("pin") || key.includes("farm") || key.includes("location")) {
    return <MapPin className={className} />;
  }
  if (key.includes("package") || key.includes("box")) {
    return <Package className={className} />;
  }
  if (key.includes("droplet") || key.includes("water")) {
    return <Droplets className={className} />;
  }
  if (key.includes("layer")) {
    return <Layers className={className} />;
  }
  if (key.includes("award") || key.includes("quality")) {
    return <Award className={className} />;
  }
  if (key.includes("clock") || key.includes("fresh") || key.includes("daily")) {
    return <Clock className={className} />;
  }
  return <CheckCircle2 className={className} />;
}

export default function ProductDetail({
  data = defaultProductDetailData,
}: ProductDetailProps) {
  const [imgFallback, setImgFallback] = useState(false);

  const singleImage =
    data.images && data.images.length > 0
      ? data.images[0]
      : {
          src: data.overview?.image || "/images/almonds.jpg",
          alt: data.title,
        };

  const mainImgSrc = imgFallback
    ? "/images/almonds.jpg"
    : singleImage?.src || "/images/almonds.jpg";

  return (
    <section className="w-full bg-white py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#1B4D36] text-xs font-bold tracking-wide mb-3 w-fit">
              <Leaf className="w-3.5 h-3.5 text-[#1B4D36]" />
              <span>{data.category || "Our Products"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#12482C] leading-[1.18] tracking-tight mb-4">
              {data.title}
            </h1>

            <div className="space-y-3.5 text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              {data.description && <p>{data.description}</p>}
              {Array.isArray(data.detailedDescription)
                ? data.detailedDescription.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === data.detailedDescription!.length - 1
                          ? "text-xs sm:text-sm text-gray-500"
                          : ""
                      }
                    >
                      {para}
                    </p>
                  ))
                : data.detailedDescription && <p>{data.detailedDescription}</p>}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100 bg-[#EEF5EC]">
              <Image
                key={mainImgSrc}
                src={mainImgSrc}
                alt={singleImage.alt || data.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center"
                priority
                unoptimized={mainImgSrc.startsWith("http")}
                onError={() => {
                  setImgFallback(true);
                }}
              />
            </div>
          </div>
        </div>

        {data.overview && (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                {data.overview.title || "Product Overview"}
              </h2>
              <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              {data.overview.description}
            </p>

            <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100 bg-[#EEF5EC]">
              <Image
                src={data.overview.image || singleImage.src}
                alt={data.overview.imageAlt || data.overview.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-center"
                unoptimized={Boolean(
                  (data.overview.image || singleImage.src)?.startsWith("http"),
                )}
              />
            </div>
          </div>
        )}

        {data.keyFeatures && data.keyFeatures.items?.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                {data.keyFeatures.title || "Key Features"}
              </h2>
              <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {data.keyFeatures.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FBFDFA] border border-[#EAF5EC]"
                >
                  <div className="w-11 h-11 rounded-full bg-[#EAF5EC] text-[#1B4D36] flex items-center justify-center shrink-0">
                    <ProductIcon
                      name={item.icon}
                      className="w-5 h-5 text-[#1B4D36]"
                    />
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-gray-800 text-sm leading-snug">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.specifications && data.specifications.rows?.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                {data.specifications.title || "Product Specifications"}
              </h2>
              <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {data.specifications.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 last:border-b-0 ${
                        idx % 2 === 0 ? "bg-[#FAFCF8]" : "bg-white"
                      }`}
                    >
                      <th
                        scope="row"
                        className="w-[36%] px-5 py-3.5 text-xs sm:text-sm font-bold text-[#12482C]"
                      >
                        {row.label}
                      </th>
                      <td className="px-5 py-3.5 text-xs sm:text-sm text-gray-600">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {data.benefits && data.benefits.items?.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                {data.benefits.title || "Quality & Benefits"}
              </h2>
              <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.benefits.items.map((b) => (
                <div
                  key={b.id}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-xs"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#EEF5EC]">
                    <Image
                      src={b.image}
                      alt={b.imageAlt || b.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                      unoptimized={b.image.startsWith("http")}
                    />
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
        )}

        {data.availability && data.availability.items?.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12482C] tracking-tight">
                {data.availability.title || "Availability & Delivery"}
              </h2>
              <div className="w-12 h-1 bg-[#FFD32F] rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.availability.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#EAF5EC]/60 border border-[#D5EAD8] text-center flex flex-col items-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#12482C] text-white flex items-center justify-center mb-2.5">
                    <ProductIcon
                      name={item.icon}
                      className="w-5 h-5 text-white"
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-[#12482C] mt-0.5">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
