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
                success:false,
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
                success:true,
                data:prevNotAttempted,
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
                success:false,
                message:"Quiz not fetched",
                error:"Quiz not existed"
            },{status:404});
        }


        return NextResponse.json({
            success:true,
            data:newAttempt,
            message:"Quiz fetched successfully"
        },{status:200});
    }
    catch(err){
        return NextResponse.json({
            success:false,
            error:err,
            message:"Internal Server Error"
        },{status:500});
    }
}