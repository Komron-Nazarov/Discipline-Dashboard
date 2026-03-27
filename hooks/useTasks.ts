// "use client"

// import { useEffect, useState } from "react";
// import { Task } from "@/types/task";

// export default function useTasks() {
//     const [tasks, setTasks] = useState<Task[]>([]);

//     // Loading from LocalStorage

//     useEffect(() => {
//     const data = localStorage.getItem("tasks");
//     if (data) {
//       setTasks(JSON.parse(data));
//     }
//   }, []);

//     // Save in LocalStorage

//     useEffect(()=>{
//         localStorage.getItem("tasks", JSON.stringify(tasks));
//     }, [tasks]);

//     // Add the Task

//     const addTask = (title: string) => {
//         const newTask: Task = {
//             id: Date.now().toString(),
//             title,
//             completed: false,
//         };

//         setTasks((prev)=> [...prev, newTask]);
//     };

//     // Change (Turn) the Status

//     const toggleTask = (id: string) => {
//         setTasks((prev)=> 
//         prev.map((task)=>
//         task.id === id
//     ? {
//         ...task, completed: !task.completed } 
//     : task
//     )
//     );
// };

//     // Delete

//     const deleteTask = (id: string)=>{
//         setTasks((prev)=>
//         prev.filter((task)=>
//         task.id !== id));
//     };

//     return {
//         tasks,
//         addTask,
//         toggleTask,
//         deleteTask,
//     };

// }


"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Загрузка из localStorage
  // useEffect(() => {
  //   const data = localStorage.getItem("tasks");
  //   if (data) {
  //     setTasks(JSON.parse(data));
  //   }
  // }, []);

 useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTimeout(() => {
        setTasks(JSON.parse(data) as Task[]);
      });
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Добавление задачи
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // Переключение статуса
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Удаление
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}