import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validateUserSchema (schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if(error?.isJoi) {
            return res.status(400).json({
                message: `Bad Request`,
                error
            });
        } else {
            next();
        }
    };
};
  