import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({children}:{children:React.ReactNode}){
    return(
    <div className="flex">
        <aside className="w-[25vw]">
            <Sidebar/>
        </aside>
        <main className="w-full">
            {children}
        </main>
    </div>
    )
}