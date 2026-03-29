// // "use client";

// // import { useEffect, useState } from "react";
// // import { Habit } from "@/types/habits";

// // export function useHabits() {
// //   const [habits, setHabits] = useState<Habit[]>([]);

// //   // загрузка
// //   useEffect(() => {
// //     const data = localStorage.getItem("habits");
// //     if (data) {
// //       setHabits(JSON.parse(data));
// //     }
// //   }, []);

// //   // сохранение
// //   useEffect(() => {
// //     localStorage.setItem("habits", JSON.stringify(habits));
// //   }, [habits]);

// //   // добавление
// //   const addHabit = (name: string) => {
// //     const newHabit: Habit = {
// //       id: Date.now().toString(),
// //       name,
// //       completed: false,
// //       streak: 0,
// //       lastCompleted: null,
// //     };

// //     setHabits((prev) => [...prev, newHabit]);
// //   };

// //   // выполнение привычки
// //   const toggleHabit = (id: string) => {
// //     const today = new Date().toDateString();

// //     setHabits((prev) =>
// //       prev.map((habit) => {
// //         if (habit.id !== id) return habit;

// //         // если уже сделал сегодня → отмена
// //         if (habit.completed) {
// //           return {
// //             ...habit,
// //             completed: false,
// //           };
// //         }

// //         // если вчера делал → streak++
// //         const yesterday = new Date();
// //         yesterday.setDate(yesterday.getDate() - 1);

// //         const isYesterday =
// //           habit.lastCompleted === yesterday.toDateString();

// //         return {
// //           ...habit,
// //           completed: true,
// //           streak: isYesterday ? habit.streak + 1 : 1,
// //           lastCompleted: today,
// //         };
// //       })
// //     );
// //   };

// //   return {
// //     habits,
// //     addHabit,
// //     toggleHabit,
// //   };
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { Habit } from "@/types/habits";

// export function useHabits() {
//   const [habits, setHabits] = useState<Habit[]>(() => {
//     try {
//       const data = localStorage.getItem("habits");
//       return data ? (JSON.parse(data) as Habit[]) : [];
//     } catch {
//       return [];
//     }
//   });

//   // сохранение изменений
//   useEffect(() => {
//     localStorage.setItem("habits", JSON.stringify(habits));
//   }, [habits]);

//   // добавление привычки
//   const addHabit = (name: string) => {
//     const newHabit: Habit = {
//       id: Date.now().toString(),
//       name,
//       completed: false,
//       streak: 0,
//       lastCompleted: null,
//     };
//     setHabits((prev) => [...prev, newHabit]);
//   };

//   // выполнение привычки
//   const toggleHabit = (id: string) => {
//     const today = new Date().toDateString();
//     setHabits((prev) =>
//       prev.map((habit) => {
//         if (habit.id !== id) return habit;

//         if (habit.completed) {
//           return { ...habit, completed: false };
//         }

//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const isYesterday = habit.lastCompleted === yesterday.toDateString();

//         return {
//           ...habit,
//           completed: true,
//           streak: isYesterday ? habit.streak + 1 : 1,
//           lastCompleted: today,
//         };
//       })
//     );
//   };

//   return { habits, addHabit, toggleHabit };
// // }
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Habit } from "@/types/habits";

// export function useHabits() {
//   // 1. Всегда начинаем с пустого массива
//   const [habits, setHabits] = useState<Habit[]>([]);
  
//   // Этот реф поможет нам отличить ПЕРВУЮ загрузку от последующих изменений
//   const isInitialized = useRef(false);

//   // 2. ЗАГРУЗКА: Срабатывает один раз при старте
//   useEffect(() => {
//     const data = localStorage.getItem("habits");
//     if (data) {
//       try {
//         const parsed = JSON.parse(data);
//         if (Array.isArray(parsed)) {
//           setHabits(parsed);
//         }
//       } catch (e) {
//         console.error("Failed to load habits", e);
//       }
//     }
//     // Помечаем, что мы закончили начальную загрузку
//     isInitialized.current = true;
//   }, []);

//   // 3. СОХРАНЕНИЕ: Срабатывает только после того, как инициализация завершена
//   useEffect(() => {
//     if (isInitialized.current) {
//       localStorage.setItem("habits", JSON.stringify(habits));
//     }
//   }, [habits]);

//   const addHabit = (name: string) => {
//     const newHabit: Habit = {
//       id: Date.now().toString(),
//       name,
//       completed: false,
//       streak: 0,
//       lastCompleted: null,
//     };
//     setHabits((prev) => [...prev, newHabit]);
//   };

