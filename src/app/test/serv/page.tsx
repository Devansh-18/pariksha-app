import { ApiErrorResponse, ApiSuccessResponse } from "@/types/ApiResponseTypes";
import { auth } from "@clerk/nextjs/server";

export default async function ServerTestPage(){
    const {getToken} = await auth();
    const token = await getToken();
    if(!token){
        await auth.protect();
        return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test`,{
        method:"POST",
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "application/json",
        },
    });
    const data:(ApiSuccessResponse | ApiErrorResponse) = (await res.json());
    console.log(data);
    if(!res || !res.ok || data.success===false){
        const err = data as ApiErrorResponse;
        throw new Error(err.message??"Server Error.");
    }
    const successData = data as ApiSuccessResponse;
    return(
        <div>
            <p>This is test page.</p>
            <p>Success data: </p>
            <span>{successData?.data.test??"undefined"}</span>
        </div>
    )
}