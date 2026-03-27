// // "use client";

// // import Card from "@/components/dashboard/Card";
// // import TopBar from "@/components/dashboard/TopBar";
// // import { useTasks } from "@/hooks/useTasks";
// // import { useFinance } from "@/hooks/useFinance";
// // import FinanceChart from "@/components/dashboard/FinanceChart";
// // import { useHabits } from "@/hooks/useHabits";

// // export default function Home() {
// //   const { tasks } = useTasks();
// //   const completedTasks = tasks.filter((t) => t.completed).length;
// //   const { balance, transactions } = useFinance();
// //   const { habits } = useHabits();
// //   return (
// //     <main className="min-h-screen bg-[#0f0f0f] text-white p-6">
      
// // {/*Header*/}

// // <div className="mb-8">
// //   <h1 className="text-3xl font-bold">Discipline Dashboard</h1>
// //   <p className="text-gray-400 mt-2"> Control your life. Build discipline.</p>
// // </div>

// // <TopBar/>

// // {/*Cards*/}

// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //       <Card
// //   title="Tasks"
// //   value={`${completedTasks}/${tasks.length}`}
// // />
// //         <Card
// //   title="Transactions"
// //   value={transactions.length.toString()}
// // />
// //         <Card title="Balance" value={`$${balance}`} />
// //         <Card
// //   title="Max Streak"
// //   value={habits.length ? Math.max(...habits.map(h => h.streak)).toString() : "0"}
// // />
// //         <Card title="Habits" value={habits.length.toString()} />
// //       </div>

// //       <FinanceChart transactions={transactions} />



// // {/* Placeholder Graph */}
// //       <div className="bg-[#1a1a1a] rounded-2xl p-6 h-[200px] flex items-center justify-center text-gray-500">
// //           Graph coming soon...
// //       </div>

// //     </main>
// //   );
// // }


// // "use client";

// // import { useState } from "react";
// // import Card from "@/components/dashboard/Card";
// // import TopBar from "@/components/dashboard/TopBar";
// // import { useTasks } from "@/hooks/useTasks";
// // import { useFinance } from "@/hooks/useFinance";
// // import FinanceChart from "@/components/dashboard/FinanceChart";
// // import { useHabits } from "@/hooks/useHabits";

// // export default function Home() {
// //   const { tasks } = useTasks();
// //   const completedTasks = tasks.filter((t) => t.completed).length;
// //   const { balance, transactions } = useFinance();

// //   // Хук привычек
// //   const { habits, addHabit, toggleHabit } = useHabits();

// //   // Локальный стейт для поля ввода новой привычки
// //   const [newHabit, setNewHabit] = useState("");

// //   return (
// //     <main className="min-h-screen bg-[#0f0f0f] text-white p-6">
// //       {/* Header */}
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold">Discipline Dashboard</h1>
// //         <p className="text-gray-400 mt-2">Control your life. Build discipline.</p>
// //       </div>

// //       <TopBar />

// //       {/* Cards */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         <Card title="Tasks" value={`${completedTasks}/${tasks.length}`} />
// //         <Card title="Transactions" value={transactions.length.toString()} />
// //         <Card title="Balance" value={`$${balance}`} />
// //         <Card title="Max Streak" value={habits.length ? Math.max(...habits.map(h => h.streak)).toString() : "0"} />
// //         <Card title="Habits" value={habits.length.toString()} />
// //       </div>

// //       <FinanceChart transactions={transactions} />

// //       {/* Habits Section */}
// //       <div className="mt-8">
// //         <h2 className="text-xl font-bold mb-4">Habits</h2>

// //         {/* Добавление новой привычки */}
// //         <div className="flex gap-2 mb-4">
// //           <input
// //             type="text"
// //             placeholder="New habit"
// //             className="p-2 rounded text-black flex-1"
// //             value={newHabit}
// //             onChange={(e) => setNewHabit(e.target.value)}
// //           />
// //           <button
// //             onClick={() => {
// //               if (newHabit.trim() === "") return;
// //               addHabit(newHabit);
// //               setNewHabit("");
// //             }}
// //             className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
// //           >
// //             Add
// //           </button>
// //         </div>

// //         {/* Список привычек */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// //           {habits.map((habit) => (
// //             <div
// //               key={habit.id}
// //               className="flex justify-between items-center p-2 bg-[#1a1a1a] rounded-xl"
// //             >
// //               <span>{habit.name}</span>
// //               <button
// //                 onClick={() => toggleHabit(habit.id)}
// //                 className={`px-2 py-1 rounded ${habit.completed ? "bg-green-500" : "bg-gray-600"}`}
// //               >
// //                 {habit.completed ? "Done" : "Mark"}
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Placeholder Graph */}
// //       <div className="bg-[#1a1a1a] rounded-2xl p-6 h-[200px] flex items-center justify-center text-gray-500 mt-8">
// //         Graph coming soon...
// //       </div>
// //     </main>
// //   );
// // }










// "use client";

// import { useState, useEffect } from "react";
// import dynamic from 'next/dynamic';

// // Загружаем компоненты динамически БЕЗ SSR, чтобы избежать конфликтов с датой и графиками
// const TopBar = dynamic(() => import('@/components/dashboard/TopBar'), { ssr: false });
// const FinanceChart = dynamic(() => import('@/components/dashboard/FinanceChart'), { ssr: false });

// import Card from "@/components/dashboard/Card";
// import { useTasks } from "@/hooks/useTasks";
// import { useFinance } from "@/hooks/useFinance";
// import { useHabits } from "@/hooks/useHabits";

// export default function Home() {
//   const [mounted, setMounted] = useState(false);
//   const [newHabit, setNewHabit] = useState("");

