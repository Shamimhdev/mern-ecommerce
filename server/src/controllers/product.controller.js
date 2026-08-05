import asyncHandler from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";

import * as productService from "../services/product.service.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(
    req.validatedData,
    req.user,
  );

  res
    .status(201)
    .json(new ApiResponse(201, "Product created successfully", product));
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await productService.getProducts(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully", products));
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug);

  res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully", product));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.validatedData,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", product));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});
