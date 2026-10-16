"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
import type { FooterData, SocialLink } from "@/types";

interface FooterProps {
  data: FooterData;
}

const contactIconBadgeClasses =
  "w-9 h-9 rounded-full bg-[#134423] text-emerald-100 border border-emerald-800/60 flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:bg-[#facc15] group-hover:text-[#052412] group-hover:border-[#facc15]";

export default function Footer({ data }: FooterProps) {
  const renderSocialIcon = (icon: string) => {
    const baseClasses =
      "w-9 h-9 rounded-full bg-[#134423] text-emerald-100 border border-emerald-800/60 flex items-center justify-center transition-all duration-300 hover:bg-[#facc15] hover:text-[#052412] hover:border-[#facc15] hover:scale-110 active:scale-95 shadow-sm";

    switch (icon.toLowerCase()) {
      case "facebook":
        return (
          <span className={baseClasses}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </span>
        );
      case "instagram":
        return (
          <span className={baseClasses}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </span>
        );
      case "linkedin":
        return (
          <span className={baseClasses}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.72a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z" />
            </svg>
          </span>
        );
      case "youtube":
        return (
          <span className={baseClasses}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-[#052412] text-white pt-10 sm:pt-14 pb-6 border-t border-emerald-900/40 relative overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
      <div className="w-full relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 pb-8">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 focus:outline-none group">
              <Image
                src={data.brand.logo || "/logo.png"}
                alt={`${data.brand.name} ${data.brand.tagline}`}
                width={220}
                height={56}
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-[13px] text-emerald-100/75 leading-relaxed pr-2 sm:pr-4">
              {data.brand.description}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              {data.socialLinks.map((item: SocialLink) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  {renderSocialIcon(item.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {data.titles?.quickLinks || "Quick Links"}
              </h4>
              <div className="w-9 h-[3px] bg-[#facc15] rounded-full mt-2" />
            </div>

            <ul className="space-y-3 text-xs sm:text-[13px] text-emerald-100/85 pt-1">
              {data.quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#facc15] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#facc15] shrink-0 group-hover:translate-x-1 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {data.titles?.ourProducts || "Our Products"}
              </h4>
              <div className="w-9 h-[3px] bg-[#facc15] rounded-full mt-2" />
            </div>

            <ul className="space-y-2.5 text-xs sm:text-[13px] text-emerald-100/85 pt-1">
              {data.productLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[#facc15] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:text-[#facc15] shrink-0 group-hover:translate-x-1 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {data.titles?.contactInfo || "Contact Info"}
              </h4>
              <div className="w-9 h-[3px] bg-[#facc15] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 text-xs sm:text-[13px] text-emerald-100/85 pt-1">
              <li className="flex items-start gap-3 group">
                <div className={`${contactIconBadgeClasses} mt-0.5`}>
                  <MapPin className="w-4 h-4 transition-colors" />
                </div>
                <div className="leading-snug pt-1 whitespace-pre-line group-hover:text-amber-200 transition-colors">
                  {data.contact.address}
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <div className={contactIconBadgeClasses}>
                  <Phone className="w-4 h-4 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="hover:text-[#facc15] font-semibold transition-colors"
                  >
                    {data.contact.phone}
                  </a>
                  {data.contact.phone2 && (
                    <a
                      href={`tel:${data.contact.phone2}`}
                      className="hover:text-[#facc15] font-semibold transition-colors"
                    >
                      {data.contact.phone2}
                    </a>
                  )}
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <div className={contactIconBadgeClasses}>
                  <Mail className="w-4 h-4 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="hover:text-[#facc15] transition-colors"
                  >
                    {data.contact.email}
                  </a>
                  {data.contact.email2 && (
                    <a
                      href={`mailto:${data.contact.email2}`}
                      className="hover:text-[#facc15] transition-colors"
                    >
                      {data.contact.email2}
                    </a>
                  )}
                </div>
              </li>

              <li className="flex items-start gap-3 group">
                <div className={`${contactIconBadgeClasses} mt-0.5`}>
                  <Clock className="w-4 h-4 transition-colors" />
                </div>
                <div className="leading-snug pt-1 whitespace-pre-line group-hover:text-amber-200 transition-colors">
                  {data.contact.hours}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900/60 pt-6">
          <p className="text-xs text-emerald-200/70">
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
