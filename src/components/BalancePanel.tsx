"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currency";
import { Coins, Banknote, RotateCcw } from "lucide-react";

interface BalancePanelProps {
  balance: number;
  onAddMoney: (amount: number) => void;
  onResetBalance: () => void;
  disabled?: boolean;
}

const MONEY_DENOMINATIONS = [
  { value: 2000, color: "bg-gray-100 hover:bg-gray-200 border-gray-300" },
  { value: 5000, color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
  { value: 10000, color: "bg-green-100 hover:bg-green-200 border-green-300" },
  {
    value: 20000,
    color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
  },
  { value: 50000, color: "bg-red-100 hover:bg-red-200 border-red-300" },
];

export const BalancePanel: React.FC<BalancePanelProps> = ({
  balance,
  onAddMoney,
  onResetBalance,
  disabled = false,
}) => {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-green-600" />
            <span>Insert Money</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg px-4 py-2 bg-white">
              <Banknote className="h-4 w-4 mr-2" />
              {formatCurrency(balance)}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Money Denomination Buttons */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Select denomination:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {MONEY_DENOMINATIONS.map(({ value, color }) => (
              <Button
                key={value}
                onClick={() => onAddMoney(value)}
                variant="outline"
                className={`h-20 text-base font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${color}`}
                disabled={disabled}
              >
                <div className="flex flex-col items-center gap-1">
                  <Banknote className="h-5 w-5" />
                  <span>{formatCurrency(value)}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Balance Display and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Current Balance:</div>
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                balance > 0 ? "text-green-600" : "text-gray-400"
              }`}
            >
              {formatCurrency(balance)}
            </div>
          </div>

          <Button
            onClick={onResetBalance}
            variant="secondary"
            disabled={balance === 0 || disabled}
            className="flex items-center gap-2 px-6 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            <RotateCcw className="h-4 w-4" />
            Return Money
          </Button>
        </div>

        {/* Quick Add Options */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={() => onAddMoney(15000)}
            variant="ghost"
            size="sm"
            disabled={disabled}
            className="text-xs hover:bg-blue-50"
          >
            + {formatCurrency(15000)}
          </Button>
          <Button
            onClick={() => onAddMoney(25000)}
            variant="ghost"
            size="sm"
            disabled={disabled}
            className="text-xs hover:bg-blue-50"
          >
            + {formatCurrency(25000)}
          </Button>
          <Button
            onClick={() => onAddMoney(100000)}
            variant="ghost"
            size="sm"
            disabled={disabled}
            className="text-xs hover:bg-blue-50"
          >
            + {formatCurrency(100000)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
