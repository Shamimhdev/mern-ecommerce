import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "API v1 is running" });
});

router.use("/auth", authRoutes);

export default router;
