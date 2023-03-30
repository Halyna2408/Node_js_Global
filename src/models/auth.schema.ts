import Joi from 'joi';

export const AuthSchema = Joi.object({
    login: Joi.required(),
    password: Joi.required()
});