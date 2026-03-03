"use client";

import { features } from "@/utils/home/homeFeatures";
import { FeatureCard } from "./FeatureCard";

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
            <FeatureCard key={idx} feature={feature} idx={idx}/>
          ))}
        </div>
      </div>
    </section>
  );
}
