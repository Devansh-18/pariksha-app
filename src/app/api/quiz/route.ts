import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { Question_Type } from "@/generated/prisma";
import { quizAiResponseSchema } from "@/lib/zodSchemas";
import { buildQuizCreationPrompt } from "@/lib/promptBuilder";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { pdfParser } from "@/lib/pdfParser";

const ai = new GoogleGenAI({});

//create a new quiz from ai.
export async function POST(request:NextRequest){
        try{
            const {userId} = await auth();
            if(!userId){
                return NextResponse.json({
                    success:false,
                    message: "Unauthenticated User",
                    error:"Authentication not found"
                },{status:401});
            }
            // the body contains quiz parameters that have to be passed to AI
            const formData = await request.formData();

            const topic = (formData.get("topic")??"").toString().trim();
            const totalMarks = Number(formData.get("totalMarks"))??30;
            const includeSubjective = Boolean(formData.get("includeSubjective"))??false;
            const pdf = formData.get("pdf");
            const pdfUrl = formData.get("pdfUrl");

            if(!topic && !pdf && !pdfUrl){
                return NextResponse.json({
                    success:false,
                    error:"No topic or pdf to create quiz.",
                },{status:400});
            }


            let pdfText = "";
            if(pdf || pdfUrl){
                pdfText = await pdfParser({pdf,pdfUrl});
                // Validation
                if (!pdfText.trim()) {
                    return NextResponse.json(
                        { success: false, error: "PDF has no readable text or is image-based" },
                        { status: 400 }
                    );
                }
            }

            const prompt = buildQuizCreationPrompt({
                topic,
                includeSubjective,
                totalMarks,
                pdfText
            });

            const aiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseJsonSchema: z.toJSONSchema(quizAiResponseSchema),
                    temperature:0,
                },

            });
            console.log(aiResponse.text);
            if(!aiResponse?.text){
                return NextResponse.json({
                    success:false,
                    error:"Ai response error",
                },{status:400});
            }

            const quizAiData = quizAiResponseSchema.parse(JSON.parse(aiResponse.text));

            const quizData = {
                title:quizAiData.title,
                userId,
                totalMarks,
                totalTime:totalMarks===30?1:totalMarks===60?2:3,
                questions:{
                    create: quizAiData.questions.map((q)=>({
                        que:q.que,
                        type:q.type==="MCQ"?Question_Type.MCQ:Question_Type.SUBJECTIVE,
                        marks: q.marks ?? 1,
                        options:{
                            create:
                            q.type==="MCQ"
                            ? q.options.map((op)=>({
                                text:op.text,
                                isCorrect:op.isCorrect,
                            }))
                            :[],
                        },

                    }))
                }
            };

            const createdQuiz = await prisma.quiz.create({
                data:quizData,
                include:{
                    questions:{
                        include: {options:true}
                    }
                }
            });

            if(!createdQuiz.id){
                return NextResponse.json({
                    success:false,
                    message:"Quiz not created",
                    error:"Quiz Creation Failed at DB",
                },{status:500});
            }

            return NextResponse.json({
                success:true,
                message:"Quiz created successfully",
                data:createdQuiz, // only send id
            },{status:201});
            
        }
        catch(error){
            console.log(error);
            return NextResponse.json({
                error:error,
                message:"Internal Server Error while creating quiz",
            },
            {status:500});
        }
};

//get all quiz for a user having userid.
export async function GET(req:NextRequest){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"User is not authenticated.",
                error:"Unauthenticated",
            },{status:401});
        }

        const quizzes = await prisma.quiz.findMany({
            where:{
                userId,
            },
            orderBy:{
                createdAt:"desc"
            },
            select:{
                id:true,
                createdAt:true,
                title:true,
                totalTime:true,
                //marks can be viewed in attempt 
            }
        });
        return NextResponse.json({
            success:true,
            message:`All quiz fetched for user ${userId}`,
            data:{
                quizzes,
            }
        },{status:200});
    }
    catch(err){
        return NextResponse.json({
            success:false,
            message:"Internal Server Error",
            error:err,
        },{status:500});
    }
};