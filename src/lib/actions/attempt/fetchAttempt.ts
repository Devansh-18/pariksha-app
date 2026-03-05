import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function fetchAttempt(attemptId:string){
    try{
        const {userId} = await auth();
        if(!userId){
            await auth.protect();
            return null;
        }

        if(!attemptId){
            return null;
        }

        let attemptData = null;

        const attempt = await prisma.attempt.findUnique({
            where:{
                id:attemptId,
                userId,
                status:{
                    not:"NOT_ATTEMPTED"
                }
            },
            include:{
                quiz:{
                    select:{
                        title:true,
                        questions:{
                            select:{
                                id:true,
                                que:true,
                                type:true,
                                options:{
                                    select:{
                                        id:true,
                                        text:true,
                                        isCorrect:true,
                                    }
                                },
                                marks:true,
                            }
                        },
                        totalTime:true,
                        totalMarks:true,
                        createdAt:true,
                    }
                },
                answers:true
            }
        });

        const questions = attempt?.quiz.questions.map(que=>({
            id:que.id,
            que:que.que,
            marks:que.marks,
            type:que.type,
            options:que.type==="MCQ"? (que.options.map(op=>({
                id:op.id,
                text:op.text,
                isCorrect:op.isCorrect,
            }))):
            (null),
            userAnswer:
            que.type==="MCQ"?
            attempt.answers?.find(queId=>queId.id===que.id)?.optionId : 
            attempt.answers.find(queId=>queId.id===que.id)?.answerText,
        }));

        const evaluatedQuestions = questions?.map((q) => {
            // MCQ handling
            if (q.type === "MCQ" && q.options) {
                const optionsWithStatus = q.options.map((op) => ({
                    id: op.id,
                    text: op.text,
                    isCorrect: op.isCorrect,
                    isSelectedByUser: q.userAnswer === op.id,
                }));

                const isUserCorrect = optionsWithStatus.some(
                    (op) => op.isCorrect && op.isSelectedByUser
                );

                return {
                    id: q.id,
                    que: q.que,
                    marks: q.marks,
                    type: q.type,
                    options: optionsWithStatus,
                    isUserCorrect,
                };
            }

            // Subjective / paragraph question
            attemptData = {
                id: q.id,
                que: q.que,
                marks: q.marks,
                type: q.type,
                userAnswer: q.userAnswer ?? null,
                // enable this only if mcq
                // isUserCorrect: q.userAnswer === q.correctAnswer
            };
            return attemptData;
        });

        return {
            attemptId,
            marks:attempt?.marksObtained,
            title:attempt?.quiz.title,
            totalMarks:attempt?.quiz.totalMarks,
            totalTime:attempt?.quiz.totalTime,
            createdAt:attempt?.createdAt,
            answers:evaluatedQuestions,
        }
    }
    catch(err){
        console.error(err);
        throw new Error("Something went wrong! Server error.")
    }
}