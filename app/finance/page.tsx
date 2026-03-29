"use client";

import { useState } from "react";
import { useFinance } from "@/hooks/useFinance";

export default function FinancePage() {
  const { transactions, addTransaction, deleteTransaction, balance } =
    useFinance();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  const handleAdd = () => {
    if (!amount.trim() || !category.trim()) return;

    addTransaction(type, Number(amount), category);
    setAmount("");
    setCategory("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Finance</h1>

      {/* 💰 Баланс */}
      {/* <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6">
        <p className="text-gray-400 text-sm">Balance</p>
        <h2 className="text-2xl font-bold">
          ${balance}
        </h2>
      </div> */}

      <div className="bg-linear-to-br from-purple-600/20 to-[#1a1a1a] p-6 rounded-3xl mb-8 border border-white/5 shadow-2xl">
  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Balance</p>
  <h2 className="text-4xl font-black text-white">
    ${balance.toLocaleString()}
  </h2>
</div>

      {/* ➕ Добавление */}
      <div className="grid grid-cols-2 gap-3 mb-8 bg-[#1a1a1a] p-3 rounded-2xl border border-white/5">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="bg-[#222] p-3 rounded-xl text-base outline-none border border-white/5 col-span-1"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="p-3 rounded-xl bg-[#222] outline-none text-base border border-white/5 col-span-1"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="p-3 rounded-xl bg-[#222] outline-none text-base border border-white/5 col-span-2"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-600 py-3 rounded-xl hover:bg-purple-700 active:scale-95 transition-all font-bold col-span-2 text-white"
        >
          Add
        </button>
      </div>

      {/* 📋 Список */}
      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          // <div
          //   key={tx.id}
          //   className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition group"
          // >
          //   <div>
          //     <p className="font-medium">{tx.category}</p>
          //     <p className="text-gray-500 text-sm">{tx.type}</p>
          //   </div>

          //   <div className="flex items-center gap-4">
          //     <span
          //       className={`font-bold ${
          //         tx.type === "income"
          //           ? "text-green-400"
          //           : "text-red-400"
          //       }`}
          //     >
          //       {tx.type === "income" ? "+" : "-"}${tx.amount}
          //     </span>

          //     <button
          //       onClick={() => deleteTransaction(tx.id)}
          //       className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
          //     >
          //       ✕
          //     </button>
          //   </div>
          // </div>

<div
  key={tx.id}
  className="flex justify-between items-center bg-[#161616] p-4 rounded-2xl border border-white/5 active:bg-[#1c1c1c] transition-all group min-h-[72px]"
>
  <div className="flex items-center gap-3 min-w-0">
    {/* Кружок с иконкой */}
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
      tx.type === "income" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
    }`}>
      {tx.type === "income" ? "↑" : "↓"}
    </div>
    
    <div className="min-w-0">
      <p className="font-semibold text-gray-200 truncate leading-tight">{tx.category}</p>
      <p className="text-gray-500 text-[10px] uppercase tracking-wider">{tx.type === "income" ? "INCOME" : "EXPENSE"}</p>
    </div>
  </div>

  <div className="flex items-center gap-3">
    <span className={`font-bold text-lg ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}>
      {tx.type === "income" ? "+" : "-"}${tx.amount}
    </span>

    <button
      onClick={() => deleteTransaction(tx.id)}
      className="p-2 text-gray-700 active:text-red-500 transition-colors"
      aria-label="Удалить"
    >
      ✕
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}