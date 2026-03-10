"use client"

import { Question_Type } from "@/generated/prisma";
import { AnswersType, ExamQuizDataType, QuizTestType } from "@/types/ExamTypes";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useState } from "react";

export default function ExamView({quizTestData}:{quizTestData:ExamQuizDataType}){

    const quiz:QuizTestType = quizTestData.quiz;
    const quizId = quiz.id;
    const attemptId = quizTestData.id;
    const totalTime = quiz.totalTime *60 * 60;

    const [timeLeft,setTimeLeft] = useState(totalTime);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [answers,setAnswers] = useState<AnswersType>({});

    useEffect(()=>{
        if(timeLeft<=0) return;
        const timer = setInterval(()=>setTimeLeft(t => t-1),1000);
        return () => clearInterval(timer);
    },[timeLeft]);

    if(!quiz){
        return <p>Loading..</p> // add loading layout
    }

    const que = quiz.questions[currentIndex];

    function handleMCQ(optionId:string){
        setAnswers({...answers,[que.id]:{optionId:optionId,type:Question_Type.MCQ}}); // if same key, value will be replaced
    }

    function handleText(e:any){
        setAnswers({...answers,[que.id]:{text:e.target.value,type:Question_Type.SUBJECTIVE}});
    }

    function handleNext(){
        if(currentIndex<quiz.questions.length-1){
            setCurrentIndex(currentIndex+1);
        }
    }

    function handlePrev(){
        if(currentIndex>0){
            setCurrentIndex(currentIndex-1);
        }
    }

    async function handleSubmit(){
        const ansArr = Object.keys(answers).map((key)=>({
            queId:key,
            ...answers[key],
        }));
        const res = await fetch(`/api/quiz/submit`,{
            method:'POST',
            body:JSON.stringify({answers:ansArr,attemptId,quizId}),
            headers: {'Content-type':'application/json'},
        });

        const result = await res.json();
        console.log(result);
    }
    

    return (
        <div className="text-black">
            <div className="flex items-center justify-between bg-gray-700">
                <p>This is exam page</p>
                <div>Time left: {formatTime(timeLeft)}/{formatTime(totalTime)}</div>
            </div>
            {/* show question number */}
            <div className="rounded-xl border-2 border-white bg-gray-600
            text-black">
                <p>Que {currentIndex+1}: {que.que} </p>
                {
                    que.type===Question_Type.MCQ && (
                        <div>
                            {que.options.map((option:any)=>(
                                <label key={option.id}>
                                    <input
                                    type="radio"
                                    name={que.id}
                                    checked={answers[que.id]?.optionId===option.id}
                                    onChange={()=>handleMCQ(option.id)}
                                    />
                                    {option.text}
                                </label>
                            ))}
                        </div>
                    )
                }
                {
                    que.type === Question_Type.SUBJECTIVE && (
                        <textarea
                        placeholder="Type your answer here..."
                        onChange={handleText}
                        value = {answers[que.id]?.text ?? ""}
                        />
                    )
                }
            </div>
            {/* prev,next,submit buttons */}
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center justify-center gap-4">
                    <button onClick={handlePrev}>Prev</button>
                    <button onClick={handleNext}>Next</button>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}