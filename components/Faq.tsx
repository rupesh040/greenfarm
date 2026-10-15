"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Sprout } from "lucide-react";
import { FaqData } from "@/types";
import { faqData as defaultFaqData } from "@/data";

interface FaqProps {
  data?: FaqData;
}

const LEAF_LIGHT = "/images/leaf-light.png";

type Direction = "left" | "right" | "up" | "down" | "scale";

const hiddenState: Record<Direction, string> = {
  left: "-translate-x-12 opacity-0",
  right: "translate-x-12 opacity-0",
  up: "translate-y-8 opacity-0",
  down: "-translate-y-6 opacity-0",
  scale: "scale-50 opacity-0",
};

const shownState = "translate-x-0 translate-y-0 scale-100 opacity-100";

function Reveal({
  from = "up",
  delay = 0,
  className = "",
  children,
}: {
  from?: Direction;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${
        show ? shownState : hiddenState[from]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LeafImage({
  size,
  rotate = 0,
  flip = false,
  className = "",
}: {
  size: number;
  rotate?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={LEAF_LIGHT}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable={false}
      className={`select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
      }}
    />
  );
}

function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;

  const parts = text.split(highlight);

  return (
    <>
      {parts[0]}
      <span className="text-[#15803D]">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
}

export default function Faq({ data = defaultFaqData }: FaqProps) {
  const faqs = data?.faqs ?? [];
  const [openId, setOpenId] = useState<string | null>(
    data?.defaultOpenId ?? faqs[0]?.id ?? null
  );

  return (
    <section
      id={data?.sectionId || "faq"}
      className="relative w-full overflow-x-clip bg-[#F6FAF3] pt-10 sm:pt-14 pb-16 lg:pb-24 font-sans"
    >
      <div className="pointer-events-none absolute -left-10 top-10 hidden md:block">
        <Reveal from="scale" delay={500}>
          <LeafImage size={190} rotate={30} className="opacity-60" />
        </Reveal>
      </div>
      <div className="pointer-events-none absolute -left-12 bottom-24 hidden md:block">
        <Reveal from="scale" delay={700}>
          <LeafImage size={150} rotate={-20} className="opacity-60" />
        </Reveal>
      </div>
      <div className="pointer-events-none absolute -right-8 top-6 hidden md:block">
        <Reveal from="scale" delay={600}>
          <LeafImage size={210} rotate={-30} flip className="opacity-60" />
        </Reveal>
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-2 hidden md:block">
        <Reveal from="scale" delay={800}>
          <LeafImage size={170} rotate={35} className="opacity-60" />
        </Reveal>
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <Reveal from="down" delay={150}>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#0B2A18] sm:text-5xl">
              <HighlightedText text={data.title} highlight={data.highlightText} />
            </h2>
          </Reveal>

          <Reveal from="up" delay={300}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#4B5563] sm:text-[17px]">
              {data.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[0.82fr_1fr] lg:gap-8">
          <Reveal from="left" delay={100}>
            <div className="rounded-[22px] bg-white p-3 shadow-[0_10px_40px_rgba(15,61,34,0.08)]">
              <div className="relative aspect-[1.1] w-full overflow-hidden rounded-[18px]">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <ul className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              const buttonId = `faq-button-${faq.id}`;

              return (
                <li key={faq.id}>
                  <Reveal from="right" delay={150 + index * 90}>
                    <div className="overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_rgba(15,61,34,0.07)]">
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className={`flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold transition-colors duration-300 sm:text-[17px] ${
                            isOpen
                              ? "bg-[#0F4A28] text-white"
                              : "bg-white text-[#0B2A18] hover:bg-[#F6FAF3]"
                          }`}
                        >
                          <span>
                            <span className="mr-2">{index + 1}.</span>
                            {faq.question}
                          </span>

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFD60A] text-[#0F4A28]">
                            {isOpen ? (
                              <Minus className="h-4 w-4" strokeWidth={3} />
                            ) : (
                              <Plus className="h-4 w-4" strokeWidth={3} />
                            )}
                          </span>
                        </button>
                      </h3>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-5 pt-4 text-[15px] leading-7 text-[#6B7280] sm:pl-9">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}