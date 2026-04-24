"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  assessment: string;
}

function barColor(score: number) {
  if (score <= 3) return "bg-red-500";
  if (score <= 6) return "bg-amber-500";
  return "bg-gradient-to-r from-[#A3005C] to-[#ff1f7e]";
}

function scoreColor(score: number) {
  if (score <= 3) return "text-red-400";
  if (score <= 6) return "text-amber-400";
  return "text-[#ff1f7e]";
}

export function ScoreCard({ label, score, assessment }: ScoreCardProps) {
  const [width, setWidth] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      const t = setTimeout(() => setWidth(score * 10), 100);
      return () => clearTimeout(t);
    }
  }, [score]);

  return (
    <div className="rounded-xl border border-[#A3005C]/20 bg-white/[0.04] backdrop-blur-sm p-5 shadow-lg shadow-[#A3005C]/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white/70">{label}</span>
        <span className={`text-2xl font-bold ${scoreColor(score)}`}>
          {score}<span className="text-sm font-normal text-white/30">/10</span>
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor(score)}`}
          style={{ width: `${width}%` }}
        />
      </div>

      <p className="text-sm text-white/50 leading-relaxed">{assessment}</p>
    </div>
  );
}
