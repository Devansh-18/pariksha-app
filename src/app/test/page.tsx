"use client"
import { ApiErrorResponse, ApiSuccessResponse } from "@/types/ApiResponseTypes";
import { useEffect, useState } from "react";

export default function TestPage(){
    const [successData,setSuccessData] = useState<ApiSuccessResponse>();
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch("/api/test",{
                method:"POST",
            });
            const data:(ApiSuccessResponse | ApiErrorResponse) = (await res.json());
            console.log(data);
            if(!res || !res.ok){
                const err = data as ApiErrorResponse;
                throw new Error(err.message??"Server Error.");
            }
            const successDataRes = data as ApiSuccessResponse;
            setSuccessData(successDataRes);
        }
        fetchData();
    },[]);
    return(
        <div>
            <p>This is test page.</p>
            <p>Success data: </p>
            <span>{successData?.data.test??"undefined"}</span>
        </div>
    )
}