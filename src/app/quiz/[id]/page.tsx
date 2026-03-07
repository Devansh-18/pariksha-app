import { fetchAttempts } from "@/lib/actions/quiz/fetchAttempts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function QuizDataPage({params}:{params:Promise<{id:string}>}){
    const {id:quizId} = await params;

    const attempts = await fetchAttempts(quizId);
    if(!attempts){
        notFound();
    }

    return(
        <div>
            <div>
                <p>Here is all your listed attempts for the specific quiz. </p>
                <Link href={`/quiz/${quizId}/exam-center`}>Give Test</Link>
            </div>
            {
                attempts.length===0?(
                    <div>
                        Hi, you have not attempted the quiz yet.  
                    </div>
                ):(
                attempts.map((attempt)=>(
                    <Link href={`/quiz/attempt/${attempt.id}`} key={attempt.id}>
                        {attempt.marksObtained}
                    </Link>
                )))
            }
        </div>
    )
}