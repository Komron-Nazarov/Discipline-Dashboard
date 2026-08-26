"use client";

import { useState } from "react";
import { Check, Plus, Target, Trash2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTasks } from "@/hooks/useTasks";

export default function TasksPage() {
  const mounted = useIsMounted();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  if (!mounted) return <div className="min-h-[70vh]" />;
  const visible = tasks.filter((task) => filter === "all" || (filter === "done" ? task.completed : !task.completed));
  const add = () => { if (title.trim()) { addTask(title.trim()); setTitle(""); } };

  return <div className="fade-up space-y-6">
    <header><p className="eyebrow mb-3 text-[#d8ff3e]">Execution queue</p><h1 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">Do the work.</h1><p className="mt-3 text-sm text-[#85877f]">Capture it. Finish it. Move on.</p></header>
    <section className="panel p-4 sm:p-6"><div className="flex gap-2"><input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} className="field flex-1 px-4 py-3.5" placeholder="What needs to get done?" aria-label="New task" /><button onClick={add} className="acid-button size-13 shrink-0" aria-label="Add task"><Plus size={20} /></button></div></section>
    <section className="panel overflow-hidden">
      <div className="flex flex-col justify-between gap-4 border-b border-white/8 p-5 sm:flex-row sm:items-center sm:p-6"><div><p className="eyebrow">Today’s list</p><p className="mt-2 text-sm font-semibold">{tasks.filter(t => t.completed).length} of {tasks.length} complete</p></div><div className="flex rounded-xl bg-black/30 p-1">{(["all", "open", "done"] as const).map(item => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition ${filter === item ? "bg-white text-black" : "text-[#74776f] hover:text-white"}`}>{item}</button>)}</div></div>
      <div className="divide-y divide-white/6">
        {visible.map((task, index) => <div key={task.id} className="group flex items-center gap-4 p-4 transition hover:bg-white/[0.025] sm:px-6"><span className="eyebrow w-6 text-[9px]">{String(index + 1).padStart(2, "0")}</span><button onClick={() => toggleTask(task.id)} className={`grid size-9 shrink-0 place-items-center rounded-xl border transition ${task.completed ? "border-[#d8ff3e] bg-[#d8ff3e] text-black" : "border-white/12 text-transparent hover:border-[#d8ff3e]/50"}`} aria-label={task.completed ? "Mark as open" : "Mark as done"}><Check size={17} /></button><span className={`min-w-0 flex-1 text-sm font-semibold sm:text-base ${task.completed ? "text-[#65685f] line-through" : "text-[#e8e9e4]"}`}>{task.title}</span><button onClick={() => deleteTask(task.id)} className="grid size-9 place-items-center rounded-xl text-[#565950] transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100" aria-label="Delete task"><Trash2 size={16} /></button></div>)}
        {!visible.length && <div className="grid min-h-60 place-items-center p-8 text-center"><div><Target className="mx-auto mb-4 text-[#464941]" size={28} /><p className="font-semibold">Nothing here.</p><p className="mt-1 text-xs text-[#696c64]">Clear space is a feature, not a problem.</p></div></div>}
      </div>
    </section>
  </div>;
}
