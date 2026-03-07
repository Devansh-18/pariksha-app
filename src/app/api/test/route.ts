import { auth } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export function GET(){
    return NextResponse.json({
        message:"Test Successful"
    },{status:200});
};

export async function POST(){
    try{
        const {userId} = await auth();
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"Authentication failed.",
                error:"User Unauthenticated.",
            });
        }
        return NextResponse.json({
            success:true,
            message:"Post test successful",
            data:{
                id:1,
                test:"Succeed",
            }
        },{status:200});
    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            success:false,
            message:"Internal Server Error.",
            error:"Server Error.",
        },{status:500});
    }
}