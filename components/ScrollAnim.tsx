"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollAnimProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollAnim({ children, delay = 0, direction = "up" }: ScrollAnimProps) {
  const getInitialY = () => {
    if (direction === "up") return 60;
    if (direction === "down") return -60;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return 60;
    if (direction === "right") return -60;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
