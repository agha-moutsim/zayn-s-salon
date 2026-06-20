"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageItem } from "@/data/services";
import { Poppins, Playfair_Display } from "next/font/google";
import { Check } from "lucide-react";
import BookingFormModal from "./BookingFormModal";

const poppins = Poppins({ weight: ["600", "700", "800"], subsets: ["latin"] });
const playfair = Playfair_Display({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

type Props = {
  packages: PackageItem[];
};

type FacialType = "drShazil" | "charcoal" | "dermacos" | "hydra" | "janssen";

const facialLabels: Record<FacialType, string> = {
  drShazil: "Dr. Shazil",
  charcoal: "Charcoal",
  dermacos: "Dermacos",
  hydra: "Hydra",
  janssen: "Janssen",
};

export default function PackagesSection({ packages }: Props) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packages[0].id);
  const [selectedFacial, setSelectedFacial] = useState<FacialType>("drShazil");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const selectedPackage = packages.find((p) => p.id === selectedPackageId) || packages[0];
  const currentPrice = selectedPackage.pricing[selectedFacial];

  return (
    <div className="relative w-full mt-12 bg-[#120e04] rounded-3xl border border-[#e79f31]/20 p-6 md:p-12 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-gradient from-[#e79f31]/10 to-transparent opacity-50 blur-3xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />

      <h3 className={`${poppins.className} text-4xl text-[#e79f31] mb-10 tracking-wide text-center font-bold`}>
        Exclusive Packages
      </h3>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
        
        {/* Left Column: Package Selection & Includes */}
        <div className="flex-1 space-y-8">
          
          {/* Package Tabs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`relative px-6 py-4 rounded-xl text-left sm:text-center font-medium transition-all duration-300 flex-1 ${
                  selectedPackageId === pkg.id 
                    ? "text-[#120e04] bg-[#e79f31] shadow-[0_0_20px_rgba(231,159,49,0.3)]" 
                    : "text-gray-400 bg-[#1A1514] hover:bg-[#231d1a] border border-white/5"
                }`}
              >
                {pkg.title}
              </button>
            ))}
          </div>

          {/* Includes List */}
          <div className="bg-[#0a0806] rounded-2xl p-6 md:p-8 border border-white/5">
            <h4 className="text-xl text-white font-semibold mb-6">Package Includes:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {selectedPackage.includes.map((item, index) => (
                  <motion.div
                    key={`${selectedPackageId}-${item}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.05 }}
                     className={`${playfair.className} flex items-center gap-3 text-gray-300`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#e79f31]/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#e79f31]" />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {selectedPackage.id !== "express-self-care" && (
              <p className="text-xs text-gray-500 mt-6 italic">
                *Styling options available. Facial brand chosen separately.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Facial Configurator & Price */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-[#1A1514] rounded-2xl p-6 md:p-10 border border-[#e79f31]/20 relative overflow-hidden">
            
            {/* Decor line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#e79f31] to-transparent" />

            <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-4">Step 2: Choose Facial</h4>
            
            {/* Facial Type Selectors */}
            <div className="flex flex-wrap gap-2 mb-10">
              {(Object.keys(facialLabels) as FacialType[]).map((facial) => (
                <button
                  key={facial}
                  onClick={() => setSelectedFacial(facial)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFacial === facial
                      ? "bg-white text-black"
                      : "bg-[#0a0806] text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  {facialLabels[facial]}
                </button>
              ))}
            </div>

            <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div>
                <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Total Package Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#e79f31] text-2xl font-bold">PKR</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentPrice}
                      initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 20, filter: "blur(4px)", position: "absolute" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      className={`${playfair.className} text-5xl md:text-7xl font-bold text-white tracking-tighter`}
                    >
                      {currentPrice.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              
              
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="relative overflow-hidden group bg-gradient-to-r from-[#e79f31] to-[#fcd34d] text-[#080604] px-8 py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(231,159,49,0.4)] shrink-0 w-full sm:w-auto flex items-center justify-center"
              >
                <span className="relative z-10">Book This Package</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingFormModal 
            serviceName={selectedPackage.title}
            categoryName={`Facial: ${facialLabels[selectedFacial]}`}
            onClose={() => setIsBookingModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
