import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(){
    const {isAuthenticated} = await auth();
    if(!isAuthenticated){
        return NextResponse.redirect()
    }
    const user = await currentUser();
}