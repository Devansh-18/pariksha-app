type AttemptDataType = {
    id:string,
    marksObtained:Number,
    createdAt:Date
}

export async function AttemptsData(quizId:string){
    const res = await fetch(`/api/quiz/${quizId}/attempt`);
    const allAttempts:AttemptDataType[] = await res.json();
    // error handling 
    return <div>
        {/* show all attempts of a quiz with marks, and other attempt type data */}
    </div>
}