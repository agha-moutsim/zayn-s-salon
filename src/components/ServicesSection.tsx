"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { servicesData, ServiceCategory } from "@/data/services";
import { Poppins } from "next/font/google";
import TextPressure from "./TextPressure";
import ServiceDetailPanel from "./ServiceDetailPanel";

const poppins = Poppins({ weight: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

export default function ServicesBentoSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = servicesData;
  const selectedCat = categories.find((c) => c.id === selectedId) ?? null;

  // Group the 7 services into a 2 - 3 - 2 asymmetrical grid layout
  const rows = [
    [categories[0], categories[1]],
    [categories[2], categories[3], categories[4]],
    [categories[5], categories[6]],
  ];

  // ── Parallax scroll effects for background text ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Huge background text moving horizontally as you scroll
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="relative w-full bg-[#080604] py-24 md:py-40 overflow-hidden"
    >
      {/* Seamless top fade from Hero */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-0" style={{ height: "clamp(80px, 10vw, 150px)", background: "linear-gradient(to bottom, #0F0B0A 0%, transparent 100%)" }} />

      {/* ── Section header ── */}
      <motion.div 
        className="relative z-10 text-center mb-16 md:mb-24 px-4"
        initial={{ opacity: 0, y: 80, clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[#e79f31] text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 font-bold flex items-center justify-center gap-4">
          <span className="w-8 md:w-16 h-px bg-[#e79f31]/50" />
          What We Offer
          <span className="w-8 md:w-16 h-px bg-[#e79f31]/50" />
        </p>
        <div className="mb-4">
          <TextPressure 
            text="OUR SERVICES" 
            className={`justify-center text-4xl md:text-7xl text-white tracking-widest drop-shadow-2xl font-bold ${poppins.className}`} 
          />
        </div>
        <p className="mt-8 text-[11px] tracking-[0.4em] uppercase text-[#e79f31]/40 hidden md:block">
          Hover to explore
        </p>
      </motion.div>

      {/* ── Bento Box Grid ── */}
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col gap-3 md:gap-4"
        style={{ height: isMobile ? "auto" : "750px" }}
      >
        {rows.map((row, rowIndex) => {
          // If any card in this row is hovered, the whole row expands its height
          const isRowHovered = row.some((c) => c.id === hoveredId);

          return (
            <motion.div
              key={rowIndex}
              className={`w-full flex ${isMobile ? "flex-col" : "flex-row"} gap-3 md:gap-4`}
              // Expand the row height smoothly if hovered
              animate={
                !isMobile
                  ? { flex: hoveredId === null ? 1 : isRowHovered ? 1.5 : 0.8 }
                  : {}
              }
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {row.map((cat, colIndex) => {
                const isHovered = hoveredId === cat.id;

                // Calculate absolute index (0 to 6) for staggered entrance delay
                const globalIndex = rowIndex === 0 ? colIndex : rowIndex === 1 ? 2 + colIndex : 5 + colIndex;
                const isLeft = colIndex === 0;

                return (
                  <motion.div
                    key={cat.id}
                    className="relative cursor-pointer group"
                    style={{ height: isMobile ? "160px" : "100%", perspective: "1500px" }}
                    // Expand the card width smoothly if hovered
                    animate={
                      !isMobile
                        ? { flex: hoveredId === null ? 1 : isHovered ? 2.5 : 1 }
                        : {}
                    }
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    onHoverStart={() => !isMobile && setHoveredId(cat.id)}
                    onHoverEnd={() => !isMobile && setHoveredId(null)}
                    onClick={() => setSelectedId(cat.id)}
                  >
                    {/* 3D Entry Wrapper */}
                    <motion.div
                      className="w-full h-full relative"
                      initial={{ y: 200, opacity: 0, rotateX: 30, rotateY: isLeft ? -15 : 15, scale: 0.8 }}
                      whileInView={{ y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 1.4, 
                        delay: globalIndex * 0.08, 
                        ease: [0.22, 1, 0.36, 1] // High-end sweeping ease
                      }}
                    >
                      {/* Golden Sweep Curtain Reveal */}
                      <motion.div
                        className="absolute inset-0 bg-[#e79f31] z-50 pointer-events-none flex items-center justify-center overflow-hidden"
                        initial={{ scaleY: 1, transformOrigin: "bottom" }}
                        whileInView={{ scaleY: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          duration: 1.2, 
                          delay: globalIndex * 0.08 + 0.5, // Sweep after the block rises
                          ease: [0.77, 0, 0.175, 1] 
                        }}
                      >
                        <span className={`${poppins.className} text-[#fcd34d] text-center uppercase tracking-widest text-lg md:text-xl px-2`}>
                          ZAYN&apos;S SALOON
                        </span>
                      </motion.div>

                      {/* Actual Card Content (Hidden until mask sweeps) */}
                      <motion.div 
                        className="w-full h-full opacity-0"
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.01, delay: globalIndex * 0.08 + 0.5 }}
                      >
                        <ServiceCard
                          cat={cat}
                          isHovered={isHovered}
                          isMobile={isMobile}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* ── Modal Detail Panel ── */}
      <AnimatePresence>
        {selectedCat && (
          <ServiceDetailPanel
            category={selectedCat}
            color="#e79f31"
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Card Face ───────────────────────────────────────────────────────
function ServiceCard({
  cat,
  isHovered,
  isMobile,
}: {
  cat: ServiceCategory;
  isHovered: boolean;
  isMobile: boolean;
}) {
  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500 border bg-[#0c0a06]"
      style={{
        background: isHovered
          ? "linear-gradient(145deg, #16120a 0%, #0c0a06 100%)"
          : "linear-gradient(145deg, #111009 0%, #080604 100%)",
        borderColor: isHovered
          ? "rgba(231,159,49,0.8)"
          : "rgba(231,159,49,0.15)",
        boxShadow: isHovered
          ? "0 0 40px rgba(231,159,49,0.15) inset, 0 0 30px rgba(231,159,49,0.15)"
          : "none",
      }}
    >
      {/* Corner accent lines (expand when hovered) */}
      <span
        className={`absolute top-0 left-0 h-px bg-[#e79f31] transition-all duration-500 ${
          isHovered ? "opacity-100 w-16" : "opacity-30 w-6"
        }`}
      />
      <span
        className={`absolute top-0 left-0 w-px bg-[#e79f31] transition-all duration-500 ${
          isHovered ? "opacity-100 h-16" : "opacity-30 h-6"
        }`}
      />
      <span
        className={`absolute bottom-0 right-0 h-px bg-[#e79f31] transition-all duration-500 ${
          isHovered ? "opacity-100 w-16" : "opacity-30 w-6"
        }`}
      />
      <span
        className={`absolute bottom-0 right-0 w-px bg-[#e79f31] transition-all duration-500 ${
          isHovered ? "opacity-100 h-16" : "opacity-30 h-6"
        }`}
      />

      {/* Name content */}
      <div className="flex flex-col items-center justify-center pointer-events-none p-4">
        <h3
          className={`${poppins.className} text-center uppercase tracking-[0.2em] leading-snug transition-all duration-500 font-bold`}
          style={{
            color: isHovered ? "#ffffff" : "#e79f31",
            transform: isHovered && !isMobile ? "scale(1.2)" : "scale(1)",
            textShadow: isHovered ? "0 0 20px rgba(231,159,49,0.8)" : "none",
            fontSize: isMobile ? "1.1rem" : "1.3rem",
          }}
        >
          {cat.title}
        </h3>

        {/* Animated underline */}
        <div
          className="h-[1px] bg-[#e79f31] mt-3 transition-all duration-500"
          style={{
            width: isHovered ? "60px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
