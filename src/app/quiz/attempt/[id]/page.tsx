import { AnswerCard } from "@/components/quiz/attempts/AnswerCard";
import { fetchAttempt } from "@/lib/actions/attempt/fetchAttempt";
import { notFound } from "next/navigation";

export default async function AttemptPage({params}:{params:Promise<{id:string}>}){
    const {id:attemptId} = await params;
    const attemptData = await fetchAttempt(attemptId);
    
    if(!attemptData){
        notFound();
    }

    return(
        <div>
            <p>Attempt page</p> 
            <div>
                <span>{attemptData.title}</span>
                <span>{attemptData.marks}/{attemptData.totalMarks}</span>
            </div>
            <div>
                {
                    attemptData.answers.map(ans=>(
                        <AnswerCard key={ans.id} ans={ans}/>
                    ))
                }
            </div>
        </div>
    )
}