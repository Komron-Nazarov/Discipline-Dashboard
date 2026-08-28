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
    <div className="fade-up space-y-6">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="eyebrow mb-3 text-[#d8ff3e]">{t("dashboard.eyebrow")}</p><h1 className="text-4xl font-black tracking-[-0.065em] sm:text-6xl">{t("dashboard.title")}</h1><p className="mt-3 max-w-xl text-sm text-[#85877f] sm:text-base">{t("dashboard.subtitle")}</p></div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d8ff3e] opacity-40" /><span className="relative size-2 rounded-full bg-[#d8ff3e]" /></span><div><p className="eyebrow text-[9px]">{t("dashboard.today")}</p><p className="text-sm font-semibold">{t("dashboard.active")}</p></div></div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card title={t("dashboard.execution")} value={`${completedTasks}/${tasks.length}`} detail={t("dashboard.tasksDone")} icon={CheckSquare2} accent />
        <Card title={t("dashboard.consistency")} value={`${completedHabits}/${habits.length}`} detail={t("dashboard.habitsDone")} icon={Repeat2} />
        <Card title={t("dashboard.bestStreak")} value={`${maxStreak}${locale === "ru" ? "д" : "d"}`} detail={t("dashboard.keepChain")} icon={Flame} />
        <Card title={t("dashboard.net")} value={`${balance.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} c`} detail={t("dashboard.transactions", { count: transactions.length })} icon={Landmark} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_.75fr]">
        <article className="panel min-w-0 overflow-hidden p-5 sm:p-7">
          <div className="mb-2 flex items-start justify-between"><div><p className="eyebrow">{t("dashboard.momentum")}</p><h2 className="mt-2 text-xl font-bold">{t("dashboard.trajectory")}</h2></div><Link href="/finance" className="grid size-10 place-items-center rounded-xl border border-white/8 text-[#85877f] transition hover:border-[#d8ff3e]/40 hover:text-[#d8ff3e]" aria-label={t("nav.finance")}><ArrowUpRight size={18} /></Link></div>
          <PerformanceChart transactions={transactions} balanceLabel={t("chart.balance")} locale={locale} />
          {!transactions.length && <p className="text-center text-[11px] text-[#5f625a]">{t("dashboard.preview")}</p>}
        </article>
        <article className="panel flex min-h-80 flex-col p-6">
          <div className="flex items-start justify-between"><div><p className="eyebrow">{t("dashboard.score")}</p><h2 className="mt-2 text-xl font-bold">{t("dashboard.rate")}</h2></div><span className="rounded-full bg-[#d8ff3e]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d8ff3e]">{t("dashboard.live")}</span></div>
          <div className="grid flex-1 place-items-center py-7"><div className="relative grid size-40 place-items-center rounded-full" style={{ background: `conic-gradient(#d8ff3e ${score * 3.6}deg, #22241f 0deg)` }}><div className="grid size-31 place-items-center rounded-full bg-[#10110f] text-center"><div><strong className="block text-4xl font-black tracking-[-0.07em]">{score}%</strong><span className="eyebrow text-[9px]">{t("dashboard.completed")}</span></div></div></div></div>
          <p className="text-center text-xs text-[#85877f]">{score >= 80 ? t("dashboard.scoreHigh") : score > 0 ? t("dashboard.scoreMid") : t("dashboard.scoreZero")}</p>
        </article>
      </section>

      <section className="panel p-5 sm:p-7">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow">{t("dashboard.protocol")}</p><h2 className="mt-2 text-xl font-bold">{t("dashboard.nonNegotiables")}</h2></div><Link href="/habits" className="text-xs font-bold text-[#d8ff3e] hover:underline">{t("dashboard.viewAll")}</Link></div>
        <div className="mb-5 flex gap-2"><input className="field flex-1 px-4 py-3" value={newHabit} onChange={(event) => setNewHabit(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleAdd()} placeholder={t("dashboard.addHabit")} aria-label={t("dashboard.addHabit")} /><button className="acid-button size-12 shrink-0" onClick={handleAdd} aria-label={t("actions.add")}><Plus size={19} /></button></div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {habits.slice(0, 6).map((habit) => <button key={habit.id} onClick={() => toggleHabit(habit.id)} className={`flex min-h-20 items-center gap-4 rounded-2xl border p-4 text-left transition ${habit.completed ? "border-[#d8ff3e]/25 bg-[#d8ff3e]/8" : "border-white/8 bg-white/[0.02] hover:border-white/15"}`}><span className={`grid size-9 shrink-0 place-items-center rounded-xl ${habit.completed ? "bg-[#d8ff3e] text-black" : "bg-white/5 text-[#65685f]"}`}><Check size={17} /></span><span className="min-w-0"><span className="block truncate text-sm font-semibold">{habit.name}</span><span className="eyebrow mt-1 block text-[9px]">{t("dashboard.streak", { count: habit.streak })}</span></span></button>)}
          {!habits.length && <div className="col-span-full rounded-2xl border border-dashed border-white/10 px-5 py-9 text-center"><p className="text-sm font-semibold">{t("dashboard.emptyTitle")}</p><p className="mt-1 text-xs text-[#6d7068]">{t("dashboard.emptyText")}</p></div>}
        </div>
      </section>
    </div>
  );
}
