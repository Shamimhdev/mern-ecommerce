import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import * as brandService from "../services/brand.service.js";

// Create Brand Controller
export const createBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.createBrand(req.validatedData, req.user);

  console.log(req.validatedData);

  res
    .status(201)
    .json(new ApiResponse(201, "Brand created successfully", brand));
});

// Get Brands Controller
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await brandService.getBrands(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Brand fetched successfully", brands));
});

// Get brand by Slug Controller
export const getBrandBySlug = asyncHandler(async (req, res) => {
  const brand = await brandService.getBrandBySlug(req.params.slug);

  res
    .status(200)
    .json(new ApiResponse(200, "Brand fetched successfully", brand));
});

// Update Brand Controller
export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await brandService.updateBrand(
    req.params.id,
    req.validatedData,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Brand updated successfully", brand));
});
