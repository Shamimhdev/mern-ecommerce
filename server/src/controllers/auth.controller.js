import asyncHandler from "../utils/async-handler.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});
