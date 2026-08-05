import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createBrandSchema,
  updateBrandSchema,
} from "../validators/brand.validator.js";
import {
  createBrand,
  getBrandBySlug,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";

const router = Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createBrandSchema),
  createBrand,
);
router.get("/", getBrands);
router.get("/:slug", getBrandBySlug);
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateBrandSchema),
  updateBrand,
);

export default router;
