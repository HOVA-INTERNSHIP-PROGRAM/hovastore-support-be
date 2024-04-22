import Category from "../models/categories.model";
import { uploadToCloud } from "../helper/cloud";

// service to create a category
export const createCat = async (catData, file, user) => {
  const { name, description } = catData;
  let result;
  if (file) result = await uploadToCloud(file);
  return await Category.create({
    name,
    description,
    icon: result?.secure_url,
    userId: user,
  });
};

// service to retrieve all categories
export const getCat = async () => {
  return await Category.find().populate({
    path: "userId",
    select: "name img",
  });
};

// service to retrieve a single category by id
export const getOneCat = async (categoryId) => {
  return await Category.findById(categoryId)
    .populate({
      path: "userId",
      select: "name img",
    })
    .populate({
      path: "articles",
      select: "title categoryId createdAt",
      populate: {
        path: "questions",
        select: "question articleId answers",
        populate: {
          path: "answers",
          select: "title image description questionId createdAt",
        },
      },
    });
};

// service to updated category info by id
export const updateCategory = async (id, catData, file, user) => {
  const { name, description } = catData;
  let result;
  if (file) result = await uploadToCloud(file);
  return await Category.findByIdAndUpdate(id, {
    name,
    description,
    icon: result?.secure_url,
    userId: user,
  });
};

// service delete a category
export const deleteCategory = async (id) => {
  await Category.findByIdAndDelete(id);
};
