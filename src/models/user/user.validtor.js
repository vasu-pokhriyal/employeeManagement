import Joi from '@hapi/joi';

export const validateCreate = Joi.object({
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    dataOfBirth:Joi.string(),
    avatar: Joi.string(),
    contactNo: Joi.string(),
    countryCode: Joi.string(),
    skillSets:Joi.array().items(Joi.string()),
    address:Joi.string()
});

export const validateUpdate = Joi.object({
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    dataOfBirth:Joi.string(),
    avatar: Joi.string(),
    contactNo: Joi.string(),
    countryCode: Joi.string(),
    skillSets:Joi.string(),
    address:Joi.string()
});