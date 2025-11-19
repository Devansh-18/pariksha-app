import QuizCreateForm from "@/components/quiz/QuizCreateForm";

export default function NewQuizPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create AI-Generated Quiz
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl">
            Provide a topic, upload a PDF, or paste a PDF URL. Our AI will
            generate a quiz, store it in your database, and return the quiz
            metadata.
          </p>
        </header>

        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-48 bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl" />
          <div className="relative p-6 sm:p-8">
            <QuizCreateForm />
          </div>
        </div>
      </div>
    </div>
  );
}
