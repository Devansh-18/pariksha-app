import { PlanType } from "@/types/HomeTypes";

export const plans:PlanType[] = [
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
