"use client"

import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const menu = [
        {name: "Dashboard", icon: LayoutDashboard},
        {name: "Tasks", icon: CheckSquare},
        {name: "Habits", icon: Repeat},
        {name: "Finance", icon: Wallet},
    ]

    return(
        <aside className="w-64 h-screen bg-[#121212] p-6 flex flex-col justify-between">
            {/* Logo */}
            <div>
                <h2 className="text-2xl font-bold mb-10">DD</h2>

            {/* Nav*/}
            <nav className="flex flex-col gap-2">
                {menu.map((item)=>{
                    const Icon = item.icon;
                    const isActive = 
                    pathname === `/${item.name.toLowerCase()}` ||
                    (pathname === "/" && item.name === "Dashboard");

                    return(
                        <Link
                        key={item.name}
                        href={`/${item.name.toLowerCase()}`}
                        className={`flex items-center gap-3 p-3 rounded-xl transition ${
                            isActive
                            ? "bg-purple-600 text-white"
                            : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
                        }`}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
            </div>

            {/* Low Part */}
            <div className="text-gray-500 text-sm">
                Discipline = Freedom
            </div>
        </aside>

    )
}