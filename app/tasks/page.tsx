"use client";

import { useState } from "react";
import { Check, Plus, Target, Trash2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTasks } from "@/hooks/useTasks";
import { useI18n } from "@/lib/i18n";

export default function TasksPage() {
  const { t } = useI18n();
  const mounted = useIsMounted();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");
  if (!mounted) return <div className="min-h-[70vh]" />;
  const visible = tasks.filter((task) => filter === "all" || (filter === "done" ? task.completed : !task.completed));
  const add = () => { if (title.trim()) { addTask(title.trim()); setTitle(""); } };

  return <div className="fade-up space-y-5">
    <header><p className="eyebrow mb-2.5 text-[#d8ff3e]">{t("tasks.eyebrow")}</p><h1 className="text-[34px] font-black leading-none tracking-[-0.06em] sm:text-5xl">{t("tasks.title")}</h1><p className="mt-2.5 text-[13px] text-[#85877f] sm:text-sm">{t("tasks.subtitle")}</p></header>
    <section className="panel p-3.5 sm:p-5"><div className="flex gap-2"><input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} className="field flex-1 px-3.5 py-2.5 text-[13px]" placeholder={t("tasks.placeholder")} aria-label={t("tasks.placeholder")} /><button onClick={add} className="acid-button size-10.5 shrink-0" aria-label={t("actions.add")}><Plus size={17} /></button></div></section>
    <section className="panel overflow-hidden">
      <div className="flex flex-col justify-between gap-3 border-b border-white/8 p-4.5 sm:flex-row sm:items-center sm:p-5"><div><p className="eyebrow">{t("tasks.list")}</p><p className="mt-1.5 text-[13px] font-semibold">{t("tasks.progress", { done: tasks.filter(task => task.completed).length, total: tasks.length })}</p></div><div className="flex rounded-xl bg-black/30 p-1">{(["all", "open", "done"] as const).map(item => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${filter === item ? "bg-white text-black" : "text-[#74776f] hover:text-white"}`}>{t(`tasks.${item}` as "tasks.all")}</button>)}</div></div>
      <div className="divide-y divide-white/6">
        {visible.map((task, index) => <div key={task.id} className="group flex items-center gap-3 p-3.5 transition hover:bg-white/[0.025] sm:px-5"><span className="eyebrow w-5 text-[8px]">{String(index + 1).padStart(2, "0")}</span><button onClick={() => toggleTask(task.id)} className={`grid size-8 shrink-0 place-items-center rounded-lg border transition ${task.completed ? "border-[#d8ff3e] bg-[#d8ff3e] text-black" : "border-white/12 text-transparent hover:border-[#d8ff3e]/50"}`} aria-label={t("actions.toggle")}><Check size={15} /></button><span className={`min-w-0 flex-1 text-[13px] font-semibold sm:text-sm ${task.completed ? "text-[#65685f] line-through" : "text-[#e8e9e4]"}`}>{task.title}</span><button onClick={() => deleteTask(task.id)} className="grid size-8 place-items-center rounded-lg text-[#565950] transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100" aria-label={t("actions.delete")}><Trash2 size={14} /></button></div>)}
        {!visible.length && <div className="grid min-h-60 place-items-center p-8 text-center"><div><Target className="mx-auto mb-4 text-[#464941]" size={28} /><p className="font-semibold">{t("tasks.empty")}</p><p className="mt-1 text-xs text-[#696c64]">{t("tasks.emptyText")}</p></div></div>}
      </div>
    </section>
  </div>;
}
