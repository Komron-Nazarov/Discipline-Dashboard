// "use client";

// import { useEffect, useState } from "react";
// import { Habit } from "@/types/habits";

// export function useHabits() {
//  const [habits, setHabits] = useState<Habit[]>([
//   { id: "1", name: "Morning Run", completed: false, streak: 2, lastCompleted: null },
//   { id: "2", name: "Meditation", completed: true, streak: 5, lastCompleted: new Date().toDateString() },
// ]);

//   // загрузка
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

// try {
//       const data = localStorage.getItem("habits");
//       return data ? (JSON.parse(data) as Habit[]) : [];
//     } catch {
//       return [];
//     }
//   };

//   // сохранение изменений
//   useEffect(() => {
//     localStorage.setItem("habits", JSON.stringify(habits));
//   }, [habits]);


//   // добавление
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

//         // если уже сделал сегодня → отмена
//         if (habit.completed) {
//           return {
//             ...habit,
//             completed: false,
//           };
//         }

//         // если вчера делал → streak++
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);

//         const isYesterday =
//           habit.lastCompleted === yesterday.toDateString();

//         return {
//           ...habit,
//           completed: true,
//           streak: isYesterday ? habit.streak + 1 : 1,
//           lastCompleted: today,
//         };
//       })
//     );
//   };

//   return {
//     habits,
//     addHabit,
//     toggleHabit,
//   };
// }


// "use client";

// import { useEffect, useState } from "react";
// import { Habit } from "@/types/habits";

// export function useHabits() {
//   const [habits, setHabits] = useState<Habit[]>(() => {
//     // начальная загрузка: LocalStorage или тестовые привычки
//     try {
//       const data = localStorage.getItem("habits");
//       if (data) return JSON.parse(data) as Habit[];
//     } catch {
//       console.warn("Failed to load habits from LocalStorage");
//     }

//     // если в LocalStorage нет данных — тестовые привычки
//     return [
//       { id: "1", name: "Morning Run", completed: false, streak: 2, lastCompleted: null },
//       { id: "2", name: "Meditation", completed: true, streak: 5, lastCompleted: new Date().toDateString() },
//     ];
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

//         // если уже сделал сегодня → отмена
//         if (habit.completed) {
//           return { ...habit, completed: false };
//         }

//         // если делал вчера → streak++
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





// "use client";

// import { useState, useEffect, useSyncExternalStore } from "react";
// import { Habit } from "@/types/habits";

// // Вспомогательная функция для чтения данных
// function getSnapshot() {
//   if (typeof window === "undefined") return "[]";
//   return localStorage.getItem("habits") || "[]";
// }

// // Заглушка для сервера
// function getServerSnapshot() {
//   return "[]";
// }

// // Пустая подписка (нам просто нужно читать данные при загрузке)
// function subscribe(callback: () => void) {
//   window.addEventListener("storage", callback);
//   return () => window.removeEventListener("storage", callback);
// }

// export function useHabits() {
//   // Читаем данные через useSyncExternalStore (это убирает все ошибки рендера)
//   const habitsRaw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
//   const [habits, setHabits] = useState<Habit[]>([]);

//   // Синхронизируем локальный стейт с прочитанными данными один раз
//   useEffect(() => {
//     setHabits(JSON.parse(habitsRaw));
//   }, [habitsRaw]);

//   // Сохранение (срабатывает только при изменении habits)
//   useEffect(() => {
//     if (habits.length > 0) {
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
//         if (habit.completed) return { ...habit, completed: false };

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



"use client";

import { useEffect, useState, useRef } from "react";
import { Habit } from "@/types/habits";

export function useHabits() {
  // 1. Ленивая инициализация: функция внутри useState выполнится ТОЛЬКО ОДИН РАЗ при рождении компонента
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Если мы на сервере (Next.js), возвращаем пустой массив
    if (typeof window === "undefined") return [];
    
    try {
      const data = localStorage.getItem("habits");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Ошибка загрузки привычек:", e);
      return [];
    }
  });

  // Реф для отслеживания первого рендера, чтобы не сохранять пустые данные поверх старых
  const isFirstRender = useRef(true);

  // 2. Сохранение: следим только за изменением habits
  useEffect(() => {
    // Пропускаем самый первый рендер
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    if (!name.trim()) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      completed: false,
      streak: 0,
      lastCompleted: null,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toDateString();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        if (habit.completed) return { ...habit, completed: false };

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday = habit.lastCompleted === yesterday.toDateString();

        return {
          ...habit,
          completed: true,
          streak: isYesterday ? habit.streak + 1 : 1,
          lastCompleted: today,
        };
      })
    );
  };

  return { habits, addHabit, toggleHabit };
}