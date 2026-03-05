import prisma from "@/lib/prisma";
import { createUser } from "./createUser";
import { auth } from "@clerk/nextjs/server";

export async function fetchUser(){
    const {userId} = await auth();
    if(!userId){
        await auth.protect();
        return null;
    }
    
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