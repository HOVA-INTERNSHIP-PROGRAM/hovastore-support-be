import Questions from "../models/question.models";
import mongoose from "mongoose";
// service to add new question
export const createQuestion = async (questionData, categoryId) => {
    const { questionPhrase } = questionData;

    const question = await Questions.create({
        questionPhrase,
        categoryId,
    });

    return question;
};


// service to update question
export const updateExistQuestion = async (id, questionData) => {
    const { questionPhrase } = questionData;
  
    return await Questions.findByIdAndUpdate(id, {
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

export const findSingleQuestion = async (id) =>{
    return await Questions.findById(id);
};

// service to delete a qustion

export const deleteQuestion = async (id) =>{
    return await Questions.findByIdAndDelete(id);
};