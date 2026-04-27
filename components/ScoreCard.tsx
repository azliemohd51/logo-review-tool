"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  assessment: string;
}

function barColor(score: number) {
  if (score < 5) return "bg-red-500";
  if (score <= 8) return "bg-yellow-400";
  return "bg-green-400";
}

function scoreColor(score: number) {
  if (score < 5) return "text-red-400";
  if (score <= 8) return "text-yellow-400";
  return "text-green-400";
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
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-2xl font-bold ${scoreColor(score)}`}>
          {score}<span className="text-sm font-normal text-white/25">/10</span>
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
