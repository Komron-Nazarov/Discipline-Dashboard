"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, Trash2, WalletCards } from "lucide-react";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import { useFinance } from "@/hooks/useFinance";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useI18n } from "@/lib/i18n";

export default function FinancePage() {
  const { locale, t } = useI18n();
  const mounted = useIsMounted();
  const { transactions, addTransaction, deleteTransaction, balance } = useFinance();
  const [amount, setAmount] = useState(""); const [category, setCategory] = useState(""); const [type, setType] = useState<"income" | "expense">("income");
  if (!mounted) return <div className="min-h-[70vh]" />;
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const add = () => { const value = Number(amount); if (value > 0 && category.trim()) { addTransaction(type, value, category.trim()); setAmount(""); setCategory(""); } };

  return <div className="fade-up space-y-6">
    <header><p className="eyebrow mb-3 text-[#d8ff3e]">{t("finance.eyebrow")}</p><h1 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">{t("finance.title")}</h1><p className="mt-3 text-sm text-[#85877f]">{t("finance.subtitle")}</p></header>
    <section className="grid gap-4 sm:grid-cols-3"><div className="panel bg-[#d8ff3e]! p-5 text-black sm:col-span-1"><p className="eyebrow text-black/55">{t("finance.net")}</p><p className="mt-7 text-3xl font-black tracking-[-0.06em]">{balance.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} c</p></div><div className="panel p-5"><p className="eyebrow">{t("finance.in")}</p><p className="mt-7 text-3xl font-black text-emerald-400">+{income.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")}</p></div><div className="panel p-5"><p className="eyebrow">{t("finance.out")}</p><p className="mt-7 text-3xl font-black text-red-400">−{expense.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")}</p></div></section>
    <section className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
      <article className="panel min-w-0 p-5 sm:p-7"><p className="eyebrow">{t("finance.trajectory")}</p><h2 className="mt-2 text-xl font-bold">{t("finance.movement")}</h2><PerformanceChart transactions={transactions} balanceLabel={t("chart.balance")} locale={locale} /></article>
      <article className="panel p-5 sm:p-6"><p className="eyebrow">{t("finance.new")}</p><div className="mt-5 grid grid-cols-2 gap-3"><select className="field px-3 py-3" value={type} onChange={e => setType(e.target.value as "income" | "expense")}><option value="income">{t("finance.income")}</option><option value="expense">{t("finance.expense")}</option></select><input className="field px-3 py-3" type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder={t("finance.amount")} /><input className="field col-span-2 px-3 py-3" value={category} onChange={e => setCategory(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder={t("finance.category")} /><button onClick={add} className="acid-button col-span-2 py-3"><Plus size={18} />{t("finance.add")}</button></div></article>
    </section>
    <section className="panel overflow-hidden"><div className="border-b border-white/8 p-5 sm:p-6"><p className="eyebrow">{t("finance.ledger")}</p><h2 className="mt-2 text-xl font-bold">{t("finance.recent")}</h2></div><div className="divide-y divide-white/6">{transactions.slice().reverse().map(tx => <div key={tx.id} className="group flex items-center gap-4 p-4 sm:px-6"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>{tx.type === "income" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{tx.category}</p><p className="eyebrow mt-1 text-[9px]">{tx.type === "income" ? t("finance.income") : t("finance.expense")}</p></div><strong className={tx.type === "income" ? "text-emerald-400" : "text-red-400"}>{tx.type === "income" ? "+" : "−"}{tx.amount.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} c</strong><button onClick={() => deleteTransaction(tx.id)} className="grid size-9 place-items-center rounded-xl text-[#55584f] hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100" aria-label={t("actions.delete")}><Trash2 size={16} /></button></div>)}{!transactions.length && <div className="grid min-h-52 place-items-center text-center"><div><WalletCards className="mx-auto mb-3 text-[#464941]" /><p className="font-semibold">{t("finance.empty")}</p><p className="mt-1 text-xs text-[#696c64]">{t("finance.emptyText")}</p></div></div>}</div></section>
  </div>;
}
