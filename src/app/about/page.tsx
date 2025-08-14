export default function About() {
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">About QuizFlow</h2>
      <p className="text-gray-700 leading-relaxed">
        QuizFlow is an AI-powered quiz builder that uses Gemini to generate
        quizzes from user-selected topics or from an uploaded PDF. The app is
        built with Next.js, Tailwind, and a Postgres/Prisma backend.
      </p>
    </section>
  );
}
