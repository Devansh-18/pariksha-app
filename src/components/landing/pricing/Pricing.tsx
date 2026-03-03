import { plans } from "@/utils/home/plans";
import { PlanCard } from "./PlanCard";

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
            <PlanCard key={idx} plan={plan}/>
          ))}
        </div>
      </div>
    </section>
  );
}
