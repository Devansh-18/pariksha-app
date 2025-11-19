import {NextResponse} from "next/server";

export function GET(){
    return NextResponse.json({
        message:"Test Successful"
    },{status:200});
};