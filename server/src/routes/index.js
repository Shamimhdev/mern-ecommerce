import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "API v1 is running" });
});

router.get("/health", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

router.use("/auth", authRoutes);

export default router;
