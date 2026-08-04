import User from "../models/user.model.js";

export const register = async (userData) => {
  const { name, email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const user = await User.create({ name, email, password });
  return user;
};
