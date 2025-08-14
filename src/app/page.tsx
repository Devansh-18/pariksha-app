import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-extrabold mb-4">AI-powered Quiz Generator</h1>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        Create quizzes from any topic or upload a PDF and let Gemini generate
        structured questions you can use in the UI.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/quiz/new"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow hover:bg-indigo-700"
        >
          Create Quiz
        </Link>
        <Link
          href="/dashboard"
          className="border border-indigo-600 px-6 py-3 rounded-md text-indigo-600"
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}
