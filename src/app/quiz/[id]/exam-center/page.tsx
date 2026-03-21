// This is exam page.
import ExamView from "@/components/quiz/exam-center/ExamView";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/ApiResponseTypes";
import { ExamQuizDataType } from "@/types/ExamTypes";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function examCenter({ params }: { params: Promise<{ id: string }> }) {
    const { getToken } = await auth();
    const token = await getToken();
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${id}/attempt`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "application/json",
        },
    });

    const data: (ApiSuccessResponse<ExamQuizDataType> | ApiErrorResponse) = await res.json();

    if (!data || res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        const err = data as ApiErrorResponse;
        throw new Error(err.message ?? "Server Error.");
    }

    const successData = data as ApiSuccessResponse<ExamQuizDataType>;

    const quizTestData: ExamQuizDataType = successData.data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#0a0a0a] text-white">
            <ExamView quizTestData={quizTestData} />
        </div>
    )
}