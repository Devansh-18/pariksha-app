"use client";

import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/features/Features";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/pricing/Pricing";
import Stats from "@/components/landing/Stats";
import Steps from "@/components/landing/Steps";

export default function Home() {
  return (
    <div className="w-full bg-[#020617] text-white">
      <Hero />
      <Features />
      <Stats />
      <Steps />
      <Pricing />
      <CTA />
    </div>
  );
}
