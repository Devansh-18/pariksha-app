import ExamView from "@/components/quiz/exam-center/ExamView";
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/ApiResponseTypes";
import { ExamQuizDataType } from "@/types/ExamTypes";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function examCenter({params}:{params : Promise<{id:string}>}){
    const {getToken} = await auth();
    const token = await getToken();
    const {id} = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${id}/attempt`,{
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "application/json",
        },
    });
    
    const data:(ApiSuccessResponse | ApiErrorResponse) = await res.json();
    console.log(data);
    
    if(!data || res.status===404){
        notFound();
    }

    if(!res.ok){
        const err = data as ApiErrorResponse;
        throw new Error(err.message??"Server Error.");
    }

    const successData = data as ApiSuccessResponse;
        
    const quizTestData:ExamQuizDataType = successData.data;

    return (
        <div>
            <h1> Exam Page</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ExamView quizTestData={quizTestData}/>
            </Suspense>
        </div>
    )
}