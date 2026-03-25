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
















"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";

export default function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");

  // 🔥 ФИЛЬТР (шаг 20)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // 🔥 ДОБАВЛЕНИЕ
  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  // 🔥 ФИЛЬТРАЦИЯ (шаг 21)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* ➕ ДОБАВЛЕНИЕ */}
      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 p-3 rounded-xl bg-[#1a1a1a] outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>

      {/* 🔥 ФИЛЬТРЫ (шаг 22) */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded-lg text-sm capitalize transition ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-[#1a1a1a] text-gray-400 hover:bg-[#222]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 📋 СПИСОК */}
      <div className="flex flex-col gap-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition group"
          >
            {/* Левая часть */}
            <div className="flex items-center gap-3">
              {/* Чекбокс */}
              <div
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer transition ${
                  task.completed
                    ? "bg-purple-600 border-purple-600"
                    : "border-gray-500"
                }`}
              >
                {task.completed && <span className="text-xs">✓</span>}
              </div>

              {/* Текст */}
              <span
                className={`transition ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                }`}
              >
                {task.title}
              </span>
            </div>

            {/* Удаление */}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}