import Joi from "joi";

const createAnswerSchema = Joi.object({
    step: Joi.string(),
    stepImage: Joi.string().optional(),
    stepDescription: Joi.string().optional()
});

const updateAnswerSchema = Joi.object({
    step: Joi.string().optional(),
    stepImage: Joi.string().optional(),
    stepDescription: Joi.string().optional()
}).or('step', 'stepImage', 'stepDescription');

// Function to validate Answer creation
export const validateCreateAnswer = (answerData) => {
    return createAnswerSchema.validate(answerData);
}

// Function to validate Answer creation
export const validateUpdateAnswer = (answerData) => {
    return updateAnswerSchema.validate(answerData);
}