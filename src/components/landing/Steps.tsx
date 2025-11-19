"use client";

const steps = [
  {
    title: "1. Drop your content",
    text: "Paste a topic, upload a PDF, or import notes from your LMS.",
  },
  {
    title: "2. Tune with AI",
    text: "Choose difficulty, number of questions, and type – MCQ, short answer, etc.",
  },
  {
    title: "3. Share & track",
    text: "Export, share with a link, and monitor responses and scores.",
  },
];

export default function Steps() {
  return (
    <section className="py-16 bg-[#020617]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          From idea to quiz in{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            under a minute.
          </span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full border border-purple-500/60 bg-black/60 text-sm font-semibold shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                {index + 1}
              </div>
              <h3 className="text-sm md:text-base font-semibold">{step.title}</h3>
              <p className="text-xs md:text-sm text-gray-400 max-w-xs">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
