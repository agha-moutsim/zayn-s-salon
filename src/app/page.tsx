"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Navbar from "@/components/Navbar";
import TextPressure from "@/components/TextPressure";
import ServicesFlowerSection from "@/components/ServicesSection";
import SocialProofSection from "@/components/SocialProofSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import BookingFormModal from "@/components/BookingFormModal";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  weight: ["800", "900"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  weight: ["600", "700"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

// ─── Main page component ──────────────────────────────────────────────────────
export default function Home() {
  const [loadingPct, setLoadingPct]   = useState(0);
  const [isLoading,  setIsLoading]    = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const heroRef          = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const ctaButton = (
    <button
      onClick={() => setIsBookingModalOpen(true)}
      className={`group relative mt-2 md:mt-6 inline-flex items-center gap-6 pr-2 pl-8 py-2 bg-black/20 border border-white/10 hover:border-[#e79f31] backdrop-blur-xl rounded-full pointer-events-auto transition-all duration-700 overflow-hidden`}
    >
      {/* Sliding background fill */}
      <div className="absolute inset-0 bg-[#e79f31] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
      
      <span className={`relative z-10 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-700 ${poppins.className}`}>
        Book Your Chair
      </span>
      
      <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 group-hover:bg-black text-white group-hover:text-[#e79f31] transition-all duration-700 backdrop-blur-md">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 group-hover:translate-x-1 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </button>
  );

  // ── GSAP: only drives the text overlay fade (CSS transform — no canvas) ──────
  useGSAP(() => {
    if (!heroRef.current || !textContainerRef.current) return;

    gsap.to(textContainerRef.current, {
      opacity: 0,
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "75% top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, { scope: heroRef, dependencies: [isLoading] });

  // ── Preload: drives the loading bar ─────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fake a fast, satisfying progress bar
    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.floor(Math.random() * 8) + 4; // Add 4 to 11 percent each tick
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 300);
      }
      setLoadingPct(currentPct);
    }, 30); // 30ms tick, should complete in ~400ms

    return () => clearInterval(interval);
  }, []);

  // ── Overflow lock ────────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  return (
    <div className="bg-black text-white">
      {!isLoading && <Navbar />}

      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-8">
              <motion.div
                className="text-[#e79f31] text-7xl md:text-9xl font-light tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {loadingPct}
                <span className="text-4xl md:text-6xl text-[#e79f31]/50">%</span>
              </motion.div>

              <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#e79f31]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingPct}%` }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>

              <div className="text-[#e79f31]/60 text-[10px] tracking-[0.4em] uppercase">
                Preparing ZAYN&apos;S
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full bg-[#0F0B0A]">
        {/* ── Hero ── */}
        {!isLoading && (
          <div ref={heroRef} id="house" className="relative w-full h-screen">
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0F0B0A]">

              {/* Slider Background */}
              <div className="absolute inset-0 z-0">
                <HeroSlider />
                {/* Vignette overlay for text legibility */}
                <div className="absolute inset-0 bg-black/45 z-[5] pointer-events-none" />
              </div>

              {/* Text overlays */}
              <div
                ref={textContainerRef}
                className="relative z-10 w-full h-full pointer-events-none"
              >
                {/* ── Mobile Split Layout (Visible on small screens) ── */}
                <div className="md:hidden">
                  {/* ZAYN'S Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-32 left-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mix-blend-plus-lighter"
                  >
                    <div className={`text-[#e79f31] text-7xl sm:text-8xl leading-[0.8] tracking-[-0.02em] ${playfair.className} font-bold italic`}>
                      <TextPressure text="Zayn's" baseWeight={600} maxWeight={600} radius={600} />
                    </div>
                  </motion.div>

                  {/* SALON & CTA Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-20 right-6 flex flex-col items-end gap-2 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mix-blend-plus-lighter"
                  >
                    <div className={`text-white text-7xl sm:text-8xl leading-[0.8] tracking-[-0.04em] ${poppins.className} font-black opacity-95`}>
                      <TextPressure text="SALON" baseWeight={400} maxWeight={400} radius={600} />
                    </div>
                    {ctaButton}
                  </motion.div>
                </div>

                {/* ── Desktop Stacked Layout (Visible on tablet & up) ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex absolute bottom-10 left-12 lg:left-20 flex-col items-start gap-4 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] mix-blend-plus-lighter"
                >
                  <div className={`text-[#e79f31] md:text-[130px] lg:text-[160px] xl:text-[200px] leading-[0.8] tracking-[-0.02em] ${playfair.className} font-bold italic`}>
                    <TextPressure text="Zayn's" baseWeight={600} maxWeight={600} radius={600} />
                  </div>
                  <div className={`text-white md:text-[130px] lg:text-[160px] xl:text-[200px] leading-[0.8] tracking-[-0.04em] ${poppins.className} font-black opacity-95`}>
                    <TextPressure text="SALON" baseWeight={400} maxWeight={400} radius={600} />
                  </div>
                  {ctaButton}
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* ── Services ── */}
        {!isLoading && <ServicesFlowerSection />}

        {/* ── Social Proof ── */}
        {!isLoading && <SocialProofSection />}

        {/* ── FAQ ── */}
        {!isLoading && <FAQSection />}

        {/* ── Footer ── */}
        {!isLoading && <Footer />}
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingFormModal onClose={() => setIsBookingModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

