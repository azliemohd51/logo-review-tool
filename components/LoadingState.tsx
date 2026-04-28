"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reading your logo...",
  "Analysing colour psychology...",
  "Checking scalability...",
  "Evaluating industry fit...",
  "Scoring design dimensions...",
  "Compiling your report...",
];

export function LoadingState({ logoDataUrl }: { logoDataUrl?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0006]/80 backdrop-blur-md">
      {/* Card */}
      <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-[#A3005C]/30 bg-[#0d0006] px-10 py-10 shadow-2xl shadow-[#A3005C]/20 w-[320px]">

        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #A3005C 0%, transparent 70%)" }}
        />

        {/* Logo preview + spinning ring */}
        <div className="relative flex items-center justify-center">
          {/* Spinning gradient ring */}
          <div className="absolute h-24 w-24 rounded-full animate-spin"
            style={{
              background: "conic-gradient(from 0deg, #A3005C, #ff1f7e, transparent, #7a0044, #A3005C)",
              padding: "2px",
            }}
          />
          <div className="relative h-20 w-20 rounded-full bg-[#0d0006] flex items-center justify-center z-10">
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoDataUrl} alt="Logo" className="h-14 w-14 object-contain rounded-full" />
            ) : (
              <svg className="h-8 w-8 text-[#A3005C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
              </svg>
            )}
          </div>
        </div>

        {/* Rotating message */}
        <div className="h-6 flex items-center justify-center">
          <p
            className="text-sm font-medium text-white/70 text-center transition-all duration-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)" }}
          >
            {MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === msgIndex ? "20px" : "6px",
                backgroundColor: i === msgIndex ? "#A3005C" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        <p className="text-xs text-white/25 text-center -mt-2">
          This may take up to 15 seconds
        </p>
      </div>
    </div>
  );
}
