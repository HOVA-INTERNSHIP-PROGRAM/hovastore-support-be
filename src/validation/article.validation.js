import Joi from "joi";

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
    return addArticleSchema.validate(articleData);
};

// validating update article
export const validateUpdateArticle = (articleData) =>{
    return updateArticleSchema.validate(articleData);
};