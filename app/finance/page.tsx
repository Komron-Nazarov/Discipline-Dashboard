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
      <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6">
        <p className="text-gray-400 text-sm">Balance</p>
        <h2 className="text-2xl font-bold">
          ${balance}
        </h2>
      </div>

      {/* ➕ Добавление */}
      <div className="flex gap-2 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="bg-[#1a1a1a] p-3 rounded-xl"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          className="p-3 rounded-xl bg-[#1a1a1a] outline-none w-32"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="flex-1 p-3 rounded-xl bg-[#1a1a1a] outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-600 px-4 rounded-xl hover:bg-purple-700 transition"
        >
          Add
        </button>
      </div>

      {/* 📋 Список */}
      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#222] transition group"
          >
            <div>
              <p className="font-medium">{tx.category}</p>
              <p className="text-gray-500 text-sm">{tx.type}</p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-bold ${
                  tx.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}${tx.amount}
              </span>

              <button
                onClick={() => deleteTransaction(tx.id)}
                className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
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