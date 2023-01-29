import Joi from '@hapi/joi';

export const validateCreate = Joi.object({
    name: Joi.string().required(),
    description:Joi.string().required(),
    userId:Joi.string(),
    projectLengthEstimate: Joi.number().required(),
    projectLengthActual: Joi.number(),
    numberOfBugs: Joi.number(),
   
});

export const validateUpdate = Joi.object({
    name: Joi.string().required(),
    description:Joi.string().required(),
    userId:Joi.string(),
    projectLengthEstimate: Joi.number().required(),
    projectLengthActual: Joi.number(),
    numberOfBugs: Joi.number(),
});