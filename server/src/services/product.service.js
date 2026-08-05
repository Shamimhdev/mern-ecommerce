import slugify from "slugify";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";

import ApiError from "../utils/api-error.js";
import APIFeatures from "../utils/api-features.js";

// Create Product
export const createProduct = async (data, user) => {
  // Check category
  const category = await Category.findById(data.category);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Check brand
  const brand = await Brand.findById(data.brand);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  // Generate slug
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });

  // Check duplicate slug
  const existingProduct = await Product.findOne({ slug });

  if (existingProduct) {
    throw new ApiError(409, "Product already exists");
  }

  // Generate SKU
  const sku = `SKU-${Date.now()}`;

  const product = await Product.create({
    ...data,
    slug,
    sku,
    createdBy: user._id,
  });

  return product;
};

// Get Products
export const getProducts = async (query) => {
  const features = new APIFeatures(Product.find(), query)
    .search("name")
    .sort()
    .paginate();

  return await features.query
    .populate("category", "name slug")
    .populate("brand", "name slug");
};

// Get Product by Slug
export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug })
    .populate("category", "name slug")
    .populate("brand", "name slug");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// Update Product
export const updateProduct = async (id, data) => {
  if (data.category) {
    const category = await Category.findById(data.category);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }
  }

  if (data.brand) {
    const brand = await Brand.findById(data.brand);

    if (!brand) {
      throw new ApiError(404, "Brand not found");
    }
  }

  if (data.name) {
    data.slug = slugify(data.name, {
      lower: true,
      strict: true,
    });
  }

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// Delete Product
export const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne();
};
