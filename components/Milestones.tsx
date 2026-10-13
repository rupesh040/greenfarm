"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MilestonesData } from "@/types";
import { milestonesData as defaultMilestonesData } from "@/data";

interface MilestonesProps {
  data?: MilestonesData;
}

const LEAF = "/images/leaf.png";
const LEAF_CREAM = "/images/leaf.png";
const STAGGER = 180;

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type Direction = "left" | "right" | "up" | "down" | "pop";

const hiddenState: Record<Direction, string> = {
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  up: "translate-y-10 opacity-0",
  down: "-translate-y-8 opacity-0",
  pop: "scale-50 opacity-0",
};

const shownState = "translate-x-0 translate-y-0 scale-100 opacity-100";

interface RevealProps {
  show: boolean;
  from?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

function Reveal({
  show,
  from = "up",
  delay = 0,
  duration = 800,
  className = "",
  children,
}: RevealProps) {
  return (
    <div
      className={`transition-all ease-out motion-reduce:transition-none ${
        show ? shownState : hiddenState[from]
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface ParsedValue {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  useComma: boolean;
}

function parseValue(value: string | number): ParsedValue | null {
  const match = String(value).match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);

  if (!match) return null;

  const [, prefix, numText, suffix] = match;

  return {
    prefix,
    suffix,
    target: parseFloat(numText.replace(/,/g, "")),
    decimals: numText.includes(".") ? numText.split(".")[1].length : 0,
    useComma: numText.includes(","),
  };
}

function formatNumber(n: number, { decimals, useComma }: ParsedValue) {
  return useComma
    ? Math.round(n).toLocaleString("en-US")
    : n.toFixed(decimals);
}

function CountUp({ value, start }: { value: string | number; start: boolean }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!parsed || !start) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCurrent(parsed.target);
      return;
    }

    const duration = 1800;
    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      setCurrent(parsed.target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parsed, start]);

  if (!parsed) return <>{String(value)}</>;

  return (
    <>
      <span aria-hidden="true">
        {parsed.prefix}
        {formatNumber(current, parsed)}
        {parsed.suffix}
      </span>
      <span className="sr-only">
        {parsed.prefix}
        {formatNumber(parsed.target, parsed)}
        {parsed.suffix}
      </span>
    </>
  );
}

interface LeafImageProps {
  src?: string;
  size: number;
  rotate?: number;
  flip?: boolean;
  className?: string;
}

function LeafImage({
  src = LEAF,
  size,
  rotate = 0,
  flip = false,
  className = "",
}: LeafImageProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size * 2}
      height={size * 2}
      draggable={false}
      className={`absolute select-none ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg) ${flip ? "scaleX(-1)" : ""}`,
      }}
    />
  );
}

function LeafCluster({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  const m = flip ? -1 : 1;

  return (
    <div className="pointer-events-none relative h-14 w-14 sm:h-16 sm:w-16">
      <LeafImage size={38} rotate={-42 * m} flip={flip} className="left-0 top-0" />
      <LeafImage size={34} rotate={-72 * m} flip={flip} className="left-0 top-5 sm:top-6" />
      <LeafImage size={26} rotate={-18 * m} flip={flip} className="left-4 top-8 sm:left-5 sm:top-9" />
    </div>
  );
}

const iconCls = "h-11 w-11 sm:h-[58px] sm:w-[58px]";
const GREEN = "#195E32";
const GOLD = "#D99B1A";

const WHEAT_KERNELS = [
  "M24 6L21 11C21 13 22.5 14 24 14C25.5 14 27 13 27 11L24 6Z",
  "M20 12C18.5 14 19 17 21 18C22.5 18 24 16.5 24 15L20 12Z",
  "M28 12C29.5 14 29 17 27 18C25.5 18 24 16.5 24 15L28 12Z",
  "M20 17C18.5 19 19 22 21 23C22.5 23 24 21.5 24 20L20 17Z",
  "M28 17C29.5 19 29 22 27 23C25.5 23 24 21.5 24 20L28 17Z",
  "M20 22C18.5 24 19 27 21 28C22.5 28 24 26.5 24 25L20 22Z",
  "M28 22C29.5 24 29 27 27 28C25.5 28 24 26.5 24 25L28 22Z",
  "M14 18C12 20 13 23 15 24C16.5 24 18 22.5 17.5 21L14 18Z",
  "M11 22C9 24 10 27 12 28C13.5 28 15 26.5 14.5 25L11 22Z",
  "M17 22C19 24 18 27 16 28C14.5 28 13.5 26.5 14 25L17 22Z",
  "M34 18C36 20 35 23 33 24C31.5 24 30 22.5 30.5 21L34 18Z",
  "M37 22C39 24 38 27 36 28C34.5 28 33 26.5 33.5 25L37 22Z",
  "M31 22C29 24 30 27 32 28C33.5 28 34.5 26.5 34 25L31 22Z",
];

function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={iconCls}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function WheatIcon() {
  return (
    <IconFrame>
      <path d="M24 43V18" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 43C22 36 17 32 14 26" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <path d="M24 43C26 36 31 32 34 26" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      {WHEAT_KERNELS.map((d) => (
        <path key={d} d={d} fill="#F7C84E" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />
      ))}
      <path d="M10 43H38" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
    </IconFrame>
  );
}

function CowIcon() {
  return (
    <IconFrame>
      <path d="M17 13C14 11 13 8 15 6" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M31 13C34 11 35 8 33 6" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M15 16C10 14 5 16 6 19C7 22 12 22 16 21" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 16C38 14 43 16 42 19C41 22 36 22 32 21" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 14C20 12 28 12 33 14L33 24C33 27 31 29 30 31" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 14L15 24C15 27 17 29 18 31" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="16" y="29" width="16" height="12" rx="6" stroke={GREEN} strokeWidth="2.4" />
      <circle cx="21" cy="35" r="1.4" fill={GREEN} />
      <circle cx="27" cy="35" r="1.4" fill={GREEN} />
      <circle cx="20" cy="22" r="1.5" fill={GREEN} />
      <circle cx="28" cy="22" r="1.5" fill={GREEN} />
    </IconFrame>
  );
}

function BarnIcon() {
  return (
    <IconFrame>
      <path d="M12 21L16 13L24 9L32 13L36 21" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 21V36H34V21" stroke={GREEN} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="20" y="26" width="8" height="10" stroke={GREEN} strokeWidth="2" />
      <path d="M20 26L28 36" stroke={GREEN} strokeWidth="1.8" />
      <path d="M28 26L20 36" stroke={GREEN} strokeWidth="1.8" />
      <path d="M34 20C34 16 38.5 16 38.5 20V36H34" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 25H38.5" stroke={GREEN} strokeWidth="1.6" />
      <path d="M34 30H38.5" stroke={GREEN} strokeWidth="1.6" />
      <path d="M6 39C15 36 33 36 42 39" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 42C17 40 31 40 39 42" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    </IconFrame>
  );
}

function TractorIcon() {
  return (
    <IconFrame>
      <circle cx="15" cy="32" r="7.5" stroke={GREEN} strokeWidth="2.4" />
      <circle cx="15" cy="32" r="3.2" fill={GREEN} />
      <circle cx="34" cy="34" r="5" stroke={GREEN} strokeWidth="2.4" />
      <circle cx="34" cy="34" r="2" fill={GREEN} />
      <path d="M15 25H31V32H15" stroke={GREEN} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M31 25H37C38 25 38.5 26 38.5 27V32H34" stroke={GREEN} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M17 25V13H28L30 25" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 25V17L35.5 16" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 21L27 18" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    </IconFrame>
  );
}

const STAT_ICONS: Record<string, () => React.JSX.Element> = {
  wheat: WheatIcon,
  cow: CowIcon,
  barn: BarnIcon,
  tractor: TractorIcon,
};

const ICON_ALIASES: Record<string, string> = {
  users: "cow",
  home: "barn",
};

function StatIcon({ name }: { name: string }) {
  const key = name.toLowerCase();
  const Icon = STAT_ICONS[ICON_ALIASES[key] ?? key] ?? TractorIcon;

  return <Icon />;
}

function OrganicTag({ show }: { show: boolean }) {
  return (
    <Reveal
      show={show}
      from="pop"
      delay={100}
      duration={700}
      className="mx-auto mb-6 w-fit select-none lg:absolute lg:left-10 lg:top-2 lg:mb-0 xl:left-16"
    >
      <div className="-rotate-[16deg]">
        <div className="relative w-[132px] rounded-[16px] bg-[#0F4A28] px-3 pb-3 pt-2.5 text-center shadow-xl sm:w-[150px]">
          <div className="font-[family-name:var(--font-caveat)] text-[30px] font-bold leading-none text-[#FBF4DC] sm:text-[36px]">
            100%
          </div>
          <div className="mt-0.5 font-[family-name:var(--font-caveat)] text-[14px] font-semibold uppercase tracking-[0.12em] text-[#8DC63F] sm:text-[16px]">
            Organic
          </div>

          <div className="relative mx-auto mt-1 h-[52px] w-[84px] sm:h-[60px] sm:w-[96px]">
            <LeafImage src={LEAF_CREAM} size={46} rotate={-8} className="left-[26px] top-[6px]" />
            <LeafImage src={LEAF_CREAM} size={30} rotate={38} className="right-0 top-0" />
            <LeafImage src={LEAF_CREAM} size={24} rotate={-62} className="left-0 top-[18px]" />
            <LeafImage src={LEAF_CREAM} size={22} rotate={-100} className="left-[12px] top-[34px]" />
          </div>

          <div className="absolute -bottom-2 right-3 h-5 w-5 rotate-45 rounded-[3px] bg-[#0F4A28]" />
        </div>
      </div>
    </Reveal>
  );
}

interface StatCardProps {
  stat: MilestonesData["stats"][number];
  index: number;
  isLast: boolean;
  show: boolean;
}

function StatCard({ stat, index, isLast, show }: StatCardProps) {
  const delay = index * STAGGER;
  const haloBg = index % 2 === 0 ? "bg-[#FEF3D0]" : "bg-[#E6F3E4]";

  return (
    <li className="relative flex justify-center px-4">
      <Reveal
        show={show}
        from="up"
        delay={delay}
        className="flex flex-col items-center text-center"
      >
        <div className="relative mb-4 flex items-center justify-center">
          <Reveal
            show={show}
            from="left"
            delay={delay + 400}
            className="absolute right-full top-1/2 -mr-6 sm:-mr-7"
          >
            <LeafCluster side="left" />
          </Reveal>

          <div className="relative">
            <div
              className={`absolute inset-0 -translate-y-3 translate-x-3 scale-[1.12] rounded-full ${haloBg}`}
            />
            <div className="relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full border border-[#EEF3EA] bg-white shadow-[0_8px_26px_rgba(0,0,0,0.08)] sm:h-[128px] sm:w-[128px]">
              <StatIcon name={stat.icon} />
            </div>
          </div>

          <Reveal
            show={show}
            from="right"
            delay={delay + 400}
            className="absolute left-full top-1/2 -ml-6 sm:-ml-7"
          >
            <LeafCluster side="right" />
          </Reveal>
        </div>

        <div className="text-4xl font-black tracking-tight text-[#0A3D1F] sm:text-[44px]">
          <CountUp value={stat.value} start={show} />
        </div>

        <div
          className={`my-2.5 h-[3.5px] rounded-full bg-[#F2C94C] transition-all duration-700 ease-out motion-reduce:transition-none ${
            show ? "w-14" : "w-0"
          }`}
          style={{ transitionDelay: `${delay + 600}ms` }}
        />

        <div className="text-sm font-medium text-[#4D6053] sm:text-[16px]">
          {stat.label}
        </div>
      </Reveal>

      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 hidden h-28 w-px -translate-y-1/2 bg-gray-300 md:block"
        />
      )}
    </li>
  );
}

export default function Milestones({
  data = defaultMilestonesData,
}: MilestonesProps) {
  const header = useInView<HTMLDivElement>(0.15);
  const stats = useInView<HTMLUListElement>(0.25);

  const [firstLine, ...otherLines] = data.title.split("\n");

  return (
    <section className="relative w-full overflow-x-clip bg-white py-6 font-sans">
      <div
        ref={header.ref}
        className="relative mx-auto mb-14 max-w-[1320px] px-4 sm:mb-16 sm:px-6 lg:px-8"
      >
        <OrganicTag show={header.inView} />

        <div className="mx-auto max-w-4xl text-center">
          <Reveal show={header.inView} from="down" delay={200} duration={900}>
            <h2 className="font-[family-name:var(--font-caveat)] text-5xl font-bold leading-[1.08] tracking-normal sm:text-6xl md:text-7xl lg:text-[84px]">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "url('/images/sunset_text_bg.jpg'), linear-gradient(135deg, #6078b5 0%, #857db5 38%, #b38da6 62%, #f5af4a 100%)",
                  backgroundSize: "cover",
                  backgroundPosition: "center 35%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {otherLines.length > 0 ? (
                  <>
                    {firstLine}
                    <br />
                    {otherLines.join(" ")}
                  </>
                ) : (
                  data.title
                )}
              </span>
            </h2>
          </Reveal>

          <Reveal show={header.inView} from="up" delay={500}>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-patrick)] text-lg font-normal tracking-wide text-[#1E3B28] sm:mt-5 sm:text-xl md:text-[22px]">
              {data.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <ul
          ref={stats.ref}
          className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0"
        >
          {data.stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              isLast={index === data.stats.length - 1}
              show={stats.inView}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}