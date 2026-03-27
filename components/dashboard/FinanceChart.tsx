"use client"

import { Transaction } from "@/types/finance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
    transactions: Transaction[];
};

export default function FinanceChart({transactions}: Props){
    
    //преоброзование данных

    const data = transactions.map((tx, index)=> ({
        name: index + 1,
        balance:
        tx.type === "income" ? tx.amount : -tx.amount,
    }));
    return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl h-75">
      <h2 className="text-lg font-semibold mb-4">
        Finance Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#a855f7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

}