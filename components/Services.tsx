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
  Home
} from "lucide-react";
import { ServicesData } from "@/types";

interface ServicesProps {
  data: ServicesData;
}

export default function Services({ data }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "tractor":
        return <Tractor className="w-5 h-5" />;
      case "sprout":
      case "leaf":
        return <Sprout className="w-5 h-5" />;
      case "droplets":
        return <Droplets className="w-5 h-5" />;
      case "wheat":
        return <Wheat className="w-5 h-5" />;
      case "sun":
        return <Sun className="w-5 h-5" />;
      case "shield-check":
      case "bug":
        return <ShieldCheck className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      case "heart":
        return <Heart className="w-5 h-5" />;
      case "award":
        return <Award className="w-5 h-5" />;
      case "globe":
        return <Globe className="w-5 h-5" />;
      case "home":
        return <Home className="w-5 h-5" />;
      default:
        return <Sprout className="w-5 h-5" />;
    }
  };

  const renderTitle = (title: string) => {
    if (title === "Delivering natural farm services with trusted quality") {
      return (
        <>
          Delivering natural farm services <br className="hidden sm:block" />
          <span className="text-[#166534]">with trusted quality</span>
        </>
      );
    }
    return title;
  };

  return (
    <section id="services" className="w-full py-16 sm:py-24 bg-white relative px-4 sm:px-8 lg:px-12 xl:px-16 animate-fadeIn">
      {/* Decorative background element (optional, like the farm landscape in the image) */}
      <div className="absolute top-0 right-0 w-1/3 h-48 bg-[url('/images/farm-landscape.svg')] bg-no-repeat bg-right-top bg-contain opacity-20 pointer-events-none hidden lg:block" />

      <div className="w-full text-center mb-16 animate-fadeUp relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-[#166534] border border-[#166534]/20 mb-6 bg-white shadow-sm">
          <Leaf className="w-4 h-4 text-[#166534]" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-900 mb-6">
          {renderTitle(data.title)}
        </h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-gray-600">
          {data.description}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10 max-w-7xl mx-auto">
        {data.items.map((service) => (
          <div
            key={service.id}
            className="group relative rounded-[20px] overflow-hidden bg-[#0A2F1D] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col bg-[#0A2F1D] text-white">
              <div className="w-11 h-11 rounded-full bg-[#F2C94C] text-gray-900 flex items-center justify-center mb-5">
                {getIcon(service.icon)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold tracking-tight text-white mb-2.5">
                  {service.title}
                </h3>
                <p className="text-[15px] text-gray-300/90 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-2 cursor-pointer group/link w-fit">
                <span className="text-[15px] font-bold text-white group-hover/link:text-[#F2C94C] transition-colors">
                  Read More
                </span>
                <div className="w-6 h-6 rounded-full bg-[#F2C94C] text-gray-900 flex items-center justify-center transform group-hover/link:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
