"use client";

import { useEffect, useRef, useState } from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  assessment: string;
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
    <div className="border border-black/10 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{label}</span>
        <span className="text-2xl font-bold text-black">
          {score}<span className="text-sm font-normal text-black/30">/10</span>
        </span>
      </div>
      <div className="h-0.5 w-full bg-black/10 mb-3">
        <div
          className="h-full bg-black transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="text-sm text-black/60 leading-relaxed">{assessment}</p>
    </div>
  );
}
