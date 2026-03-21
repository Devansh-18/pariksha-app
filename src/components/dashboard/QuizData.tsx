// This will show all quizzes given with marks and date for each quiz.
import { fetchQuizzes } from "@/lib/actions/quiz/fetchQuizzes";
import { QuizDataType } from "@/types/QuizTypes";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function QuizData() {
    const res = await fetchQuizzes();

    if (!res) {
        notFound();
    }

    const quizzes: QuizDataType[] = res;

    if (quizzes.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center text-white/50">
                No quizzes found.
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-3 px-6 py-3 text-xs text-white/50 border-b border-white/10">
                <span>Quiz</span>
                <span>Duration</span>
                <span>Date</span>
            </div>

            {/* List */}
            <div>
                {quizzes.map((quiz) => (
                    <Link
                        key={quiz.id}
                        href={`/quiz/${quiz.id}`}
                        className="grid grid-cols-3 px-6 py-4 text-sm items-center border-b border-white/5 
                       hover:bg-white/5 transition-all group"
                    >
                        {/* Title (Truncated + Tooltip) */}
                        <span
                            className="font-medium text-white truncate max-w-[200px] group-hover:text-blue-400 transition"
                            title={quiz.title}
                        >
                            {quiz.title}
                        </span>

                        {/* Duration */}
                        <span className="text-white/70">
                            {quiz.totalTime} min
                        </span>

                        {/* Date (Improved Format) */}
                        <span className="text-white/60">
                            {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </span>
                    </Link>
                ))}
            </div>

        </div>
    )
}