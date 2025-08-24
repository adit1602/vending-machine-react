"use client";

import { useState, useEffect } from "react";
import { api } from "@/src/services/api";
import type { Product } from "@/src/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const updateProductStock = async (productId: number, newStock: number) => {
    try {
      await api.updateProduct(productId, { stock: newStock });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, stock: newStock } : product
        )
      );
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update product"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    updateProductStock,
  };
};
