import Joi from '@hapi/joi';


export const validateLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
   
});


export const validateRegister = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});



