"use client"

import { useEffect, useState } from "react";

export default async function GetNewAttempt(quizId:string){

    const [timeLeft,setTimeLeft] = useState(0);
    const [quiz,setQuiz] = useState<any>(null);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [answers,setAnswers] = useState<any>({});

    useEffect(()=>{
        const fetchQuiz = async()=>{
            const res = await fetch(`${process.env.BASE_URL}/api/quiz/new-attempt`,{
                method:"POST",
                body:quizId,
            });

            const data = (await res.json());
            // error handling 
            if(!res || !data || data.success == false){
                console.log(data.error);
                return;
            }
        
            const quizData = data.data;
            console.log(quizData);
            setQuiz(quizData.quiz);
            setTimeLeft(quizData.totalTime);
        };
        fetchQuiz();

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

    const handleMCQ = (optionId:string)=>{
        setAnswers({...answers,[que.id]:optionId});
    }

    const handleText = (e:any)=>{
        setAnswers({...answers,[que.id]:e.target.value});
    }

    const next = ()=>{
        if(currentIndex<quiz.questions.length-1){
            setCurrentIndex(currentIndex+1);
        }
    }

    const prev = ()=>{
        if(currentIndex>0){
            setCurrentIndex(currentIndex-1);
        }
    }

    const handleSubmit = async()=>{
        const res = await fetch(`/api/quiz/${quizId}}/submit`,{
            method:'POST',
            body:JSON.stringify({answers}),
            headers: {'Content-type':'application/json'},
        });

        const result = await res.json();
        console.log(result);
    }
    

    return (
        <div>
            {/* show time  */}
            {/* show question number */}

            {
                que.type==="MCQ" && (
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
                que.type === "SUBJECTIVE" && (
                    <textarea
                    placeholder="Type your answer here..."
                    onChange={handleText}
                    value = {answers[que.id] ?? ""}
                    />
                )
            }
            {/* prev,next,submit buttons */}
        </div>
    )

    
}