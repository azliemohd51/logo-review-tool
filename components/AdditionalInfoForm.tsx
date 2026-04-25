"use client";

import { useState } from "react";

interface AdditionalInfoFormProps {
  onNext: (data: {
    targetAudience: string;
    hasWebsite: boolean;
    logoAcrossPlatforms: boolean;
    hasLogoVariety: boolean;
    uploadedIconVersion: boolean | null;
  }) => void;
  onBack: () => void;
  brandName: string;
}

function Tooltip({ text }: { text: string }) {
  return (
    <span className="relative group inline-flex items-center ml-1.5">
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/30 text-[9px] text-white/40 cursor-default select-none">
        i
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border border-[#A3005C]/20 bg-[#1a001a] px-3 py-2 text-xs text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-xl">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a001a]" />
      </span>
    </span>
  );
}

function YesNoField({
  label,
  tooltip,
  description,
  value,
  onChange,
}: {
  label: string;
  tooltip?: string;
  description?: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center text-xs font-medium text-white/50 uppercase tracking-wider">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      {description && <p className="text-xs text-white/30 -mt-1">{description}</p>}
      <div className="flex gap-3">
        {[true, false].map((opt) => (
          <button
            key={String(opt)}
            onClick={() => onChange(opt)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-200
              ${value === opt
                ? "border-[#A3005C] bg-[#A3005C]/20 text-white shadow shadow-[#A3005C]/30"
                : "border-[#A3005C]/20 bg-white/[0.03] text-white/40 hover:border-[#A3005C]/40 hover:text-white/70"
              }`}
          >
            {opt ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AdditionalInfoForm({ onNext, onBack, brandName }: AdditionalInfoFormProps) {
  const [targetAudience, setTargetAudience] = useState("");
  const [hasWebsite, setHasWebsite] = useState<boolean | null>(null);
  const [logoAcrossPlatforms, setLogoAcrossPlatforms] = useState<boolean | null>(null);
  const [hasLogoVariety, setHasLogoVariety] = useState<boolean | null>(null);
  const [uploadedIconVersion, setUploadedIconVersion] = useState<boolean | null>(null);

  const isValid =
    targetAudience.trim() &&
    hasWebsite !== null &&
    logoAcrossPlatforms !== null &&
    hasLogoVariety !== null &&
    (hasLogoVariety === false || uploadedIconVersion !== null);

  const handleSubmit = () => {
    if (!isValid) return;
    onNext({
      targetAudience,
      hasWebsite: hasWebsite!,
      logoAcrossPlatforms: logoAcrossPlatforms!,
      hasLogoVariety: hasLogoVariety!,
      uploadedIconVersion: hasLogoVariety ? uploadedIconVersion : null,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="rounded-2xl border border-[#A3005C]/20 bg-white/[0.03] backdrop-blur-sm p-6 shadow-xl shadow-[#A3005C]/10">
        <h2 className="text-lg font-semibold text-white mb-1">Additional Details</h2>
        <p className="text-sm text-white/40 mb-6">
          A few more questions to sharpen the feedback for{" "}
          <span className="text-[#ff1f7e] font-medium">{brandName}</span>.
        </p>

        <div className="flex flex-col gap-6">
          {/* Target audience */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
              Target Audience
            </label>
            <textarea
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Young professionals aged 25–35 interested in personal finance"
              rows={3}
              className="w-full rounded-xl border border-[#A3005C]/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#A3005C]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#A3005C]/30 resize-none"
            />
          </div>

          <YesNoField
            label="Do you have a website?"
            value={hasWebsite}
            onChange={setHasWebsite}
          />

          <YesNoField
            label="Do you use your logo across all platforms?"
            description="Social media, print, merchandise, digital ads, etc."
            value={logoAcrossPlatforms}
            onChange={setLogoAcrossPlatforms}
          />

          <YesNoField
            label="Do you have a variety of logos?"
            tooltip="A logo variety (or logo suite) means you have multiple versions of your logo — e.g. a primary full logo, a standalone icon/symbol, a wordmark-only version, or horizontal and stacked layouts."
            value={hasLogoVariety}
            onChange={(v) => {
              setHasLogoVariety(v);
              if (!v) setUploadedIconVersion(null);
            }}
          />

          {/* Conditional: only show if they have variety */}
          {hasLogoVariety === true && (
            <div className="pl-4 border-l-2 border-[#A3005C]/30">
              <YesNoField
                label="Did you upload the icon/symbol version?"
                tooltip="The icon or symbol is the standalone graphic mark of your logo — without the brand name text. Knowing which version you uploaded helps us review it in the right context."
                value={uploadedIconVersion}
                onChange={setUploadedIconVersion}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 rounded-xl border border-[#A3005C]/30 text-sm font-medium text-white/60 hover:border-[#A3005C]/60 hover:text-white transition-all"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-[2] px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all
            ${isValid
              ? "bg-gradient-to-r from-[#7a0044] via-[#A3005C] to-[#c4006f] shadow-lg shadow-[#A3005C]/30 hover:brightness-110"
              : "bg-white/[0.06] text-white/30 cursor-not-allowed"
            }`}
        >
          Analyse My Logo →
        </button>
      </div>
    </div>
  );
}
