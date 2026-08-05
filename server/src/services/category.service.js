import Category from "../models/category.model.js";
import ApiError from "../utils/api-error.js";

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

export const getCategories = async (query) => {
  const features = new APIFeatures(Category.find(), query)
    .search("name")
    .sort()
    .paginate();

  return await features.query;
};

export const getCategoryBySlug = async (slug) => {
  const category = await Category.findOne({ slug });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
};

export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  Object.assign(category, data);

  await category.save();

  return category;
};
