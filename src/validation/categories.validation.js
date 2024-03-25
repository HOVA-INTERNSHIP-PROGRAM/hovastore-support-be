import Joi from "joi"

const createCategorySchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
});

// Validation schema for updating a Category
const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
}).or('name', 'description'); 

// Function to validate Category creation
export const validateCreateCategory = (CategoryData) => {
  return createCategorySchema.validate(CategoryData);
};

// Function to validate Category update
export const validateUpdateCategory = (CategoryData) => {
  return updateCategorySchema.validate(CategoryData);
};


