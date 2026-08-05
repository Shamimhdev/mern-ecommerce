import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  shortDescription: z
    .string()
    .trim()
    .max(300, "Short description cannot exceed 300 characters")
    .optional(),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  discountPrice: z
    .number({
      invalid_type_error: "Discount price must be a number",
    })
    .min(0, "Discount price cannot be negative")
    .optional()
    .refine(
      (data) =>
        data.discountPrice === undefined || data.discountPrice <= data.price,
      {
        message: "Discount price cannot be greater than price",
        path: ["discountPrice"],
      },
    ),

  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),

  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category id"),

  brand: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid brand id"),

  isFeatured: z.boolean().optional(),

  isPublished: z.boolean().optional(),
});
