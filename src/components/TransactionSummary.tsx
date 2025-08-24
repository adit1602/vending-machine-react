"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "src/utils/currency";
import { TrendingUp, ShoppingCart, Calendar, DollarSign } from "lucide-react";
import type { Transaction } from "src/types";

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  transactions,
}) => {
  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.price,
    0
  );
  const totalTransactions = transactions.length;

  // Get today's transactions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    transactionDate.setHours(0, 0, 0, 0);
    return transactionDate.getTime() === today.getTime();
  });

  const todaySpent = todayTransactions.reduce(
    (sum, transaction) => sum + transaction.price,
    0
  );

  // Get most purchased product
  const productCounts = transactions.reduce((acc, transaction) => {
    acc[transaction.productName] = (acc[transaction.productName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPurchased = Object.entries(productCounts).sort(
    ([, a], [, b]) => b - a
  )[0];

  const summaryCards = [
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Transactions",
      value: totalTransactions.toString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Today's Spending",
      value: formatCurrency(todaySpent),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Most Purchased",
      value: mostPurchased
        ? `${mostPurchased[0]} (${mostPurchased[1]}x)`
        : "None",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