//   const toggleHabit = (id: string) => {
//     const today = new Date().toDateString();
//     setHabits((prev) =>
//       prev.map((habit) => {
//         if (habit.id !== id) return habit;

//         if (habit.completed) {
//           return { ...habit, completed: false };
//         }

//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const isYesterday = habit.lastCompleted === yesterday.toDateString();

//         return {
//           ...habit,
//           completed: true,
//           streak: isYesterday ? habit.streak + 1 : 1,
//           lastCompleted: today,
//         };
//       })
//     );
//   };

//   return { habits, addHabit, toggleHabit };
// }



// app/habits/page.tsx












// "use client";

// import { useHabits } from "@/hooks/useHabits";
// import { useIsMounted } from "@/hooks/useIsMounted";
// import { useState } from "react";

// export default function HabitsPage() {
//   const isMounted = useIsMounted();
//   const { habits, addHabit, toggleHabit } = useHabits();
//   const [text, setText] = useState("");

//   // Это лечит "Cascading renders" и ошибки гидратации
//   if (!isMounted) return null 
// {/* <div className="min-h-screen bg-[#0f0f0f]" />; */}
//   return (
//     <main className="min-h-screen bg-[#0f0f0f] text-white p-8">
//       <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      
//       <div className="flex gap-2 mb-8">
//         <input 
//           value={text} 
//           onChange={(e) => setText(e.target.value)}
//           className="bg-[#1a1a1a] p-2 rounded border border-white/10"
//           placeholder="New habit..."
//         />
//         <button 
//           onClick={() => { addHabit(text); setText(""); }}
//           className="bg-purple-600 px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       <div className="grid gap-3">
//         {habits.map(habit => (
//           <div key={habit.id} className="p-4 bg-[#1a1a1a] rounded-xl flex justify-between">
//             <span>{habit.name}</span>
//             <button 
//               onClick={() => toggleHabit(habit.id)}
//               className={`px-3 py-1 rounded ${habit.completed ? 'bg-green-500' : 'bg-gray-600'}`}
//             >
//               {habit.completed ? "Done" : "Mark"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
























"use client";

import { useHabits } from "@/hooks/useHabits";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useState } from "react";
// Можно использовать lucide-react для иконок, если установлена: npm i lucide-react
import { Trash2, Plus, Check, Circle } from "lucide-react";

export default function HabitsPage() {
  const isMounted = useIsMounted();
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits(); // Добавь deleteHabit в хук
  const [text, setText] = useState("");

  if (!isMounted) return null;

  const handleAdd = () => {
    if (text.trim()) {
      addHabit(text);
      setText("");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-4 pt-12 pb-24 sm:p-8">
      {/* Шапка */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          {/* <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Дисциплина</p> */}
          <h1 className="text-4xl font-bold tracking-tight">Habit Tracker</h1>
        </div>
        <div className="text-purple-500 font-mono text-sm">
          {habits.filter(h => h.completed).length}/{habits.length}
        </div>
      </header>
      
      {/* Инпут добавления */}
      <div className="flex gap-2 mb-10 group">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 bg-[#161616] px-4 py-3 rounded-2xl border border-white/5 focus:border-purple-500/50 outline-none transition-all placeholder:text-gray-600"
          placeholder="Новая привычка..."
        />
        <button 
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-500 active:scale-90 p-4 rounded-2xl transition-all shadow-lg shadow-purple-900/20"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Список привычек */}
      <div className="grid gap-3">
        {habits.length === 0 && (
          <p className="text-center text-gray-600 mt-10">Список пуст. Время начать!</p>
        )}
        
        {habits.map(habit => (
          <div 
            key={habit.id} 
            className="group p-4 bg-[#161616] rounded-2xl border border-white/5 flex items-center justify-between hover:bg-[#1c1c1c] transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`transition-colors ${habit.completed ? 'text-green-500' : 'text-gray-600'}`}
              >
                {habit.completed ? <Check size={24} /> : <Circle size={24} />}
              </button>
              <span className={`text-lg transition-all ${habit.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                {habit.name}
              </span>
            </div>

            {/* Кнопка удаления */}
            <button 
              onClick={() => deleteHabit(habit.id)}
              className="ml-4 p-2 text-gray-600 hover:text-red-500 active:scale-90 transition-all opacity-0 group-hover:opacity-100 sm:opacity-100"
              aria-label="Delete habit"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Напоминалка про Safe Area для iOS внизу */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </main>
  );
}