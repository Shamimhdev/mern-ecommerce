import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";
import { verifyAccessToken } from "../utils/jwt.js";

// Protect User
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded.id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = user;

  next();
});

// User Authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not authorized to perform this action");
    }

    next();
  };
};
