
"use client";

import React from "react";
import Image from "next/image";
import {
  Tractor,
  Sprout,
  Droplets,
  Wheat,
  Sun,
  ShieldCheck,
  Users,
  Heart,
  ArrowRight,
  Leaf,
  Award,
  Globe,
  Home,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ServicesData } from "@/types";
import { servicesData as defaultServicesData } from "@/data";

interface ServicesProps {
  data?: ServicesData;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services({ data = defaultServicesData }: ServicesProps) {
  const getIcon = (iconName: string) => {
    const iconClass = "h-5 w-5";

    switch (iconName) {
      case "tractor":
        return <Tractor className={iconClass} />;
      case "sprout":
      case "leaf":
        return <Sprout className={iconClass} />;
      case "droplets":
        return <Droplets className={iconClass} />;
      case "wheat":
        return <Wheat className={iconClass} />;
      case "sun":
        return <Sun className={iconClass} />;
      case "shield-check":
      case "bug":
        return <ShieldCheck className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      case "heart":
        return <Heart className={iconClass} />;
      case "award":
        return <Award className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      case "home":
        return <Home className={iconClass} />;
      default:
        return <Sprout className={iconClass} />;
    }
  };

  const renderTitle = (title: string) => {
    const highlight = data.highlightText || "with trusted quality";

    if (!title.includes(highlight)) {
      return title;
    }

    const parts = title.split(highlight);

    return (
      <>
        {parts[0]}
        <br className="hidden sm:block" />
        <span className="text-[#26783C]">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <section
      id="services"
      className="relative isolate w-full overflow-hidden bg-[#FAFBF6] px-4 py-4  sm:px-6  lg:px-10 xl:px-12"
    >
    
      <div className="pointer-events-none absolute -left-20 top-40 -z-10 h-64 w-64 rounded-full bg-[#DDEBD8]/30 blur-3xl" />

      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mb-10 max-w-4xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E4EAE0] bg-white/90 px-4 py-2 text-sm font-semibold text-[#236438] shadow-sm backdrop-blur-md">
            <Leaf className="h-4 w-4 fill-[#236438]" />
            <span>{data.badge}</span>
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#111B14] sm:text-4xl md:text-5xl lg:text-[46px]">
            {renderTitle(data.title)}
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#FFD32F] sm:mt-5" />

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-[#666B66] sm:text-base sm:leading-7">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[18px]"
        >
          {data.items.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative isolate flex min-h-[310px] flex-col overflow-hidden rounded-[18px] bg-[#092B19] shadow-[0_5px_18px_rgba(16,48,27,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_32px_rgba(16,48,27,0.22)] sm:min-h-[315px] lg:min-h-[320px]"
            >
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 via-[#061B10]/15 via-[35%] to-[#062817]/95" />

              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#052714]/90 via-transparent to-transparent opacity-90" />

              <div className="flex flex-1 flex-col justify-end p-5 pt-24 sm:p-5 sm:pt-28">
                <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFD32F] text-[#15391F] shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {getIcon(service.icon)}
                </div>

                <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight text-white sm:text-[19px]">
                  {service.title}
                </h3>

                <p className="mb-4 text-sm leading-[1.55] text-white/90 sm:text-[14.5px]">
                  {service.description}
                </p>

                <a
                  href={`/services/${service.id}`}
                  aria-label={`Read more about ${service.title}`}
                  className="group/link inline-flex w-fit items-center gap-3 text-sm font-semibold text-white"
                >
                  <span className="transition-colors duration-200 group-hover/link:text-[#FFD32F]">
                    Read More
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD32F] text-[#15391F] transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:bg-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[18px] border border-white/15 transition-colors duration-300 group-hover:border-[#FFD32F]/60" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Services, Services as Service, Services as Servicesection };
