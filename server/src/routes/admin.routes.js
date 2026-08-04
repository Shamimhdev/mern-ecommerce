import { Router } from "express";
import { dashboard } from "../controllers/admin.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", protect, authorize("admin"), dashboard);

export default router;
