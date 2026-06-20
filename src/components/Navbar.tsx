
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import BookingFormModal from "./BookingFormModal";

const navLinks = [
  { label: "The House", href: "#house" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#social-proof" },
  { label: "Visit Us", href: "#visit" },
];

// Magnetic hover effect component
function MagneticLink({ children, href }: { children: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-2 text-[13px] tracking-[0.2em] font-uncial uppercase text-white/70 hover:text-white transition-colors duration-300 group"
      style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s" }}
    >
      {children}
      {/* Animated underline on hover */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#e79f31] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Stagger animation for mobile menu links
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(5px)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="relative z-50 flex items-center gap-3 group">
              <Image
                src="/images/main-logo-transparent.png"
                alt="Zayn's Hair Salon"
                width={120}
                height={80}
                className="h-9 md:h-11 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <MagneticLink key={link.label} href={link.href}>
                  {link.label}
                </MagneticLink>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden md:block relative px-7 py-3 text-[11px] tracking-[0.25em] uppercase font-medium overflow-hidden group"
            >
              {/* Border that glows on hover */}
              <span className="absolute inset-0 border border-[#e79f31]/40 group-hover:border-[#e79f31] transition-colors duration-500" />
              {/* Fill sweep on hover */}
              <span className="absolute inset-0 bg-[#e79f31] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              {/* Text */}
              <span className="relative z-10 font-uncial text-[#e79f31] group-hover:text-[#0F0B0A] transition-colors duration-500">
                Book Your Chair
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px] group"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-7 h-[1.5px] bg-[#e79f31] block origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-[1.5px] bg-[#e79f31] block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-7 h-[1.5px] bg-[#e79f31] block origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0F0B0A] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 z-50 w-12 h-12 flex items-center justify-center group"
              aria-label="Close menu"
            >
              <div className="relative w-7 h-7">
                <motion.span
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 45, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#e79f31] group-hover:bg-white transition-colors duration-300"
                />
                <motion.span
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: -45, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#e79f31] group-hover:bg-white transition-colors duration-300"
                />
              </div>
            </button>

            {/* Subtle decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#e79f31]/10 to-transparent" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={linkVariants}
                  onClick={() => setMobileOpen(false)}
                  className="relative text-3xl sm:text-4xl font-uncial tracking-wider text-white/80 hover:text-[#e79f31] transition-colors duration-300"
                >
                  <span className="text-[#e79f31]/30 text-sm tracking-widest absolute -left-8 top-1/2 -translate-y-1/2">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.button
                variants={linkVariants}
                onClick={() => {
                  setMobileOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="mt-8 px-10 py-4 border border-[#e79f31] font-uncial text-[#e79f31] text-sm tracking-[0.25em] uppercase hover:bg-[#e79f31] hover:text-[#0F0B0A] transition-all duration-500"
              >
                Book Your Chair
              </motion.button>

              {/* Decorative bottom text */}
              <motion.div
                variants={linkVariants}
                className="mt-12 text-[10px] font-uncial tracking-[0.4em] uppercase text-white/20"
              >
                The Hair Heaven
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <BookingFormModal 
            onClose={() => setIsBookingModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
