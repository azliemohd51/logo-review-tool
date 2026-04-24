"use client";

import { useState } from "react";

const BUSINESS_CATEGORIES = [
  "Product",
  "Service",
  "E-commerce",
  "SaaS / Software",
  "Agency / Studio",
  "Consulting",
  "Non-profit",
  "Other",
];

const INDUSTRIES = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Retail & Fashion",
  "Food & Beverage",
  "Real Estate",
  "Media & Entertainment",
  "Sports & Fitness",
  "Travel & Hospitality",
  "Legal",
  "Marketing & Advertising",
  "Other",
];

interface BusinessInfoFormProps {
  onNext: (data: { brandName: string; businessCategory: string; typeOfBusiness: string; industry: string }) => void;
  onBack: () => void;
  logoDataUrl: string;
}

function InputField({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#A3005C]/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#A3005C]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#A3005C]/30"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#A3005C]/20 bg-[#0d0006] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#A3005C]/60 focus:ring-1 focus:ring-[#A3005C]/30 appearance-none cursor-pointer"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff40'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
      >
        <option value="" disabled>Select...</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#1a001a]">{o}</option>
        ))}
      </select>
    </div>
  );
}

export function BusinessInfoForm({ onNext, onBack, logoDataUrl }: BusinessInfoFormProps) {
  const [brandName, setBrandName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [industry, setIndustry] = useState("");

  const isValid = brandName.trim() && businessCategory && typeOfBusiness.trim() && industry;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Logo preview */}
      <div className="flex justify-center mb-8">
        <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-[#A3005C]/20 bg-white/[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUrl} alt="Your logo" className="h-full w-full object-contain p-2" />
        </div>
      </div>

      <div className="rounded-2xl border border-[#A3005C]/20 bg-white/[0.03] backdrop-blur-sm p-6 shadow-xl shadow-[#A3005C]/10">
        <h2 className="text-lg font-semibold text-white mb-1">Business Information</h2>
        <p className="text-sm text-white/40 mb-6">Help us tailor the review to your brand.</p>

        <div className="flex flex-col gap-5">
          <InputField
            label="Brand Name"
            value={brandName}
            onChange={setBrandName}
            placeholder="e.g. QIS Studio"
          />
          <SelectField
            label="Business Category"
            value={businessCategory}
            onChange={setBusinessCategory}
            options={BUSINESS_CATEGORIES}
          />
          <InputField
            label="Type of Business"
            value={typeOfBusiness}
            onChange={setTypeOfBusiness}
            placeholder="e.g. Creative agency specialising in branding"
          />
          <SelectField
            label="Industry"
            value={industry}
            onChange={setIndustry}
            options={INDUSTRIES}
          />
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
          onClick={() => isValid && onNext({ brandName, businessCategory, typeOfBusiness, industry })}
          disabled={!isValid}
          className={`flex-[2] px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all
            ${isValid
              ? "bg-gradient-to-r from-[#7a0044] via-[#A3005C] to-[#c4006f] shadow-lg shadow-[#A3005C]/30 hover:brightness-110"
              : "bg-white/[0.06] text-white/30 cursor-not-allowed"
            }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
