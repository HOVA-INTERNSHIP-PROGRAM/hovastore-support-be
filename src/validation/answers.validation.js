import Joi from "joi";

const createAnswerSchema = Joi.object({

});

const updateAnswerSchema = Joi.object({

});

// Function to validate Answer creation
export const validateCreateAnswer = (answerData) => {
    return createAnswerSchema.validate(answerData);
}

// Function to validate Answer creation
export const validateUpdateAnswer = (answerData) => {
    return updateAnswerSchema.validate(answerData);
}