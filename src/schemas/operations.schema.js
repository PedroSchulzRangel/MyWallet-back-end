import joi from "joi";

export const operationSchema = joi.object({
    value: joi.number().precision(2).positive().required(),
    description: joi.string().required(),
});

export const typeSchema = joi.object({
    type: joi.any().valid("entrada", "saída"),
})