"use client"

import { FeatureType } from "@/types/HomeTypes"
import { motion } from "framer-motion"

export function FeatureCard({feature,idx}:{feature:FeatureType,idx:number}){
    return(
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
    )
}