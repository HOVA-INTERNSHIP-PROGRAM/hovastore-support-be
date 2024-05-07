import * as QuestionService from "../services/question.services";
import Articles from "../models/articles.model";
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
  const { articleId } = req.params;
  const { question } = req.body;
  const checkArticle = await Articles.findById(articleId);
  if (!checkArticle) {
    return res.status(404).json({
      status: "404",
      message: "Article not found",
    });
  }
  const checkQuestin = await Questions.findOne({
    question: question,
  });
  if (checkQuestin) {
    if (checkQuestin.articleId == articleId) {
      return res.status(400).json({
        status: "400",
        message: "Question already exist",
      });
    }
  }
  try {
    const questions = await QuestionService.createQuestion(value, req.User._id);
    await Articles.findByIdAndUpdate(
      articleId,
      { $push: { questions: questions._id } },
      { new: true }
    );
    return res.status(200).json({
      status: "200",
      message: "Question added",
      data: questions,
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
    const { question } = req.body;
    const checkQuestin = await Questions.findOne({
      question: question,
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
    const getQuestions = await QuestionService.findAllQuestions();
    if (!getQuestions || getQuestions.length === 0) {
      return res.status(404).json({
        status: "404",
        message: "No questions found",
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
    const getOne = await QuestionService.findSingleQuestion(questionId);
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

// handle like about how question is being answered

export const like = async(req, res) =>{
  try {
    const {questionId} = req.params;
    const questionExisit = await Questions.findById(questionId);
    if(!questionExisit){
      return res.status(404).json({
        status:"404",
        message:"Question not found"
      })
    }
    questionExisit.likes +=1;
    const savedLike = await questionExisit.save();
    return res.status(200).json({
      status:"200",
      message:"Your like added",
      data: savedLike,
    })
  } catch (error) {
    return res.status(500).json({
      statu:"500",
      message:"Failed to add like",
      error:error.message,
    })
  }
}
