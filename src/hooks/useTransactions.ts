"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import type { Transaction } from "@/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTransactions();
      // Sort transactions by date (newest first)
      const sortedTransactions = data.sort(
        (a: Transaction, b: Transaction) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setTransactions(sortedTransactions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  const getTotalSpent = () => {
    return transactions.reduce(
      (total, transaction) => total + transaction.price,
      0
    );
  };

  const getTransactionCount = () => {
    return transactions.length;
  };

  const getTransactionsByDateRange = (startDate: Date, endDate: Date) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    getTotalSpent,
    getTransactionCount,
    getTransactionsByDateRange,
  };
};
