import Articles from "../models/articles.model";
import mongoose from "mongoose";
// service to add new article
export const createArticle = async (articleData, categoryId, user) => {
  const { title } = articleData;

  const addArticle = await Articles.create({
    title,
    categoryId,
    userId: user,
  });

  return addArticle;
};

// service to update article
export const updateExistArticle = async (articleId, articleData) => {
  const { title } = articleData;

  return await Articles.findByIdAndUpdate(articleId, {
    title,
  });
};

// service for getting all article

export const findAllArticles = async (categoryId) => {
  try {
    // Convert categoryId to ObjectId
    const categoryIdObj = new mongoose.Types.ObjectId(categoryId);
    const articles = await Articles.find({ categoryId: categoryIdObj })
      .populate({
        path: 'userId',
        select: 'name img'
      })
      .populate({
        path: 'questions',
        select: 'question categoryId createdAt',
        populate: {
          path: 'answers',
          select: 'title image description questionId userId'
        }
      });

    return articles;
  } catch (error) {
    throw new Error("Failed to retrieve questions: " + error.message);
  }
};

// service to get single article

export const findSingleArticle = async (articleId) => {
  return await Articles.findById(articleId)
    .populate({
      path: 'userId',
      select: 'name img'
    })
    .populate({
      path: 'questions',
      select: 'question categoryId createdAt',
      populate: {
        path: 'answers',
        select: 'title image description questionId userId'
      }
    });
};

// service to delete a article

export const deleteArticle = async (articleId) => {
  return await Articles.findByIdAndDelete(articleId);
};
