"use client";

import { LogoReview } from "@/lib/types";
import { ScoreCard } from "./ScoreCard";
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

export function ReviewResults({ review, logoDataUrl, onReset }: ReviewResultsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-black">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10 pb-8 border-b border-black/10">
        <div className="flex-shrink-0 flex items-start justify-center sm:justify-start">
          <div className="h-28 w-28 border border-black/10 bg-gray-50 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoDataUrl} alt="Uploaded logo" className="h-full w-full object-contain p-3" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-1">Overall Score</p>
          <p className="text-7xl font-bold text-black leading-none mb-3">
            {review.overall_score}<span className="text-3xl font-normal text-black/25">/10</span>
          </p>
          <p className="text-sm text-black/55 leading-relaxed max-w-md">{review.first_impression}</p>
        </div>
      </div>

      {/* Logo Type */}
      <div className="mb-8 pb-8 border-b border-black/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-3">Logo Type</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="inline-block border border-black px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-black w-fit">
            {review.logo_type}
          </span>
          <p className="text-sm text-black/55 leading-relaxed">{review.logo_type_reasoning}</p>
        </div>
      </div>

      {/* Color Psychology */}
      <div className="mb-8 pb-8 border-b border-black/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-3">Color Psychology</p>
        <p className="text-sm text-black/60 leading-relaxed">{review.color_psychology}</p>
      </div>

      {/* Dimension scores */}
      <div className="mb-8 pb-8 border-b border-black/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-4">Design Dimensions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(DIMENSION_LABELS) as Array<keyof LogoReview["dimensions"]>).map((key) => (
            <ScoreCard
              key={key}
              label={DIMENSION_LABELS[key]}
              score={review.dimensions[key].score}
              assessment={review.dimensions[key].assessment}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <DownloadButton review={review} logoDataUrl={logoDataUrl} />
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 border border-black/20 text-sm font-medium text-black/60 hover:border-black hover:text-black transition-all"
        >
          Review Another Logo
        </button>
      </div>
    </div>
  );
}
