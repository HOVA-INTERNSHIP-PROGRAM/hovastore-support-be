import Joi from "joi";

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

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
    return createAnswerSchema.validate(answerData, options);
}

// Function to validate Answer creation
export const validateUpdateAnswer = (answerData) => {
    return updateAnswerSchema.validate(answerData, options);
}