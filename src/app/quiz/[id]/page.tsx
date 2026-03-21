// The page shows all the attempts for a particular quiz with marks obtained.
import { fetchAttempts } from "@/lib/actions/quiz/fetchAttempts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function QuizDataPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: quizId } = await params;

    const attempts = await fetchAttempts(quizId);
    if (!attempts) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#0a0a0a] text-white flex justify-center">

            <div className="w-full max-w-3xl px-4 py-10 space-y-8">

                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/dashboard/quizzes"
                        className="text-sm text-white/60 hover:text-white transition"
                    >
                        ← Back to Quizzes
                    </Link>

                    <Link
                        href={`/quiz/${quizId}/exam-center`}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white 
                       hover:bg-blue-600 transition text-sm font-medium shadow-lg"
                    >
                        Give Test
                    </Link>
                </div>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold">
                        Quiz Attempts
                    </h1>
                    <p className="text-sm text-white/50">
                        Review your past attempts and improve your score
                    </p>
                </div>

                {/* Content */}
                {attempts.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-10 text-center">
                        <p className="text-white/60 text-sm">
                            You haven't attempted this quiz yet.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">

                        {/* Header */}
                        <div className="grid grid-cols-2 px-6 py-3 text-xs text-white/50 border-b border-white/10">
                            <span>Date</span>
                            <span>Score</span>
                        </div>

                        {/* Attempts */}
                        <div>
                            {attempts.map((attempt) => (
                                <Link
                                    key={attempt.id}
                                    href={`/quiz/attempt/${attempt.id}`}
                                    className="grid grid-cols-2 px-6 py-4 text-sm items-center border-b border-white/5 
                             hover:bg-white/5 transition-all group"
                                >
                                    {/* Date */}
                                    <span className="text-white/70">
                                        {new Date(attempt.createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>

                                    {/* Marks */}
                                    <span className="font-medium text-white group-hover:text-blue-400 transition">
                                        {attempt.marksObtained ?? 0}
                                    </span>
                                </Link>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}