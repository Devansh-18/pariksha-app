"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "From PDFs & Notes",
    description: "Upload study material and let QuizFlow instantly extract key concepts and build questions.",
    icon: "📄",
  },
  {
    title: "AI-Refined Questions",
    description: "Control difficulty, question type, and tone. Regenerate or tweak with one click.",
    icon: "🤖",
  },
  {
    title: "Auto-Grading & Export",
    description: "Export to Google Forms, LMS, or PDF. Track scores automatically.",
    icon: "📊",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              teachers & teams
            </span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Stop fighting with manual quiz creation. QuizFlow gives you AI superpowers
            while keeping you in full control.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative rounded-2xl border border-white/10 bg-[#020617]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-base md:text-lg">{feature.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
