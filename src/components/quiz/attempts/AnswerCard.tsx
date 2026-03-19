import { Question_Type } from "@/generated/prisma";
import { AnswerType } from "@/types/Result";

export function AnswerCard({ans}:{ans:AnswerType}){
    return(
        <div>
            <p>{ans.que}</p>
            <div>
                {ans.type===Question_Type.MCQ?
                (
                    ans.options?.map((op)=>(
                        <div key={op.id} className={`${(op.isCorrect && op.isSelectedByUser)?"border-2 border-green-400":op.isSelectedByUser?"bg-red-400":op.isCorrect?"bg-green-400":"" }`}>
                            {op.text}
                        </div>
                    ))
                ):
                (
                    <div>
                        {ans.userAnswer}
                    </div>
                )}
            </div>
        </div>
    )
}