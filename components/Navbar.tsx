"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  X,
  Menu,
  Send,
  CheckCircle2,
  Sprout,
} from "lucide-react";
import content from "@/data/content.json";
import type { NavbarData, SocialLink } from "@/types";

interface NavbarProps {
  initialData?: NavbarData;
}

const defaultNavbar: NavbarData = {
  topBar: content.Agriculture.sections.Topbar.variants.AgricultureTopbar1,
  brand: content.Agriculture.sections.Header.variants.AgricultureHeader1.brand,
  navLinks: content.Agriculture.sections.Header.variants.AgricultureHeader1.navLinks,
  ctaButton: content.Agriculture.sections.Header.variants.AgricultureHeader1.ctaButton,
  enquiryModal: content.Agriculture.sections.Header.variants.AgricultureHeader1.enquiryModal,
};

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.024 4.388 11.023 10.125 11.927v-8.438H7.078v-3.49h3.047V9.411c0-3.03 1.792-4.704 4.533-4.704 1.312 0 2.686.236 2.686.236v2.966h-1.514c-1.491 0-1.956.929-1.956 1.882v2.281h3.328l-.532 3.49h-2.796V24C19.612 23.096 24 18.097 24 12.073Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function Navbar({ initialData }: NavbarProps) {
  const [data] = useState<NavbarData>(initialData || defaultNavbar);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    service:
      data.enquiryModal?.services?.[0] || "Organic Farming Consultation",
    message: "",
  });

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isEnquiryOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEnquiryOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnquiryOpen]);

  const openEnquiry = () => {
    setIsMenuOpen(false);
    setEnquirySubmitted(false);
    setIsEnquiryOpen(true);
  };

  const handleEnquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnquirySubmitted(true);
  };

  const modalData = data.enquiryModal || {
    title: "Quick Farm Enquiry",
    subtitle: "Fresh organic produce & agricultural solutions",
    successTitle: "Enquiry Received!",
    successMessage:
      "Thank you! Our agricultural advisor will contact you shortly.",
    submitText: "Submit Enquiry",
    services: [
      "Organic Farming Consultation",
      "Bulk Farm Produce Purchase",
      "Agri Supply & Fertilizers",
      "Farm Tour & Partnership",
    ],
  };

  const renderSocialIcon = (icon: string) =>
    socialIcons[icon.toLowerCase()] || null;

  return (
    <>
      <header className="relative z-40 w-full font-sans">
        <div className="w-full relative bg-[#15803d] text-white">
          <div className="w-full flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-4 sm:px-8 lg:px-12 xl:px-16 py-2">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/95">
              {data.topBar.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="hover:text-amber-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2.5 mx-auto md:mx-0">
              <Phone className="w-4 h-4 text-white fill-white shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-white">
                {data.topBar.contact.prefixText}
              </span>
              <a
                href={data.topBar.contact.phoneHref}
                className="bg-white text-[#15803d] font-bold text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-transform inline-flex items-center"
              >
                {data.topBar.contact.phone}
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-white">
              {data.topBar.socialLinks.map((item: SocialLink) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-white hover:text-amber-300 transition-colors"
                >
                  {renderSocialIcon(item.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full relative h-4 sm:h-5 md:h-6 overflow-hidden leading-none -mb-[1px]">
            <div className="navbar-wave-flow absolute inset-0 flex w-[200%] text-[#15803d]">
              <svg
                viewBox="0 0 1200 30"
                preserveAspectRatio="none"
                className="w-1/2 h-full block"
                fill="currentColor"
              >
                <path d="M0,0 L1200,0 L1200,10 C1050,28 900,2 750,18 C600,30 450,4 300,20 C150,30 0,6 0,10 Z" />
              </svg>
              <svg
                viewBox="0 0 1200 30"
                preserveAspectRatio="none"
                className="w-1/2 h-full block"
                fill="currentColor"
              >
                <path d="M0,0 L1200,0 L1200,10 C1050,28 900,2 750,18 C600,30 450,4 300,20 C150,30 0,6 0,10 Z" />
              </svg>
            </div>
            <div className="navbar-wave-flow-sub absolute inset-0 flex w-[200%] opacity-35 text-[#15803d]">
              <svg
                viewBox="0 0 1200 30"
                preserveAspectRatio="none"
                className="w-1/2 h-full block"
                fill="currentColor"
              >
                <path d="M0,0 L1200,0 L1200,14 C1020,4 880,26 700,10 C520,28 380,6 200,22 C80,8 0,16 0,14 Z" />
              </svg>
              <svg
                viewBox="0 0 1200 30"
                preserveAspectRatio="none"
                className="w-1/2 h-full block"
                fill="currentColor"
              >
                <path d="M0,0 L1200,0 L1200,14 C1020,4 880,26 700,10 C520,28 380,6 200,22 C80,8 0,16 0,14 Z" />
              </svg>
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 w-full bg-white transition-shadow duration-300 ${
            isScrolled
              ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              : "border-b border-gray-100"
          }`}
        >
          <div className="w-full flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4">
            <Link
              href={data.brand.href}
              className="flex items-center shrink-0"
              aria-label={`${data.brand.name} - ${data.brand.tagline}`}
            >
              <Image
                src={data.brand.logo || "/logo.png"}
                alt={`${data.brand.name} ${data.brand.tagline}`}
                width={220}
                height={56}
                priority
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>

            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10"
            >
              {data.navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "#home" && pathname === "/") ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`text-[15px] font-bold transition-colors ${
                      isActive
                        ? "text-[#15803d]"
                        : "text-gray-900 hover:text-[#15803d]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={openEnquiry}
              className="hidden lg:inline-flex items-center justify-center bg-[#15803d] hover:bg-[#166534] text-white font-bold text-[15px] px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              {data.ctaButton.label}
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-gray-800 hover:text-[#15803d] hover:bg-green-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden w-full bg-white border-t border-gray-100 px-4 py-5 shadow-lg">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
                {data.navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href === "#home" && pathname === "/") ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base font-bold px-3 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? "bg-green-50 text-[#15803d]"
                          : "text-gray-900 hover:bg-gray-50 hover:text-[#15803d]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={openEnquiry}
                className="w-full mt-4 bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 rounded-full shadow-sm text-center transition-colors"
              >
                {data.ctaButton.label}
              </button>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={data.topBar.contact.phoneHref}
                  className="text-xs font-bold text-[#15803d] bg-green-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {data.topBar.contact.phone}
                </a>

                <div className="flex items-center gap-3 text-gray-700">
                  {data.topBar.socialLinks.map((item: SocialLink) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="hover:text-[#15803d] transition-colors"
                    >
                      {renderSocialIcon(item.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {isEnquiryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <button
            type="button"
            aria-label="Close enquiry modal"
            onClick={() => setIsEnquiryOpen(false)}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />

          <div className="relative my-auto flex w-full sm:w-[500px] flex-col overflow-hidden rounded-2xl border border-green-100 bg-white shadow-2xl">
            <div className="relative flex shrink-0 items-center justify-between gap-3 overflow-hidden bg-[#15803d] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Sprout className="size-5 text-white" />
                </div>
                <div>
                  <h3 id="enquiry-title" className="text-base font-bold sm:text-lg">
                    {modalData.title}
                  </h3>
                  <p className="text-xs text-white/80">
                    {modalData.subtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close enquiry"
                onClick={() => setIsEnquiryOpen(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {enquirySubmitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 text-[#15803d]">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-gray-900">
                    {modalData.successTitle}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {modalData.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(false)}
                    className="mt-6 rounded-full bg-[#15803d] hover:bg-[#166534] px-7 py-2.5 text-sm font-bold text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your full name"
                      value={enquiryForm.name}
                      onChange={(e) =>
                        setEnquiryForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        id="enquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={enquiryForm.phone}
                        onChange={(e) =>
                          setEnquiryForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        id="enquiry-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={enquiryForm.email}
                        onChange={(e) =>
                          setEnquiryForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Requirement
                    </label>
                    <select
                      id="enquiry-service"
                      name="service"
                      value={enquiryForm.service}
                      onChange={(e) =>
                        setEnquiryForm((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                    >
                      {modalData.services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your requirements..."
                      value={enquiryForm.message}
                      onChange={(e) =>
                        setEnquiryForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full resize-y rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEnquiryOpen(false)}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[#15803d] hover:bg-[#166534] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all"
                    >
                      <Send className="w-4 h-4" />
                      {modalData.submitText}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .navbar-wave-flow {
          animation: navbarWaveMove 16s linear infinite;
        }
        .navbar-wave-flow-sub {
          animation: navbarWaveMoveRev 22s linear infinite;
        }
        @keyframes navbarWaveMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes navbarWaveMoveRev {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .navbar-wave-flow,
          .navbar-wave-flow-sub {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
