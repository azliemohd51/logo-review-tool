interface ImprovementsListProps {
  items: [string, string, string];
}

export function ImprovementsList({ items }: ImprovementsListProps) {
  return (
    <div className="rounded-xl border border-[#A3005C]/20 bg-white/[0.04] backdrop-blur-sm p-6 shadow-lg shadow-[#A3005C]/10">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-[#A3005C] mb-5">
        Key Issues
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7a0044] to-[#A3005C] text-xs font-bold text-white shadow shadow-[#A3005C]/40">
              {i + 1}
            </span>
            <p className="text-sm text-white/70 leading-relaxed pt-0.5">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
