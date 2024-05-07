import Joi from "joi";

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

// Validation schema for creating a new user
const createFeedbackSchema = Joi.object({
    names: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    feedback: Joi.string().required(),
});

// Function to validate feefback creation
export const validateCreateFeedback = (FeedbackData) => {
    return createFeedbackSchema.validate(FeedbackData, options);
};