import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(100),

  description: z.string().optional(),

  image: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
