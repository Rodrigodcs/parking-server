import Joi from "joi";

const loginSchema = Joi.object({
    admin: Joi.string().required(),
    password: Joi.string().required()
});

export default loginSchema;