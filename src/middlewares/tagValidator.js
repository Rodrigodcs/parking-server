import tagIdSchema from "../schemas/tagSchema.js"

export default async function tagValidator(req,res,next) {
    const bodyValidation = tagIdSchema.validate(req.body);
    if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);
    next();
}