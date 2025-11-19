"use client";

import { signIn } from "next-auth/react";

export function SignIn(){
    return(
        <button onClick={()=>signIn()}
            className="p-2 text-primarytext hover:text-highlighttext hover:bg-secondarybg hover:cursor-pointer"
        >
            Sign In
        </button>
    )
}