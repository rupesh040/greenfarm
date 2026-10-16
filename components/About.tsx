"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Check, ArrowRight, Leaf, Sprout, Tractor, ShieldCheck, Award } from "lucide-react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { AboutData } from "@/types";
import { aboutData as defaultAboutData } from "@/data";

function CountingNumber({
  value,
  duration = 1.6,
}: {
  value: string | number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const strVal = String(value);
    const match = strVal.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match) return;

    const prefix = match[1] || "";
    const target = parseInt(match[2], 10);
    const suffix = match[3] || "";
    ref.current.textContent = `${prefix}0${suffix}`;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{value}</span>;
}

interface AboutProps {
  data?: AboutData;
  showCta?: boolean;
}

export default function About({
  data = defaultAboutData,
  showCta = true,
}: AboutProps) {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const shouldShowCta = showCta && !isAboutPage;

  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leafParallax = useTransform(scrollYProgress, [0, 1], [-25, 35]);
  const farmParallax = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const primaryImageParallax = useTransform(scrollYProgress, [0, 1], [20, -25]);
  const secondaryImageParallax = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const sunDiscParallax = useTransform(scrollYProgress, [0, 1], [10, 45]);

  const safeData = data || defaultAboutData;
  const images = safeData.images || defaultAboutData.images || {};

  const primaryImage = images.couple || images.primary || "/about/about-1.jpg";
  const primaryAlt = images.coupleAlt || images.primaryAlt || "Farmer couple harvesting fresh vegetables";

  const secondaryImage = images.femaleFarmer || images.secondary || "/about/about-2.jpg";
  const secondaryAlt = images.femaleFarmerAlt || images.secondaryAlt || "Farmer woman holding seedling nursery tray";

  const leafBackground = images.leafBackground || "/Glossy-Leaf-2.webp";
  const leafBackgroundAlt = images.leafBackgroundAlt || "";

  const farmBackground = images.farmBackground || "/farm.webp";
  const farmBackgroundAlt = images.farmBackgroundAlt || "";

  const experienceLeaf = images.experienceLeaf || "/Glossy-Leaf.webp";
  const experienceLeafAlt = images.experienceLeafAlt || "Experience leaf";

  const getFeatureIcon = (iconName?: string, index?: number) => {
    switch (iconName?.toLowerCase()) {
      case "sprout":
      case "plant":
        return (
          <Sprout
            className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.2}
          />
        );
      case "farm":
      case "tractor":
        return (
          <Tractor
            className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.2}
          />
        );
      case "shield":
      case "quality":
        return (
          <ShieldCheck
            className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.2}
          />
        );
      case "award":
        return (
          <Award
            className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2.2}
          />
        );
      case "leaf":
      default:
        if (index === 1 && !iconName) {
          return (
            <Sprout
              className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:scale-110 transition-transform duration-300"
              strokeWidth={2.2}
            />
          );
        }
        return (
          <Leaf
            className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#166534] fill-[#166534]/15 group-hover:rotate-12 transition-transform duration-300"
            strokeWidth={2.2}
          />
        );
    }
  };

  const renderTitle = () => {
    const title = safeData.title || "";
    const highlight = safeData.highlightText || "Nurturing Nature at Home";

    if (highlight && title.includes(highlight)) {
      const parts = title.split(highlight);
      return (
        <div className="space-y-1.5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-extrabold text-[#111827] tracking-normal leading-[1.2] whitespace-normal sm:whitespace-nowrap"
          >
            {parts[0].trim()}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-nowrap items-center gap-2.5"
          >
            <span className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-extrabold tracking-normal leading-[1.2] text-[#15803d] whitespace-nowrap">
              {highlight}
            </span>
            <span className="inline-flex items-center text-[#eab308] shrink-0">
              <svg
                viewBox="0 0 54 36"
                fill="none"
                className="w-8 sm:w-11 h-5 sm:h-7 -mb-1"
              >
                <path
                  d="M4,28 C16,28 32,18 50,6"
                  stroke="#eab308"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M50,6 C47,13 40,16 33,16 C39,11 44,9 50,6 Z"
                  fill="#eab308"
                />
                <path
                  d="M39,14 C36,21 29,23 22,23 C28,18 33,16 39,14 Z"
                  fill="#eab308"
                />
                <path
                  d="M28,21 C25,27 18,29 11,29 C17,25 22,23 28,21 Z"
                  fill="#eab308"
                />
              </svg>
            </span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-[2.5px] bg-[#15803d] rounded-full mt-2"
          />
        </div>
      );
    }

    return (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-extrabold text-[#111827] tracking-tight leading-[1.2]"
      >
        {title}
      </motion.h2>
    );
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full overflow-hidden bg-white pt-6 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16"
    >
      {leafBackground && (
        <motion.div
          style={mounted ? { y: leafParallax } : undefined}
          className="pointer-events-none absolute -bottom-8 -left-8 sm:-bottom-6 sm:-left-6 w-48 sm:w-64 md:w-72 select-none z-0"
        >
          <div className="relative w-full h-48 sm:h-64">
            <div className="absolute bottom-2 left-2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#facc15] opacity-90 -z-10" />
            <Image
              src={leafBackground}
              alt={leafBackgroundAlt}
              width={320}
              height={320}
              className="w-full h-full object-contain object-bottom-left rotate-160 opacity-10"
            />
          </div>
        </motion.div>
      )}

      {farmBackground && (
        <motion.div
          style={mounted ? { y: farmParallax } : undefined}
          className="pointer-events-none absolute bottom-0 right-0 w-72 sm:w-[460px] md:w-[540px] lg:w-[620px] select-none opacity-[0.06] sm:opacity-[0.08] mix-blend-multiply z-0 pointer-events-none"
        >
          <Image
            src={farmBackground}
            alt={farmBackgroundAlt}
            width={740}
            height={180}
            className="w-full h-auto object-contain object-bottom"
          />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          <div className="lg:col-span-6 relative w-full">
            <div className="relative w-full pb-20 sm:pb-28">
              
              <motion.div
                style={mounted ? { y: sunDiscParallax } : undefined}
                className="absolute top-6 sm:top-10 right-2 sm:right-6 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#facc15] opacity-90 select-none pointer-events-none -z-0"
              />

              <motion.div
                style={mounted ? { y: primaryImageParallax } : undefined}
                initial={{ opacity: 0, x: -40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[84%] sm:w-[86%] aspect-[1.3/1] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border-4 sm:border-[6px] border-white group bg-gray-50"
              >
                <Image
                  src={primaryImage}
                  alt={primaryAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                style={mounted ? { y: secondaryImageParallax } : undefined}
                initial={{ opacity: 0, x: 30, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 -bottom-6 sm:-bottom-10 z-20 w-[74%] sm:w-[76%] aspect-[1/1] sm:aspect-[1.05/1] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white group bg-gray-50"
              >
                <Image
                  src={secondaryImage}
                  alt={secondaryAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 75vw, 38vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col space-y-6 w-full">
            {safeData.badge && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#eef8f0] to-[#e0f2e5] text-[#166534] border border-[#bbf7d0] px-4 py-1.5 text-xs sm:text-[13px] font-bold tracking-wide self-start shadow-sm"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#166534] text-white shadow-xs">
                  <Leaf className="w-3 h-3 fill-current" />
                </span>
                <span>{safeData.badge}</span>
              </motion.div>
            )}

            {renderTitle()}

            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-stretch pt-1">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="col-span-1 md:col-span-5 bg-gradient-to-b from-white to-[#fbfdfa] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 lg:p-7 shadow-[0_12px_36px_rgba(20,83,45,0.07)] border border-emerald-100/80 relative overflow-hidden flex flex-col justify-center items-center text-center transition-all duration-300 h-full group"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-20 sm:w-24 h-20 sm:h-24 opacity-10 pointer-events-none text-[#15803d]">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10,90 C30,40 60,20 90,10 C80,50 60,70 10,90 Z" />
                  </svg>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 relative z-10">
                  {experienceLeaf && (
                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl p-0.5 shrink-0 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                      <div className="w-full h-full rounded-[14px] flex items-center justify-center p-1.5">
                        <Image
                          src={experienceLeaf}
                          alt={experienceLeafAlt}
                          width={32}
                          height={32}
                          className="w-9 h-9 sm:w-9 sm:h-9 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl md:text-5xl xl:text-[60px] font-black text-[#0f3b1e] tracking-tight leading-none">
                      <CountingNumber value={safeData.experienceYears} />
                    </div>
                  </div>
                </div> 
                <div className="text-[11px] sm:text-xs md:text-[13px] font-bold text-gray-500 mt-2 text-center leading-snug tracking-wide uppercase relative z-10">
                  {safeData.experienceLabel}
                </div>
              </motion.div>

              <div className="col-span-1 md:col-span-7 flex flex-col justify-between space-y-2.5 sm:space-y-3.5 pl-0 md:pl-2">
                {(safeData.features || []).map((feature, idx) => (
                  <React.Fragment key={feature.id || idx}>
                    <motion.div
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.15 * idx, ease: "easeOut" }}
                      className="flex items-start gap-2.5 sm:gap-3.5 group"
                    >
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] border border-[#86efac]/70 shadow-[0_4px_14px_rgba(22,101,52,0.1)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:shadow-[0_6px_18px_rgba(22,101,52,0.18)] transition-all duration-300">
                        {getFeatureIcon(feature.icon, idx)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight group-hover:text-[#166534] transition-colors duration-200">
                          {feature.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-[13px] text-gray-500 leading-snug sm:leading-relaxed mt-0.5">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>

                    {idx < safeData.features.length - 1 && (
                      <div className="w-full h-[1px] bg-gradient-to-r from-gray-200/80 via-emerald-100/60 to-transparent my-1 sm:my-1.5 md:my-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {safeData.description && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed pt-1 relative z-10"
              >
                {safeData.description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2 relative z-10"
            >
              {safeData.checkpoints && safeData.checkpoints.length > 0 && (
                <div className="space-y-2.5">
                  {safeData.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#22c55e] to-[#15803d] text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(21,128,61,0.25)] group-hover:scale-110 transition-transform duration-200">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-[14.5px] font-semibold text-gray-800">
                        {cp}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {shouldShowCta && safeData.ctaButton && safeData.ctaButton.label && (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-[1px] h-10 bg-gray-200" />
                  <a
                    href={safeData.ctaButton.href}
                    className="inline-flex items-center gap-3 bg-[#facc15] hover:bg-[#eab308] text-gray-950 font-bold text-sm sm:text-base pl-6 pr-2.5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(234,179,8,0.25)] hover:shadow-[0_6px_22px_rgba(234,179,8,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group cursor-pointer"
                  >
                    <span>{safeData.ctaButton.label}</span>
                    <span className="w-8 h-8 rounded-full bg-[#0d2a17] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

export { About };
