import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must not exceed 50 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(1000, "Price must be at least Rp 1,000")
    .max(1000000, "Price must not exceed Rp 1,000,000"),
  stock: yup
    .number()
    .required("Stock is required")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(999, "Stock must not exceed 999"),
  image: yup
    .string()
    .required("Image URL is required")
    .url("Please enter a valid URL")
    .matches(
      /\.(jpg|jpeg|png|gif|webp)$/i,
      "Image must be a valid image file (jpg, jpeg, png, gif, webp)"
    ),
});

export type ProductFormData = yup.InferType<typeof productSchema>;
