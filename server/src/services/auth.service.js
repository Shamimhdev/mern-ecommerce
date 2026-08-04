import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

// Register User
export const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }
  const user = await User.create({ name, email, password });
  return user;
};

// Login User
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }
  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
