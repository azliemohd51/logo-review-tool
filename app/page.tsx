"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadZone } from "@/components/UploadZone";
import { BusinessInfoForm } from "@/components/BusinessInfoForm";
import { AdditionalInfoForm } from "@/components/AdditionalInfoForm";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { LoadingState } from "@/components/LoadingState";
import { ReviewResults } from "@/components/ReviewResults";
import { LogoReview, BusinessInfo } from "@/lib/types";

type Step = "upload" | "business" | "additional" | "email" | "loading" | "results" | "error";

export default function Home() {
  const [step, setStep] = useState<Step>("upload");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [businessData, setBusinessData] = useState<Partial<BusinessInfo>>({});
  const [review, setReview] = useState<LogoReview | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpload = (file: File, dataUrl: string) => {
    setLogoFile(file);
    setLogoDataUrl(dataUrl);
    setStep("business");
  };

  const handleBusinessNext = (data: {
    brandName: string;
    businessCategory: string;
    typeOfBusiness: string;
    industry: string;
  }) => {
    setBusinessData((prev) => ({ ...prev, ...data }));
    setStep("additional");
  };

  const handleAdditionalNext = (data: {
    targetAudience: string;
    hasWebsite: boolean;
    logoAcrossPlatforms: boolean;
    hasLogoVariety: boolean;
    uploadedIconVersion: boolean | null;
  }) => {
    setBusinessData((prev) => ({ ...prev, ...data }));
    setStep("email");
  };

  const handleEmailNext = async (email: string) => {
    const fullInfo = businessData as BusinessInfo;
    setStep("loading");

    const formData = new FormData();
    formData.append("logo", logoFile!);
    formData.append("brandName", fullInfo.brandName);
    formData.append("businessCategory", fullInfo.businessCategory);
    formData.append("typeOfBusiness", fullInfo.typeOfBusiness);
    formData.append("industry", fullInfo.industry);
    formData.append("targetAudience", fullInfo.targetAudience);
    formData.append("hasWebsite", String(fullInfo.hasWebsite));
    formData.append("logoAcrossPlatforms", String(fullInfo.logoAcrossPlatforms));
    formData.append("hasLogoVariety", String(fullInfo.hasLogoVariety));
    formData.append("uploadedIconVersion", String(fullInfo.uploadedIconVersion));
    formData.append("email", email);

    try {
      const res = await fetch("/api/review", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong.");
        setStep("error");
        return;
      }
      setReview(json.review);
      setStep("results");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("error");
    }
  };

  const handleReset = () => {
    setStep("upload");
    setLogoFile(null);
    setLogoDataUrl("");
    setBusinessData({});
    setReview(null);
    setErrorMsg("");
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(ellipse, #A3005C 0%, transparent 70%)" }}
      />

      {/* Header */}
      <header className="w-full border-b border-[#A3005C]/10 px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <Image src="/qis-logo.png" alt="QIS Studio" width={120} height={28} className="object-contain" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 sm:py-14">

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A3005C]/30 bg-[#A3005C]/10 px-4 py-1.5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#ff1f7e] animate-pulse" />
              <span className="text-xs font-medium text-[#ff1f7e]">Powered by AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Get instant feedback<br />
              <span className="bg-gradient-to-r from-[#A3005C] via-[#c4006f] to-[#ff1f7e] bg-clip-text text-transparent">
                on your logo
              </span>
            </h1>
            <p className="text-base text-white/50 max-w-md mb-12">
              Upload your logo and our AI design critic will score it across 6 key dimensions — in seconds.
            </p>
            <UploadZone onUpload={handleUpload} />
          </div>
        )}

        {/* Step 2: Business Info */}
        {step === "business" && (
          <BusinessInfoForm
            onNext={handleBusinessNext}
            onBack={() => setStep("upload")}
            logoDataUrl={logoDataUrl}
          />
        )}

        {/* Step 3: Additional Info */}
        {step === "additional" && (
          <AdditionalInfoForm
            onNext={handleAdditionalNext}
            onBack={() => setStep("business")}
            brandName={businessData.brandName ?? "your brand"}
          />
        )}

        {/* Step 4: Email Capture */}
        {step === "email" && (
          <EmailCaptureForm
            onNext={handleEmailNext}
            onBack={() => setStep("additional")}
            brandName={businessData.brandName ?? "your brand"}
            industry={businessData.industry ?? ""}
          />
        )}

        {/* Loading */}
        {step === "loading" && <LoadingState logoDataUrl={logoDataUrl} />}

        {/* Results */}
        {step === "results" && review && (
          <ReviewResults
            review={review}
            logoDataUrl={logoDataUrl}
            onReset={handleReset}
          />
        )}

        {/* Error */}
        {step === "error" && (
          <div className="flex flex-col items-center text-center gap-6 pt-16">
            <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-white mb-1">Analysis failed</p>
              <p className="text-sm text-white/50">{errorMsg}</p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7a0044] via-[#A3005C] to-[#c4006f] text-sm font-semibold text-white shadow-lg shadow-[#A3005C]/30 hover:brightness-110 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#A3005C]/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs text-white/20">© 2025 QIS Studio. All rights reserved.</p>
          <p className="text-xs text-white/20">v1.6</p>
        </div>
      </footer>
    </div>
  );
}
