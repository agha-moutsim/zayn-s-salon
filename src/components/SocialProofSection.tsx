"use client";

import React, { useEffect, useRef } from "react";

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // duplicate marquee content for a seamless infinite loop
    const track = sectionRef.current.querySelector("#zsMarqueeTrack");
    if (track && track.childElementCount < 10) {
      track.innerHTML += track.innerHTML;
    }

    // scroll-reveal with staggered delays
    const revealEls = sectionRef.current.querySelectorAll(
      ".zs-eyebrow, .zs-heading, .zs-sub, .zs-sticker, .zs-stat, .zs-card, .zs-press-label, .zs-press-logos span"
    );

    const groups = {
      stat: 0,
      card: 0,
      logo: 0,
    };

    revealEls.forEach(function (el: any) {
      let delay = 0;
      if (el.classList.contains("zs-stat")) {
        delay = groups.stat * 90;
        groups.stat++;
      } else if (el.classList.contains("zs-card")) {
        delay = groups.card * 110;
        groups.card++;
      } else if (el.tagName === "SPAN" && el.closest(".zs-press-logos")) {
        delay = groups.logo * 80;
        groups.logo++;
      }
      el.style.transitionDelay = delay + "ms";
    });

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("zs-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      io.observe(el);
    });

    // animated count-up for stat numbers
    const statNums = sectionRef.current.querySelectorAll(".zs-stat-num[data-count]");
    const countIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count") || "0");
          const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1400;
          let start: number | null = null;

          function step(ts: number) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    statNums.forEach(function (el) {
      countIO.observe(el);
    });

    // subtle tilt on testimonial cards (desktop / pointer devices only)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      sectionRef.current.querySelectorAll(".zs-card").forEach(function (card: any) {
        card.addEventListener("mousemove", function (e: MouseEvent) {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            "translateY(-6px) rotateX(" + y * -6 + "deg) rotateY(" + x * 6 + "deg)";
        });
        card.addEventListener("mouseleave", function () {
          card.style.transform = "";
        });
      });
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* =========================================================
           ZAYN'S SALON — SOCIAL PROOF SECTION
           Prefix: zs- (Zayn's Salon)
           ========================================================= */

        .zs-proof {
          --mustard: #C9972E;
          --mustard-light: #E3B75A;
          --mustard-dim: #8C6A1F;
          --black: #0A0908;
          --black-soft: #151310;
          --black-card: #1D1A14;
          --cream: #F8F4E8;
          --cream-dim: rgba(248, 244, 232, 0.62);
          --line: rgba(248, 244, 232, 0.1);
          --ease: cubic-bezier(0.16, 1, 0.3, 1);

          position: relative;
          background: var(--black);
          color: var(--cream);
          font-family: var(--font-poppins), 'Poppins', sans-serif;
          overflow: hidden;
          padding-block: clamp(4rem, 9vw, 8rem);
          isolation: isolate;
        }

        .zs-proof *, .zs-proof *::before, .zs-proof *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .zs-proof img, .zs-proof svg { display: block; max-width: 100%; }
        .zs-proof a { text-decoration: none; color: inherit; }
        .zs-proof ul { list-style: none; }

        /* ---------- seamless top fade ---------- */
        .zs-proof::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: clamp(80px, 10vw, 150px);
          background: linear-gradient(to bottom, #080604 0%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* ---------- background atmosphere ---------- */
        .zs-glow {
          position: absolute;
          inset: -10% -10% auto -10%;
          height: 60%;
          background: radial-gradient(60% 60% at 50% 0%, rgba(201,151,46,0.16), transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: zsBreathe 7s ease-in-out infinite;
        }
        .zs-glow-2 {
          position: absolute;
          width: 50%;
          height: 50%;
          left: -10%;
          bottom: -10%;
          background: radial-gradient(50% 50% at 50% 50%, rgba(201,151,46,0.1), transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: zsDrift 14s ease-in-out infinite;
        }
        @keyframes zsBreathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes zsDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6%, -6%); }
        }
        .zs-grain {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .zs-dotgrid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(248,244,232,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }
        .zs-deco-icon {
          position: absolute;
          opacity: 0.55;
          z-index: 0;
          pointer-events: none;
          animation: zsFloat 6s ease-in-out infinite;
        }
        .zs-deco-icon svg { width: 100%; height: 100%; }
        .zs-deco-1 { top: 6%; left: 4%; width: 46px; --r: -18deg; transform: rotate(-18deg); animation-delay: 0s; }
        .zs-deco-2 { top: 14%; right: 6%; width: 30px; transform: rotate(12deg); animation-name: zsTwinkle; animation-duration: 2.6s; animation-delay: 0.3s; }
        .zs-deco-3 { bottom: 8%; left: 7%; width: 34px; --r: 8deg; transform: rotate(8deg); animation-delay: 1.2s; }

        @keyframes zsFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r, -18deg)); }
          50% { transform: translateY(-14px) rotate(calc(var(--r, -18deg) + 4deg)); }
        }
        @keyframes zsTwinkle {
          0%, 100% { opacity: 0.25; transform: rotate(12deg) scale(0.85); }
          50% { opacity: 0.9; transform: rotate(12deg) scale(1.15); }
        }

        .zs-sparkle {
          position: absolute;
          z-index: 0;
          pointer-events: none;
          color: var(--mustard);
          opacity: 0;
          animation: zsTwinkle2 3.2s ease-in-out infinite;
        }
        .zs-sparkle svg { width: 100%; height: 100%; }
        .zs-sparkle-1 { top: 26%; left: 14%; width: 14px; animation-delay: 0.2s; }
        .zs-sparkle-2 { top: 40%; right: 12%; width: 10px; animation-delay: 1.4s; }
        .zs-sparkle-3 { bottom: 30%; right: 20%; width: 16px; animation-delay: 2.1s; }
        .zs-sparkle-4 { top: 60%; left: 9%; width: 11px; animation-delay: 0.8s; }
        @keyframes zsTwinkle2 {
          0%, 100% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          50% { opacity: 0.85; transform: scale(1) rotate(90deg); }
        }
        @media (max-width: 680px) { .zs-sparkle, .zs-deco-icon { display: none; } }

        .zs-container {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin-inline: auto;
          padding-inline: clamp(1.25rem, 5vw, 2.5rem);
        }

        /* ---------- header block ---------- */
        .zs-header {
          position: relative;
          text-align: center;
          margin-bottom: clamp(3rem, 7vw, 5rem);
        }

        .zs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          font-size: clamp(0.7rem, 1.6vw, 0.8rem);
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--mustard);
          margin-bottom: 1.25rem;
          opacity: 0;
          transform: translateY(14px);
        }
        .zs-eyebrow::before, .zs-eyebrow::after {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--mustard-dim);
        }

        .zs-heading {
          font-size: clamp(2.1rem, 6vw, 4.2rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--cream);
          opacity: 0;
          transform: translateY(18px);
        }
        .zs-heading .zs-accent {
          display: block;
          font-weight: 800;
          font-style: italic;
          color: var(--mustard);
          -webkit-text-stroke: 0;
          position: relative;
        }
        .zs-heading .zs-accent svg {
          position: absolute;
          left: 50%;
          bottom: -0.18em;
          transform: translateX(-50%);
          width: clamp(140px, 22vw, 260px);
        }
        .zs-heading .zs-accent svg path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
        }
        .zs-heading.zs-visible .zs-accent svg path {
          animation: zsDraw 1s var(--ease) 0.5s forwards;
        }
        @keyframes zsDraw {
          to { stroke-dashoffset: 0; }
        }

        .zs-sub {
          margin-top: 1.4rem;
          max-width: 480px;
          margin-inline: auto;
          font-size: clamp(0.92rem, 1.6vw, 1.02rem);
          font-weight: 300;
          color: var(--cream-dim);
          opacity: 0;
          transform: translateY(14px);
        }

        /* google-style rating sticker */
        .zs-sticker {
          position: absolute;
          top: -6px;
          right: 4%;
          width: 108px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: var(--mustard);
          color: var(--black);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: rotate(10deg);
          box-shadow: 0 14px 30px rgba(0,0,0,0.45);
          border: 2px solid var(--black);
          opacity: 0;
        }
        .zs-sticker::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px solid var(--mustard);
          animation: zsRing 2.4s ease-out infinite;
        }
        @keyframes zsRing {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .zs-sticker strong { font-size: 1.5rem; font-weight: 800; line-height: 1; }
        .zs-sticker span { font-size: 0.52rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; text-align: center; }
        .zs-sticker .zs-stars-mini { color: var(--black); font-size: 0.62rem; letter-spacing: 1px; margin-top: 1px; }

        /* ---------- stats row ---------- */
        .zs-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: clamp(3.5rem, 7vw, 5.5rem);
        }
        .zs-stat {
          position: relative;
          text-align: center;
          padding: clamp(1.6rem, 3vw, 2.4rem) 1rem;
          opacity: 0;
          transform: translateY(16px);
        }
        .zs-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 20%;
          bottom: 20%;
          width: 1px;
          background: var(--line);
        }
        .zs-stat-num {
          font-size: clamp(1.8rem, 4vw, 2.7rem);
          font-weight: 800;
          color: var(--mustard);
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .zs-stat-label {
          margin-top: 0.6rem;
          font-size: clamp(0.74rem, 1.4vw, 0.84rem);
          font-weight: 500;
          color: var(--cream);
        }
        .zs-stat-sub {
          margin-top: 0.2rem;
          font-size: 0.7rem;
          font-weight: 300;
          color: var(--cream-dim);
        }

        /* ---------- marquee strip ---------- */
        .zs-marquee {
          position: relative;
          width: 100%;
          background: var(--mustard);
          color: var(--black);
          transform: rotate(-1.4deg);
          margin-block: clamp(3rem, 7vw, 5rem);
          overflow: hidden;
          border-top: 2px solid var(--black);
          border-bottom: 2px solid var(--black);
        }
        .zs-marquee::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 48%, transparent 66%);
          transform: translateX(-100%);
          animation: zsShimmer 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes zsShimmer {
          0% { transform: translateX(-100%); }
          55%, 100% { transform: translateX(100%); }
        }
        .zs-marquee-track {
          display: flex;
          width: max-content;
          animation: zsMarquee 26s linear infinite;
        }
        .zs-marquee-track:hover { animation-play-state: paused; }
        .zs-marquee-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          white-space: nowrap;
          font-size: clamp(1rem, 2.6vw, 1.5rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          padding-block: clamp(0.7rem, 1.6vw, 1.1rem);
          padding-inline: 1.4rem;
        }
        .zs-marquee-item .zs-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--black); flex: none; animation: zsDotPulse 1.6s ease-in-out infinite; }
        @keyframes zsDotPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes zsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ---------- testimonials ---------- */
        .zs-testi-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .zs-testi-title {
          font-size: clamp(1.3rem, 3vw, 1.9rem);
          font-weight: 700;
        }
        .zs-testi-title span { color: var(--mustard); }
        .zs-testi-nav { display: none; gap: 0.6rem; }
        .zs-testi-nav button {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--cream);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s var(--ease), border-color 0.25s var(--ease);
        }
        .zs-testi-nav button:hover { background: var(--mustard); color: var(--black); border-color: var(--mustard); }

        .zs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: start;
        }

        .zs-card {
          position: relative;
          border-radius: 18px;
          padding: clamp(1.6rem, 2.6vw, 2.1rem);
          border: 1px solid var(--line);
          background: var(--black-card);
          opacity: 0;
          transform: translateY(24px);
          transition: transform 0.45s var(--ease), border-color 0.3s ease;
          overflow: hidden;
        }
        .zs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%);
          transform: translateX(-130%);
          transition: transform 0.85s ease;
          pointer-events: none;
          z-index: 1;
        }
        .zs-card:hover::before { transform: translateX(130%); }
        .zs-card > * { position: relative; z-index: 2; }
        .zs-card:hover { transform: translateY(-6px) !important; border-color: rgba(201,151,46,0.4); }
        .zs-card.zs-flip {
          background: var(--mustard);
          color: var(--black);
        }
        .zs-card.zs-tall { display: flex; flex-direction: column; }

        .zs-quote-mark {
          font-family: Georgia, serif;
          font-size: 3.4rem;
          line-height: 0.5;
          color: var(--mustard);
          font-weight: 700;
          display: block;
          margin-bottom: 0.6rem;
        }
        .zs-flip .zs-quote-mark { color: var(--black); opacity: 0.55; }

        .zs-stars { color: var(--mustard); letter-spacing: 3px; font-size: 0.85rem; margin-bottom: 0.85rem; display: block; }
        .zs-flip .zs-stars { color: var(--black); }
        .zs-stars i {
          display: inline-block;
          font-style: normal;
          opacity: 0;
          transform: scale(0) rotate(-70deg);
          transition: opacity 0.35s var(--ease), transform 0.4s var(--ease);
        }
        .zs-card.zs-visible .zs-stars i { opacity: 1; transform: scale(1) rotate(0deg); }
        .zs-stars i:nth-child(1) { transition-delay: 0.15s; }
        .zs-stars i:nth-child(2) { transition-delay: 0.25s; }
        .zs-stars i:nth-child(3) { transition-delay: 0.35s; }
        .zs-stars i:nth-child(4) { transition-delay: 0.45s; }
        .zs-stars i:nth-child(5) { transition-delay: 0.55s; }

        .zs-card p.zs-text {
          font-size: clamp(0.92rem, 1.5vw, 1rem);
          font-weight: 300;
          line-height: 1.65;
          color: var(--cream);
        }
        .zs-flip p.zs-text { color: var(--black); font-weight: 400; }

        .zs-card-foot {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-top: 1.4rem;
          padding-top: 1.2rem;
          border-top: 1px solid var(--line);
        }
        .zs-flip .zs-card-foot { border-top-color: rgba(10,9,8,0.18); }

        .zs-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: var(--mustard);
          color: var(--black);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex: none;
        }
        .zs-flip .zs-avatar { background: var(--black); color: var(--mustard); }

        .zs-name { font-size: 0.88rem; font-weight: 600; }
        .zs-role { font-size: 0.74rem; font-weight: 300; color: var(--cream-dim); }
        .zs-flip .zs-role { color: rgba(10,9,8,0.6); }

        .zs-verified {
          position: absolute;
          top: 1.4rem; right: 1.4rem;
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--cream-dim);
        }
        .zs-flip .zs-verified { color: rgba(10,9,8,0.55); }
        .zs-verified svg { width: 12px; height: 12px; }

        /* ---------- press strip ---------- */
        .zs-press {
          margin-top: clamp(3.5rem, 7vw, 5.5rem);
          text-align: center;
        }
        .zs-press-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--cream-dim);
          margin-bottom: 1.6rem;
          opacity: 0;
        }
        .zs-press-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(1.6rem, 4vw, 3.2rem);
        }
        .zs-press-logos span {
          font-size: clamp(0.95rem, 2vw, 1.25rem);
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--cream-dim);
          opacity: 0;
          transform: translateY(10px);
          transition: color 0.3s ease;
          cursor: default;
        }
        .zs-press-logos span:hover { color: var(--mustard); }

        /* ---------- reveal animation ---------- */
        .zs-proof .zs-visible { opacity: 1 !important; transform: translateY(0) !important; }
        .zs-eyebrow, .zs-heading, .zs-sub, .zs-sticker, .zs-stat,
        .zs-card, .zs-press-label, .zs-press-logos span {
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }

        /* =========================================================
           RESPONSIVE — TABLET
           ========================================================= */
        @media (max-width: 980px) {
          .zs-grid { grid-template-columns: repeat(2, 1fr); }
          .zs-card.zs-tall { grid-row: span 1; }
          .zs-sticker { right: 2%; width: 92px; }
        }

        /* =========================================================
           RESPONSIVE — MOBILE
           ========================================================= */
        @media (max-width: 680px) {
          .zs-proof { padding-block: 3.5rem; }

          .zs-sticker {
            position: static;
            transform: rotate(-3deg);
            margin: 0 auto 1.6rem;
            width: 90px;
          }
          .zs-header { display: flex; flex-direction: column; align-items: center; }

          .zs-stats {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 1.5rem;
          }
          .zs-stat:nth-child(2)::after { display: none; }
          .zs-stat:nth-child(odd)::after { display: block; }
          .zs-stat:nth-child(3)::after,
          .zs-stat:nth-child(4)::after { display: none; }
          .zs-stat { padding-block: 0.6rem 1.2rem; }
          .zs-stat:nth-child(1), .zs-stat:nth-child(2) {
            border-bottom: 1px solid var(--line);
            padding-bottom: 1.4rem;
          }
          .zs-stat:nth-child(3), .zs-stat:nth-child(4) { padding-top: 1.4rem; }

          .zs-marquee { transform: rotate(-2deg); margin-inline: -0.5rem; }

          .zs-testi-head { justify-content: center; text-align: center; }

          /* card grid -> horizontal snap carousel */
          .zs-grid {
            display: flex;
            grid-template-columns: none;
            gap: 1rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 1.4rem;
            margin-inline: -1.25rem;
            padding-inline: 1.25rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .zs-grid::-webkit-scrollbar { display: none; }
          .zs-card {
            flex: 0 0 84%;
            scroll-snap-align: center;
          }
          .zs-card.zs-tall { display: flex; }

          .zs-press-logos { gap: 1.4rem 2rem; }
        }

        @media (max-width: 380px) {
          .zs-card { flex-basis: 90%; }
          .zs-heading { font-size: 2rem; }
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .zs-marquee-track { animation: none; }
          .zs-proof * { transition: none !important; animation: none !important; }
        }
      `}} />

      <section className="zs-proof" id="social-proof" ref={sectionRef}>
        <div className="zs-glow"></div>
        <div className="zs-glow-2"></div>
        <div className="zs-dotgrid"></div>

        {/* decorative scissor / sparkle icons */}
        <div className="zs-deco-icon zs-deco-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth="1.4">
            <circle cx="6" cy="6" r="2.4" />
            <circle cx="6" cy="18" r="2.4" />
            <line x1="20" y1="4" x2="8.2" y2="14.4" />
            <line x1="20" y1="20" x2="8.2" y2="9.6" />
          </svg>
        </div>
        <div className="zs-deco-icon zs-deco-2">
          <svg viewBox="0 0 24 24" fill="#C9972E">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>
        <div className="zs-deco-icon zs-deco-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth="1.4">
            <circle cx="6" cy="6" r="2.4" />
            <circle cx="6" cy="18" r="2.4" />
            <line x1="20" y1="4" x2="8.2" y2="14.4" />
            <line x1="20" y1="20" x2="8.2" y2="9.6" />
          </svg>
        </div>

        <div className="zs-sparkle zs-sparkle-1">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>
        <div className="zs-sparkle zs-sparkle-2">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>
        <div className="zs-sparkle zs-sparkle-3">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>
        <div className="zs-sparkle zs-sparkle-4">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>

        <div className="zs-container">
          {/* ===== HEADER ===== */}
          <div className="zs-header zs-reveal-group">
            <div className="zs-sticker">
              <strong>4.9</strong>
              <span className="zs-stars-mini">★★★★★</span>
              <span>Rated</span>
            </div>

            <span className="zs-eyebrow">What They&apos;re Saying</span>
            <h2 className="zs-heading">
              Don&apos;t Take Our Word For It.
              <span className="zs-accent">
                Take Theirs.
                <svg viewBox="0 0 260 16" fill="none">
                  <path
                    d="M2 12C50 2 210 2 258 12"
                    stroke="#C9972E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="zs-sub">
              Thousands of transformations. One standard of excellence — every chair, every
              client, every single time.
            </p>
          </div>

          {/* ===== STATS ===== */}
          <div className="zs-stats">
            <div className="zs-stat">
              <div className="zs-stat-num" data-count="4.9" data-decimals="1" data-suffix="/5">
                0/5
              </div>
              <div className="zs-stat-label">Average Rating</div>
              <div className="zs-stat-sub">2,400+ Verified Reviews</div>
            </div>
            <div className="zs-stat">
              <div className="zs-stat-num" data-count="12" data-suffix="K+">
                0K+
              </div>
              <div className="zs-stat-label">Happy Clients</div>
              <div className="zs-stat-sub">And Counting Daily</div>
            </div>
            <div className="zs-stat">
              <div className="zs-stat-num" data-count="8" data-suffix="+">
                0+
              </div>
              <div className="zs-stat-label">Years of Craft</div>
              <div className="zs-stat-sub">Serving The City Since 2016</div>
            </div>
            <div className="zs-stat">
              <div className="zs-stat-num" data-count="98" data-suffix="%">
                0%
              </div>
              <div className="zs-stat-label">Repeat Clients</div>
              <div className="zs-stat-sub">They Always Come Back</div>
            </div>
          </div>

          {/* ===== MARQUEE ===== */}
          <div className="zs-marquee">
            <div className="zs-marquee-track" id="zsMarqueeTrack">
              <div className="zs-marquee-item">
                <span className="zs-dot"></span>5.0 Star Rated
              </div>
              <div className="zs-marquee-item">
                <span className="zs-dot"></span>12,000+ Clients
              </div>
              <div className="zs-marquee-item">
                <span className="zs-dot"></span>98% Repeat Clients
              </div>
              <div className="zs-marquee-item">
                <span className="zs-dot"></span>Trusted Since 2016
              </div>
              <div className="zs-marquee-item">
                <span className="zs-dot"></span>Featured in The Press
              </div>
            </div>
          </div>

          {/* ===== TESTIMONIALS ===== */}
          <div className="zs-testi-head">
            <h3 className="zs-testi-title">
              Straight From <span>Our Chairs</span>
            </h3>
          </div>

          <div className="zs-grid">
            <div className="zs-card zs-tall">
              <div className="zs-verified">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
                </svg>
                Verified Client
              </div>
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                Walked in nervous about my bridal look, walked out glowing. The team understood my
                vision better than I could explain it myself — every detail, exactly right.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">AR</div>
                <div>
                  <div className="zs-name">Ayesha R.</div>
                  <div className="zs-role">Bridal Client</div>
                </div>
              </div>
            </div>

            <div className="zs-card zs-flip">
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                Best fade in the city, hands down. Tried five other salons before landing here — never
                going anywhere else again.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">HK</div>
                <div>
                  <div className="zs-name">Hamza K.</div>
                  <div className="zs-role">Regular Client</div>
                </div>
              </div>
            </div>

            <div className="zs-card">
              <div className="zs-verified">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
                </svg>
                Verified Client
              </div>
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                The balayage is unreal — three months later it still looks freshly done. Worth every
                rupee.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">SM</div>
                <div>
                  <div className="zs-name">Sara M.</div>
                  <div className="zs-role">Color Client</div>
                </div>
              </div>
            </div>

            <div className="zs-card">
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                Walked in a skeptic, left a loyal client. The attention to detail is something I
                haven&apos;t seen anywhere else in this city.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">BA</div>
                <div>
                  <div className="zs-name">Bilal A.</div>
                  <div className="zs-role">First-Time Client</div>
                </div>
              </div>
            </div>

            <div className="zs-card zs-flip">
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                My skin has never felt this good. The facials here are genuinely transformative, not
                just relaxing.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">MT</div>
                <div>
                  <div className="zs-name">Mahnoor T.</div>
                  <div className="zs-role">Skincare Client</div>
                </div>
              </div>
            </div>

            <div className="zs-card">
              <div className="zs-verified">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
                </svg>
                Verified Client
              </div>
              <span className="zs-quote-mark">&quot;</span>
              <span className="zs-stars">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </span>
              <p className="zs-text">
                Got groomed here for my wedding and felt like a million bucks. Professional, punctual,
                and incredibly talented.
              </p>
              <div className="zs-card-foot">
                <div className="zs-avatar">UF</div>
                <div>
                  <div className="zs-name">Usman F.</div>
                  <div className="zs-role">Groom Client</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PRESS ===== */}
          <div className="zs-press">
            <p className="zs-press-label">As Featured In</p>
            <div className="zs-press-logos">
              <span>STYLE ATLAS</span>
              <span>GLAM WEEKLY</span>
              <span>THE CUT LIST</span>
              <span>URBAN CHIC</span>
              <span>BEAUTY EDIT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
