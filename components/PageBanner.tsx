"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageBannersData } from "@/data";

interface PageBannerProps {
  title?: string;
  breadcrumb?: string;
  image?: string;
  imagePosition?: string;
}

export default function PageBanner({
  title,
  breadcrumb,
  image,
  imagePosition = "center top",
}: PageBannerProps) {
  const pathname = usePathname();

  const getPageInfo = () => {
    const cleanPath = pathname?.replace(/^\/|\/$/g, "") || "";
    const routeKey = cleanPath.split("/")[0] || "about";
    const bannerInfo = pageBannersData[routeKey];

    const fallbackTitles: Record<
      string,
      { title: string; breadcrumb: string }
    > = {
      about: { title: "ABOUT US", breadcrumb: "About Us" },
      services: { title: "OUR SERVICES", breadcrumb: "Services" },
      products: { title: "OUR PRODUCTS", breadcrumb: "Our Products" },
      team: { title: "OUR TEAM", breadcrumb: "Our Team" },
      gallery: { title: "GALLERY", breadcrumb: "Gallery" },
      testimonials: { title: "TESTIMONIALS", breadcrumb: "Testimonials" },
      contact: { title: "CONTACT US", breadcrumb: "Contact Us" },
    };

    const resolvedTitle =
      title ||
      bannerInfo?.title ||
      fallbackTitles[routeKey]?.title ||
      cleanPath.toUpperCase().replace(/-/g, " ") ||
      "ABOUT US";

    const resolvedBreadcrumb =
      breadcrumb ||
      bannerInfo?.breadcrumb ||
      fallbackTitles[routeKey]?.breadcrumb ||
      cleanPath
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") ||
      "About Us";

    return {
      title: resolvedTitle,
      breadcrumb: resolvedBreadcrumb,
      image: image || bannerInfo?.image || "/page-banner.webp",
    };
  };

  const {
    title: currentTitle,
    breadcrumb: currentBreadcrumb,
    image: currentImage,
  } = getPageInfo();

  return (
    <section className="relative w-full overflow-hidden bg-[#0a2012]">
      <div className="relative h-[220px] w-full sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[480px]">
        <Image
          src={currentImage}
          alt={currentTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: imagePosition,
          }}
        />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <h1 className="font-sans text-3xl font-extrabold uppercase tracking-wider text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-[54px]">
                {currentTitle}
              </h1>

              <div className="my-2.5 sm:my-3">
                <svg
                  className="h-2.5 w-24 sm:h-3 sm:w-32"
                  viewBox="0 0 130 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7.5C25 4.5 75 4 127 6.5C92 9 45 10.5 3 7.5Z"
                    fill="#F2C94C"
                  />
                  <path
                    d="M10 8.5C40 6 90 6.5 120 7.8"
                    stroke="#E5B83B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <nav
                aria-label="Breadcrumb"
                className="mt-3 flex items-center text-sm font-medium text-white/90 sm:text-base"
              >
                <Link
                  href="/"
                  className="text-white/80 transition-colors hover:text-[#F2C94C]"
                >
                  Home
                </Link>

                <span className="mx-2.5 font-semibold text-[#F2C94C]">
                  ›
                </span>

                <span className="font-semibold text-white">
                  {currentBreadcrumb}
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
