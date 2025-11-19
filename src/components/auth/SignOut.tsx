"use client";

import { signOut } from "next-auth/react";

export function SignOut(){
    return(
        <button onClick={()=>signOut()}
            className="p-2 text-primarytext hover:text-highlighttext hover:bg-secondarybg hover:cursor-pointer"
        >
            LogOut
        </button>
    )
}