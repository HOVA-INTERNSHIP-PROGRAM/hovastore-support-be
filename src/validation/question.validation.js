import Joi from "joi";

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

// validation for adding new question
const addQuestionSchema = Joi.object({
    question: Joi.string().required().min(3).max(500),

});

//validation for updating question
const updateQuestionSchema =Joi.object({
    question: Joi.string().required().min(3).max(500).optional(),
}).or('question')

//validating add question

export const validateAddQuestion = (questionData) =>{
    return addQuestionSchema.validate(questionData, options);
};

// validating update quetion
export const validateUpdateQuestion = (questionData) =>{
    return updateQuestionSchema.validate(questionData, options);
};