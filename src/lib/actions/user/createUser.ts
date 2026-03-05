"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser(){
    const user = await currentUser();
    if(!user) return null;

    try{
        return await prisma.user.upsert({
            where:{
                clerkUserId:user.id,
            },
            create:{
                clerkUserId:user.id,
                firstName:user.firstName??"",
                lastName:user.lastName,
                email:user.emailAddresses[0].emailAddress,
            },
            update:{},
            include:{
                profile:true,
            }
        });
    }
    catch(err){
        console.error(err);
        throw new Error("Something went wrong! Server Error");
    }
}