import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import { Question_Type } from "@/generated/prisma";
import { quizAiResponseSchema } from "@/utils/zodSchemas";
import { buildQuizCreationPrompt } from "@/utils/promptBuilder";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { pdfParser } from "@/utils/pdfParser";

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
                    message:"Provide all necessary info."
                },{status:400});
            }


            let pdfText = "";
            if(pdf || pdfUrl){
                pdfText = await pdfParser({pdf,pdfUrl});
                // Validation
                if (!pdfText.trim()) {
                    return NextResponse.json({ 
                        success: false, 
                        error: "PDF has no readable text or is image-based",
                        message:"Provide readable pdf.",
                    },
                    { status: 400 });
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
            if(!aiResponse?.text){
                return NextResponse.json({
                    success:false,
                    error:"Ai response error",
                    message:"Error in creating quiz from AI",
                },{status:400});
            }

            const quizAiData = quizAiResponseSchema.parse(JSON.parse(aiResponse.text));

            const quizData = {
                title:quizAiData.title,
                userId,
                totalMarks,
                totalTime:totalMarks===30?15:totalMarks===60?30:60,
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
                },{status:404});
            }

            return NextResponse.json({
                success:true,
                message:"Quiz created successfully",
                data:createdQuiz.id, // only send id
            },{status:201});
            
        }
        catch(error){
            console.log(error);
            return NextResponse.json({
                success:false,
                error:error,
                message:"Internal Server Error while creating quiz",
            },
            {status:500});
        }
};