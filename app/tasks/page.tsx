// export default function TaskPage() {
//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Tasks</h1>
//             <p className="text-gray-400">Your tasks will appear here.</p>
//         </div>
//     )
// }


// "use client"

// import { useState } from "react";
// import { useTasks } from "@/hooks/useTasks";

// export default function TasksPage() {
//   const { tasks, addTask, toggleTask, deleteTask } = useTasks();
//   const [title, setTitle] = useState("");
//   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

//     const handleAdd = () => {
//     if (!title.trim()) return;
//     addTask(title);
//     setTitle("");
//   };

//    return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       {/* Добавление задачи */}
//       <div className="flex gap-2 mb-6">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="New task..."
//           className="flex-1 p-3 rounded-xl bg-[#1a1a1a] outline-none"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700 transition"
//         >
//           Add
//         </button>
//       </div>

//       {/* Список задач */}
//       <div className="flex flex-col gap-3">
//         {tasks.map((task) => (
//           <div
//             key={task.id}
//             className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition group"
//           >
//             <div className="flex items-center gap-3">
//   {/* Чекбокс */}
//   <div
//     onClick={() => toggleTask(task.id)}
//     className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer transition ${
//       task.completed
//         ? "bg-purple-600 border-purple-600"
//         : "border-gray-500"
//     }`}
//   >
//     {task.completed && <span className="text-xs">✓</span>}
//   </div>

//   {/* Текст */}
//   <span
//     className={`transition ${
//       task.completed
//         ? "line-through text-gray-500"
//         : "text-white"
//     }`}
//   >
//     {task.title}
//   </span>
// </div>

//             <button
//               onClick={() => deleteTask(task.id)}
//               className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
















// "use client";

// import { useState } from "react";
// import { useTasks } from "@/hooks/useTasks";

// export default function TasksPage() {
//   const { tasks, addTask, toggleTask, deleteTask } = useTasks();
//   const [title, setTitle] = useState("");

//   // 🔥 ФИЛЬТР (шаг 20)
//   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

//   // 🔥 ДОБАВЛЕНИЕ
//   const handleAdd = () => {
//     if (!title.trim()) return;
//     addTask(title);
//     setTitle("");
//   };

//   // 🔥 ФИЛЬТРАЦИЯ (шаг 21)
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "active") return !task.completed;
//     if (filter === "completed") return task.completed;
//     return true;
//   });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>

//       {/* ➕ ДОБАВЛЕНИЕ */}
//       <div className="flex gap-2 mb-6">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="New task..."
//           className="flex-1 p-3 rounded-xl bg-[#1a1a1a] outline-none"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700 transition"
//         >
//           Add
//         </button>
//       </div>

//       {/* 🔥 ФИЛЬТРЫ (шаг 22) */}
//       <div className="flex gap-2 mb-4">
//         {["all", "active", "completed"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f as any)}
//             className={`px-3 py-1 rounded-lg text-sm capitalize transition ${
//               filter === f
//                 ? "bg-purple-600 text-white"
//                 : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222]"
//             }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* 📋 СПИСОК */}
//       <div className="flex flex-col gap-3">
//         {filteredTasks.map((task) => (
//           <div
//             key={task.id}
//             className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition group"
//           >
//             {/* Левая часть */}
//             <div className="flex items-center gap-3">
//               {/* Чекбокс */}
//               <div
//                 onClick={() => toggleTask(task.id)}
//                 className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer transition ${
//                   task.completed
//                     ? "bg-purple-600 border-purple-600"
//                     : "border-gray-500"
//                 }`}
//               >
//                 {task.completed && <span className="text-xs">✓</span>}
//               </div>

//               {/* Текст */}
//               <span
//                 className={`transition ${
//                   task.completed
//                     ? "line-through text-gray-500"
//                     : "text-white"
//                 }`}
//               >
//                 {task.title}
//               </span>
//             </div>

//             {/* Удаление */}
//             <button
//               onClick={() => deleteTask(task.id)}
//               className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







































"use client";

import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";


export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  
  // 🔥 Защита от Hydration Error
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  const frame = requestAnimationFrame(() => {
    setMounted(true);
  });
  return () => cancelAnimationFrame(frame);
}, []);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Если компонент еще не примонтирован, возвращаем пустой контейнер
  if (!mounted) return <div className="p-6">Loading tasks...</div>;

  return (
    <div className="px-4 pt-10 pb-20 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Tasks Management</h1>

      {/* ➕ Поле добавления */}
      <div className="flex gap-2 mb-8 bg-[#1a1a1a] flex-col sm:flex-row rounded-2xl border border-white/5 focus-within:border-purple-500/50 transition">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
          className="flex-1 p-3 text-base bg-transparent outline-none text-white placeholder:text-gray-500"
        />
        <button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-purple-600 px-6 py-2 rounded-xl hover:bg-purple-700 text-white font-medium transition shadow-lg shadow-purple-500/20"
        >
          Add Task
        </button>
      </div>

      {/* 🔥 Фильтры */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm capitalize transition-all duration-300 ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 📋 Список задач */}
      <div className="grid gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (

            <div
  key={task.id}
  className="group flex items-center justify-between bg-[#1a1a1a] min-h-[64px] p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 select-none touch-manipulation"
>
  <div className="flex items-center gap-4 flex-1 min-w-0">
    {/* Кастомный чекбокс с увеличенной зоной тапа */}
    <button
      onClick={() => toggleTask(task.id)}
      className={`w-7 h-7 flex shrink-0 items-center justify-center rounded-xl border-2 transition-all ${
        task.completed
          ? "bg-purple-600 border-purple-600"
          : "border-gray-600 active:border-purple-500"
      }`}
    >
      {task.completed && <span className="text-white text-xs font-bold">✓</span>}
    </button>

    {/* Текст задачи с защитой от переполнения */}
    <span
      className={`text-base sm:text-lg leading-tight transition-all duration-300 break-words line-clamp-2 ${
        task.completed ? "line-through text-gray-500" : "text-gray-200"
      }`}
    >
      {task.title}
    </span>
  </div>

  {/* Кнопка удаления: всегда видна на тач-устройствах, скрыта до ховера на десктопе */}
  <button
    onClick={() => deleteTask(task.id)}
    className="ml-3 p-3 text-gray-500 active:text-red-500 sm:text-gray-600 sm:hover:text-red-500 sm:bg-red-500/0 sm:hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
    aria-label="Delete task"
  >
    <span className="text-xl sm:text-base">✕</span>
  </button>
</div>
            // <div
            //   key={task.id}
            //   className="group flex items-center justify-between bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            // >
            //   <div className="flex items-center gap-4">
            //     {/* Кастомный чекбокс */}
            //     <button
            //       onClick={() => toggleTask(task.id)}
            //       className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 transition-all ${
            //         task.completed
            //           ? "bg-purple-600 border-purple-600"
            //           : "border-gray-600 hover:border-purple-500"
            //       }`}
            //     >
            //       {task.completed && <span className="text-white text-xs font-bold">✓</span>}
            //     </button>

            //     <span
            //       className={`text-lg transition-all duration-300 ${
            //         task.completed ? "line-through text-gray-500" : "text-gray-200"
            //       }`}
            //     >
            //       {task.title}
            //     </span>
            //   </div>

            //   {/* Кнопка удаления */}
            //   <button
            //     onClick={() => deleteTask(task.id)}
            //     className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            //   >
            //     ✕
            //   </button>
            // </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 border-2 border-dashed border-white/5 rounded-2xl">
            No tasks found in this category.
          </div>
        )}
      </div>
    </div>
  );
}























