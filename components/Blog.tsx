import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, User, Sprout } from "lucide-react";
import { BlogData } from "@/types";

interface BlogProps {
  data: BlogData;
}

export default function Blog({ data }: BlogProps) {
  return (
    <section id="blog" className="w-full py-16 sm:py-24 bg-white relative px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
      <div className="w-full text-center mb-14 animate-fadeUp">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-50 text-[#166534] border border-emerald-200/60 mb-3">
          <Sprout className="w-3.5 h-3.5 text-emerald-500 animate-bounceGentle" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">
          {data.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
          {data.description}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.items.map((post) => (
          <article
            key={post.id}
            className="group rounded-3xl overflow-hidden bg-zinc-50 border border-gray-200/90 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="relative h-60 w-full overflow-hidden bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg text-center min-w-[54px] border border-emerald-100 group-hover:scale-105 transition-transform">
                <span className="block text-base font-black text-[#166534] leading-tight">
                  {post.date.split(" ")[0]}
                </span>
                <span className="block text-[10px] font-bold text-gray-500 uppercase">
                  {post.date.split(" ")[1]}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 bg-emerald-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {post.date}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 group-hover:text-[#166534] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-gray-200/80">
                <a
                  href={post.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#166534] group-hover:text-[#14532d] transition-colors"
                >
                  <span>Read Full Article</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#166534] flex items-center justify-center transform group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
