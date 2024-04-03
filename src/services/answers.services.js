import Answers from "../models/answers.model";
import mongoose from "mongoose";
import { uploadToCloud } from "../helper/cloud";

//service to add answer to question

export const addAnswer = async (answerData, questionId, file, user) => {
  const { step, stepDescription } = answerData;
  let savedImage;
  if (file) savedImage = await uploadToCloud(file);
  return await Answers.create({
    step,
    stepImage: savedImage?.secure_url,
    stepDescription,
    questionId,
    userId: user,
  });
};

// service to update answer

export const updateAnswer = async (answerId, answerData, file) => {
  const { step, stepDescription } = answerData;
  let updatedImage;
  if (file) updatedImage = await uploadToCloud(file);
  return await Answers.findByIdAndUpdate(answerId, {
    step,
    stepImage: updatedImage?.secure_url,
    stepDescription,
  });
};

// service to get all answers on given question

export const getAllAnswers = async (questionId) => {
  try {
    const idObject = new mongoose.Types.ObjectId(questionId);
    const answer = await Answers.find({ questionId: idObject });
    return answer;
  } catch (error) {
    throw new Error("Failed to retrieve answers: " + error.message);
  }
};

// service to get single answer

export const getSingleAnswer = async (answerId) => {
  return await Answers.findById(answerId);
};

// service to delete answer

export const deleteAnswer = async (answerId) => {
  return await Answers.findByIdAndDelete(answerId);
};
