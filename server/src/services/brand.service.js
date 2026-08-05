import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import ApiError from "../utils/api-error.js";
import ApiFeatures from "../utils/api-features.js";

// Create Brand
export const createBrand = async (data, user) => {
  const existingBrand = await Brand.findOne({
    name: data.name,
  });

  if (existingBrand) {
    throw new ApiError(409, "Brand already exists");
  }

  const brand = await Brand.create({
    ...data,
    createdBy: user._id,
  });

  return brand;
};

// Get Brands
export const getBrands = async (query) => {
  const features = new ApiFeatures(Brand.find(), query)
    .search("name")
    .sort()
    .paginate();

  return await features.query;
};

// Get Brands by Slug
export const getBrandBySlug = async (slug) => {
  const brand = await Brand.findOne({ slug });

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  return brand;
};

// Update Brand
export const updateBrand = async (id, data) => {
  const brand = await Brand.findById(id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  Object.assign(brand, data);

  await brand.save();

  return brand;
};
