import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

export const dashboard = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Welcome Admin", {
      user: req.user,
    }),
  );
});
