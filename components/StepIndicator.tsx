interface StepIndicatorProps {
  current: number; // 1-based
  total: number;
  labels: string[];
}

export function StepIndicator({ current, total, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {labels.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300
                  ${done ? "bg-gradient-to-br from-[#7a0044] to-[#A3005C] text-white shadow shadow-[#A3005C]/40" : ""}
                  ${active ? "bg-gradient-to-br from-[#A3005C] to-[#ff1f7e] text-white shadow-lg shadow-[#A3005C]/50 ring-2 ring-[#A3005C]/30 ring-offset-2 ring-offset-[#0d0006]" : ""}
                  ${!done && !active ? "bg-white/[0.06] text-white/30 border border-white/10" : ""}
                `}
              >
                {done ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap transition-colors duration-300
                  ${active ? "text-white/80" : done ? "text-[#A3005C]" : "text-white/25"}
                `}
              >
                {label}
              </span>
            </div>

            {i < total - 1 && (
              <div
                className={`h-px w-12 sm:w-20 mx-1 mb-5 transition-all duration-500
                  ${done ? "bg-gradient-to-r from-[#A3005C] to-[#A3005C]/50" : "bg-white/[0.08]"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
