import Questions from "../models/question.models";
// service to add new question
export const createQuestion = async (questionData, articleId, user) => {
  const { question } = questionData;

  const addQuestion = await Questions.create({
    question,
    articleId,
    userId: user,
  });

  return addQuestion;
};

// service to update question
export const updateExistQuestion = async (questionId, questionData) => {
  const { question } = questionData;

  return await Questions.findByIdAndUpdate(questionId, {
    question,
  });
};

// service for getting all questions

export const findAllQuestions = async () => {
  try {
    const questions = await Questions.find()
      .populate({
        path: "userId",
        select: "name img",
      })
      .populate({ path: "answers" });

    return questions;
  } catch (error) {
    throw new Error("Failed to retrieve questions: " + error.message);
  }
};

// service to get single question

export const findSingleQuestion = async (questionId) => {
  return await Questions.findById(questionId)
    .populate({
      path: "userId",
      select: "name img",
    })
    .populate({ path: "answers" });
};

// service to delete a qustion

export const deleteQuestion = async (questionId) => {
  return await Questions.findByIdAndDelete(questionId);
};
