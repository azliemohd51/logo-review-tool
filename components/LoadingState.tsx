export function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      {/* Overall score skeleton */}
      <div className="flex gap-6 mb-8">
        <div className="h-40 w-40 rounded-2xl bg-white/[0.06] flex-shrink-0" />
        <div className="flex-1 flex flex-col justify-center gap-3">
          <div className="h-4 w-32 rounded-full bg-white/[0.06]" />
          <div className="h-12 w-24 rounded-xl bg-white/[0.06]" />
          <div className="h-3 w-full rounded-full bg-white/[0.06]" />
          <div className="h-3 w-3/4 rounded-full bg-white/[0.06]" />
        </div>
      </div>

      {/* Score cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <div className="flex justify-between mb-3">
              <div className="h-3 w-28 rounded-full bg-white/[0.06]" />
              <div className="h-6 w-10 rounded-lg bg-white/[0.06]" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06] mb-3" />
            <div className="h-3 w-full rounded-full bg-white/[0.06]" />
            <div className="h-3 w-4/5 rounded-full bg-white/[0.06] mt-2" />
          </div>
        ))}
      </div>

      {/* Improvements skeleton */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        <div className="h-3 w-36 rounded-full bg-white/[0.06] mb-5" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 mb-4">
            <div className="h-7 w-7 rounded-full bg-white/[0.06] flex-shrink-0" />
            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-white/[0.06]" />
              <div className="h-3 w-3/4 rounded-full bg-white/[0.06] mt-2" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-white/30 mt-6 animate-pulse">
        Analyzing your logo — this may take up to 15 seconds...
      </p>
    </div>
  );
}
