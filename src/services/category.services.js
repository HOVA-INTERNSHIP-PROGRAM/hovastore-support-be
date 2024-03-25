import Category from "../models/categories.model";

// service to create a category
export const createCat = async (catData) => {
  const { name, description } = catData;

  return await Category.create({
    name,
    description,
  });
};

// service to retrieve all categories
export const getCat = async () => {
  return await Category.find();
};

// service to retrieve a single category by id
export const getOneCat = async (id) => {
  return await Category.findById(id);
};


// service to updated category info by id
export const updateCategory = async (id, catData) => {
  const { name, description } = catData;

  return await Category.findByIdAndUpdate(id, {
    name,
    description,
  });
};


// service delete a category
export const deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id);
}