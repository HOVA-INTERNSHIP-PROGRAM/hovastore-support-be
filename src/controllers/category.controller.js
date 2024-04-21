import Category from "../models/categories.model";
import * as categoryService from "../services/category.services";
import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../validation/categories.validation";

// controller to create a category
export const createCategory = async (req, res) => {
  const { error, value } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    // checking if category already exits
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name: name });

    if (categoryExist) {
      console.log(categoryExist);
      return res.status(403).json({
        status: "403",
        message: "Category already exists",
      });
    }
    const category = await categoryService.createCat(
      value,
      req.file,
      req.User._id
    );
    return res.status(201).json({
      status: "201",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to create a category",
      error: error.message,
    });
  }
};

// constroller to retrieve all categories
export const getCategories = async (req, res) => {
  try {
    const category = await categoryService.getCat();
    return res.status(200).json({
      status: "200",
      message: "Categories are retrieve successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve a categories",
      error: error.message,
    });
  }
};

// controller to retrieve single category by id
export const getOneCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getOneCat(categoryId);

    if (!category) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve category",
      error: error.message,
    });
  }
};

// controller to update category by id
export const updateCategory = async (req, res) => {
  const { error, value } = validateUpdateCategory(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { id } = req.params;
    const findId = await Category.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }
    await categoryService.updateCategory(
      id,
      value,
      req.file,
      req.User._id
    );
    return res.status(201).json({
      status: "201",
      message: "Category information Updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to Update Category Information",
      error: error.message,
    });
  }
};

// controller to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Category.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Category not found",
      });
    }
    await categoryService.deleteCategory(id);
    return res.status(200).json({
      status: "200",
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
