"use client";

import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import Steps from "@/components/landing/Steps";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";

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
