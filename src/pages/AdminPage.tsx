"use client";

import type React from "react";
import { useState } from "react";
import { ProductForm } from "src/components/ProductForm";
import { ProductManagementTable } from "src/components/ProductManagementTable";
import { TransactionNotification } from "src/components/TransactionNotification";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "src/hooks/useProducts";
import { api } from "src/services/api";
import type { Product } from "src/types";
import type { ProductFormData } from "src/schemas/productSchema";

type AdminMode = "table" | "add" | "edit";

export const AdminPage: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const [mode, setMode] = useState<AdminMode>("table");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const showNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setMode("add");
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setMode("edit");
  };

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;

    try {
      setIsSubmitting(true);
      await api.deleteProduct(deleteProduct.id);
      await refetch();
      showNotification(
        "success",
        `Product "${deleteProduct.name}" deleted successfully`
      );
      setDeleteProduct(null);
    } catch (error) {
      showNotification("error", "Failed to delete product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      if (mode === "add") {
        await api.createProduct(data);
        showNotification(
          "success",
          `Product "${data.name}" added successfully`
        );
      } else if (mode === "edit" && selectedProduct) {
        await api.updateProduct(selectedProduct.id, data);
        showNotification(
          "success",
          `Product "${data.name}" updated successfully`
        );
      }

      await refetch();
      setMode("table");
      setSelectedProduct(null);
    } catch (error) {
      showNotification(
        "error",
        `Failed to ${mode === "add" ? "add" : "update"} product`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setMode("table");
    setSelectedProduct(null);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        {mode !== "table" && (
          <Button onClick={handleCancel} variant="outline">
            Back to Products
          </Button>
        )}
      </div>

      {/* Notification */}
      <TransactionNotification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Content */}
      {mode === "table" ? (
        <ProductManagementTable
          products={products}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      ) : (
        <ProductForm
          product={selectedProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteProduct}
        onOpenChange={() => setDeleteProduct(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteProduct?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteProduct(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
