// This page shows quiz question and user can attempt here.
"use client"

import { Question_Type } from "@/generated/prisma";
import { AnswersType, ExamQuizDataType, OptionType, QuizTestType } from "@/types/ExamTypes";
import { formatTime } from "@/utils/formatTime";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ExamView({ quizTestData }: { quizTestData: ExamQuizDataType }) {

    const router = useRouter();
    const quiz: QuizTestType = quizTestData.quiz;
    const quizId = quiz.id;
    const attemptId = quizTestData.id;
    const totalTime = quiz.totalTime * 60;

    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswersType>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hasSubmittedRef = useRef(false); // prevent race condition as state updates can not be trusted as are asynchronous.

    useEffect(() => {
        if (timeLeft <= 0 || submitted) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    // Persist answers
    useEffect(() => {
        localStorage.setItem(`quiz-${attemptId}`, JSON.stringify(answers));
    }, [answers, attemptId]);

    useEffect(() => {
        const saved = localStorage.getItem(`quiz-${attemptId}`);
        if (saved) setAnswers(JSON.parse(saved));
    }, [attemptId]);

    const que = quiz.questions[currentIndex];

    function handleMCQ(optionId: string) {
        setAnswers((prev) => ({
            ...prev,
            [que.id]: { optionId, type: Question_Type.MCQ },
        })); // if same key, value will be replaced
    }

    function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setAnswers((prev) => ({
            ...prev,
            [que.id]: { text: e.target.value, type: Question_Type.SUBJECTIVE },
        }));
    }

    function handleNext() {
        if (currentIndex < quiz.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    async function handleSubmit() {
        if (hasSubmittedRef.current || submitted) return;

        hasSubmittedRef.current = true;
        setIsSubmitting(true);
        try {

            const ansArr = Object.keys(answers).map((key) => ({
                queId: key,
                ...answers[key],
            }));
            const res = await fetch(`/api/quiz/submit`, {
                method: 'POST',
                body: JSON.stringify({ answers: ansArr, attemptId, quizId }),
                headers: { 'Content-type': 'application/json' },
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Submit failed");

            setSubmitted(true);
            localStorage.removeItem(`quiz-${attemptId}`);

            router.replace(`/quiz/${quizId}?submitted=true`); //no back navigation to exam
        }
        catch (err) {
            console.error(err);
            hasSubmittedRef.current = false;
            toast.error("Submission failed. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    }

    // Auto-submit
    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
    }, [timeLeft]);

    // Prevent tab close
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (!submitted) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [submitted]);

    const progress = Math.round((Object.keys(answers).length / quiz.questions.length) * 100);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#0a0a0a] text-white">
            <Toaster/>

            {/* 🔷 Top Bar */}
            <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-white/70">
                        Q {currentIndex + 1} / {quiz.questions.length}
                    </p>
                    <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className={`text-lg font-semibold ${timeLeft < 60 ? "text-red-400" : "text-blue-400"}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* 🔷 Question */}
            <div className="flex-1 flex justify-center items-center px-4 py-8">
                <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-6">
                    <p className="text-lg font-medium">{que.que}</p>

                    {que.type === Question_Type.MCQ && (
                        <div className="space-y-3">
                            {que.options.map((option: OptionType) => {
                                const selected = answers[que.id]?.optionId === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleMCQ(option.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200
                      ${selected
                                                ? "bg-blue-500/20 border-blue-500"
                                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {que.type === Question_Type.SUBJECTIVE && (
                        <textarea
                            placeholder="Type your answer..."
                            value={answers[que.id]?.text ?? ""}
                            onChange={handleText}
                            className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    )}
                </div>
            </div>

            {/* 🔷 Bottom */}
            <div className="sticky bottom-0 bg-black/40 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center">
                <div className="flex gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === quiz.questions.length - 1}
                        className="px-4 py-2 rounded-lg bg-white/10 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || submitted}
                    className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                >
                    {isSubmitting ? "Submitting..." : submitted ? "Submitted" : "Submit"}
                </button>
            </div>
        </div>
    )
}