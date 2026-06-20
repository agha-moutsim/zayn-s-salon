"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCategory as CategoryType } from "@/data/services";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({ weight: ["600", "700", "800"], subsets: ["latin"] });
const playfair = Playfair_Display({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

type Props = {
  category: CategoryType;
};

export default function ServiceCategory({ category }: Props) {
  // For tiered categories, keep track of the selected tier
  const [selectedTier, setSelectedTier] = useState<"stylist" | "leadStylist" | "seniorStylist">("leadStylist");

  const tiers = [
    { id: "stylist", label: "Stylist" },
    { id: "leadStylist", label: "Lead Stylist" },
    { id: "seniorStylist", label: "Senior Stylist" },
  ] as const;

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#e79f31]/30 pb-4 mb-8 gap-4">
        <h3 className={`${poppins.className} text-3xl text-white tracking-wide uppercase font-bold`}>
          {category.title}
        </h3>

        {/* Tier Selector for Mobile/Desktop */}
        {category.type === "tiered" && (
          <div className="flex bg-[#1A1514] p-1 rounded-full overflow-hidden border border-[#e79f31]/20 w-fit">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative px-4 md:px-6 py-2 text-xs md:text-sm font-medium transition-colors z-10 ${
                  selectedTier === tier.id ? "text-[#1A1514]" : "text-gray-400 hover:text-[#e79f31]"
                }`}
              >
                {selectedTier === tier.id && (
                  <motion.div
                    layoutId={`tier-bg-${category.id}`}
                    className="absolute inset-0 bg-[#e79f31] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tier.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {category.services.map((service, index) => {
          let displayPrice: number | string | undefined;

          if (category.type === "tiered") {
            displayPrice = service.price[selectedTier];
            // Fallback for missing tier prices (like THREADING lacking a base Stylist price)
            if (displayPrice === "—" || displayPrice === undefined) {
               displayPrice = "—";
            }
          } else {
            displayPrice = service.price.default;
          }

          return (
            <motion.div 
              key={index}
              className="group flex flex-col sm:flex-row justify-between sm:items-center p-4 hover:bg-[#1A1514] rounded-lg transition-colors border border-transparent hover:border-[#e79f31]/20 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="flex flex-col max-w-[70%]">
                <span className={`${playfair.className} text-lg md:text-xl font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors italic`}>
                  {service.name}
                </span>
                {service.description && (
                  <span className="text-sm text-gray-500 mt-1">{service.description}</span>
                )}
              </div>
              
              {/* Dotted Leader Line (hidden on very small mobile) */}
              <div className="hidden sm:block flex-grow mx-6 border-b border-dotted border-gray-700/50 group-hover:border-[#e79f31]/30 transition-colors relative top-2"></div>

              <div className="mt-2 sm:mt-0 flex items-center min-w-[80px] justify-end">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${selectedTier}-${displayPrice}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`${playfair.className} text-xl md:text-2xl font-bold text-[#e79f31]`}
                  >
                    {displayPrice !== "—" ? `PKR ${displayPrice}` : "—"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
