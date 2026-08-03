import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to MERN Ecommerce API" });
});

export default app;
