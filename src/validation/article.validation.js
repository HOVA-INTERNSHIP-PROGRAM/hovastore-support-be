import Joi from "joi";

const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };

// validation for adding new article
const addArticleSchema = Joi.object({
    title: Joi.string().required().min(10).max(500),

});

//validation for updating article
const updateArticleSchema =Joi.object({
    title: Joi.string().required().min(10).max(500).optional(),
}).or('title')

//validating add article

export const validateAddArticle = (articleData) =>{
    return addArticleSchema.validate(articleData, options);
};

// validating update article
export const validateUpdateArticle = (articleData) =>{
    return updateArticleSchema.validate(articleData, options);
};