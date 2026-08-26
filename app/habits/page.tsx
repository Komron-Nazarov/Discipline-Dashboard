"use client";

import { useState } from "react";
import { Check, Flame, Plus, Trash2 } from "lucide-react";
import { useHabits } from "@/hooks/useHabits";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function HabitsPage() {
  const mounted = useIsMounted();
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();
  const [text, setText] = useState("");
  if (!mounted) return <div className="min-h-[70vh]" />;
  const completed = habits.filter(h => h.completed).length;
  const add = () => { if (text.trim()) { addHabit(text.trim()); setText(""); } };

  return <div className="fade-up space-y-6">
    <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow mb-3 text-[#d8ff3e]">Identity protocol</p><h1 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">Build the proof.</h1><p className="mt-3 text-sm text-[#85877f]">Every repetition is a vote for who you become.</p></div><div className="rounded-2xl border border-white/8 px-5 py-3"><span className="eyebrow text-[9px]">Today</span><strong className="ml-4 text-xl">{completed}/{habits.length}</strong></div></header>
    <section className="panel p-4 sm:p-6"><div className="flex gap-2"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} className="field flex-1 px-4 py-3.5" placeholder="Add a non-negotiable" aria-label="New habit" /><button onClick={add} className="acid-button size-13 shrink-0" aria-label="Add habit"><Plus size={20} /></button></div></section>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map(habit => <article key={habit.id} className={`panel group relative overflow-hidden p-5 transition ${habit.completed ? "border-[#d8ff3e]/25 bg-[#d8ff3e]/6" : "hover:border-white/15"}`}><div className="flex items-start justify-between"><button onClick={() => toggleHabit(habit.id)} className={`grid size-11 place-items-center rounded-2xl transition ${habit.completed ? "bg-[#d8ff3e] text-black" : "bg-white/5 text-[#64675f] hover:text-[#d8ff3e]"}`} aria-label="Toggle habit"><Check size={20} /></button><button onClick={() => deleteHabit(habit.id)} className="grid size-9 place-items-center rounded-xl text-[#54574f] transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100" aria-label="Delete habit"><Trash2 size={16} /></button></div><h2 className={`mt-8 text-lg font-bold ${habit.completed ? "text-white" : "text-[#d6d8d0]"}`}>{habit.name}</h2><div className="mt-5 flex items-center justify-between border-t border-white/7 pt-4"><span className="eyebrow text-[9px]">Current streak</span><span className="flex items-center gap-1.5 text-sm font-black text-[#d8ff3e]"><Flame size={15} fill="currentColor" />{habit.streak} days</span></div></article>)}
      {!habits.length && <div className="panel col-span-full grid min-h-70 place-items-center border-dashed text-center"><div><Flame className="mx-auto mb-4 text-[#464941]" size={30} /><p className="font-semibold">No habits yet.</p><p className="mt-1 text-xs text-[#696c64]">Begin with something too small to fail.</p></div></div>}
    </section>
  </div>;
}
