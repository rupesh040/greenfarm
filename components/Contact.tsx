"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ArrowRight,
  Sprout,
  Navigation2,
  CheckCircle2,
  Loader2,
  ExternalLink,
  User,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { ContactData } from "@/types";
import { contactData as defaultContactData } from "@/data";

interface ContactProps {
  data?: ContactData;
}

export default function Contact({ data = defaultContactData }: ContactProps) {
  const { header, form, contactCards, map } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    needSupport: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      needSupport: "",
      message: "",
    });
    setIsSubmitted(false);
    setErrorMessage("");
  };

  const renderCardIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-white" };
    switch (iconName.toLowerCase()) {
      case "location":
      case "mappin":
        return <MapPin {...props} />;
      case "email":
      case "mail":
        return <Mail {...props} />;
      case "phone":
        return <Phone {...props} />;
      case "clock":
      case "hours":
        return <Clock {...props} />;
      default:
        return <MapPin {...props} />;
    }
  };

  return (
    <section
      id={data.sectionId || "contact"}
      className="relative w-full py-6 pb-20 bg-[#fafcf7] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="w-10 sm:w-14 h-[2px] bg-[#eab308] rounded-full opacity-80" />
            <div className="w-9 h-9 rounded-full bg-[#fbf5dc] border border-[#f5e6a4] flex items-center justify-center text-[#185331] shadow-xs">
              <Sprout className="w-4 h-4 text-[#185331]" />
            </div>
            <span className="w-10 sm:w-14 h-[2px] bg-[#eab308] rounded-full opacity-80" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e3b23] tracking-tight">
            {header.title}
          </h2>

          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {header.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col"
          >
            <div className="relative h-full flex flex-col rounded-[28px] sm:rounded-[36px] bg-[#0c3821] text-white p-6 sm:p-8 md:p-9 shadow-2xl shadow-green-950/20 border border-emerald-900/60 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-[3px] bg-[#eab308] rounded-full inline-block" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-200 uppercase">
                    {form.tag}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2.5">
                  {form.title}
                </h3>

                <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {form.description}
                </p>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col flex-1 gap-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <User className="w-4 h-4 text-emerald-300/60" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={form.namePlaceholder || "Name"}
                            required
                            className="w-full bg-[#15462c]/75 border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-emerald-100/40 outline-none hover:border-emerald-600/70 focus:border-[#f6c324] focus:ring-1 focus:ring-[#f6c324]/30 focus:bg-[#1b5336] transition-all duration-200 shadow-inner"
                          />
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Mail className="w-4 h-4 text-emerald-300/60" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={form.emailPlaceholder || "Email"}
                            required
                            className="w-full bg-[#15462c]/75 border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-emerald-100/40 outline-none hover:border-emerald-600/70 focus:border-[#f6c324] focus:ring-1 focus:ring-[#f6c324]/30 focus:bg-[#1b5336] transition-all duration-200 shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Phone className="w-4 h-4 text-emerald-300/60" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder={form.phonePlaceholder || "Phone"}
                            className="w-full bg-[#15462c]/75 border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-emerald-100/40 outline-none hover:border-emerald-600/70 focus:border-[#f6c324] focus:ring-1 focus:ring-[#f6c324]/30 focus:bg-[#1b5336] transition-all duration-200 shadow-inner"
                          />
                        </div>
                        <div className="relative">
                          <select
                            name="needSupport"
                            value={formData.needSupport}
                            onChange={handleChange}
                            className="w-full appearance-none bg-[#15462c]/75 border border-emerald-700/50 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-emerald-100/40 outline-none hover:border-emerald-600/70 focus:border-[#f6c324] focus:ring-1 focus:ring-[#f6c324]/30 focus:bg-[#1b5336] transition-all duration-200 shadow-inner cursor-pointer"
                          >
                            {form.supportOptions.map((opt, idx) => (
                              <option
                                key={idx}
                                value={idx === 0 ? "" : opt}
                                className="bg-[#0c3821] text-white py-2"
                              >
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-emerald-200/70" />
                        </div>
                      </div>

                      <div className="relative flex-1">
                        <div className="absolute top-3.5 left-3.5 pointer-events-none">
                          <MessageSquare className="w-4 h-4 text-emerald-300/60" />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={form.messagePlaceholder || "Type your message..."}
                          className="w-full h-full min-h-[140px] bg-[#15462c]/75 border border-emerald-700/50 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-emerald-100/40 outline-none hover:border-emerald-600/70 focus:border-[#f6c324] focus:ring-1 focus:ring-[#f6c324]/30 focus:bg-[#1b5336] transition-all duration-200 shadow-inner resize-none"
                        />
                      </div>

                      {errorMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-amber-300 text-xs font-medium flex items-center gap-1.5"
                        >
                          <span>⚠️</span> {errorMessage}
                        </motion.p>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                        <div className="flex items-center gap-2.5 text-emerald-100/90 font-medium text-xs sm:text-sm select-none">
                          <Sprout className="w-5 h-5 text-[#f6c324] shrink-0" />
                          <span>{form.footerTagline}</span>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 bg-[#f6c324] hover:bg-[#fad046] active:bg-[#eab308] text-[#0c3821] font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-70"
                        >
                          <span>
                            {isSubmitting
                              ? "Sending..."
                              : form.submitButtonText}
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#0c3821] text-white flex items-center justify-center shrink-0">
                            {isSubmitting ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 px-6 bg-emerald-900/60 border border-emerald-500/40 rounded-3xl text-center flex flex-col items-center justify-center flex-1 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#f6c324]/20 border border-[#f6c324] flex items-center justify-center text-[#f6c324]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        {form.successTitle || "Message Sent Successfully!"}
                      </h4>
                      <p className="text-emerald-100/80 text-xs sm:text-sm max-w-sm leading-relaxed">
                        {form.successMessage ||
                          "Thank you for reaching out to Green Farm. Our team has received your message and will respond promptly."}
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold transition-colors mt-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{form.resetButtonText || "Send Another Message"}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6 justify-between"
          >
            <div className="relative flex-1 bg-[#f4f7ee] rounded-[28px] sm:rounded-[36px] border border-emerald-900/10 shadow-lg shadow-emerald-950/5 overflow-hidden p-6 sm:p-8 md:p-9 flex flex-col justify-center">
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
                <Image
                  src={
                    contactCards.backgroundImage ||
                    contactCards.wheatImage ||
                    "/images/contact/contact-1.webp"
                  }
                  alt={contactCards.wheatImageAlt || "Green Farm Harvest"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-right md:object-right opacity-65 scale-105"
                  priority
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-5 sm:gap-6">
                {contactCards.items.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="flex items-start gap-3.5 group p-2 rounded-2xl hover:bg-white/40 backdrop-blur-[1px] transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0c3821] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:bg-[#165130] transition-all duration-300">
                      {renderCardIcon(item.icon)}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="font-bold text-[#0c3821] text-base mb-1 tracking-tight">
                        {item.title}
                      </h4>
                      {item.lines.map((line, lIdx) => (
                        <p
                          key={lIdx}
                          className="text-gray-700 text-sm leading-snug font-normal"
                        >
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="hover:text-[#0c3821] hover:underline transition-colors"
                            >
                              {line}
                            </Link>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative h-44 sm:h-48 md:h-52 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-md shadow-emerald-950/5 border border-emerald-900/10 group"
            >
              <Image
                src={contactCards.grainImage || "/images/contact/contact-2.webp"}
                alt={contactCards.grainImageAlt || "Harvest Grains"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-8 sm:mt-10"
        >
          <div className="relative w-full h-[360px] sm:h-[400px] md:h-[420px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-lg border border-gray-200/80 bg-gray-100">
            <iframe
              src={map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Green Farm USA Headquarters Location"
              className="w-full h-full grayscale-[0.1] contrast-[1.05]"
            />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100/90 z-10 transition-all hover:bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-[#0c3821] text-sm sm:text-base leading-tight">
                    {map.locationName}
                  </h4>
                  <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                    {map.address}
                  </p>
                </div>
                <Link
                  href={map.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center text-blue-600 hover:text-blue-700 group shrink-0"
                  title="Get Directions"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Navigation2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-semibold mt-1">
                    {map.directionsLabel || "Directions"}
                  </span>
                </Link>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={map.viewLargerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>{map.viewLargerLabel || "View larger map"}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="text-[10px] text-gray-400">
                  {map.badgeLabel || "Green Farm HQ"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
