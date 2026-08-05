import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createCategorySchema } from "../validators/category.validator.js";
import {
  createCategory,
  getCategories,
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

export default router;
