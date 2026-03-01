"use client"

import { DashboardMenu } from "@/utils/menu";
import Link from "next/link";
import { usePathname } from "next/navigation"

export function Sidebar(){
    const pathname = usePathname();
    return <div className="flex-col">
        {
            DashboardMenu.map((item)=>(
                <Link key={item.id} href={item.path}
                    className={`${pathname===item.path?'bg-blue-400':'hover:bg-gray-400'} block`}
                >
                    {item.name}
                </Link>
            ))
        }
    </div>
}