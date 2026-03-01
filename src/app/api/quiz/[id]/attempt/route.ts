import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

//create new attempt and fetch quiz for user.
export async function POST(request:NextRequest,{ params }: { params: Promise<{ id: string }> }){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({
                success:false,
                message: "Unauthenticated User",
                error:"Authentication not found"
            },{status:401});
        }

        const {id:quizId} = await params;
        
        if(!quizId){
            return NextResponse.json({
                message:"Quiz id not found",
                error:"Quiz Id missing"
            },{status:404});
        }

        const prevNotAttempted = await prisma.attempt.findFirst({
            where:{
                quizId,
                status:"NOT_ATTEMPTED",
                userId,
            },
            select:{
                id:true,
                quiz:{
                    select:{
                        id:true,
                        title:true,
                        questions:{
                            select:{
                                id:true,
                                que:true,
                                type:true,
                                marks:true,
                                options:{
                                    select:{
                                        id:true,
                                        text:true,
                                    }
                                }
                            }
                        },
                        totalTime:true,
                        totalMarks:true,
                    }
                }
            }
        });

        if(prevNotAttempted && prevNotAttempted.id){
            return NextResponse.json({
                data:{
                    prevNotAttempted,
                },
                message:"Previous Quiz fetched successfully"
            },{status:200});
        }

        const newAttempt = await prisma.attempt.create({
            data:{
                quizId,
                userId,
            },
            select:{
                id:true,
                quiz:{
                    select:{
                        id:true,
                        title:true,
                        questions:{
                            select:{
                                id:true,
                                que:true,
                                type:true,
                                marks:true,
                                options:{
                                    select:{
                                        id:true,
                                        text:true,
                                    }
                                }
                            }
                        },
                        totalTime:true,
                        totalMarks:true,
                    }
                }
            }
        });

        if(!newAttempt.id || !newAttempt.quiz){
            return NextResponse.json({
                message:"Quiz not fetched",
                error:"Quiz not existed"
            },{status:404});
        }


        return NextResponse.json({
            data:{
                newAttempt
            },
            message:"Quiz fetched successfully"
        },{status:200});
    }
    catch(err){
        return NextResponse.json({
            error:err,
            message:"Internal Server Error"
        },{status:500});
    }
}

// all attempts will be returned as per quiz id
// export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }){
//     try{
//         const {userId} = await auth();
//         if(!userId){
//             return NextResponse.json({
//                 success:false,
//                 message:'User not authenticated',
//                 error:"Unauthenticated",
//             },{status:403});
//         }

//         const {id} = await params;

//         if(!id){
//             return NextResponse.json({
//                 success:false,
//                 message:'Quiz id not present in request.',
//                 error:'Invalid Input',
//             },{status:404});
//         }

//         const attempts = await prisma.attempt.findMany({
//             where:{
//                 quizId:id,
//                 userId,
//                 status:{
//                     not:"NOT_ATTEMPTED"
//                 }
//                 // if want to share quiz then userid should also be included in attempt model
//             },
//             orderBy:{
//                 createdAt:"desc",
//             },
//             select:{
//                 id:true,
//                 status:true,
//                 marksObtained:true,
//                 createdAt:true,
//             }
//         });

//         return NextResponse.json({
//             success:true,
//             data: {
//                 attempts
//             },
//             message:"Attempts fetched successfully."
//         },{status:200});
//     }
//     catch(err){
//         console.log(err);
//         return NextResponse.json({
//             success:false,
//             message:"Internal Server Error",
//             error:err,
//         },{status:500});
//     }
// }