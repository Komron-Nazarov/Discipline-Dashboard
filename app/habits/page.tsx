"use client";

import { useState } from "react";
import { Check, Flame, Plus, Trash2 } from "lucide-react";
import { useHabits } from "@/hooks/useHabits";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useI18n } from "@/lib/i18n";

export default function HabitsPage() {
  const { t } = useI18n();
  const mounted = useIsMounted();
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();
  const [text, setText] = useState("");
  if (!mounted) return <div className="min-h-[70vh]" />;
  const completed = habits.filter(h => h.completed).length;
  const add = () => { if (text.trim()) { addHabit(text.trim()); setText(""); } };

  return <div className="fade-up space-y-5">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2.5 text-[#d8ff3e]">{t("habits.eyebrow")}</p><h1 className="text-[34px] font-black leading-none tracking-[-0.06em] sm:text-5xl">{t("habits.title")}</h1><p className="mt-2.5 text-[13px] text-[#85877f] sm:text-sm">{t("habits.subtitle")}</p></div><div className="rounded-2xl border border-white/8 px-4 py-2.5"><span className="eyebrow text-[8px]">{t("habits.today")}</span><strong className="ml-3 text-lg">{completed}/{habits.length}</strong></div></header>
    <section className="panel p-3.5 sm:p-5"><div className="flex gap-2"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} className="field flex-1 px-3.5 py-2.5 text-[13px]" placeholder={t("habits.placeholder")} aria-label={t("habits.placeholder")} /><button onClick={add} className="acid-button size-10.5 shrink-0" aria-label={t("actions.add")}><Plus size={17} /></button></div></section>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map(habit => <article key={habit.id} className={`panel group relative overflow-hidden p-4.5 transition ${habit.completed ? "border-[#d8ff3e]/25 bg-[#d8ff3e]/6" : "hover:border-white/15"}`}><div className="flex items-start justify-between"><button onClick={() => toggleHabit(habit.id)} className={`grid size-9 place-items-center rounded-xl transition ${habit.completed ? "bg-[#d8ff3e] text-black" : "bg-white/5 text-[#64675f] hover:text-[#d8ff3e]"}`} aria-label={t("actions.toggle")}><Check size={17} /></button><button onClick={() => deleteHabit(habit.id)} className="grid size-8 place-items-center rounded-lg text-[#54574f] transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100" aria-label={t("actions.delete")}><Trash2 size={14} /></button></div><h2 className={`mt-6 text-base font-bold ${habit.completed ? "text-white" : "text-[#d6d8d0]"}`}>{habit.name}</h2><div className="mt-4 flex items-center justify-between border-t border-white/7 pt-3.5"><span className="eyebrow text-[8px]">{t("habits.currentStreak")}</span><span className="flex items-center gap-1.5 text-[13px] font-black text-[#d8ff3e]"><Flame size={14} fill="currentColor" />{t("habits.days", { count: habit.streak })}</span></div></article>)}
      {!habits.length && <div className="panel col-span-full grid min-h-70 place-items-center border-dashed text-center"><div><Flame className="mx-auto mb-4 text-[#464941]" size={30} /><p className="font-semibold">{t("habits.empty")}</p><p className="mt-1 text-xs text-[#696c64]">{t("habits.emptyText")}</p></div></div>}
    </section>
  </div>;
}
