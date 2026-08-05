import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import * as categoryService from "../services/category.service.js";

// Create Category Controller
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

// Get Categories Controller
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Categories fetched successfully", categories));
});

// Get Category by Slug Controller
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug);

  res
    .status(200)
    .json(new ApiResponse(200, "Category fetched successfully", category));
});

// Update Category Controller
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.validatedData,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Category updated successfully", category));
});
