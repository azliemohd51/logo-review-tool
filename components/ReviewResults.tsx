"use client";

import Image from "next/image";
import { LogoReview } from "@/lib/types";
import { ScoreCard } from "./ScoreCard";
import { ImprovementsList } from "./ImprovementsList";
import { DownloadButton } from "./DownloadButton";

const DIMENSION_LABELS: Record<keyof LogoReview["dimensions"], string> = {
  simplicity_memorability: "Simplicity & Memorability",
  color_palette: "Color Palette",
  typography: "Typography",
  scalability: "Scalability",
  versatility: "Versatility",
  industry_fit: "Industry Fit",
};

interface ReviewResultsProps {
  review: LogoReview;
  logoDataUrl: string;
  onReset: () => void;
}

function overallColor(score: number) {
  if (score <= 3) return "text-red-400";
  if (score <= 6) return "text-amber-400";
  return "text-[#ff1f7e]";
}

export function ReviewResults({ review, logoDataUrl, onReset }: ReviewResultsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Overall score header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 rounded-2xl border border-[#A3005C]/20 bg-white/[0.04] backdrop-blur-sm p-6 shadow-lg shadow-[#A3005C]/10">
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative h-36 w-36 rounded-xl overflow-hidden border border-[#A3005C]/20 bg-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoDataUrl} alt="Uploaded logo" className="h-full w-full object-contain p-3" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#A3005C] mb-1">Overall Score</p>
          <p className={`text-6xl font-bold leading-none mb-3 ${overallColor(review.overall_score)}`}>
            {review.overall_score}<span className="text-2xl font-normal text-white/30">/10</span>
          </p>
          <p className="text-sm text-white/60 leading-relaxed max-w-lg">{review.first_impression}</p>
        </div>
      </div>

      {/* Dimension scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {(Object.keys(DIMENSION_LABELS) as Array<keyof LogoReview["dimensions"]>).map((key) => (
          <ScoreCard
            key={key}
            label={DIMENSION_LABELS[key]}
            score={review.dimensions[key].score}
            assessment={review.dimensions[key].assessment}
          />
        ))}
      </div>

      {/* Improvements */}
      <div className="mb-6">
        <ImprovementsList items={review.top_issues} />
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-[#A3005C]/20 bg-white/[0.04] backdrop-blur-sm p-6 shadow-lg shadow-[#A3005C]/10 mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#A3005C] mb-3">Summary</h3>
        <p className="text-sm text-white/60 leading-relaxed">{review.summary}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <DownloadButton review={review} logoDataUrl={logoDataUrl} />
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl border border-[#A3005C]/30 text-sm font-medium text-white/70 hover:border-[#A3005C]/60 hover:text-white transition-all"
        >
          Review Another Logo
        </button>
      </div>
    </div>
  );
}
