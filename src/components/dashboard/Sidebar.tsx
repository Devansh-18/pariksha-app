//This is the sidebar of dashboard which consists of menus and highlight current menu.
"use client"

import { DashboardMenu } from "@/utils/menu";
import Link from "next/link";
import { usePathname } from "next/navigation"

export function Sidebar() {
    const pathname = usePathname();
    return <div className="h-full flex flex-col p-4">
        {/* Logo */}
        <div className="mb-8 px-2">
            <h1 className="text-lg font-semibold text-white">
                <Link href="/">Pariksha</Link>
            </h1>
            <p className="text-xs text-white/50">
                Dashboard
            </p>
        </div>

        <nav className="flex flex-col gap-1">
            {
                DashboardMenu.map((item) => {
                    const isActive = pathname === item.path;
                    return <Link key={item.id} href={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive
                            ? "bg-white/10 text-white backdrop-blur-md border border-white/10"
                            : "text-white/70 hover:bg-white/5 hover:text-white"}`}
                    >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.name}
                    </Link>
                })
            }
        </nav>
        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-xs text-white/40 px-2">
                v1.0.0
            </p>
        </div>
    </div>
}