"use client"

import { useEffect, useState } from "react";
import { Transaction } from "@/types/finance";

export function useFinance(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    //loading

//    useEffect(() => {
//   try {
//     const data = localStorage.getItem("finance");
//     if (data) {
//       setTransactions(JSON.parse(data));
//     }
//   } catch (error) {
//     console.error("Failed to load finance data", error);
//   }
// }, []);

useEffect(() => {
  const data = localStorage.getItem("finance");
  if (data) {
    setTimeout(() => {
      setTransactions(JSON.parse(data) as Transaction[]);
    });
  }
}, []);

    //saving

    useEffect(()=>{
        localStorage.setItem("finance", JSON.stringify(transactions));
    }, [transactions]);

    //adding

    const addTransaction = (
        type: "income" | "expense",
        amount: number,
        category: string
    ) => {
        const newTx: Transaction = {
            id: Date.now().toString(),
            type,
            amount,
            category,
        };

        setTransactions((prev)=>[...prev, newTx]);
    };

    //deleting

    const deleteTransaction = (id: string) => {
      setTransactions((prev)=>prev.filter((tx)=> tx.id !== id));
    };


    //balance

    const balance = transactions.reduce((acc: number, tx)=>{
          return tx.type === "income"
        ? acc + tx.amount
        : acc - tx.amount;
    }, 0);

    return{
        transactions,
        addTransaction,
        deleteTransaction,
        balance,
    };
}