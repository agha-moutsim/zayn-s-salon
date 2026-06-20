"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { Calendar, Clock, MessageCircle, Mail, MapPin, Phone, X } from "lucide-react";

const poppins = Poppins({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

type Props = {
  serviceName?: string;
  categoryName?: string;
  onClose: () => void;
};

const locationInfo = {
  name: "Zayn's Salon",
  address: "37A sector C chambeli block, 1st floor",
  hours: "11:00 am - 11:00 pm",
  phone: "+92 321 4894075",
  email: "hello@zayns.com",
};

export default function BookingFormModal({ serviceName, categoryName, onClose }: Props) {
  
  const displayService = serviceName || "General Consultation";
  const displayCategory = categoryName || "Standard Appointment";


  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className={`${poppins.className} relative w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
        style={{
          background: "#080604",
          border: "1px solid rgba(231,159,49,0.3)",
          boxShadow: "0 0 100px rgba(231,159,49,0.1), 0 30px 80px rgba(0,0,0,0.9)",
        }}
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right (Outside flow) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#e79f31] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {/* Header */}
          <h2 className="text-[#e79f31] text-3xl font-light tracking-widest uppercase mb-10">
            Book A Chair
          </h2>

          {/* Location Details */}
          <div className="mb-10">
            <h3 className="text-white text-xl uppercase tracking-widest mb-6">
              {locationInfo.name}
            </h3>
            <div className="grid grid-cols-[100px_1fr] gap-y-4 text-xs md:text-sm tracking-wide">
              <span className="text-[#e79f31] uppercase">Address</span>
              <span className="text-gray-300">{locationInfo.address}</span>

              <span className="text-[#e79f31] uppercase">Hours</span>
              <span className="text-gray-300">{locationInfo.hours}</span>

              <span className="text-[#e79f31] uppercase">Phone</span>
              <span className="text-gray-300">{locationInfo.phone}</span>

              <span className="text-[#e79f31] uppercase">Email</span>
              <span className="text-gray-300">{locationInfo.email}</span>
            </div>
          </div>

          {/* Selected Service Box */}
          <div className="border border-white/10 bg-white/[0.02] p-6 mb-10 flex flex-col gap-1">
            <span className="text-[#e79f31] text-xs tracking-widest uppercase mb-1">Service</span>
            <span className="text-white text-lg tracking-wide">{displayService}</span>
            <span className="text-gray-500 text-sm">{displayCategory}</span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="bg-transparent border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e79f31]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Phone</label>
              <input
                type="tel"
                placeholder="03xx-xxxxxxx"
                className="bg-transparent border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e79f31]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Preferred Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-transparent border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e79f31]/50 transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Preferred Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full bg-transparent border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e79f31]/50 transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Service</label>
            <input
              type="text"
              readOnly
              value={displayService}
              className="bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-2 mb-10">
            <label className="text-[#e79f31] text-[10px] tracking-widest uppercase">Notes (Optional)</label>
            <textarea
              placeholder="Anything we should know"
              rows={3}
              className="bg-transparent border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e79f31]/50 transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 bg-[#e79f31] hover:bg-[#fcd34d] text-[#080604] px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors">
              <MessageCircle size={16} />
              Smart Booking
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white hover:border-[#e79f31] hover:text-[#e79f31] px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors">
              <Mail size={16} />
              Email Booking
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
