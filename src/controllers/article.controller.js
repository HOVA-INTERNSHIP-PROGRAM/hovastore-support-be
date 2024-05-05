import * as ArticleServices from "../services/article.services";
import Category from "../models/categories.model";
import {
  validateAddArticle,
  validateUpdateArticle,
} from "../validation/article.validation";
import Articles from "../models/articles.model";

export const createAnArticle = async (req, res) => {
  const { error, value } = validateAddArticle(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { categoryId } = req.params;
  const { title } = req.body;
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) {
    return res.status(404).json({
      status: "404",
      message: "Category not found",
    });
  }
  const checkArticle = await Articles.findOne({
    title: title,
  });
  if (checkArticle) {
    if (checkArticle.categoryId == categoryId) {
      return res.status(400).json({
        status: "400",
        message: "Article already exist",
      });
    }
  }
  try {
    const articles = await ArticleServices.createArticle(
      value,
      categoryId,
      req.User._id
    );
    await Category.findByIdAndUpdate(
      categoryId,
      { $push: { articles: articles._id } },
      { new: true }
    );
    return res.status(200).json({
      status: "200",
      message: "Article added",
      data: articles,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add an article",
      error: error.message,
    });
  }
};

// update article controller
export const updateArticle = async (req, res) => {
  const { error, value } = validateUpdateArticle(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { articleId } = req.params;
    const { title } = req.body;
    const checkArticle = await Articles.findOne({
      title: title,
    });

    if (checkArticle) {
      if (checkArticle._id != articleId) {
        return res.status(400).json({
          status: "400",
          message: "Article already exist",
        });
      }
    }
    const checkArticles = await Articles.findById(articleId);
    if (!checkArticles) {
      return res.status(404).json({
        status: "404",
        message: "Article not found",
      });
    }

    await ArticleServices.updateExistArticle(articleId, value);
    return res.status(200).json({
      status: "200",
      message: "Article updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to update an article",
      error: error.message,
    });
  }
};

// display all articles

export const viewAll = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const getArticles = await ArticleServices.findAllArticles(categoryId);
    if (!getArticles || getArticles.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No article found for this category",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Articles retrieved",
      data: getArticles,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve articles",
      error: error.message,
    });
  }
};

// get single article

export const viewOneArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const getOne = await ArticleServices.findSingleArticle(articleId);
    if (!getOne) {
      return res.status(404).json({
        status: "404",
        message: "Article not found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Single article retrieved",
      data: getOne,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve an article",
      error: error.message,
    });
  }
};

// getOnebookByTitle

export const findArticlesByCategoryTitle = async (req, res) => {
  const { categoryTitle } = req.params;
  try {
    const category = await Category.findOne({ name: categoryTitle }).populate({ path: 'articles', populate: { path: 'questions' } });
    if (!category) {
      return res.status(404).json({ status: "404", message: "Category not found" });
    }

    return res.status(200).json({
      status: "200",
      message: "Articles retrieved successfully",
      data: category.articles
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve articles",
      error: error.message
    });
  }
};

// delete an article

export const deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const deleteIt = await ArticleServices.deleteArticle(articleId);
    if (!deleteIt) {
      return res.status(404).json({
        status: "404",
        message: "Article not found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Article deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete an article",
      error: error.message,
    });
  }
};