//   // Подключаем хуки
//   const { tasks } = useTasks();
//   const { balance, transactions } = useFinance();
//   const { habits, addHabit, toggleHabit } = useHabits();

//   // Ждем монтирования компонента в браузере
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Вычисляем значения (только если mounted, иначе сервер выдаст ошибку)
//   const completedTasks = tasks.filter((t) => t.completed).length;
//   const maxStreak = habits.length ? Math.max(...habits.map(h => h.streak)) : 0;

//   // Если еще не на клиенте, рендерим пустую оболочку (скелетон), чтобы не было Hydration Error
//   if (!mounted) {
//     return <main className="min-h-screen bg-[#0f0f0f]" />;
//   }

//   return (
//     <main className="min-h-screen bg-[#0f0f0f] text-white p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Discipline Dashboard</h1>
//         <p className="text-gray-400 mt-2">Control your life. Build discipline.</p>
//       </div>

//       <TopBar />

//       {/* Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <Card title="Tasks" value={`${completedTasks}/${tasks.length}`} />
//         <Card title="Transactions" value={transactions.length.toString()} />
//         <Card title="Balance" value={`$${balance}`} />
//         <Card title="Max Streak" value={maxStreak.toString()} />
//       </div>

//       <FinanceChart transactions={transactions} />

//       {/* Habits Section */}
//       <div className="mt-8 bg-[#121212] p-6 rounded-2xl border border-white/5">
//         <h2 className="text-xl font-bold mb-4">Daily Habits</h2>

//         {/* Добавление новой привычки */}
//         <div className="flex gap-2 mb-6">
//           <input
//             type="text"
//             placeholder="Build a new habit..."
//             className="flex-1 p-3 rounded-xl bg-[#1a1a1a] border border-white/10 outline-none focus:border-purple-500 transition"
//             value={newHabit}
//             onChange={(e) => setNewHabit(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && (addHabit(newHabit), setNewHabit(""))}
//           />
//           <button
//             onClick={() => {
//               if (!newHabit.trim()) return;
//               addHabit(newHabit);
//               setNewHabit("");
//             }}
//             className="px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition font-medium"
//           >
//             Add
//           </button>
//         </div>

//         {/* Список привычек */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {habits.map((habit) => (
//             <div
//               key={habit.id}
//               className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-white/10 transition"
//             >
//               <div>
//                 <span className="block font-medium">{habit.name}</span>
//                 <span className="text-xs text-purple-400">Streak: {habit.streak} days</span>
//               </div>
//               <button
//                 onClick={() => toggleHabit(habit.id)}
//                 className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
//                   habit.completed 
//                     ? "bg-green-500/20 text-green-500 border border-green-500/50" 
//                     : "bg-purple-600 text-white"
//                 }`}
//               >
//                 {habit.completed ? "Done ✓" : "Mark"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Placeholder */}
//       <div className="bg-[#1a1a1a] rounded-2xl p-6 h-[150px] flex items-center justify-center text-gray-600 mt-8 border border-dashed border-white/10">
//           Analytics Engine coming soon...
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import { useIsMounted } from "@/hooks/useIsMounted";

// Динамический импорт без SSR
const TopBar = dynamic(() => import('@/components/dashboard/TopBar'), { ssr: false });
const FinanceChart = dynamic(() => import('@/components/dashboard/FinanceChart'), { ssr: false });

import Card from "@/components/dashboard/Card";
import { useTasks } from "@/hooks/useTasks";
import { useFinance } from "@/hooks/useFinance";
import { useHabits } from "@/hooks/useHabits";

export default function Home() {
  const isMounted = useIsMounted();
  const [newHabit, setNewHabit] = useState("");

  const { tasks } = useTasks();
  const { balance, transactions } = useFinance();
  const { habits, addHabit, toggleHabit } = useHabits();

  // Если мы еще на сервере, рисуем пустой фон, чтобы избежать прыжков гидратации
  if (!isMounted) {
    return <main className="min-h-screen bg-[#0f0f0f]" />;
  }

  const completedTasks = tasks.filter((t) => t.completed).length;
  const maxStreak = habits.length ? Math.max(...habits.map(h => h.streak)) : 0;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Discipline Dashboard</h1>
        <p className="text-gray-400 mt-2">Control your life. Build discipline.</p>
      </div>

      <TopBar />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Tasks" value={`${completedTasks}/${tasks.length}`} />
        <Card title="Transactions" value={transactions.length.toString()} />
        <Card title="Balance" value={`$${balance}`} />
        <Card title="Max Streak" value={maxStreak.toString()} />
      </div>

      <FinanceChart transactions={transactions} />

      <div className="mt-8 bg-[#121212] p-6 rounded-2xl border border-white/5 shadow-xl">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Daily Habits
          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="What's your next win?"
            className="flex-1 p-3 rounded-xl bg-[#1a1a1a] border border-white/10 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (addHabit(newHabit), setNewHabit(""))}
          />
          <button
            onClick={() => {
              if (!newHabit.trim()) return;
              addHabit(newHabit);
              setNewHabit("");
            }}
            className="px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 active:scale-95 transition-all font-medium shadow-lg shadow-purple-500/20"
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div>
                <span className="block font-medium group-hover:text-purple-300 transition-colors">{habit.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/80 font-bold">Streak: {habit.streak} days</span>
              </div>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  habit.completed 
                    ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                    : "bg-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
                }`}
              >
                {habit.completed ? "Done ✓" : "Mark"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 h-37.5 flex flex-col items-center justify-center text-gray-600 mt-8 border border-dashed border-white/10">
          <p className="text-sm font-medium">Predictive Analytics Engine</p>
          <p className="text-[10px] uppercase tracking-tighter">Status: Coming Soon</p>
      </div>
    </main>
  );
}