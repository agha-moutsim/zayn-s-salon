"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  baseWeight?: number;
  maxWeight?: number;
  radius?: number;
}

// Shared mouse position — updated once globally, read by all chars without React state
const globalMouse = { x: -9999, y: -9999 };

export default function TextPressure({ 
  text, 
  className = "", 
  baseWeight = 200, 
  maxWeight = 900,
  radius = 400 
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animWeights = useRef<number[]>([]);
  const animScales = useRef<number[]>([]);
  const rafId = useRef<number>(0);

  const chars = text.split("");

  // Init per-char lerp state
  useEffect(() => {
    animWeights.current = chars.map(() => baseWeight);
    animScales.current = chars.map(() => 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, baseWeight]);

  const tick = useCallback(() => {
    const refs = charRefs.current;
    for (let i = 0; i < refs.length; i++) {
      const el = refs[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(globalMouse.x - cx, globalMouse.y - cy);

      let targetWeight = baseWeight;
      let targetScale = 1;

      if (dist < radius) {
        const normalized = 1 - dist / radius;
        const ease = normalized * normalized * (3 - 2 * normalized);
        targetWeight = baseWeight + (maxWeight - baseWeight) * ease;
        targetScale = 1 + 0.15 * ease;
      }

      // Lerp — no React setState, purely DOM mutation
      const w = animWeights.current[i] + (targetWeight - animWeights.current[i]) * 0.06;
      const s = animScales.current[i] + (targetScale - animScales.current[i]) * 0.06;
      animWeights.current[i] = w;
      animScales.current[i] = s;

      el.style.transform = `scale(${s}) translateY(${-(s - 1) * 20}px)`;
      el.style.fontVariationSettings = `'wght' ${Math.round(w)}`;
    }
    rafId.current = requestAnimationFrame(tick);
  }, [baseWeight, maxWeight, radius]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      globalMouse.x = e.clientX;
      globalMouse.y = e.clientY;
    };
    const onLeave = () => {
      globalMouse.x = -9999;
      globalMouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  return (
    <div ref={containerRef} className={`flex ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { charRefs.current[i] = el; }}
          className="inline-block"
          style={{ transformOrigin: "bottom center", willChange: "transform" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
