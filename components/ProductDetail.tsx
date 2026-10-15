"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Leaf,
  Sprout,
  Apple,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
  MapPin,
  Package,
  Layers,
  Droplets,
  Award,
} from "lucide-react";
import { ProductDetailData } from "@/types";
import {
  productDetailData as defaultProductDetailData,
  productsData,
  slugify,
} from "@/data";

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
  if (key.includes("sprout") || key.includes("soil") || key.includes("natural")) {
    return <Sprout className={className} />;
  }
  if (key.includes("leaf") || key.includes("organic")) {
    return <Leaf className={className} />;
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
  if (key.includes("clock") || key.includes("fresh")) {
    return <Clock className={className} />;
  }
  return <CheckCircle2 className={className} />;
}

export default function ProductDetail({
  data = defaultProductDetailData,
}: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = data.images && data.images.length > 0
    ? data.images
    : [{ src: data.overview?.image || "/images/almonds.jpg", alt: data.title }];

  const activeImage = images[activeImageIndex] || images[0];
  const [mainImgSrc, setMainImgSrc] = useState<string>(activeImage?.src || "/images/almonds.jpg");

  useEffect(() => {
    setActiveImageIndex(0);
  }, [data.id, data.title]);

  useEffect(() => {
    if (activeImage?.src) {
      setMainImgSrc(activeImage.src);
    }
  }, [activeImage?.src]);

  const sidebarProducts = productsData.items || [];
  const currentSlug = slugify(data.title);

  const [sidebarCategory, setSidebarCategory] = useState("All");

  const filteredSidebarProducts = sidebarProducts.filter((item) => {
    if (sidebarCategory === "All") return true;
    const text = (item.title + " " + item.description + " " + (item.badge || "")).toLowerCase();
    if (sidebarCategory === "Vegetables") {
      return (
        text.includes("vegetable") ||
        text.includes("spinach") ||
        text.includes("tomato") ||
        text.includes("avocado") ||
        text.includes("broccoli") ||
        text.includes("carrot")
      );
    }
    if (sidebarCategory === "Fruits") {
      return (
        text.includes("fruit") ||
        text.includes("strawberr") ||
        text.includes("apple") ||
        text.includes("avocado")
      );
    }
    if (sidebarCategory === "Grains") {
      return (
        text.includes("grain") ||
        text.includes("rice") ||
        text.includes("wheat") ||
        text.includes("almond") ||
        text.includes("oil")
      );
    }
    if (sidebarCategory === "Dairy & More") {
      return (
        text.includes("milk") ||
        text.includes("dairy") ||
        text.includes("egg") ||
        text.includes("honey") ||
        text.includes("tea") ||
        text.includes("cheese") ||
        text.includes("butter")
      );
    }
    return true;
  });

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-14">
            {/* Top Grid: Info + Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EC] text-[#1B4D36] text-xs font-bold tracking-wide mb-3">
                  <Leaf className="w-3.5 h-3.5 text-[#1B4D36]" />
                  <span>{data.category || "Our Products"}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#12482C] leading-[1.18] tracking-tight mb-4">
                  {data.title}
                </h1>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-7">
                  {data.description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#FFD32F] text-[#12482C] font-bold text-sm sm:text-base pl-6 pr-2 py-2 rounded-full shadow-sm hover:bg-[#F2C94C] transition-all group"
                >
                  <span>{data.enquiry?.label && !/enquir/i.test(data.enquiry.label) ? data.enquiry.label : "Contact Us"}</span>
                  <span className="w-9 h-9 rounded-full bg-[#12482C] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              <div className="md:col-span-5">
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-neutral-100 bg-[#EEF5EC]">
                  <Image
                    key={mainImgSrc}
                    src={mainImgSrc}
                    alt={activeImage.alt || data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-center transition-opacity duration-300"
                    priority
                    unoptimized={mainImgSrc.startsWith("http")}
                    onError={() => {
                      if (mainImgSrc !== "/images/almonds.jpg") {
                        setMainImgSrc("/images/almonds.jpg");
                      }
                    }}
                  />
                </div>

                {images.length > 1 && (
                  <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-[#EEF5EC] ${
                          idx === activeImageIndex
                            ? "border-[#12482C] scale-105 shadow-sm"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt || ""}
                          fill
                          sizes="64px"
                          className="object-cover"
                          unoptimized={img.src.startsWith("http")}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Overview Section */}
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
                    src={data.overview.image || activeImage.src}
                    alt={data.overview.imageAlt || data.overview.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center"
                    unoptimized={Boolean((data.overview.image || activeImage.src)?.startsWith("http"))}
                  />
                </div>
              </div>
            )}

            {/* Key Features */}
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
                        <ProductIcon name={item.icon} className="w-5 h-5 text-[#1B4D36]" />
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

            {/* Specifications */}
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

            {/* Quality & Benefits */}
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

            {/* Availability */}
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
                        <ProductIcon name={item.icon} className="w-5 h-5 text-white" />
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

          {/* Right Sidebar: Categories & Products (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="bg-[#12482C] px-5 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Categories
                </h3>
                <span className="text-xs bg-white/20 text-white font-semibold px-2.5 py-0.5 rounded-full">
                  {filteredSidebarProducts.length} Products
                </span>
              </div>

              {/* Category Filter Tabs for Small Devices & Desktop */}
              <div className="p-3 border-b border-gray-100 bg-[#FBFDFA]">
                <div className="flex items-center justify-start gap-1.5 overflow-x-auto pb-1 px-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {["All", "Vegetables", "Fruits", "Grains", "Dairy & More"].map((cat) => {
                    const isSelected = sidebarCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSidebarCategory(cat)}
                        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                          isSelected
                            ? "bg-[#12482C] text-white shadow-xs"
                            : "bg-white text-gray-700 hover:bg-[#EAF5EC] hover:text-[#12482C] border border-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Products List: responsive grid on small devices, smooth list on desktop */}
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-none lg:max-h-[640px] lg:overflow-y-auto no-scrollbar">
                {filteredSidebarProducts.map((item) => {
                  const prodSlug = slugify(item.title);
                  const isActive =
                    prodSlug === currentSlug ||
                    item.id === data.id ||
                    item.title.toLowerCase() === data.title.toLowerCase();

                  return (
                    <Link
                      key={item.id}
                      href={`/products/${prodSlug}`}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-[#EAF5EC] text-[#12482C] font-bold"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-[#EEF5EC]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized={item.image.startsWith("http")}
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-semibold leading-snug truncate block">
                            {item.title}
                          </span>
                          {item.price && (
                            <span className="text-[11px] text-gray-500 block truncate">
                              {item.price}
                            </span>
                          )}
                        </div>
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
          </aside>
        </div>
      </div>
    </section>
  );
}