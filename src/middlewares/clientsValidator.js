import * as validator from "../schemas/clientSchema.js"

export async function infoValidator(req,res,next) {
    const bodyValidation = validator.clientInfoSchema.validate(req.body);
    if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);
    next();
}

export async function creditValidator(req,res,next) {
    const bodyValidation = validator.clientCreditSchema.validate(req.body);
    if(bodyValidation.error) return res.status(422).send(bodyValidation.error.details[0].message);
    next();
}

export default {creditValidator, infoValidator}