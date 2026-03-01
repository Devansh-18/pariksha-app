import prisma from "@/lib/prisma";
import { createUser } from "./createUser";

export async function fetchUser(userId:string){
    let userData = null;
    try{
        userData = await prisma.user.findUnique({
            where:{
                clerkUserId:userId,
            },
            include:{
                profile:true,
            },
        });
    
    }
    catch(err){
        console.error(err);
        throw new Error("Something went wrong! Server Error");
    }

    if(!userData){
        userData = await createUser();
    }
    return userData;
}