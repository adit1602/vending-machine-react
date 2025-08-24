"use client";

import type React from "react";
import { ProductCard } from "src/components/ProductCard";
import { BalancePanel } from "src/components/BalancePanel";
import { TransactionNotification } from "src/components/TransactionNotification";
import { useProducts } from "src/hooks/useProducts";
import { useVendingMachine } from "src/hooks/useVendingMachine";
import { useState } from "react";
import type { Product } from "src/types";

export const HomePage: React.FC = () => {
  const { products, loading, error, updateProductStock } = useProducts();
  const { balance, isProcessing, addMoney, resetBalance, purchaseProduct } =
    useVendingMachine();
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handlePurchase = async (product: Product) => {
    const result = await purchaseProduct(product, updateProductStock);

    setNotification({
      type: result.success ? "success" : "error",
      message: result.message,
    });

    // Clear notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddMoney = (amount: number) => {
    addMoney(amount);
    // Show info notification for money added
    setNotification({
      type: "info",
      message: `Added ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount)} to balance`,
    });

    // Clear notification after 2 seconds for money additions
    setTimeout(() => setNotification(null), 2000);
  };

  const handleResetBalance = () => {
    if (balance > 0) {
      setNotification({
        type: "info",
        message: `Returned ${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(balance)}`,
      });
      setTimeout(() => setNotification(null), 3000);
    }
    resetBalance();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <TransactionNotification
          notification={{
            type: "error",
            message: `Error loading products: ${error}`,
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notification */}
      <TransactionNotification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Products Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handlePurchase}
              disabled={isProcessing}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Money Panel */}
      <BalancePanel
        balance={balance}
        onAddMoney={handleAddMoney}
        onResetBalance={handleResetBalance}
        disabled={isProcessing}
      />
    </div>
  );
};
