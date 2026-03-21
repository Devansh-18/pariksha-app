"use client";

import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/features/Features";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/pricing/Pricing";
import Stats from "@/components/landing/Stats";
import Steps from "@/components/landing/Steps";
import Nav from "@/components/navbar/Nav";

export default function Home() {
  return (
    <div className="w-full bg-[#020617] text-white">
      <Nav />
      <Hero />
      <Features />
      <Stats />
      <Steps />
      <Pricing />
      <CTA />
      <footer className="border-t border-white/10 p-6 mt-10 text-sm flex items-center justify-between text-gray-400">
        <span>© 2025 Pariksha App</span>
        <span className="text-xs">Build with ❤️ by Codingo</span>
      </footer>
    </div>
  );
}
