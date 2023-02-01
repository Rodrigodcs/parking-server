import Joi from "joi";

const tagIdSchema = Joi.object({
    tagId: Joi.string().required()
});

export default tagIdSchema;