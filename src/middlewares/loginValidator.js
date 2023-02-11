import loginSchema from "../schemas/loginSchema.js";

export default async function loginValidator(req,res,next) {
    const bodyValidation = loginSchema.validate(req.body);
    if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);
    next();
}