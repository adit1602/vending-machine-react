"use client";

import { useState } from "react";
import { api } from "@/services/api";
import type { Product, Transaction } from "@/types";

export const useVendingMachine = () => {
  const [balance, setBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const addMoney = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const resetBalance = () => {
    setBalance(0);
  };

  const purchaseProduct = async (
    product: Product,
    onStockUpdate: (productId: number, newStock: number) => Promise<void>
  ): Promise<{ success: boolean; message: string; change?: number }> => {
    setIsProcessing(true);

    try {
      // Validation: insufficient balance
      if (balance < product.price) {
        return {
          success: false,
          message: `Saldo tidak cukup! Anda membutuhkan ${new Intl.NumberFormat(
            "id-ID",
            {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }
          ).format(product.price - balance)} lagi.`,
        };
      }

      // Validation: out of stock
      if (product.stock <= 0) {
        return {
          success: false,
          message: "Produk habis!",
        };
      }

      // Update product stock
      const newStock = product.stock - 1;
      await onStockUpdate(product.id, newStock);

      // Create transaction
      const transaction: Omit<Transaction, "id"> = {
        productName: product.name,
        price: product.price,
        date: new Date().toISOString(),
      };

      await api.createTransaction(transaction);

      // Calculate change and reset balance
      const change = balance - product.price;
      setBalance(0);

      return {
        success: true,
        message: `Pembelian berhasil! ${
          change > 0
            ? `Kembalian: ${new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(change)}`
            : ""
        }`,
        change,
      };
    } catch (error) {
      return {
        success: false,
        message: "Terjadi kesalahan saat memproses pembelian.",
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    balance,
    isProcessing,
    addMoney,
    resetBalance,
    purchaseProduct,
  };
};
