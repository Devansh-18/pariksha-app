"use client";

const stats = [
  { label: "Questions generated", value: "120k+" },
  { label: "Avg. time saved / quiz", value: "18 min" },
  { label: "Teams onboarded", value: "350+" },
  { label: "Countries", value: "25+" },
];

export default function Stats() {
  return (
    <section className="py-10 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6 border border-white/10 rounded-3xl bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-slate-900/10 backdrop-blur-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-white">
                {s.value}
              </div>
              <div className="text-[11px] md:text-xs text-gray-400 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
