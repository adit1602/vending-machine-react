"use client";

import type React from "react";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionSummary } from "@/components/TransactionSummary";
import { TransactionNotification } from "@/components/TransactionNotification";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import { RefreshCw, Download } from "lucide-react";
import { useState } from "react";

export const HistoryPage: React.FC = () => {
  const { transactions, loading, error, refetch } = useTransactions();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleExport = () => {
    if (transactions.length === 0) return;

    const csvContent = [
      ["No", "Product Name", "Price", "Date"],
      ...transactions.map((transaction, index) => [
        index + 1,
        transaction.productName,
        transaction.price,
        new Date(transaction.date).toLocaleString("id-ID"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vending-machine-transactions-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Transaction History
          </h1>
        </div>
        <TransactionNotification
          notification={{ type: "error", message: error }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Transaction History
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            disabled={transactions.length === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {!loading && transactions.length > 0 && (
        <TransactionSummary transactions={transactions} />
      )}

      {/* Transaction Table */}
      <TransactionTable transactions={transactions} loading={loading} />
    </div>
  );
};
