"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { TeamData } from "@/types";
import { teamData as defaultTeamData } from "@/data";

interface TeamProps {
  data?: TeamData;
}

export default function Team({ data = defaultTeamData }: TeamProps) {
  const members = data?.members ?? [];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return {
          icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          ),
          style: "bg-[#16532D] text-white hover:bg-[#0F3D22] hover:scale-110",
        };
      case "instagram":
        return {
          icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ),
          style: "bg-[#F2C94C] text-[#0F3D22] hover:bg-[#E5BB3B] hover:scale-110",
        };
      case "phone":
        return {
          icon: <Phone className="h-4 w-4" fill="currentColor" />,
          style: "bg-[#16532D] text-white hover:bg-[#0F3D22] hover:scale-110",
        };
      case "youtube":
        return {
          icon: (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          ),
          style: "bg-[#F2C94C] text-[#0F3D22] hover:bg-[#E5BB3B] hover:scale-110",
        };
      case "twitter":
      case "x":
      default:
        return {
          icon: (
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
          style:
            "border border-gray-300 bg-white text-[#0F3D22] hover:border-[#16532D] hover:bg-[#F2F6EF] hover:scale-110",
        };
    }
  };

  return (
    <section
      id={data?.sectionId || "team"}
      className="w-full overflow-hidden bg-white pt-10 sm:pt-14 pb-16 lg:pb-24 font-sans"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#16532D] sm:text-5xl lg:text-[52px]">
            {data?.title || "Our Team"}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            {data?.subtitle ||
              "Our team of experienced farmers, agricultural experts and sustainability enthusiasts work together to bring you the best natural and organic products."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:gap-9 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_6px_25px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div className="relative">
                <div className="relative aspect-[1.12] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-x-0 -bottom-1 h-6">
                  <svg
                    viewBox="0 0 400 24"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <path
                      d="M0,4 Q200,24 400,4 L400,24 L0,24 Z"
                      fill="#ffffff"
                    />
                    <path
                      d="M0,4 Q200,24 400,4"
                      fill="none"
                      stroke="#F2C94C"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-3 right-6 z-10 flex h-13 w-13 items-center justify-center rounded-full bg-[#16532D] text-white shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3C12 3 9.5 7.5 9.5 11C9.5 12.66 10.84 14 12.5 14C14.16 14 15.5 12.66 15.5 11C15.5 7.5 12 3 12 3Z" />
                    <path d="M10.5 14C6.5 14 3.5 10.5 3.5 7C7.5 7 10.5 10.5 11 13.5" />
                    <path d="M14.5 14C18.5 14 21.5 10.5 21.5 7C17.5 7 14.5 10.5 14 13.5" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
                <h3 className="text-2xl font-extrabold text-[#0B2A18]">
                  {member.name}
                </h3>

                <p className="mt-1 text-base font-semibold text-[#166534]">
                  {member.role}
                </p>

                <div className="my-3.5 h-1 w-10 rounded-full bg-[#F2C94C]" />

                <p className="text-[15px] leading-relaxed text-[#4B5563]">
                  {member.bio}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2.5">
                    {(member.socials ?? [
                      { platform: "facebook", href: "#" },
                      { platform: "instagram", href: "#" },
                      { platform: "phone", href: "#" },
                      { platform: "youtube", href: "#" },
                      { platform: "twitter", href: "#" },
                    ]).map((social, idx) => {
                      const { icon, style } = getSocialIcon(social.platform);
                      return (
                        <a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on ${social.platform}`}
                          className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-all duration-300 sm:h-10 sm:w-10 ${style}`}
                        >
                          {icon}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
