// This component shows the answer for the questions and user answers.
"use client";

import { Question_Type } from "@/generated/prisma";
import { AnswerType } from "@/types/Result";
import { useState } from "react";

export function AnswerCard({ answers }: { answers: AnswerType[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const ans = answers[currentIndex];

    function next() {
        if (currentIndex < answers.length - 1) {
            setCurrentIndex((p) => p + 1);
        }
    }

    function prev() {
        if (currentIndex > 0) {
            setCurrentIndex((p) => p - 1);
        }
    }

    return (
        <div className="space-y-6">

            {/* Question Indicator */}
            <div className="text-sm text-white/50">
                Question {currentIndex + 1} / {answers.length}
            </div>

            {/* Question Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-5">

                {/* Question */}
                <p className="text-lg font-medium text-white">
                    {ans.que}
                </p>

                {/* MCQ */}
                {ans.type === Question_Type.MCQ && (
                    <div className="space-y-3">
                        {ans.options?.map((op) => {
                            const isCorrect = op.isCorrect;
                            const isSelected = op.isSelectedByUser;

                            let containerStyle =
                                "bg-white/5 border-white/10 text-white/70";

                            let label = null;

                            // User selected correct
                            if (isCorrect && isSelected) {
                                containerStyle =
                                    "border-green-500 text-white bg-transparent";

                                label = (
                                    <span className="text-xs text-green-400">
                                        Correct Answer 1/1
                                    </span>
                                );
                            }

                            // User selected wrong
                            else if (isSelected && !isCorrect) {
                                containerStyle =
                                    "bg-red-500/10 border-red-500 text-red-400";

                                label = (
                                    <span className="text-xs text-red-400">
                                        Your Answer
                                    </span>
                                );
                            }

                            // Correct but not selected
                            else if (isCorrect && !isSelected) {
                                containerStyle =
                                    "bg-green-500/10 border-green-500 text-green-400";
                            }

                            return (
                                <div
                                    key={op.id}
                                    className={`px-4 py-3 rounded-lg border flex items-center justify-between ${containerStyle}`}
                                >
                                    <span>{op.text}</span>
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* SUBJECTIVE */}
                {ans.type === Question_Type.SUBJECTIVE && (
                    <div className="space-y-2">
                        <p className="text-sm text-white/50">Your Answer:</p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-white/80">
                            {ans.userAnswer || "No answer provided"}
                        </div>
                    </div>
                )}

            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-40"
                >
                    Prev
                </button>

                <button
                    onClick={next}
                    disabled={currentIndex === answers.length - 1}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white/70 disabled:opacity-40"
                >
                    Next
                </button>
            </div>

        </div>
    );
}