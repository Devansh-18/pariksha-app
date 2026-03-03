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
            Attempt page.
        </div>
    )
}