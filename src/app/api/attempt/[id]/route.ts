// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// get attempted answers with given attempt id 
// export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
//     try{
//         const {userId} = await auth();
//         if(!userId){
//             return NextResponse.json({
//                 success:false,
//                 message:"User not authenticated.",
//                 error:"Unauthenticated",
//             },{status:401});
//         }

//         const {id:attemptId} = await params;

//         if(!attemptId){
//             return NextResponse.json({
//                 success:false,
//                 message:"Attempt id not passed.",
//                 error:"Attempt ID empty",
//             },{status:404});
//         }

//         const attempt = await prisma.attempt.findUnique({
//             where:{
//                 id:attemptId,
//                 userId,
//                 status:{
//                     not:"NOT_ATTEMPTED"
//                 }
//             },
//             include:{
//                 quiz:{
//                     select:{
//                         title:true,
//                         questions:{
//                             select:{
//                                 id:true,
//                                 que:true,
//                                 type:true,
//                                 options:{
//                                     select:{
//                                         id:true,
//                                         text:true,
//                                         isCorrect:true,
//                                     }
//                                 },
//                                 marks:true,
//                             }
//                         },
//                         totalTime:true,
//                         totalMarks:true,
//                         createdAt:true,
//                     }
//                 },
//                 answers:true
//             }
//         });

//         const questions = attempt?.quiz.questions.map(que=>({
//             id:que.id,
//             que:que.que,
//             marks:que.marks,
//             type:que.type,
//             options:que.type==="MCQ"? (que.options.map(op=>({
//                 id:op.id,
//                 text:op.text,
//                 isCorrect:op.isCorrect,
//             }))):
//             (null),
//             userAnswer:
//             que.type==="MCQ"?
//             attempt.answers?.find(queId=>queId.id===que.id)?.optionId : 
//             attempt.answers.find(queId=>queId.id===que.id)?.answerText,
//         }));

//         const evaluatedQuestions = questions?.map((q) => {
//             // MCQ handling
//             if (q.type === "MCQ" && q.options) {
//                 const optionsWithStatus = q.options.map((op) => ({
//                     id: op.id,
//                     text: op.text,
//                     isCorrect: op.isCorrect,
//                     isSelectedByUser: q.userAnswer === op.id,
//                 }));

//                 const isUserCorrect = optionsWithStatus.some(
//                     (op) => op.isCorrect && op.isSelectedByUser
//                 );

//                 return {
//                     id: q.id,
//                     que: q.que,
//                     marks: q.marks,
//                     type: q.type,
//                     options: optionsWithStatus,
//                     isUserCorrect,
//                 };
//             }

//             // Subjective / paragraph question
//             return {
//                 id: q.id,
//                 que: q.que,
//                 marks: q.marks,
//                 type: q.type,
//                 userAnswer: q.userAnswer ?? null,
//                 // enable this only if mcq
//                 // isUserCorrect: q.userAnswer === q.correctAnswer
//             };
//         });

//         return NextResponse.json({
//             success:true,
//             message:"Attempt Details fetched successfully.",
//             data:{
//                 attemptId,
//                 marks:attempt?.marksObtained,
//                 title:attempt?.quiz.title,
//                 totalMarks:attempt?.quiz.totalMarks,
//                 totalTime:attempt?.quiz.totalTime,
//                 createdAt:attempt?.createdAt,
//                 answers:evaluatedQuestions,
//             }
//         },{status:200});
//     }
//     catch(err){
//         return NextResponse.json({
//             success:false,
//             message:"Internal Server Error",
//             error:err,
//         },{status:500});
//     }
// }