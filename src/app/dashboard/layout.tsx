// This page is the layout for dashboard
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex bg-gradient-to-br from-[#0f0f0f] via-[#111111] to-[#0a0a0a] text-white">
            <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl">
                <Sidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}