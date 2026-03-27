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
"use client";

import { useHabits } from "@/hooks/useHabits";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useState } from "react";

export default function HabitsPage() {
  const isMounted = useIsMounted();
  const { habits, addHabit, toggleHabit } = useHabits();
  const [text, setText] = useState("");

  // Это лечит "Cascading renders" и ошибки гидратации
  if (!isMounted) return null 
{/* <div className="min-h-screen bg-[#0f0f0f]" />; */}
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
      
      <div className="flex gap-2 mb-8">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="bg-[#1a1a1a] p-2 rounded border border-white/10"
          placeholder="New habit..."
        />
        <button 
          onClick={() => { addHabit(text); setText(""); }}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="grid gap-3">
        {habits.map(habit => (
          <div key={habit.id} className="p-4 bg-[#1a1a1a] rounded-xl flex justify-between">
            <span>{habit.name}</span>
            <button 
              onClick={() => toggleHabit(habit.id)}
              className={`px-3 py-1 rounded ${habit.completed ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              {habit.completed ? "Done" : "Mark"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}