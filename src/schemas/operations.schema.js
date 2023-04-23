import joi from "joi";
//const BaseJoi = require("@hapi/joi");
//const DecimalExtension = require('joi-decimal');

//const Joi = BaseJoi.extend(DecimalExtension);

export const operationSchema = joi.object({
    value: joi.number().positive().required(),
    description: joi.string().required(),
});

export const typeSchema = joi.object({
    type: joi.any().valid("entrada", "saída"),
})