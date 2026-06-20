"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/hero-images/P1.png",
  "/hero-images/P2.png",
  "/hero-images/P3.png",
  "/hero-images/P4.png",
  "/hero-images/P5.png"
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap index to always stay within bounds (0 to 4)
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Optional: Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0F0B0A]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[imageIndex]}
            alt={`Hero Slide ${imageIndex + 1}`}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between p-4 md:p-8 pointer-events-none">
        <button
          className="pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/10 hover:bg-[#e79f31]/80 hover:text-black transition-all duration-300"
          onClick={() => paginate(-1)}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          className="pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/10 hover:bg-[#e79f31]/80 hover:text-black transition-all duration-300"
          onClick={() => paginate(1)}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
      
      {/* Optional: Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 pointer-events-none">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pointer-events-auto w-2 h-2 rounded-full transition-all duration-300 ${
              i === imageIndex ? "bg-[#e79f31] w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
