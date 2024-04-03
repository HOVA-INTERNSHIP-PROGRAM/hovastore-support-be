import Questions from "../models/question.models";
import mongoose from "mongoose";
// service to add new question
export const createQuestion = async (questionData, categoryId, user) => {
  const { questionPhrase } = questionData;

  const question = await Questions.create({
    questionPhrase,
    categoryId,
    userId: user,
  });

  return question;
};

// service to update question
export const updateExistQuestion = async (questionId, questionData) => {
  const { questionPhrase } = questionData;

  return await Questions.findByIdAndUpdate(questionId, {
    questionPhrase,
  });
};

// service for getting all questions

export const findAllQuestions = async (categoryId) => {
  try {
    // Convert categoryId to ObjectId
    const categoryIdObj = new mongoose.Types.ObjectId(categoryId);

    // Query questions based on categoryId
    const questions = await Questions.find({ categoryId: categoryIdObj });

    return questions;
  } catch (error) {
    throw new Error("Failed to retrieve questions: " + error.message);
  }
};

// service to get single question

export const findSingleQuestion = async (questionId) => {
  return await Questions.findById(questionId);
};

// service to delete a qustion

export const deleteQuestion = async (questionId) => {
  return await Questions.findByIdAndDelete(questionId);
};
