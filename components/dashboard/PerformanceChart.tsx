"use client";

import type { Transaction } from "@/types/finance";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function PerformanceChart({ transactions, balanceLabel = "Balance", locale = "en" }: { transactions: Transaction[]; balanceLabel?: string; locale?: "ru" | "en" }) {
  const source = transactions.length ? transactions.slice(-8) : [
    { id: "1", type: "income" as const, amount: 1200, category: "Start" },
    { id: "2", type: "expense" as const, amount: 180, category: "Food" },
    { id: "3", type: "income" as const, amount: 450, category: "Project" },
    { id: "4", type: "expense" as const, amount: 240, category: "Life" },
    { id: "5", type: "income" as const, amount: 600, category: "Work" },
  ];
  const data = source.reduce<{ step: string; balance: number }[]>((points, tx, index) => {
    const previous = points.at(-1)?.balance ?? 0;
    const balance = previous + (tx.type === "income" ? tx.amount : -tx.amount);
    return [...points, { step: String(index + 1).padStart(2, "0"), balance }];
  }, []);

  return (
    <div className="h-52 w-full sm:h-56">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 640, height: 256 }}>
        <AreaChart data={data} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
          <defs><linearGradient id="acidFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8ff3e" stopOpacity={0.25} /><stop offset="100%" stopColor="#d8ff3e" stopOpacity={0} /></linearGradient></defs>
          <XAxis dataKey="step" axisLine={false} tickLine={false} tick={{ fill: "#60635b", fontSize: 10 }} dy={10} />
          <Tooltip contentStyle={{ background: "#11120f", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, fontSize: 12 }} labelStyle={{ color: "#85877f" }} formatter={(value) => [`${Number(value).toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} c`, balanceLabel]} />
          <Area type="monotone" dataKey="balance" stroke="#d8ff3e" strokeWidth={2.5} fill="url(#acidFill)" dot={false} activeDot={{ r: 4, fill: "#d8ff3e", stroke: "#11120f", strokeWidth: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
