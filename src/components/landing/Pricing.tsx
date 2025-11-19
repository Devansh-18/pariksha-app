"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    highlight: false,
    description: "Perfect for students & solo teachers getting started.",
    features: [
      "Up to 50 AI-generated questions / month",
      "Quiz export as PDF",
      "Basic editing tools",
    ],
  },
  {
    name: "Pro",
    price: "$9 / mo",
    highlight: true,
    description: "For serious educators and small teams.",
    features: [
      "Unlimited AI-generated questions",
      "PDF & Google Forms export",
      "Question bank & tagging",
      "Priority generation speed",
    ],
  },
  {
    name: "Team",
    price: "$29 / mo",
    highlight: false,
    description: "Collaborate across institutions or coaching centers.",
    features: [
      "Everything in Pro",
      "Shared question libraries",
      "Role-based access",
      "Advanced analytics",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-16 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Pricing that scales with you</h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Start free. Upgrade only when you&apos;re ready to automate more of your workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true, amount: 0.4 }}
              className={`relative rounded-3xl border p-6 flex flex-col justify-between bg-[#020617]/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ${
                plan.highlight
                  ? "border-purple-500/70 scale-[1.02]"
                  : "border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 text-2xl font-bold">{plan.price}</div>
                <p className="mt-2 text-xs md:text-sm text-gray-400">{plan.description}</p>

                <ul className="mt-4 space-y-2 text-xs md:text-sm text-gray-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-6 w-full rounded-xl px-4 py-2 text-sm font-semibold ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110"
                    : "border border-white/20 hover:bg-white/5"
                }`}
              >
                {plan.highlight ? "Start Pro" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
