import Joi from "joi";

const tagIdSchema = Joi.string().required();

export default tagIdSchema;