type OptionType = {
    id: string,
    text: string,
    isCorrect?: string,
    isSelectedByUser?: boolean,
}

type AnswerType = {
    id: string,
    que: string,
    marks: number,
    type: 'MCQ'|'SUBJECTIVE',
    options?: OptionType[],
    isUserCorrect?:boolean,
    userAnswer?:string
}

type ResultDataType = {
    attemptId:string,
    marks:number,
    title:string,
    totalMarks:number,
    totalTime:number,
    createdAt:Date,
    answers?:AnswerType[],
}


export default async function ResultData(attemptId:string){
    const res = await fetch(`api/attempt/${attemptId}`,{method:'GET'});
    // handle error 

    const resultData:ResultDataType = await res.json();
    return <div>
        {/* show result in good format highlighting correct and user selected option */}
    </div>
}