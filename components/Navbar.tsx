"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Phone,
  X,
  Menu,
  Send,
  CheckCircle2,
  Sprout,
  ArrowRight,
} from "lucide-react";
import { navbarData } from "@/data";
import type { NavbarData, SocialLink } from "@/types";

interface NavbarProps {
  initialData?: NavbarData;
}

const defaultNavbar: NavbarData = navbarData;

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

const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Navbar({ initialData }: NavbarProps) {
  const [data] = useState<NavbarData>(initialData || defaultNavbar);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
  const lastScrollY = useRef(0);

  // Dynamic Scroll Behavior:
  // - Auto-hides on scroll down, reappears on scroll up
  // - Shrinks slightly & adopts blurred semi-transparent background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isPastThreshold = currentY > 30;
      setIsScrolled(isPastThreshold);

      if (currentY <= 35) {
        setIsVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 90) {
        // Scrolling down -> hide navbar (unless mobile menu is active)
        if (!isMenuOpen) {
          setIsVisible(false);
        }
      } else if (currentY < lastScrollY.current) {
        // Scrolling up -> reveal navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll when modal or mobile menu is active
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
      {/* Spacer to prevent layout shift under fixed navbar */}
      <div
        className="w-full h-[120px] sm:h-[132px] lg:h-[138px] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Floating Dynamic Navbar */}
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -140,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full font-sans"
      >
        {/* Top Accent Green Bar with Organic Wavy Edge */}
        <motion.div
          animate={{
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="overflow-hidden bg-[#15803d] text-white"
        >
          <div className="w-full flex items-center justify-between gap-y-2 gap-x-4 px-4 sm:px-8 lg:px-12 xl:px-16 pt-2 pb-1.5">
            {/* Topbar Left Links */}
            <motion.div
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-white/95"
            >
              {data.topBar.links.map((link) => (
                <motion.div key={link.id} variants={navItemVariants}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Topbar Center Contact & Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2.5 mx-auto md:mx-0"
            >
              <Phone className="w-3.5 h-3.5 text-white fill-white shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-white/95">
                {data.topBar.contact.prefixText}
              </span>
              <a
                href={data.topBar.contact.phoneHref}
                className="bg-white text-[#15803d] font-extrabold text-xs sm:text-[13px] px-3.5 py-0.5 sm:py-1 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all inline-flex items-center"
              >
                {data.topBar.contact.phone}
              </a>
            </motion.div>

            {/* Topbar Right Social Icons */}
            <motion.div
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="hidden sm:flex items-center gap-4 text-white"
            >
              {data.topBar.socialLinks.map((item: SocialLink) => (
                <motion.div key={item.id} variants={navItemVariants}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="text-white hover:text-amber-300 hover:scale-110 active:scale-95 transition-all block"
                  >
                    {renderSocialIcon(item.icon)}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Organic Wave Edge Separator (Styled like attached image) */}
          <div className="w-full relative h-3.5 sm:h-4.5 lg:h-5 overflow-hidden leading-none -mb-[1px]">
            <svg
              viewBox="0 0 1440 28"
              preserveAspectRatio="none"
              className="w-full h-full block text-[#15803d]"
              fill="currentColor"
            >
              <path d="M0,0 L1440,0 L1440,8 C1360,20 1260,26 1160,14 C1040,2 940,22 830,24 C720,26 620,8 500,14 C380,20 280,28 170,16 C100,8 40,18 0,12 Z" />
            </svg>
          </div>
        </motion.div>

        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-b border-gray-100/80 py-2.5 sm:py-3"
              : "bg-white border-b border-gray-100 py-3.5 sm:py-4"
          }`}
        >
          <div className="w-full flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 xl:px-16">
            {/* Brand Logo with graceful load animation */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href={data.brand.href}
                className="flex items-center shrink-0 group focus:outline-none"
                aria-label={`${data.brand.name} - ${data.brand.tagline}`}
              >
                <Image
                  src={data.brand.logo || "/logo.png"}
                  alt={`${data.brand.name} ${data.brand.tagline}`}
                  width={220}
                  height={56}
                  priority
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-[1.02] ${
                    isScrolled ? "h-9 sm:h-10" : "h-10 sm:h-12"
                  }`}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links with Stagger Fade & Slide Down */}
            <motion.nav
              aria-label="Main navigation"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3"
            >
              {data.navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "#home" && pathname === "/") ||
                  (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                return (
                  <motion.div key={link.id} variants={navItemVariants}>
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-2 rounded-full text-[15px] font-bold transition-all duration-200 group block ${
                        isActive
                          ? "text-[#15803d]"
                          : "text-gray-800 hover:text-[#15803d]"
                      }`}
                    >
                      <span>{link.label}</span>
                      
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-1 left-3.5 right-3.5 h-[2.5px] bg-[#15803d] rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Smooth pill hover highlight */}
                      <span className="absolute inset-0 rounded-full bg-emerald-50/70 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Desktop CTA Action Button with Stagger Animation */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="hidden lg:flex items-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#15803d] hover:bg-[#166534] text-white font-bold text-[15px] px-7 py-2.5 sm:py-3 rounded-full shadow-sm hover:shadow-lg hover:shadow-green-900/10 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                {data.ctaButton.label}
              </Link>
            </motion.div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-xl text-gray-800 hover:text-[#15803d] hover:bg-green-50 active:scale-90 transition-all cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.2]" />
              )}
            </button>
          </div>

          {/* Smooth-Opening Mobile Hamburger Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="lg:hidden w-full overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl"
              >
                <motion.div
                  variants={navContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-5 flex flex-col gap-1.5"
                >
                  {data.navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href === "#home" && pathname === "/") ||
                      (link.href !== "/" && pathname.startsWith(`${link.href}/`));

                    return (
                      <motion.div key={link.id} variants={mobileItemVariants}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center justify-between text-base font-bold px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-green-50 text-[#15803d]"
                              : "text-gray-800 hover:bg-gray-50 hover:text-[#15803d]"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-40" />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile CTA Button */}
                  <motion.div variants={mobileItemVariants} className="pt-2">
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full bg-[#15803d] hover:bg-[#166534] text-white font-bold py-3.5 rounded-full shadow-md text-center transition-all active:scale-98"
                    >
                      {data.ctaButton.label}
                    </Link>
                  </motion.div>

                  {/* Mobile Contact & Social Links Footer */}
                  <motion.div
                    variants={mobileItemVariants}
                    className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3"
                  >
                    <a
                      href={data.topBar.contact.phoneHref}
                      className="text-xs font-bold text-[#15803d] bg-green-50 px-3.5 py-2 rounded-full inline-flex items-center gap-2 shadow-sm"
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
                          className="hover:text-[#15803d] transition-colors p-1"
                        >
                          {renderSocialIcon(item.icon)}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Enquiry Modal Dialog */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnquiryOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative my-auto flex w-full sm:w-[500px] flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl z-10"
            >
              {/* Header */}
              <div className="relative flex shrink-0 items-center justify-between gap-3 overflow-hidden bg-[#15803d] px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                    <Sprout className="size-5 text-white" />
                  </div>
                  <div>
                    <h3 id="enquiry-title" className="text-base font-bold sm:text-lg">
                      {modalData.title}
                    </h3>
                    <p className="text-xs text-white/85">
                      {modalData.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close enquiry"
                  onClick={() => setIsEnquiryOpen(false)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
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
                      className="mt-6 rounded-full bg-[#15803d] hover:bg-[#166534] px-7 py-2.5 text-sm font-bold text-white transition-colors cursor-pointer"
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
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100 transition-all"
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
                          placeholder="+1 000-000-000"
                          value={enquiryForm.phone}
                          onChange={(e) =>
                            setEnquiryForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100 transition-all"
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
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100 transition-all"
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
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100 transition-all cursor-pointer"
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
                        className="w-full resize-y rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEnquiryOpen(false)}
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-[#15803d] hover:bg-[#166534] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        {modalData.submitText}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

