"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar, CheckCircle2 } from "lucide-react";
import { BlogDetailData } from "@/types";
import { blogDetailData as defaultBlogDetailData } from "@/data";

interface BlogDetailProps {
  data?: BlogDetailData;
}

export default function BlogDetail({
  data = defaultBlogDetailData,
}: BlogDetailProps) {
  if (!data) return null;

  return (
    <article className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          <div className="lg:col-span-8 space-y-9 sm:space-y-11">
            <div>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-md bg-[#FEF3C7] text-[#D97706] text-xs font-bold tracking-wide uppercase">
                  {data.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#111827] leading-[1.22] tracking-tight mb-4">
                {data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#15803D]" />
                  <span>By {data.author}</span>
                </div>
                <span className="text-gray-300">/</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#15803D]" />
                  <span>{data.date}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-gray-100">
              <Image
                src={data.heroImage}
                alt={data.heroImageAlt || data.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 68vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 text-gray-600 text-sm sm:text-[15.5px] leading-relaxed sm:leading-[1.75]">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {data.section1 && (
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  {data.section1.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                  {data.section1.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2 items-stretch">
                
                  <div className="md:col-span-6 relative h-[240px] sm:h-[280px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                    <Image
                      src={data.section1.image}
                      alt={data.section1.imageAlt || data.section1.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="md:col-span-6 rounded-2xl p-6 sm:p-7 bg-[#FAF6EE] border border-[#F3ECE0] flex flex-col justify-center">
                    <ul className="space-y-3">
                      {data.section1.checklist.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#4A5568] font-medium leading-snug"
                        >
                          <span className="text-[#F5B800] text-lg leading-none shrink-0 font-black">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {data.section2 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  {data.section2.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                  {data.section2.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                  {data.section2.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-[200px] sm:h-[240px] rounded-2xl overflow-hidden shadow-sm bg-gray-100"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 35vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {data.section2.quote && (
                  <div className="mt-6 rounded-2xl sm:rounded-[22px] p-6 sm:p-8 bg-[#0B351E] text-white flex items-start sm:items-center gap-5 sm:gap-6 shadow-md border border-[#164D2D]">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F5B800] text-[#0B351E] flex items-center justify-center font-serif text-3xl sm:text-4xl font-extrabold shrink-0 shadow-sm">
                      <span className="leading-none mt-1">“</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <blockquote className="italic text-white/95 text-sm sm:text-base leading-relaxed sm:leading-[1.7] font-medium">
                        &quot;{data.section2.quote.text}&quot;
                      </blockquote>
                      <span className="text-[#F5B800] text-xs sm:text-[13px] font-bold tracking-wider uppercase mt-3 block">
                        {data.section2.quote.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {data.section3 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  {data.section3.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                  {data.section3.description}
                </p>

                <ul className="space-y-2.5 pt-1">
                  {data.section3.checklist.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed"
                    >
                      <span className="text-[#15803D] text-base leading-none shrink-0 font-black">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-3">
                  {data.section3.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-sm bg-gray-100"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 35vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {data.section3.conclusion && (
                  <p className="text-gray-600 text-sm sm:text-[15.5px] leading-relaxed pt-3">
                    {data.section3.conclusion}
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-2xl sm:rounded-[22px] overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white">
              <div className="bg-[#0B351E] px-6 py-4 text-white font-bold text-lg tracking-wide flex items-center justify-between">
                <span>Latest Blogs</span>
              </div>

              <div className="p-5 sm:p-6 space-y-5 divide-y divide-gray-100">
                {data.latestBlogs.map((blog, idx) => (
                  <Link
                    key={blog.id || idx}
                    href={blog.href}
                    className={`group/item flex items-center gap-4 transition-transform hover:-translate-y-0.5 ${
                      idx !== 0 ? "pt-5" : ""
                    }`}
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-sm">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-gray-400 font-medium block">
                        {blog.date}
                      </span>

                      <span className="inline-block text-[10px] font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full my-1">
                        {blog.category}
                      </span>

                      <h4 className="text-xs sm:text-[13.5px] font-bold text-[#111827] group-hover/item:text-[#166534] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
