"use client";

export default function CTA() {
  return (
    <section className="py-16 bg-[#020617]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-900/40 via-black to-blue-900/40 p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-40 blur-[40px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to turn your content into quizzes?
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-200 max-w-xl">
                Start with the free plan, generate your first quiz in under 60 seconds,
                and see how much time AI can save you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 shadow-lg shadow-purple-500/40 text-sm font-semibold">
                Create your first quiz
              </button>
              <button className="px-6 py-3 rounded-xl border border-white/20 bg-black/30 text-sm text-gray-100 hover:bg-white/5">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
