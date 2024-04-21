import Answers from "../models/answers.model";
import mongoose from "mongoose";
import { uploadToCloud } from "../helper/cloud";

//service to add answer to question

export const addAnswer = async (answerData, questionId, file, user) => {
  const { title, description } = answerData;
  let savedImage;
  if (file) savedImage = await uploadToCloud(file);
  return await Answers.create({
    title,
    image: savedImage?.secure_url,
    description,
    questionId,
    userId: user,
  });
};

// service to update answer

export const updateAnswer = async (answerId, answerData, file) => {
  const { title, description } = answerData;
  let updatedImage;
  if (file) updatedImage = await uploadToCloud(file);
  return await Answers.findByIdAndUpdate(answerId, {
    title,
    image: updatedImage?.secure_url,
    description,
  });
};

// service to get all answers on given question

export const getAllAnswers = async () => {
  try {
    const answer = await Answers.find().populate({
      path: 'userId',
      select: 'name img'
    }).populate({ path: 'questionId', select: 'question' });
    return answer;
  } catch (error) {
    throw new Error("Failed to retrieve answers: " + error.message);
  }
};

// service to get single answer

export const getSingleAnswer = async (answerId) => {
  return await Answers.findById(answerId).populate({
    path: 'userId',
    select: 'name img'
  }).populate({ path: 'questionId', select: 'question' });
};

// service to delete answer

export const deleteAnswer = async (answerId) => {
  return await Answers.findByIdAndDelete(answerId);
};
