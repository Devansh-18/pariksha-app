import prisma from "@/lib/prisma";

export async function fetchAttempts({quizId,userId}:{quizId:string,userId:string}) {
    try{
        return await prisma.attempt.findMany({
            where: {
                quizId,
                userId,
                status: {
                    not: "NOT_ATTEMPTED"
                }
                // if want to share quiz then userid should also be included in attempt model
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                status: true,
                marksObtained: true,
                createdAt: true,
            }
        });
    }
    catch(err){
        console.error(err);
        throw new Error("Something went wrong! Server error");
    }
}