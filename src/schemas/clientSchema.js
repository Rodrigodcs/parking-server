import Joi from "joi";

const clientCreditSchema = Joi.object({
    valor: Joi.number().min(0).required()
});

const clientInfoSchema = Joi.object({
    name: Joi.string().required(),
    vehicleModel: Joi.string().required(),
    vehicleType: Joi.number().min(1).max(2).required(),
    vehicleColor: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/).max(7).min(7).required(),
    vehicleLicensePlate: Joi.string().min(7).max(7).required(),
});

export default {clientCreditSchema, clientInfoSchema};