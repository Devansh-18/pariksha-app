"use client"

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export function Provider({children}:{children:ReactNode}){
    return(
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}