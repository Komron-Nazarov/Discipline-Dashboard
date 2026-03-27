// "use client"

// import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//     const pathname = usePathname();

//     const menu = [
//         {name: "Dashboard", icon: LayoutDashboard},
//         {name: "Tasks", icon: CheckSquare},
//         {name: "Habits", icon: Repeat},
//         {name: "Finance", icon: Wallet},
//     ]

//     return(
//         <aside className="w-64 h-screen bg-[#121212] p-6 flex flex-col justify-between">
//             {/* Logo */}
//             <div>
//                 <h2 className="text-2xl font-bold mb-10">DD</h2>

//             {/* Nav*/}
//             <nav className="flex flex-col gap-2">
//                 {menu.map((item)=>{
//                     const Icon = item.icon;
//                     const isActive = 
//                     pathname === `/${item.name.toLowerCase()}` ||
//                     (pathname === "/" && item.name === "Dashboard");

//                     return(
//                         <Link
//                         key={item.name}
//                         href={`/${item.name.toLowerCase()}`}
//                         className={`flex items-center gap-3 p-3 rounded-xl transition ${
//                             isActive
//                             ? "bg-purple-600 text-white"
//                             : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
//                         }`}
//                         >
//                             <Icon size={18} />
//                             {item.name}
//                         </Link>
//                     )
//                 })}
//             </nav>
//             </div>

//             {/* Low Part */}
//             <div className="text-gray-500 text-sm">
//                 Discipline = Freedom
//             </div>
//         </aside>

//     )
// }



"use client"

import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    // Добавляем конкретные пути (path) для каждой страницы
    const menu = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/" },
        { name: "Tasks", icon: CheckSquare, path: "/tasks" },
        { name: "Habits", icon: Repeat, path: "/habits" },
        { name: "Finance", icon: Wallet, path: "/finance" },
    ]

    return (
        <aside className="w-64 h-screen bg-[#121212] p-6 flex flex-col justify-between border-r border-white/5">
            <div>
                {/* Logo */}
                <h2 className="text-2xl font-bold mb-10 tracking-tighter text-purple-500">DD</h2>

                {/* Nav */}
                <nav className="flex flex-col gap-2">
                    {menu.map((item) => {
                        const Icon = item.icon;
                        // Упрощаем проверку активности
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path} // Используем item.path вместо генерации строки
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                    isActive
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                        : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
                                }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Low Part */}
            <div className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold opacity-50">
                Discipline = Freedom
            </div>
        </aside>
    )
}