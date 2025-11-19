"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid-neon">
      {/* 3D Gradient Blobs */}
      <div className="blob w-[420px] h-[420px] top-[-80px] left-[5%] bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-500 opacity-60" />
      <div className="blob w-[360px] h-[360px] bottom-[-120px] right-[10%] bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-24 md:pb-28 flex flex-col md:flex-row items-center gap-16">
        {/* Left text */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-black/40 px-3 py-1 text-xs text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>New · AI-powered quiz generation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Create{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Smarter Quizzes
            </span>{" "}
            in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 text-base md:text-lg max-w-xl"
          >
            Turn topics, PDFs, or lecture notes into beautiful, auto-graded quizzes.
            Save hours every week and keep students engaged with AI-generated questions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 shadow-lg shadow-purple-500/40 text-sm md:text-base font-semibold">
              Get Started Free
            </button>
            <button className="px-6 py-3 rounded-xl border border-white/15 bg-black/40 text-sm md:text-base text-gray-200 hover:bg-white/5 transition">
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6 pt-4 text-xs md:text-sm text-gray-400"
          >
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border border-[#020617]" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 to-red-500 border border-[#020617]" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 border border-[#020617]" />
            </div>
            <span>Trusted by educators & teams generating 10k+ questions/month.</span>
          </motion.div>
        </div>

        {/* Right “UI preview” card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 max-w-md w-full"
        >
          <div className="relative rounded-3xl border border-white/10 bg-[#020617]/80 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-gray-400">New Quiz · AI Draft</div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-8 rounded-lg bg-gradient-to-r from-purple-500/60 to-blue-500/60" />
              <div className="h-4 rounded-lg bg-white/10" />
              <div className="h-4 rounded-lg bg-white/10 w-3/4" />

              <div className="mt-4 grid gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-xl bg-white/5 px-3 py-2"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full border border-purple-400/60" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 rounded bg-white/20 w-3/4" />
                      <div className="h-2 rounded bg-white/10 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  12 questions generated · 3 edits
                </span>
                <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-medium">
                  Export
                </button>
              </div>
            </div>

            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-purple-500/40 opacity-40 blur-[2px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
