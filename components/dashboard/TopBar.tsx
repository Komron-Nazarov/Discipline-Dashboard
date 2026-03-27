// "use client"

// import { useState, useEffect } from "react";
// import {User} from "lucide-react";

// export default function TopBar() {
//         // const [date, setDate] = useState("");

//         // useEffect(()=> {
//         //     const now = new Date();
//         //     const options: Intl.DateTimeFormatOptions = {
//         //         weekday: "short",
//         //         month: "short",
//         //         day: "numeric",
//         //     };
//         //     setDate(now.toLocaleDateString("en-US", options));
//         // }, []);

//         const [date, setDate] = useState(() => {
//   const now = new Date();
//   const options: Intl.DateTimeFormatOptions = {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   };
//   return now.toLocaleDateString("en-US", options);
// });

//         return(
//             <div className="w-full flex justify-between items-center bg-[#121212] p-4 rounded-2xl mb-6 shadow-sm">
//                 {/* Greeting */}
//                 <div>
//                     <h2 className="text-gray-400 text-sm">Good Afternoon, Komron</h2>
//                    <p suppressHydrationWarning className="text-white font-semibold text-lg">
//   {date}
// </p>
//                 </div>

//                 {/* User */}
//                 <div className="flex items-center gap-3">
//                     <User className="text-gray-400" size={24}/>
//                     <span className="text-gray-400">Admin</span>
//                 </div>
//             </div>
//         );
// }


"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

export default function TopBar() {
  // 1. Инициализируем пустой строкой, чтобы сервер и клиент совпали вначале
  const [date, setDate] = useState("");

  // 2. Устанавливаем дату только ПОСЛЕ того, как компонент появился в браузере
//   useEffect(() => {
//     const now = new Date();
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     };
//     setDate(now.toLocaleDateString("en-US", options));
//   }, []);

useEffect(() => {
  const frame = requestAnimationFrame(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    setDate(now.toLocaleDateString("en-US", options));
  });
  return () => cancelAnimationFrame(frame);
}, []);

  return (
    <div className="w-full flex justify-between items-center bg-[#121212] p-4 rounded-2xl mb-6 shadow-sm border border-white/5">
      {/* Greeting */}
      <div>
        <h2 className="text-gray-400 text-sm font-medium">Good Afternoon, Komron</h2>
        {/* suppressHydrationWarning здесь — твоя страховка */}
        <p suppressHydrationWarning className="text-white font-semibold text-lg min-h-[28px]">
          {date || "Loading..."}
        </p>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 bg-[#1a1a1a] p-2 px-4 rounded-xl border border-white/5 cursor-pointer hover:bg-[#222] transition">
        <User className="text-purple-400" size={20} />
        <span className="text-gray-300 text-sm font-medium">Admin</span>
      </div>
    </div>
  );
}