import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// submit user answer for an attempt and give result for mcq type 
export async function POST(req:NextRequest){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Unauthenticated, Try again.",
                error:"Authentication Failed",
            },{status:403});
        }

        // require answers as array containing que id and selected option id or para text.
        const {answers,attemptId,quizId} = await req.json();
        if(!answers || !attemptId || !quizId){
            return NextResponse.json({
                success:false,
                message:"Input invalid",
                error:"Quiz or answers not found"
            },{status:404});
        }

        let correctOptions = new Map();

        let obtainedMarks = 0;

        let result = [];

        const quiz = await prisma.quiz.findUnique({
            where:{
                id:quizId,
                createdBy:userId,
            },
            include:{
                questions:{
                    select:{
                        id:true,
                        type:true,
                        marks:true,
                        options:{
                            select:{
                                id:true,
                                isCorrect:true,
                            }
                        }
                    }
                }
            }
        });

        for(const ans of answers){
            const question = quiz?.questions?.find(id=>id===ans.queId);
            if(!question) continue;
            if(question.type === "MCQ"){
                const isThisCorrect = ans.optionId === question.options.find(op=>op.isCorrect===true);

                if(isThisCorrect){
                    obtainedMarks += Number(question.marks);
                }

                result.push({
                    attemptId:attemptId,
                    queId:question.id,
                    optionId:ans.optionId??null,
                });

                correctOptions.set(question.id,question.options.find(op=>op.isCorrect===true))
            }
            else if(question.type==="SUBJECTIVE"){
                result.push({
                    attemptId:attemptId,
                    queId:question.id,
                    answerText:ans.text,
                });
            }
        }

        await prisma.userAnswer.createMany({
            data:result
        });

        await prisma.attempt.update({
            where:{
                id:attemptId,
                userId
            },
            data:{
                status:"ATTEMPTED",
                marksObtained:obtainedMarks,
            }
        });

        const finalResult = result.map(r=>{
            const corrOp = correctOptions.get(r.optionId)??null
            return {
                ...r,
                correctOption:corrOp,
            }
        });

        return NextResponse.json({
            success:true,
            data:{
                obtainedMarks,
                finalResult,
            },
            message:"Quiz submitted successfully."
        },{status:200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            success:false,
            message:"Internal Server Error",
            error:err
        },{status:500});
    }
}