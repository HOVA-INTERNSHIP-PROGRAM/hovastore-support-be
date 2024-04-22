import Joi from "joi";

const createAnswerSchema = Joi.object({
    title: Joi.string(),
    image: Joi.string().optional(),
    description: Joi.string().optional()
});

const updateAnswerSchema = Joi.object({
    title: Joi.string().optional(),
    image: Joi.string().optional(),
    description: Joi.string().optional()
}).or('title', 'image', 'description');

// Function to validate Answer creation
export const validateCreateAnswer = (answerData) => {
    return createAnswerSchema.validate(answerData);
}

// Function to validate Answer creation
export const validateUpdateAnswer = (answerData) => {
    return updateAnswerSchema.validate(answerData);
}