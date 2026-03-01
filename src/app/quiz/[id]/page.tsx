import { fetchAttempts } from "@/lib/actions/quiz/fetchAttempts";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function QuizDataPage({params}:{params:Promise<{id:string}>}){
    const {userId} = await auth();
    if(!userId){
        await auth.protect();
        return;
    }

    const {id:quizId} = await params;

    const attempts = await fetchAttempts({quizId,userId});
    if(!attempts){
        notFound();
    }

    return(
        <div>
            {
                attempts.map((attempt)=>(
                    <Link href={`/quiz/attempt/${attempt.id}`} key={attempt.id}>
                        {attempt.marksObtained}
                    </Link>
                ))
            }
        </div>
    )
}