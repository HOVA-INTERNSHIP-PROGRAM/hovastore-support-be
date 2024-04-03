import * as QuestionService from "../services/question.services";
import Category from "../models/categories.model";
import {
  validateAddQuestion,
  validateUpdateQuestion,
} from "../validation/question.validation";
import Questions from "../models/question.models";

export const createAQuestion = async (req, res) => {
  const { error, value } = validateAddQuestion(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { categoryId } = req.params;
  const { questionPhrase } = req.body;
  const checkCategory = await Category.findById(categoryId);
  if (!checkCategory) {
    return res.status(404).json({
      status: "404",
      message: "Category not found",
    });
  }
  const checkQuestin = await Questions.findOne({
    questionPhrase: questionPhrase,
  });
  if (checkQuestin) {
    if (checkQuestin.categoryId == categoryId) {
      return res.status(400).json({
        status: "400",
        message: "Question already exist",
      });
    }
  }
  try {
    const question = await QuestionService.createQuestion(value, categoryId, req.User._id);
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { questions: question._id } },
      { new: true }
    );
    return res.status(200).json({
      status: "200",
      message: "Question added",
      data: question,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add a question",
      error: error.message,
    });
  }
};

// update question controller
export const updateAQuestion = async (req, res) => {
  const { error, value } = validateUpdateQuestion(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { questionId } = req.params;
    const { questionPhrase } = req.body;
    const checkQuestin = await Questions.findOne({
      questionPhrase: questionPhrase,
    });

    if (checkQuestin) {
      if (checkQuestin._id != questionId) {
        return res.status(400).json({
          status: "400",
          message: "Question already exist",
        });
      }
    }
    const checkQuestions = await Questions.findById(questionId);
    if (!checkQuestions) {
      return res.status(404).json({
        status: "404",
        message: "Question not found",
      });
    }

    await QuestionService.updateExistQuestion(questionId, value);
    return res.status(200).json({
      status: "200",
      message: "Question updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to update a question",
      error: error.message,
    });
  }
};

// display all questions

export const viewAll = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const getQuestions = await QuestionService.findAllQuestions(categoryId);
    if (!getQuestions || getQuestions.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No questions found for this category",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Questions retrieved",
      data: getQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};

// get single question

export const viewOneQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const getOne = await QuestionService.findSingleQuestion(questionId).then(
      (question) =>
        question.populate("answers", "step stepImage stepDescription createdAt")
    );
    if (!getOne) {
      return res.status(404).json({
        status: "404",
        message: "Question not found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Single question retrieved",
      data: getOne,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve a question",
      error: error.message,
    });
  }
};

// delete a question

export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const deleteIt = await QuestionService.deleteQuestion(questionId);
    if (!deleteIt) {
      return res.status(404).json({
        status: "404",
        message: "Question not found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Question deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete a question",
      error: error.message,
    });
  }
};
