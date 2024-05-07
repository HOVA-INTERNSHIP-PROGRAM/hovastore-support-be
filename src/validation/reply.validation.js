import Joi from "joi";

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

// validation for adding new reply
const addReplySchema = Joi.object({
  message: Joi.string().required(),
});

//validation for updating reply
const updateReplySchema = Joi.object({
  message: Joi.string().required().optional(),
}).or("message");

//validating add reply
export const ValidateAddReply = (replyData) => {
  return addReplySchema.validate(replyData, options);
};

// validating update reply
export const ValidateUpdateReply = (replyData) => {
  return updateReplySchema.validate(replyData, options);
};
