"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, CheckSquare2, Flame, Landmark, Plus, Repeat2 } from "lucide-react";
import Link from "next/link";
import Card from "./Card";
import PerformanceChart from "./PerformanceChart";
import { useFinance } from "@/hooks/useFinance";
import { useHabits } from "@/hooks/useHabits";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTasks } from "@/hooks/useTasks";
import { useI18n } from "@/lib/i18n";

export default function Dashboard() {
  const { locale, t } = useI18n();
  const mounted = useIsMounted();
  const { tasks } = useTasks();
  const { balance, transactions } = useFinance();
  const { habits, addHabit, toggleHabit } = useHabits();
  const [newHabit, setNewHabit] = useState("");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completedHabits = habits.filter((habit) => habit.completed).length;
  const maxStreak = habits.length ? Math.max(...habits.map((habit) => habit.streak)) : 0;
  const score = useMemo(() => {
    const total = tasks.length + habits.length;
    return total ? Math.round(((completedTasks + completedHabits) / total) * 100) : 0;
  }, [completedHabits, completedTasks, habits.length, tasks.length]);

  if (!mounted) return <div className="min-h-[70vh]" />;
  const handleAdd = () => { if (newHabit.trim()) { addHabit(newHabit.trim()); setNewHabit(""); } };

  return (
    <div className="fade-up space-y-5">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow mb-2.5 text-[#d8ff3e]">{t("dashboard.eyebrow")}</p><h1 className="text-[34px] font-black leading-none tracking-[-0.06em] sm:text-5xl">{t("dashboard.title")}</h1><p className="mt-2.5 max-w-xl text-[13px] leading-5 text-[#85877f] sm:text-sm">{t("dashboard.subtitle")}</p></div>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.025] px-3.5 py-2.5"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d8ff3e] opacity-40" /><span className="relative size-2 rounded-full bg-[#d8ff3e]" /></span><div><p className="eyebrow text-[8px]">{t("dashboard.today")}</p><p className="text-[13px] font-semibold">{t("dashboard.active")}</p></div></div>
      </header>

      <section className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <Card title={t("dashboard.execution")} value={`${completedTasks}/${tasks.length}`} detail={t("dashboard.tasksDone")} icon={CheckSquare2} accent />
        <Card title={t("dashboard.consistency")} value={`${completedHabits}/${habits.length}`} detail={t("dashboard.habitsDone")} icon={Repeat2} />
        <Card title={t("dashboard.bestStreak")} value={`${maxStreak}${locale === "ru" ? "д" : "d"}`} detail={t("dashboard.keepChain")} icon={Flame} />
        <Card title={t("dashboard.net")} value={`${balance.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} c`} detail={t("dashboard.transactions", { count: transactions.length })} icon={Landmark} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
        <article className="panel min-w-0 overflow-hidden p-4.5 sm:p-6">
          <div className="mb-1 flex items-start justify-between"><div><p className="eyebrow">{t("dashboard.momentum")}</p><h2 className="mt-1.5 text-lg font-bold">{t("dashboard.trajectory")}</h2></div><Link href="/finance" className="grid size-9 place-items-center rounded-xl border border-white/8 text-[#85877f] transition hover:border-[#d8ff3e]/40 hover:text-[#d8ff3e]" aria-label={t("nav.finance")}><ArrowUpRight size={16} /></Link></div>
          <PerformanceChart transactions={transactions} balanceLabel={t("chart.balance")} emptyLabel={t("dashboard.preview")} locale={locale} />
        </article>
        <article className="panel flex min-h-72 flex-col p-5">
          <div className="flex items-start justify-between"><div><p className="eyebrow">{t("dashboard.score")}</p><h2 className="mt-1.5 text-lg font-bold">{t("dashboard.rate")}</h2></div><span className="rounded-full bg-[#d8ff3e]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#d8ff3e]">{t("dashboard.live")}</span></div>
          <div className="grid flex-1 place-items-center py-5"><div className="relative grid size-36 place-items-center rounded-full" style={{ background: `conic-gradient(#d8ff3e ${score * 3.6}deg, #22241f 0deg)` }}><div className="grid size-28 place-items-center rounded-full bg-[#10110f] text-center"><div><strong className="block text-[34px] font-black tracking-[-0.07em]">{score}%</strong><span className="eyebrow text-[8px]">{t("dashboard.completed")}</span></div></div></div></div>
          <p className="text-center text-[11px] text-[#85877f]">{score >= 80 ? t("dashboard.scoreHigh") : score > 0 ? t("dashboard.scoreMid") : t("dashboard.scoreZero")}</p>
        </article>
      </section>

      <section className="panel p-4.5 sm:p-6">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">{t("dashboard.protocol")}</p><h2 className="mt-1.5 text-lg font-bold">{t("dashboard.nonNegotiables")}</h2></div><Link href="/habits" className="text-[11px] font-bold text-[#d8ff3e] hover:underline">{t("dashboard.viewAll")}</Link></div>
        <div className="mb-4 flex gap-2"><input className="field flex-1 px-3.5 py-2.5 text-[13px]" value={newHabit} onChange={(event) => setNewHabit(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleAdd()} placeholder={t("dashboard.addHabit")} aria-label={t("dashboard.addHabit")} /><button className="acid-button size-10.5 shrink-0" onClick={handleAdd} aria-label={t("actions.add")}><Plus size={17} /></button></div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {habits.slice(0, 6).map((habit) => <button key={habit.id} onClick={() => toggleHabit(habit.id)} className={`flex min-h-17 items-center gap-3 rounded-2xl border p-3.5 text-left transition ${habit.completed ? "border-[#d8ff3e]/25 bg-[#d8ff3e]/8" : "border-white/8 bg-white/[0.02] hover:border-white/15"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-lg ${habit.completed ? "bg-[#d8ff3e] text-black" : "bg-white/5 text-[#65685f]"}`}><Check size={15} /></span><span className="min-w-0"><span className="block truncate text-[13px] font-semibold">{habit.name}</span><span className="eyebrow mt-1 block text-[8px]">{t("dashboard.streak", { count: habit.streak })}</span></span></button>)}
          {!habits.length && <div className="col-span-full rounded-2xl border border-dashed border-white/10 px-5 py-9 text-center"><p className="text-sm font-semibold">{t("dashboard.emptyTitle")}</p><p className="mt-1 text-xs text-[#6d7068]">{t("dashboard.emptyText")}</p></div>}
        </div>
      </section>
    </div>
  );
}
