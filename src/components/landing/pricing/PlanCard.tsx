"use client";

import {motion} from "framer-motion";

export function PlanCard({plan,idx}:{plan:any,idx:number}){
    return(
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
                  {plan.features.map((f:string) => (
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
    )
}