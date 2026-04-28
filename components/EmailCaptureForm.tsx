"use client";

import { useState } from "react";

interface EmailCaptureFormProps {
  onNext: (email: string) => void;
  onBack: () => void;
  brandName: string;
  industry: string;
}

export function EmailCaptureForm({ onNext, onBack, brandName, industry }: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setError("");
    setLoading(true);

    try {
      await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, brandName, industry }),
      });
    } catch {
      // Silent fail — don't block the user
    } finally {
      setLoading(false);
      onNext(email);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7a0044] via-[#A3005C] to-[#c4006f] shadow-lg shadow-[#A3005C]/40">
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      </div>

      <div className="rounded-2xl border border-[#A3005C]/20 bg-white/[0.03] backdrop-blur-sm p-6 shadow-xl shadow-[#A3005C]/10">
        <h2 className="text-xl font-bold text-white mb-2 text-center">
          Almost there!
        </h2>
        <p className="text-sm text-white/50 text-center mb-8 leading-relaxed">
          Enter your email to unlock the full AI analysis for{" "}
          <span className="text-[#ff1f7e] font-medium">{brandName}</span>.<br />
          We'll also send a copy of your report.
        </p>

        <div className="flex flex-col gap-2 mb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="yourname@email.com"
            className="w-full rounded-xl border border-[#A3005C]/20 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#A3005C]/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#A3005C]/30"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all mt-2
            ${isValid && !loading
              ? "bg-gradient-to-r from-[#7a0044] via-[#A3005C] to-[#c4006f] shadow-lg shadow-[#A3005C]/30 hover:brightness-110"
              : "bg-white/[0.06] text-white/30 cursor-not-allowed"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending...
            </span>
          ) : "Get My Free Analysis →"}
        </button>

        <p className="text-xs text-white/20 text-center mt-4">
          No spam. We only use your email to send your report.
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={onBack}
          className="text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
