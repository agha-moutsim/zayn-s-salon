"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCategory } from "@/data/services";
import { Poppins } from "next/font/google";
import BookingFormModal from "./BookingFormModal";

const poppins = Poppins({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

type Props = {
  category: ServiceCategory;
  color: string;
  onClose: () => void;
};

export default function ServiceDetailPanel({ category, color, onClose }: Props) {
  const [selectedTier, setSelectedTier] = useState<
    "stylist" | "leadStylist" | "seniorStylist"
  >("leadStylist");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<{name: string, category: string} | null>(null);

  const tiers = [
    { id: "stylist" as const, label: "Stylist" },
    { id: "leadStylist" as const, label: "Lead Stylist" },
    { id: "seniorStylist" as const, label: "Senior Stylist" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-3xl"
        style={{
          background: "linear-gradient(160deg, #111009 0%, #0c0a06 100%)",
          border: "1px solid rgba(231,159,49,0.25)",
          boxShadow: "0 0 80px rgba(231,159,49,0.08), 0 30px 80px rgba(0,0,0,0.8)",
        }}
        initial={{ scale: 0.88, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 px-8 pt-8 pb-6"
          style={{
            background: "linear-gradient(160deg, #111009 0%, #0c0a06 100%)",
            borderBottom: "1px solid rgba(231,159,49,0.10)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#e79f31]/50 mb-2">
                Services Menu
              </p>
              <h3
                className={`${poppins.className} text-2xl md:text-3xl text-[#e79f31] tracking-wide uppercase font-bold`}
              >
                {category.title}
              </h3>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="shrink-0 mt-1 w-8 h-8 rounded-full border border-[#e79f31]/20 flex items-center justify-center text-[#e79f31]/40 hover:text-[#e79f31] hover:border-[#e79f31]/60 transition-all duration-200"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Tier toggle — only for tiered categories */}
          {category.type === "tiered" && (
            <div className="flex gap-2 mt-5">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className="relative flex-1 py-2.5 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase rounded-xl transition-all duration-200 overflow-hidden"
                  style={{
                    background:
                      selectedTier === tier.id
                        ? "#e79f31"
                        : "rgba(231,159,49,0.06)",
                    color: selectedTier === tier.id ? "#080604" : "#e79f3166",
                    border: `1px solid ${selectedTier === tier.id ? "#e79f31" : "rgba(231,159,49,0.12)"}`,
                  }}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Service rows ── */}
        <div className="px-8 pt-4 pb-10">
          {category.services.map((service, idx) => {
            let price: number | string | undefined;
            if (category.type === "tiered") {
              price = service.price[selectedTier];
            } else {
              price = service.price.default;
            }

            const priceLabel =
              price === "—" || price === undefined
                ? "—"
                : `PKR ${Number(price).toLocaleString()}`;

            return (
              <div key={idx} className="flex flex-col" style={{ borderBottom: "1px solid rgba(231,159,49,0.07)" }}>
                <div 
                  className="flex items-center justify-between py-4 cursor-pointer hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg"
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                >
                  <div className="flex flex-col">
                    <span className={`${poppins.className} text-gray-200 text-sm md:text-base pr-4 font-light tracking-wide`}>
                      {service.name}
                    </span>
                    {service.description && (
                      <span className={`${poppins.className} text-xs text-gray-500 mt-1 font-light tracking-wide`}>{service.description}</span>
                    )}
                  </div>
                  <motion.span
                    key={priceLabel}
                    className={`${poppins.className} shrink-0 text-base md:text-lg font-medium text-[#e79f31] tracking-wider`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {priceLabel}
                  </motion.span>
                </div>
                
                {/* Accordion content */}
                <AnimatePresence>
                  {expandedIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pb-6 px-2">
                        <div className="bg-gradient-to-br from-[#1A1514] to-[#0c0a06] border border-[#e79f31]/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[inset_0_0_20px_rgba(231,159,49,0.02)]">
                          <div className="flex-1">
                            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-1.5 flex items-center gap-2">
                              <span className="w-4 h-px bg-[#e79f31]/50"></span>
                              {category.type === "tiered" ? `Tier: ${tiers.find(t => t.id === selectedTier)?.label}` : "Standard Service"}
                            </p>
                            <p className="text-white text-sm md:text-base leading-relaxed">
                              You are booking <br className="hidden sm:block md:hidden" /><span className="font-semibold text-[#e79f31]">{service.name}</span>
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedServiceForBooking({ name: service.name, category: category.title });
                              setIsBookingModalOpen(true);
                            }}
                            className="relative overflow-hidden group bg-gradient-to-r from-[#e79f31] to-[#fcd34d] text-[#080604] px-8 py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(231,159,49,0.4)] shrink-0 w-full sm:w-auto flex items-center justify-center"
                          >
                            <span className="relative z-10">Book This Service</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {isBookingModalOpen && selectedServiceForBooking && (
          <BookingFormModal 
            serviceName={selectedServiceForBooking.name}
            categoryName={selectedServiceForBooking.category}
            onClose={() => setIsBookingModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
