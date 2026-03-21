// This page shows the actual result for the attempt.
import { AnswerCard } from "@/components/quiz/attempts/AnswerCard";
import { fetchAttempt } from "@/lib/actions/attempt/fetchAttempt";
import { notFound } from "next/navigation";

export default async function AttemptPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: attemptId } = await params;
    const attemptData = await fetchAttempt(attemptId);

    if (!attemptData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#0a0a0a] text-white flex justify-center">
            <div className="w-full max-w-3xl px-4 py-10 space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        {attemptData.title}
                    </h1>
                    <span className="text-sm text-white/60">
                        {attemptData.marks}/{attemptData.totalMarks}
                    </span>
                </div>

                <AnswerCard answers={attemptData.answers} />

            </div>
        </div>
    )
}