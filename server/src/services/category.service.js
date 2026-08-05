import Category from "../models/category.model.js";
import ApiError from "../utils/api-error.js";
import ApiFeatures from "../utils/api-features.js";

// Create Category
export const createCategory = async (data, user) => {
  const existingCategory = await Category.findOne({
    name: data.name,
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const category = await Category.create({
    ...data,
    createdBy: user._id,
  });

  return category;
};

// Get Categories
export const getCategories = async (query) => {
  const features = new ApiFeatures(Category.find(), query)
    .search("name")
    .sort()
    .paginate();

  return await features.query;
};

// Get Category by Slug
export const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({ slug });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

// Update Category
export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  Object.assign(category, data);

  await category.save();

  return category;
};
