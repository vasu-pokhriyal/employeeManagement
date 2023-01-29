import Joi from '@hapi/joi';

export const validateCreate = Joi.object({
    name: Joi.string().required(),
    description:Joi.string().required(),
    userId:Joi.string().required(),
    projectId:Joi.string().required(),
    estimatedHours: Joi.number().required(),
    actualHours: Joi.number(),
   
   
});

export const validateUpdate = Joi.object({
    name: Joi.string(),
    description:Joi.string(),
    userId:Joi.string(),
    projectId:Joi.string(),
    estimatedHours: Joi.number(),
    actualHours: Joi.number(),
});