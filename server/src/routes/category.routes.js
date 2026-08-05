import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";
import {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createCategorySchema),
  createCategory,
);
router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateCategorySchema),
  updateCategory,
);

export default router;
