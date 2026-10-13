"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageBannersData, pageBannersConfig } from "@/data";
import type { BreadcrumbItem, PageBannerData } from "@/types";

export type { BreadcrumbItem };

interface PageBannerProps {
  title?: string;
  breadcrumb?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  imagePosition?: string;
}

export default function PageBanner({
  title,
  breadcrumb,
  breadcrumbs,
  image,
  imagePosition,
}: PageBannerProps) {
  const pathname = usePathname();

  const cleanPath = pathname?.replace(/^\/|\/$/g, "") || "";
  const segments = cleanPath.split("/").filter(Boolean);
  const routeKey = segments[0]?.toLowerCase() || "about";
  const bannerInfo = pageBannersData[routeKey] as PageBannerData | undefined;
  const defaultInfo = (pageBannersData.default as PageBannerData | undefined) || {
    title: pageBannersConfig.defaultTitle,
    breadcrumb: pageBannersConfig.defaultBreadcrumb,
    image: pageBannersConfig.defaultImage,
  };

  const currentTitle =
    title ||
    bannerInfo?.title ||
    defaultInfo?.title ||
    cleanPath.toUpperCase().replace(/-/g, " ") ||
    pageBannersConfig.defaultTitle;

  const currentBreadcrumb =
    breadcrumb ||
    bannerInfo?.breadcrumb ||
    defaultInfo?.breadcrumb ||
    segments[segments.length - 1]
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") ||
    pageBannersConfig.defaultBreadcrumb;

  const currentImage =
    image ||
    bannerInfo?.image ||
    defaultInfo?.image ||
    pageBannersConfig.defaultImage;

  const currentImagePosition =
    imagePosition || pageBannersConfig.imagePosition || "center center";

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const home = pageBannersConfig.homeBreadcrumb;

    if (breadcrumbs?.length) {
      return [home, ...breadcrumbs];
    }

    if (segments.length > 1) {
      const parentKey = segments[0]?.toLowerCase();
      const parentCrumb = pageBannersConfig.parentBreadcrumbs[parentKey];

      if (parentCrumb) {
        return [home, parentCrumb, { label: currentBreadcrumb }];
      }
    }

    const directParent = pageBannersConfig.parentBreadcrumbs[routeKey];
    if (directParent && routeKey !== segments[segments.length - 1]?.toLowerCase()) {
      return [home, directParent, { label: currentBreadcrumb }];
    }

    return [home, { label: currentBreadcrumb }];
  };

  const breadcrumbList = getBreadcrumbItems();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#18251b]">
      <div className="relative flex min-h-[230px] w-full sm:min-h-[260px] md:min-h-[285px] lg:min-h-[305px] xl:min-h-[320px]">
        <Image
          src={currentImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: currentImagePosition }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <div className="relative z-10 flex w-full items-center">
          <div className="mx-auto w-full max-w-[1500px] px-5 pb-9 pt-8 sm:px-10 sm:pb-8 md:px-14 lg:px-20 xl:px-24">
            <div className="w-full min-w-0 max-w-3xl">
              <h1
                title={currentTitle}
                className="line-clamp-3 break-words font-condensed text-[30px] font-bold uppercase leading-[1.08] tracking-normal text-white drop-shadow-lg [overflow-wrap:anywhere] min-[400px]:text-4xl sm:text-5xl md:text-[56px] lg:text-[62px]"
              >
                {currentTitle}
              </h1>

              <svg
                className="mt-4 h-3 w-36 sm:w-52"
                viewBox="0 0 210 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 5.5C43 2.5 103 4 158 5.5C181 6 197 5.5 207 7"
                  stroke="#F2C94C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M5 9C48 7 110 8 169 8.5"
                  stroke="#DCAA22"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>

              <nav
                aria-label={pageBannersConfig.ariaLabels?.breadcrumb || "Breadcrumb"}
                className="mt-6 w-full min-w-0 text-xs font-medium text-white/90 sm:mt-10 sm:text-sm"
              >
                <ol className="flex w-full min-w-0 flex-nowrap items-center">
                  {breadcrumbList.map((item, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === breadcrumbList.length - 1;

                    return (
                      <li
                        key={`${item.label}-${idx}`}
                        className={`inline-flex items-center ${
                          isFirst ? "shrink-0" : "min-w-0 shrink"
                        }`}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {idx > 0 && (
                          <svg
                            className="mx-1.5 h-3.5 w-3.5 shrink-0 text-white sm:mx-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        )}

                        {item.href && !isLast ? (
                          <Link
                            href={item.href}
                            title={item.label}
                            className={`block truncate whitespace-nowrap text-white/85 transition-colors hover:text-[#F2C94C] ${
                              isFirst ? "" : "max-w-[7.5rem] sm:max-w-[14rem]"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span
                            title={item.label}
                            className={`block min-w-0 truncate whitespace-nowrap ${
                              isLast
                                ? "font-semibold text-white"
                                : "max-w-[7.5rem] text-white/85 sm:max-w-[14rem]"
                            }`}
                          >
                            {item.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-5 sm:h-6"
          aria-hidden="true"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 32"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 30
              L0 24 L7 26 L11 17 L14 26 L20 20 L24 29
              L31 23 L36 13 L40 26 L46 20 L51 29
              L59 22 L64 27 L70 12 L74 27 L81 21
              L86 29 L94 24 L100 14 L104 27 L111 20
              L116 29 L124 23 L130 10 L134 27 L141 19
              L146 29 L155 22 L160 27 L167 13 L171 27
              L179 20 L184 29 L191 24 L197 15 L202 28
              L210 21 L215 29 L224 23 L230 11 L234 27
              L241 19 L247 29 L254 22 L260 27 L267 14
              L272 28 L280 21 L286 29 L293 23 L299 12
              L304 27 L312 19 L318 29 L325 22 L331 27
              L338 13 L343 27 L351 21 L357 29 L364 23
              L370 10 L374 27 L382 19 L388 29 L396 22
              L402 27 L409 14 L414 28 L422 21 L428 29
              L436 23 L442 12 L447 27 L455 19 L461 29
              L468 22 L474 27 L481 13 L486 27 L494 21
              L500 29 L508 23 L514 10 L518 27 L526 19
              L532 29 L540 22 L546 27 L553 14 L558 28
              L566 21 L572 29 L580 23 L586 12 L591 27
              L599 19 L605 29 L613 22 L619 27 L626 13
              L631 27 L639 21 L645 29 L653 23 L659 10
              L663 27 L671 19 L677 29 L685 22 L691 27
              L698 14 L703 28 L711 21 L717 29 L725 23
              L731 12 L736 27 L744 19 L750 29 L758 22
              L764 27 L771 13 L776 27 L784 21 L790 29
              L798 23 L804 10 L808 27 L816 19 L822 29
              L830 22 L836 27 L843 14 L848 28 L856 21
              L862 29 L870 23 L876 12 L881 27 L889 19
              L895 29 L903 22 L909 27 L916 13 L921 27
              L929 21 L935 29 L943 23 L949 10 L953 27
              L961 19 L967 29 L975 22 L981 27 L988 14
              L993 28 L1001 21 L1007 29 L1015 23 L1021 12
              L1026 27 L1034 19 L1040 29 L1048 22 L1054 27
              L1061 13 L1066 27 L1074 21 L1080 29 L1088 23
              L1094 10 L1098 27 L1106 19 L1112 29 L1120 22
              L1126 27 L1133 14 L1138 28 L1146 21 L1152 29
              L1160 23 L1166 12 L1171 27 L1179 19 L1185 29
              L1193 22 L1199 27 L1206 13 L1211 27 L1219 21
              L1225 29 L1233 23 L1239 10 L1243 27 L1251 19
              L1257 29 L1265 22 L1271 27 L1278 14 L1283 28
              L1291 21 L1297 29 L1305 23 L1311 12 L1316 27
              L1324 19 L1330 29 L1338 22 L1344 27 L1351 13
              L1356 27 L1364 21 L1370 29 L1378 23 L1384 10
              L1388 27 L1396 19 L1402 29 L1410 22 L1416 27
              L1423 14 L1428 28 L1435 21 L1440 25
              L1440 32 L0 32 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}