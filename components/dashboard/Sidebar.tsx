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





































// "use client"

// import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Sidebar() {
//     const pathname = usePathname();

//     // Добавляем конкретные пути (path) для каждой страницы
//     const menu = [
//         { name: "Dashboard", icon: LayoutDashboard, path: "/" },
//         { name: "Tasks", icon: CheckSquare, path: "/tasks" },
//         { name: "Habits", icon: Repeat, path: "/habits" },
//         { name: "Finance", icon: Wallet, path: "/finance" },
//     ]

//     return (
//         <aside className="w-64 h-screen bg-[#121212] p-6 flex flex-col justify-between border-r border-white/5">
//             <div>
//                 {/* Logo */}
//                 <h2 className="text-2xl font-bold mb-10 tracking-tighter text-purple-500">DD</h2>

//                 {/* Nav */}
//                 <nav className="flex flex-col gap-2">
//                     {menu.map((item) => {
//                         const Icon = item.icon;
//                         // Упрощаем проверку активности
//                         const isActive = pathname === item.path;

//                         return (
//                             <Link
//                                 key={item.name}
//                                 href={item.path} // Используем item.path вместо генерации строки
//                                 className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
//                                     isActive
//                                         ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
//                                         : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
//                                 }`}
//                             >
//                                 <Icon size={18} />
//                                 <span className="font-medium">{item.name}</span>
//                             </Link>
//                         )
//                     })}
//                 </nav>
//             </div>

//             {/* Low Part */}
//             <div className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold opacity-50">
//                 Discipline = Freedom
//             </div>
//         </aside>
//     )
// }


















// "use client"

// import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// // 1. Описываем типы для TypeScript
// interface IMenuItem {
//   name: string;
//   icon: React.ElementType;
//   path: string;
// }

// interface MenuItemProps {
//   item: IMenuItem;
//   pathname: string;
//   isMobile: boolean;
// }

// export default function Sidebar() {
//   const pathname = usePathname();

//   const menu: IMenuItem[] = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/" },
//     { name: "Tasks", icon: CheckSquare, path: "/tasks" },
//     { name: "Habits", icon: Repeat, path: "/habits" },
//     { name: "Finance", icon: Wallet, path: "/finance" },
//   ]

//   return (
//     <aside className="
//       /* Desktop: Фиксированный сайдбар слева (от 768px и выше) */
//       md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:flex md:flex-col md:border-r md:p-6 md:bg-[#121212] md:border-white/5
      
//       /* Mobile: Нижняя панель (до 768px) */
//       fixed bottom-0 left-0 right-0 h-[calc(65px+env(safe-area-inset-bottom))] w-full 
//       bg-[#121212]/80 backdrop-blur-xl border-t border-white/5 px-2 pb-[env(safe-area-inset-bottom)]
//       flex flex-row justify-between items-center z-50
//     ">
      
//       {/* Контент для Десктопа (Логотип + Навигация) */}
//       <div className="hidden md:block w-full">
//         <h2 className="text-2xl font-bold mb-10 tracking-tighter text-purple-500 select-none">DD</h2>

//         <nav className="flex flex-col gap-2">
//           {menu.map((item) => (
//             <MenuItem key={item.name} item={item} pathname={pathname} isMobile={false} />
//           ))}
//         </nav>
//       </div>

//       {/* Контент для Мобилки (Только иконки в ряд) */}
//       <nav className="flex md:hidden w-full justify-around items-center h-full">
//         {menu.map((item) => (
//           <MenuItem key={item.name} item={item} pathname={pathname} isMobile={true} />
//         ))}
//       </nav>

//       {/* Футер сайдбара (только для ПК) */}
//       <div className="hidden md:block text-gray-600 text-[10px] uppercase tracking-widest font-semibold opacity-50 select-none">
//         Discipline = Freedom
//       </div>
//     </aside>
//   )
// }

// // Вспомогательный компонент кнопки меню
// function MenuItem({ item, pathname, isMobile }: MenuItemProps) {
//   const Icon = item.icon;
//   const isActive = pathname === item.path;

//   return (
//     <Link
//       href={item.path}
//       className={`
//         relative flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 
//         transition-all duration-200 select-none touch-manipulation
//         ${isMobile ? 'flex-1 h-full' : 'p-3 rounded-xl w-full'}
//         ${isActive 
//           ? "text-purple-500 md:bg-purple-600 md:text-white md:shadow-lg md:shadow-purple-500/20" 
//           : "text-gray-500 hover:text-white md:hover:bg-[#1f1f1f]"}
//       `}
//     >
//       <Icon 
//         size={isMobile ? 24 : 18} 
//         strokeWidth={isActive ? 2.5 : 2} 
//         className="transition-transform duration-200 active:scale-90"
//       />
      
//       <span className={`
//         font-medium transition-all
//         ${isMobile ? 'text-[10px] sm:text-xs' : 'text-base'}
//         ${isActive ? 'opacity-100' : 'opacity-80'}
//       `}>
//         {item.name}
//       </span>
      
//       {/* Индикатор активной страницы для мобилки (точка) */}
//       {isMobile && isActive && (
//         <div className="absolute bottom-1 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
//       )}
//     </Link>
//   )
// }


















































































"use client"

import { LayoutDashboard, CheckSquare, Repeat, Wallet } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IMenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface MenuItemProps {
  item: IMenuItem;
  pathname: string;
  isMobile: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();

  const menu: IMenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Habits", icon: Repeat, path: "/habits" },
    { name: "Finance", icon: Wallet, path: "/finance" },
  ]

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Виден только от md: 768px) --- */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[#121212] border-r border-white/5 p-6 flex-col justify-between z-40">
        <div>
          <h2 className="text-2xl font-bold mb-10 tracking-tighter text-purple-500">DD</h2>
          <nav className="flex flex-col gap-2">
            {menu.map((item) => (
              <MenuItem key={item.name} item={item} pathname={pathname} isMobile={false} />
            ))}
          </nav>
        </div>
        
        <div className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold opacity-50">
          Discipline = Freedom
        </div>
      </aside>

      {/* --- MOBILE NAVIGATION (Видна только до md: 768px) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(65px+env(safe-area-inset-bottom))] bg-[#121212]/80 backdrop-blur-xl border-t border-white/5 px-2 pb-[env(safe-area-inset-bottom)] flex items-center justify-around z-50">
        {menu.map((item) => (
          <MenuItem key={item.name} item={item} pathname={pathname} isMobile={true} />
        ))}
      </nav>
    </>
  )
}

function MenuItem({ item, pathname, isMobile }: MenuItemProps) {
  const Icon = item.icon;
  const isActive = pathname === item.path;

  // Стили для десктопа
  if (!isMobile) {
    return (
      <Link
        href={item.path}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
            : "text-gray-400 hover:bg-[#1f1f1f] hover:text-white"
        }`}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-medium text-base">{item.name}</span>
      </Link>
    );
  }

  // Стили для мобилки
  return (
    <Link
      href={item.path}
      className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all active:scale-90 touch-manipulation ${
        isActive ? "text-purple-500" : "text-gray-500"
      }`}
    >
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-medium uppercase tracking-tighter">
        {item.name}
      </span>
      {isActive && (
        <div className="absolute bottom-1 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
      )}
    </Link>
  );
}