import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import * as categoryService from "../services/category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(
    req.validatedData,
    req.user,
  );
  console.log(req.validatedData);

  res
    .status(201)
    .json(new ApiResponse(201, "Category created successfully", category));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Categories fetched successfully", categories));
});
