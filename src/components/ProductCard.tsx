"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "src/utils/currency";
import type { Product } from "src/types";

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  disabled?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onBuy,
  disabled = false,
}) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4 flex-1">
        <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Stock:</span>
            <Badge variant={isOutOfStock ? "destructive" : "secondary"}>
              {product.stock} pcs
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onBuy(product)}
          disabled={disabled || isOutOfStock}
          className="w-full"
          variant={isOutOfStock ? "secondary" : "default"}
        >
          {isOutOfStock ? "Habis" : "Beli"}
        </Button>
      </CardFooter>
    </Card>
  );
};
