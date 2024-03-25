import Joi from "joi";

// validation for adding new question
const addQuestionSchema = Joi.object({
    questionPhrase: Joi.string().required().min(20).max(500),

});

//validation for updating question
const updateQuestionSchema =Joi.object({
    questionPhrase: Joi.string().required().min(20).max(500).optional(),
}).or('questionPhrase')

//validating add question

export const validateAddQuestion = (questionData) =>{
    return addQuestionSchema.validate(questionData);
};

// validating update quetion
export const validateUpdateQuestion = (questionData) =>{
    return updateQuestionSchema.validate(questionData);
};