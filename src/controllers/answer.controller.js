import * as AnswerService from "../services/answers.services";
import {
  validateUpdateAnswer,
  validateCreateAnswer,
} from "../validation/answers.validation";
import Answers from "../models/answers.model";
import Questions from "../models/question.models";

// Controller to create answer to the question
export const createAnswer = async (req, res) => {
  const { error, value } = validateCreateAnswer(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const {questionId } = req.params;
  const { step } = req.body;
  const checkQuestion = await Questions.findById(questionId);
  if (!checkQuestion) {
    return res.status(404).json({
      status: "404",
      message: "Question not found",
    });
  }
  const checkAnswer = await Answers.findOne({ step: step });
  if (checkAnswer) {
    if (checkAnswer.questionId == questionId) {
      return res.status(400).json({
        status: "400",
        message: "The Answer step already exist on this qauestion",
      });
    }
  }

  try {
    const answer = await AnswerService.addAnswer(
      value,
      questionId,
      req.file,
      req.User._id
    );
    await Questions.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );
    return res.status(200).json({
      status: "200",
      message: "Answer added",
      data: answer,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to add an answer",
      error: error.message,
    });
  }
};

// controller to get all answers
export const getAllAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await AnswerService.getAllAnswers(questionId);
    return res.status(200).json({
      status: "200",
      message: "All Answer to the question is retrieved successfully",
      data: answers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to retrieve all answers",
      error: error.message,
    });
  }
};

// controller to delete answer
export const deleteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const answer = await AnswerService.deleteAnswer(answerId);
    if (!answer) {
      return res.status(404).json({
        status: "404",
        message: "Answer not found",
      });
    }
    return res.status(200).json({
      status: "200",
      message: "Answer deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to delete answer",
      error: error.message,
    });
  }
};

// controller to update answer
export const updateAnswer = async (req, res) => {
  const { error, value } = validateUpdateAnswer(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const { answerId } = req.params;
    const { answerStep } = req.body;
    const checkAnswer = await Answers.findOne({ step: answerStep });

    if (checkAnswer) {
      if (checkAnswer._id != answerId) {
        return res.status(400).json({
          status: "400",
          message: "Answer already exist",
        });
      }
    }

    const checkAnswers = await Answers.findById(answerId);
    if (!checkAnswers) {
      return res.status(404).json({
        status: "404",
        message: "Answer not found",
      });
    }

    await AnswerService.updateAnswer(answerId, value, req.file);
    return res.status(200).json({
      status: "200",
      message: "Answer updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Failed to update answer",
      error: error.message,
    });
  }
};
