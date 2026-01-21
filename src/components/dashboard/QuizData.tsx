import Link from "next/link";

type QuizDataType = {
    id:string,
    title:string,
    totalTime:number,
    createdAt:Date,
};

// show all quizzes given with marks and date in each quiz row
export async function QuizData(){
    const res = await fetch('/api/quiz',{
        method:'GET'
    });
    const quizzes:QuizDataType[] = await res.json();
    
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