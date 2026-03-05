import { fetchQuizzes } from "@/lib/actions/quiz/fetchQuizzes";
import { QuizDataType } from "@/types/QuizTypes";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

// show all quizzes given with marks and date in each quiz row
export async function QuizData(){
    const res = await fetchQuizzes();
    
    if(!res){
        notFound();
    }

    const quizzes:QuizDataType[] = res;
    
    return (
        <div>
            <h1>This page shows all the quizzes given with marks and date on each quiz.</h1>
            {quizzes.map((quiz)=>(
                <Link key = {quiz.id} href={`/quiz/${quiz.id}`}>
                    <span>{quiz.title}</span>
                    <span>{quiz.totalTime}</span>
                    <span>{quiz.createdAt.toDateString()}</span>
                </Link>
            ))}
        </div>
    )
}