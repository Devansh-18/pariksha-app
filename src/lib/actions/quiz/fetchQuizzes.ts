import prisma from "@/lib/prisma";

export async function fetchQuizzes(userId:string) {
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