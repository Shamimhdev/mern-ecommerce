import User from "../models/user.model.js";
import ApiError from "../utils/api-error.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }
  const user = await User.create({ name, email, password });
  return user;
};
