import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";
import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Public
router.get("/", getProducts);

router.get("/:slug", getProductBySlug);

// Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createProductSchema),
  createProduct,
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(createProductSchema.partial()),
  updateProduct,
);

router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
