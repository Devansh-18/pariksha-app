import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function fetchQuizzes() {
    const {userId} = await auth();
    if(!userId){
        await auth.protect();
        return null;
    }
    
    try{
        return await prisma.quiz.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                createdAt: true,
                title: true,
                totalTime: true,
                //marks can be viewed in attempt 
            }
        });
    }
    catch(err){
        console.error(err);
        throw new Error("Something went wrong! Server Error");
    }
}