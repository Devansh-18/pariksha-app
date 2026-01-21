"use client"

import { DashboardMenu } from "@/lib/menu";
import Link from "next/link";
import { usePathname } from "next/navigation"

export function Sidebar(){
    const pathname = usePathname();
    return <div>
        {
            DashboardMenu.map((item)=>(
                <Link href={item.path}
                    className={`${pathname===item.path?'bg-blue-400':'hover:bg-gray-400'}`}
                >
                    {item.name}
                </Link>
            ))
        }
    </div>
}