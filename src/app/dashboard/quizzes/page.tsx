// This page shows the quizzes that user have created.
import { QuizData } from "@/components/dashboard/QuizData";

export default function Quizzes() {
    return <div className="space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-2xl font-semibold text-white">
                Quizzes
            </h1>
            <p className="text-sm text-white/50">
                View and manage all your quizzes
            </p>
        </div>

        <QuizData />
    </div>
}