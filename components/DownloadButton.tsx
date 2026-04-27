"use client";

import dynamic from "next/dynamic";
import { LogoReview } from "@/lib/types";
import { ReviewPDF } from "./ReviewPDF";

// PDFDownloadLink uses browser APIs — must be dynamically imported with no SSR
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
  { ssr: false }
);

interface DownloadButtonProps {
  review: LogoReview;
  logoDataUrl: string;
}

export function DownloadButton({ review, logoDataUrl }: DownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<ReviewPDF review={review} logoDataUrl={logoDataUrl} />}
      fileName="logo-review.pdf"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7a0044] via-[#A3005C] to-[#c4006f] text-sm font-semibold text-white shadow-lg shadow-[#A3005C]/30 hover:brightness-110 transition-all flex-1"
    >
      {({ loading }) =>
        loading ? (
          "Preparing PDF..."
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF Report
          </>
        )
      }
    </PDFDownloadLink>
  );
}
