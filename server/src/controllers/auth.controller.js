import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import * as authService from "../services/auth.service.js";

// Register a new user
export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
  );
});

// Login a user
export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res
    .status(200)
    .cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(200, "Login successful", {
        user: result.user,
      }),
    );
});
