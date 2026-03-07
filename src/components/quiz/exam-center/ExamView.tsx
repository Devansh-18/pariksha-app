"use client"

import { Question_Type } from "@/generated/prisma";
import { ExamQuizDataType, QuizTestType } from "@/types/ExamTypes";
import { useEffect, useState } from "react";

export default function ExamView({quizTestData}:{quizTestData:ExamQuizDataType}){

    const [timeLeft,setTimeLeft] = useState(0);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [answers,setAnswers] = useState<any>({});

    const quiz:QuizTestType = quizTestData.quiz;
    const quizId = quiz.id;
    const attemptId = quizTestData.id;

    useEffect(()=>{
        setTimeLeft(quiz.totalTime);
    }, []);

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
        setAnswers({...answers,[que.id]:optionId}); // if same key, value will be replaced
    }

    function handleText(e:any){
        setAnswers({...answers,[que.id]:e.target.value});
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
        const res = await fetch(`/api/quiz/submit`,{
            method:'POST',
            body:JSON.stringify({answers,attemptId,quizId}),
            headers: {'Content-type':'application/json'},
        });

        const result = await res.json();
        console.log(result);
    }
    

    return (
        <div>
            <p>This is exam page</p>
            {/* show time  */}
            <span>{timeLeft}/{quiz.totalTime}</span>
            {/* show question number */}
            <p>Que {currentIndex+1}: {que.que} </p>
            {
                que.type===Question_Type.MCQ && (
                    <div>
                        {que.options.map((option:any)=>(
                            <label key={option.id}>
                                <input
                                type="radio"
                                name={que.id}
                                checked={answers[que.id]===option.id}
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
                    value = {answers[que.id] ?? ""}
                    />
                )
            }
            {/* prev,next,submit buttons */}
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}